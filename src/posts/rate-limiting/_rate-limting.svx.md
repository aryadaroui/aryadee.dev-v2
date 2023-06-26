---
title: Rate limiting algorithms: A Deep Dive
date: 30 May 2021
update:
thumbnail: ./thumbnail.webp
tags: 
  - webdev
  - TypeScript
  - Python
---

# Intro

When making an API endpoint  available on the web, one of the first concerns you run into is:

> How do I protect this endpoint from being inundated by requests, so that I can maintain system stability?

The simple answer to this is limiting the rate (i.e. rate limiting) of processed requests--either by requester, or globally, on your endpoint.

I'm going to go over examples of common algorithms for designing a rate limiter, and provide some code along with it. The algorithms we're going to cover are:

1. Fixed window
2. Enforced average
3. Sliding window
4. Leaky bucket (Generic Cell Rate)

> CALLOUT Architecture abstraction
>
> I'm not going into the details of how to architect your system. In my code examples, I'm using an abstraction of a Redis-like cache data store, which are commonly used for this application.
>
> Please see the Appendix for more details on the `cache`.

## Problem setup

So that we have a clear definition for the problem we're trying to solve:

>  In a system that is receiving requests at a uniform rate of $r$ requests per second, identify which requests to accept to maintain a limit of $l$ accepted requests per time $w$, for a rate limit of $l_\text{rps}$.

For our examples, suppose we have a system that receives 10 requests per second, and we want to limit it to 5 requests per second.

$$
\begin{aligned}
    r &= 10 \text{ req/s}\\
    l &= 5 \text{ req} \\
    w &= 1 \text{ s} \\
    l_\text{rps} &= {l \over w} \\
    &= 5 \text{ req/s}
  \end{aligned}
$$

# Fixed window

Probably the most intuitive method is to set a `counter` in our cache with a $w$-length timer for [expiration](https://redis.io/commands/expire/) when we first receive a request. For every subsequent request in our window, we'll increment the count. When  the counter goes over the limit, we stop accepting requests.

```python
def fixed_window(key: str, limit: float, window_length_ms: float) -> dict
	counter = cache.get(key)

	if counter is not None:  # cache entry exists

		if count < limit:  # increment the count
      cache.incr(key) # incr() does not reset TTL
			return {"status": 'OK', "counter": counter + 1}
		else:  # we hit counter limit
			return {"status": "DENIED", "counter": counter}

	else:  # cache entry does not exist
		cache.set(key, 1, window_length_ms)  # set the target cache entry with TTL
		return {"status": "OK", "counter": 1}
```

PLOT uniform rate

Looking at the plot, we see that we're effective in limiting requests arriving at a uniform rate, but, there are two caveats we have to address.

## Transient vs. steady-state limiting

While we may be accepting only 5 requests every second; nothing stops all 5 of those requests from arriving at the same time.

TODO: Because it's greedy. this isn't unique to this algorithm. maybe move this into appendix

PLOT plot greedy transient vs steady-state

We can maintain the same $l_\text{rps}$ but modify our the max possible transient by scaling $l$ and $w$. For example, if you can only handle a maximum of 3 requests at once without system strain:
$$
\begin{aligned}
l_\text{rps} &= \frac{5 \text{ req}}{1 \text{ s}} = \boxed{\frac{3 \text{ req}}{0.6 \text{ s}}}\\
l_\text{new} &= 3 \text{ req} \\
w_\text{new} &= 0.6 \text{ s}
\end{aligned}
$$

This way, you still have same steady-state *average* $5 \text{ req/s}$, but the maximum transient at any one time is $3 \text{ req}$.

You may then wonder,

> Why not extend this principle to the extreme of $1 \text{ req}/ 0.2 \text{ s}$?

This is a special case I call the [enforced average](#enforced-average). What you're trading off is transient vs. steady-state limiting, or the *burst tolerance* of the limiter. At $1 \text{ req} / w$, you have no burst tolerance; it is enforcing the steady-state average.

## Bursting across window boundaries

If a burst arrives just before, and through a window boundary, it can blow past our $l_\text{rps}$.

PLOT cross-window burst

This happens because the `counter` hard resets at every window boundary, which is an inherent flaw of the fixed window algorithm's poor model of continuous state. This flaw is not observed in the rest of the algorithms in this article. Fortunately, we can calculate the maximum cross-window burst in $w$ so that we can account for it when choosing our limit,
$$
\text{burst}_\text{max} = 2l-1
$$

> CALLOUT warning
>
> the "$- 1$" is because we start our window on first request, which always excludes the first request from the boundary burst. But, if your implementation has window boundaries on a static timer (e.g. every UTC second), then it can be included:
> $$
> \text{burst}_\text{max, static} = 2l
> $$

# Enforced average

Another way of thinking about our given limit is to take its reciprocal:
$$
\begin{aligned}
l &= 5 \text{ req/s} = \frac{1}{\tau} \\
\implies \tau &= \frac{1 \text{ s}}{5 \text{ req}} = 0.2 \text{ s/req}
\end{aligned}
$$
Here, $\tau$ is the time it takes before we start accepting requests again. This enforces the average time between requests for our original limit. We can implement this by setting the average time as the expiry timer of our cache entry. If the entry exists, we've already received a request in $\tau$ seconds, and we deny it; otherwise, we accept it.

Looking at the code, we see this is basically a simplified version of the fixed window with the special case of $1 \text{ req} / w$.

```python
def enforced_average(key: str, limit: float, window_length_ms: float) -> dict:
	avg_time_ms = (window_length_ms / limit)

	entry = cache.get(key)

	if entry is not None:  # cache entry exists
		return {"status": "DENIED"}
	else:  # cache entry does not exist
		cache.set(key, 1, avg_time_ms)  # set cache entry with TTL of avg_time_ms
		return {"status": "OK"}
```

PLOT

By design, this limiter has no burst tolerance; if we receive multiple requests in a burst, only one of them will be accepted. This may be desirable depending upon your application, but realistically, requests often arrive in non-uniform bursts.

# Sliding window

We can resolve the window boundary issue of the fixed window by modeling a sliding window. Instead of a counter, upon every request, we record the timestamp, and then count the number of timestamps in the last $w$ seconds. If the count is less than our limit, we accept the request; otherwise, we deny it. Also, every time we receive a request, we will set an expiry timer for $w$ seconds so that our entry expires when the count would hit 0; this isn't necessary, but it keeps our cache free from stale entries.

> CALLOUT Redis sorted set
>
> I kept the code example generic, but if we were using Redis, we can better manage our timestamps using a [sorted set](https://redis.io/docs/data-types/sorted-sets/) with the timestamp as the score. We can then use the [`ZREMRANGEBYSCORE`](https://redis.io/commands/zremrangebyscore) command to remove all timestamps older than $w$ seconds, count what's left (within the window) with [`ZCOUNT`](https://redis.io/commands/zcount/), and finally compare that to our limit.

CODE

PLOT uniform rate

PLOT cross-window burst

This is a better model of continuous state compared to the fixed window, but you will still have to settle your [transient vs. steady-state](#transient-vs.-steady-state-limiting) tradeoff. This better performance comes at the cost of having to record and manage sets of timestamps for every request, whereas in other algorithms, we only need to increment a counter. If you have a high $l$, this can be a nontrivial cost.

# Leaky bucket (Generic Cell Rate Algorithm)

> CALLOUT Terminology clarification
> There is reasonable confusion over the terminology of leaky bucket, token bucket, and Generic Cell Rate Algorithm (GCRA) on the internet. 
>
> - In a **leaky bucket**...
>   - Each request fills up the bucket by a constant amount
>   - When the bucket is full, the request is invalid
>   - The bucket leaks at a constant rate
> - In a **token bucket**...
>   - There are request tokens in the bucket, and each request consumes a token (leaks the bucket)
>   - When the bucket is empty, the request is invalid
>   - The bucket is refilled with tokens at a constant rate
> - Both leaky and token bucket are used to shape network traffic by using the bucket "*as a queue*", but they can also be used "*as a meter*" for rate limiting by using the bucket as a counter and incrementing/decrementing it at a constant rate
>   - Classically, "constant rate" is done by a literal background process that manages the leak/refill of the bucket
> - The **GCRA** is the same as the leaky bucket as a meter, but by just keeping track of the last timestamp, we can calculate how much the bucket would've leaked since then, eliminating the need for a background process to constantly leak the bucket
> - The leaky bucket and token bucket are effectively the same as a meter, but there are differences as a queue; you can read more about it on [wikipedia](https://en.wikipedia.org/wiki/Leaky_bucket)
>
> For this article, I'm going to use the term "leaky bucket" for GCRA

For leaky bucket, we accept requests until our bucket is full, waiting for it to leak more capacity. Normally, we'd have parameters of `bucket_size` and `leak_rate`, which ties in the analogy, but I don't find it intuitive for rate limiting. Instead, I'm going to keep the same `limit` and `window_length_ms` parameters, with an additional `mode` parameter for `'soft'` or `'hard'` limiting, which determines our leak rate.

At its core, our leaky bucket is like a blend of all of our previous algorithms. When we receive our first request, we start a counter in our cache entry and give it a timestamp. For each subsequent request, we calculate what our counter decreases (leaks) to from the last timestamp, and then increment it; if it goes over the limit, we deny the request. Additionally, to keep our cache tidy, we set the expiry timer on every request to be the time it would take for the counter to leak to 0.

With  `mode='soft'`, we maintain a steady-state limit of $l_\text{rps} = l/w$ with a transient $\text{burst}_\text{max} = 2l-1$. With `mode='hard'`, we maintain a steady-state limit $l_\text{rps} = 1 \text{ req} / w$ with a transient $\text{burst}_\text{max} = l$. In other words, you choose whether you want to limit steady-state, or transients. You can still rescale your $l$ and $w$ as before, too.

CODE

PLOT soft and hard



- No cross-window inconsistency
- Low resource cost (only a counter and timestamp per entry)
- Transient vs. steady-state adjustment for burst tolerance

# Conclusion

A summary of results are presented in the following table:

| Algorithm                        |      transient max       | steady-state max | resource cost |    distribution     |
| :------------------------------- | :----------------------: | :--------------: | :-----------: | :-----------------: |
| `fixed_window(...)`              | $l$; $2l-1$ cross-window |      $l/w$       |      Low      |       greedy        |
| `enforced_avg(...)`              |           $1$            |      $l/w$       |      Low      |       uniform       |
| `sliding_window(...)`            |           $l$            |      $l/w$       |     High      |       greedy        |
| `leaky_bucket(..., mode='soft')` |          $2l-1$          |      $l/w$       |      Low      | greedy then uniform |
| `leaky_bucket(..., mode='hard')` |           $l$            |      $1/w$       |      Low      | greedy then uniform |

should talk about different between transient vs burst max, and also distribution in uniform request rate

PLOT

It's sounds like a cop out, but the best choice depends on your use case. However, you likely *don't* want to use sliding window (token bucket). 

## Other features to consider

There are also some niche features you may want to consider exploring that I did not cover here, such as:

- Timeout
  - Block requests for extra time if there are way too many requests
  - Effectively a two-stage limiter

- No relaxation
  - Increment the `saturation` even if the request is denied.
  - Similar, simpler effect to timeout

- Traffic shaping
  - Implement a queue to space out requests or blocking a thread until it's ready, instead of wholly denying a request
  - Also known as *traffic shaping* vs. *traffic policing*


- Latency compensation
  - Compensate for the time it takes when getting and setting
  - I think this is pretty niche. Only needed for high frequency systems


# Appendix

key words and identifiers

- `saturation`
- `key`
- `rps`
- `cache`
- TTL: time-to-live.
- requests. I'm using the term requests for incoming API requests. However, you can just generally imagine them as incoming network traffic, especially relevant to the leaky bucket algorithm

## Reading the plots



## Cache

methods

https://upstash.com/blog/upstash-ratelimit

https://github.com/upstash/ratelimit#ratelimiting-algorithms

## Why burstiness is bad

Simply put: bursts strain a system and potentially waste time. If we have a burst at the start of a window, our system will struggle to process all of the requests, potentially spinning up more resources to do so in a reasonable amount of time. By the time all the requests are over, the rest of the window has yet to elapse, meaning that we've waste cycles. Ideally, we want to even out bursts so that we can effectively process requests over our window.

