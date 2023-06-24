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
3. Sliding window (token bucket)
4. Extrapolating window (leaky bucket)

> CALLOUT Architecture abstraction
>
> I'm not going into the details of how to architect your system. In my code examples, I'm using an abstraction of a Redis-like cache data store, which are commonly used for this application.
>
> Please see the Appendix for more details on the `cache`.

## Problem statement

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

PLOT

Looking at the plot, we see that we're effective in limiting requests arriving at a uniform rate, but, there are two caveats we have to address.

## Transient vs. steady-state limiting

While we may be accepting only 5 requests every second; nothing stops all 5 of those requests from arriving at the same time.

PLOT

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

## Bursting around window boundaries

If a burst arrives just before, and through a window boundary, it can blow past our $l_\text{rps}$.

PLOT

This happens because the `counter` hard resets at every window boundary, which is an inherent flaw of the fixed window algorithm, and resolved in the rest of the algorithms in this article. Fortunately, we can calculate the maximum cross-window burst in $w$ so that we can account for it when choosing our limit,
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

By design, this limiter has no burst tolerance; if we receive multiple requests in a burst, only one of them will be accepted. This may be desirable depending upon your application; but realistically, your system can probably handle more than a single request at a time.

## Sliding window (token bucket)





The most intuitive approach is to keep a tally of the number of requests we receive, and expire them





Like many real-world problems, the most intuitive approach is something that fits best in a continuous-time or analog computing environment.

If we had continuous-time, analog computers, we would be ablet



# Fixed window

Ideally, we would have a 



A fixed window is one of the simplest to implement. 







# Extrapolated sliding window (leaky bucket)

The network costs of the classic sliding window are rather high. What if wee instead track the number of requests



# Conclusion

A summary of results are presented in the following table:

Table

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

## Reading the plots



## Cache

methods

https://upstash.com/blog/upstash-ratelimit

https://github.com/upstash/ratelimit#ratelimiting-algorithms

## Why burstiness is bad

Simply put: bursts strain a system and potentially waste time. If we have a burst at the start of a window, our system will struggle to process all of the requests, potentially spinning up more resources to do so in a reasonable amount of time. By the time all the requests are over, the rest of the window has yet to elapse, meaning that we've waste cycles. Ideally, we want to even out bursts so that we can effectively process requests over our window.
