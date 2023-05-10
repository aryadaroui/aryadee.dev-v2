import { Redis } from '@upstash/redis';

import { REDIS_URL, REDIS_TOKEN } from '$env/static/private';

const redis = new Redis({
	url: REDIS_URL,
	token: REDIS_TOKEN,
});

type IPLookupCalls = {
	value: number;
	timestamp: string;
} | null;

const ms_to_min = (ms: number) => ms / 1000 / 60;
// const min_to_sec = (min: number) => min * 60;
const floor = (num, floor) => Math.max(num, floor);

const RECENT_IP_TIMER = 60 * 60 * 24; // 24 hours
const LOOKUP_THRESHOLD = 30; // 30 req / minute

async function write_visitor(locals: App.Locals) {

	async function lookup_and_write(locals: App.Locals, ip_lookup_calls: IPLookupCalls) {
		// const ip_lookup = fetch(`http://ip-api.com/json/${locals.ip_address}?fields=1689337`);

		// MUST DO: write to DB table unique_IPs

		// update/add redis hash key
		ip_lookup_calls.value += 1;
		ip_lookup_calls.timestamp = new Date().toISOString();
		redis.hset('ip_lookup_calls', ip_lookup_calls);
		/* You might be tempted to set an expiration for this key because you know when the value would relax to 0. Don't.
		* `ip_lookup_calls` shares`the redis store with recent IPs, which do have an expiration.
		* This store has an eviction policy that preferentially evicts keys with an expiration
		* So if you set an expiration for this key, it can be deleted by the eviction policy, which would be bad.
		* Info on the eviction policy: https://docs.upstash.com/redis/features/eviction
		*/
	}

	// First, check if we'ved made too many requests
	return redis.hgetall('ip_lookup_calls').then((request) => {
		const ip_lookup_calls = request as IPLookupCalls;

		if (ip_lookup_calls !== null) { // entry exists
			// update value for current time after relaxing
			// this uses logic from TODO: link to blog post
			ip_lookup_calls.value = floor(ip_lookup_calls.value - ms_to_min(Date.now() - new Date(ip_lookup_calls.timestamp).getTime()), 0);
			// can also update timestamp here, but not necessary because we will overwrite it later

			if (ip_lookup_calls.value > LOOKUP_THRESHOLD) {
				console.warn('too many requests! `ip_lookup_calls.value`: ', ip_lookup_calls.value, "\n┗> not looking up IP: ", locals.ip_address);
			} else {
				lookup_and_write(locals, ip_lookup_calls);
			}
		} else { // it doesn't exist
			console.warn('`ip_lookup_calls` does not exist; creating new entry');

			const ip_lookup_calls: IPLookupCalls = {
				value: 0, // gets incremented in lookup_and_write()
				timestamp: "", // this gets overwritten in lookup_and_write()
			};

			lookup_and_write(locals, ip_lookup_calls);
		}
	}).catch((err) => {
		console.error('error getting redis `ip_lookup_calls`. Not looking up IP: ', locals.ip_address, '\n┗> error: ', err);
	});
}

export async function load({ locals }) {

	// // We write visitor to DB, but we don't want to write same vistior repeatedly
	// check if they've visited recently
	if (locals.ip_address !== "::1") {
		redis.get(locals.ip_address).then((value) => {
			if (value) {
				// they already visited within the last 24 hours
				// do nothing
				console.info('recent visitor: ', locals.ip_address);
			} else {
				write_visitor(locals).then(() => {
					redis.set(locals.ip_address, new Date().toISOString(), { ex: RECENT_IP_TIMER });
				});
			}
		});
	}
	else {
		console.info("\x1b[35m%s\x1b[0m", 'layout load: localhost detected; not writing to DB');
	}

	return {
		visit_id: locals.visit_id,
	};
}