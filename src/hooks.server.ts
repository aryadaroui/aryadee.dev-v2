import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

import { v4 as uuid } from 'uuid';
import { UAParser } from 'ua-parser-js';

import { Redis } from '@upstash/redis';
import { REDIS_URL, REDIS_TOKEN, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';


const redis = new Redis({
	url: REDIS_URL,
	token: REDIS_TOKEN,
});

const ddb = new DynamoDB({
	region: 'us-west-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

const MARSHALL_OPTS = {
	convertClassInstanceToMap: true,
	convertEmptyValues: false, // converts empty strings, binary buffers, and sets to `null`
	removeUndefinedValues: true // removes undefined values from final object
};

function dir_and_slug(url_string: string) {
	const url = new URL(url_string);
	const pathname = url.pathname;
	const pathParts = pathname.split('/');
	const directory = pathParts[1];
	const pageSlug = pathParts[2];
	return { directory, pageSlug };
}

async function write_unique_IP(visit_id: string, ip_address: string, timestamp: string) {

	type UniqueIP = {
		lookup: {
			continent: string;
			country: string;
			region_name: string;
			city: string;
			district: string;
			zip: string;
			lat: number;
			lon: number;
		} | null;
		visit_id: string;
		timestamp: string;
		ip_address: string;
	};

	type IPLookupCalls = {
		saturation: number;
		timestamp: string;
	};

	type IPLookup = {
		continent: string;
		country: string;
		regionName: string;
		city: string;
		district: string;
		zip: string;
		lat: number;
		lon: number;
		isp: string;
		proxy: boolean;
	};

	// const min_to_sec = (min: number) => min * 60;
	const ms_to_min = (ms: number) => ms / 1000 / 60;
	const floor = (num: number, floor: number) => Math.max(num, floor); // more readable than Math.max()

	const RECENT_IP_TIMER = 60 * 60 * 24; // 24 hours
	const LOOKUP_THRESHOLD = 30; // 30 req / minute. http://ip-api.com is okay with up to 45 req / minute, but I want to be safe because idk their rate limit algorithm

	async function lookup_and_write(visit_id: string, ip_address: string, ip_lookup_calls: IPLookupCalls, timestamp: string) {

		fetch(`http://ip-api.com/json/${ip_address}?fields=1704697`)
			.then(response => response.json())
			.then((ip_lookup: IPLookup) => {
				const unique_ip: UniqueIP = {
					lookup: {
						continent: ip_lookup.continent,
						country: ip_lookup.country,
						region_name: ip_lookup.regionName,
						city: ip_lookup.city,
						district: ip_lookup.district,
						zip: ip_lookup.zip,
						lat: ip_lookup.lat,
						lon: ip_lookup.lon,
					},
					visit_id: visit_id,
					timestamp,
					ip_address,
				};

				// write unique_IP to dynamoDB
				ddb.putItem({
					TableName: 'unique_IPs',
					Item: marshall(unique_ip, MARSHALL_OPTS),
				}).catch((err) => {
					console.error("Error writing to unique_IPs table with `unique_ip` item: ", unique_ip, "\n┗>AWS error:", err);
				});
			}).catch((err) => {
				console.error("Error looking up IP address:", ip_address, "\n┗>fetch error:", err);
			});


		// write to redis that we have recently logged this IP
		redis.set(ip_address, timestamp, { ex: RECENT_IP_TIMER });

		// update/add redis hash key
		ip_lookup_calls.saturation += 1;
		ip_lookup_calls.timestamp = timestamp;
		redis.hset('ip_lookup_calls', ip_lookup_calls);
		/* You might be tempted to set an expiration for this key because you know when the saturation would relax to 0. Don't.
		* `ip_lookup_calls` shares`the redis store with recent IPs, which do have an expiration.
		* This store has an eviction policy that preferentially evicts keys with an expiration
		* So if you set an expiration for this key, it can be deleted per the eviction policy, which would be bad.
		* Info on the eviction policy: https://docs.upstash.com/redis/features/eviction
		*/
	}

	// We write to unique_IPs DB, but we don't want to write same IP repeatedly
	// so we check if they've visited recently
	redis.get(ip_address).then((ip_address_entry) => {

		if (ip_address_entry == null) { // ip address entry does not exist => they haven't visited within the last 24 hours => we can look up / update their IP

			// check if we've made too many requests to our IP lookup API
			redis.hgetall('ip_lookup_calls').then((request) => {
				const ip_lookup_calls = request as IPLookupCalls;

				if (ip_lookup_calls !== null) { // entry exists
					// update saturation for current time after relaxing
					// this uses logic from TODO: link to blog post
					ip_lookup_calls.saturation = floor(ip_lookup_calls.saturation - ms_to_min(Date.now() - new Date(ip_lookup_calls.timestamp).getTime()), 0);
					// can also update timestamp here, but not necessary because we will overwrite it later

					if (ip_lookup_calls.saturation < LOOKUP_THRESHOLD) {
						lookup_and_write(visit_id, ip_address, ip_lookup_calls, timestamp);
					} else {
						console.warn('too many requests! `ip_lookup_calls.saturation`: ', ip_lookup_calls.saturation, "\n┗> not looking up IP: ", ip_address);
					}
				} else { // it doesn't exist
					console.warn('`ip_lookup_calls` does not exist; creating new entry');

					const ip_lookup_calls: IPLookupCalls = {
						saturation: 0, // will get incremented in lookup_and_write()
						timestamp: "", // this gets overwritten in lookup_and_write()
					};

					lookup_and_write(visit_id, ip_address, ip_lookup_calls, timestamp);
				}
			});
		} else { // ip address entry exists => they already visited within the last 24 hours
			// do nothing
			console.info('recent visitor: ', ip_address);
		}
	});
}

async function write_visit(event: RequestEvent, ip_address: string, timestamp: string) {

	type Visit = {
		client_mount: {
			fingerprint: string;
			confidence: number;
		} | null;
		device: { // { vendor: 'Apple', model: 'iPhone', type: 'mobile' }
			vendor: string;
			model: string;
			type: string;
		};
		pages: {
			page: string;
			timestamp: string;
		}[];
		browser: string;
		os: string;
		referrer: string;

		ip_address: string;
		timestamp: string; // ISO 8601 format - sort key for DB
		visit_id: string; // primary key for DB
	}; // to verify we've populated all the fields

	const user_agent = new UAParser(event.request.headers.get('user-agent'));
	const device = user_agent.getDevice();
	if (device.type === undefined) device.type = 'desktop'; // assume desktop if not specified

	const visit = {
		client_mount: null,
		device: device,
		browser: user_agent.getBrowser().name,
		os: user_agent.getOS().name,
		referrer: event.request.headers.get('referer'),
		pages: [{
			page: event.url.pathname,
			timestamp: timestamp,
		}],
		ip_address: ip_address,
		timestamp: timestamp,
		visit_id: event.locals.visit_id,
	};

	// write to DB table visits
	// ddb.putItem({
	// 	TableName: 'visits',
	// 	Item: marshall(visit, MARSHALL_OPTS)
	// }).catch((err) => {
	// console.error("Error writing to visits table with `visit` item: ", visit, "\n┗>AWS error:", err);
	// });
}

// // ENTRY POINT // //
export async function handle({ event, resolve }) {

	// immediately assign
	event.locals.visit_id = uuid();
	const timestamp = new Date().toISOString();
	const ip_address = event.getClientAddress();
	// const ip_address = "70.187.244.194.a"; // DEBUG ONLY
	// const ip_address = "1111"

	if (dir_and_slug(event.request.url).directory !== 'api') { // not an API request
		if (ip_address !== "::1") {
			// write to visits table
			// write_visit(event, ip_address, timestamp);

			// write to unique_IPs table
			write_unique_IP(event.locals.visit_id, ip_address, timestamp);
		} else {
			console.info("\x1b[35m%s\x1b[0m", 'hooks handle(): localhost detected; not writing to DB');
		}
	} else { // an API request
		// you might be tempted to populate event.locals to validate the API, but don't.
		// each time handle() is called is a new instance, so your uuid and timestamp will be different. you could use the IP though
	}

	const response = await resolve(event);
	return response;
}