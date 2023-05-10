import kv from '@vercel/kv';

const RECENT_IP_TIMER = 60 * 60 * 24; // 24 hours
const LOOKUP_THRESHOLD = 30; // 30 req / minute

type IPLookupCalls = {
	value: number;
	timestamp: string;
};
const ms_to_min = (ms: number) => ms / 1000 / 60;
const min_to_sec = (min: number) => min * 60;


async function get_lookup_data(ip_address: string, locals: App.Locals) {

	// const ip_lookup_calls = await kv.hgetall('ip_lookup_calls') as IPLookupCalls;

	kv.hgetall('ip_lookup_calls').then((request) => {
		const ip_lookup_calls = request as IPLookupCalls;

		// update value for current time after relaxing
		ip_lookup_calls.value = ip_lookup_calls.value - ms_to_min(Date.now() - new Date(ip_lookup_calls.timestamp).getTime());
		// can also update timestamp here, but not necessary

		if (ip_lookup_calls.value > LOOKUP_THRESHOLD) {
			console.warn('too many requests; not performing IP lookup. `ip_lookup_calls.value`: ', ip_lookup_calls.value);
		} else {
			// const ip_data = fetch(`http://ip-api.com/json/${locals.ip_address}?fields=1689337`);

			// update KV store
			ip_lookup_calls.value += 1;
			ip_lookup_calls.timestamp = new Date().toISOString();
			kv.hset('ip_lookup_calls', ip_lookup_calls);
		}
	}).catch(() => {
			// const ip_data = fetch(`http://ip-api.com/json/${locals.ip_address}?fields=1689337`);


			// add to KV store
			const ip_lookup_calls: IPLookupCalls = {
				value: 1,
				timestamp: new Date().toISOString(),
			};
			kv.hset('ip_lookup_calls', ip_lookup_calls);
	});
}


export async function load({ locals }) {



	kv.get(locals.ip_address).then((value) => {
		if (value) {
			// they already visited
			// do nothing
		} else {
			kv.set(locals.ip_address, new Date().toISOString(), { ex: RECENT_IP_TIMER });

			// get IP lookup data


			// write to DB table UniqueVisitors
			// locals.ip_address
			// locals.timestamp
			// locals.visit_id
		}
	});






	// get IP lookup data
	// write to DB table UniqueVisitors
	// locals.ip_address
	// locals.timestamp
	// locals.visit_id

	// poop = 10


	return {
		visit_id: locals.visit_id,
	};
}