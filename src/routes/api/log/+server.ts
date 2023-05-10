import { VITE_SECRET_DUMMY_KEY } from '$env/static/private';
import { origin_allowlist } from "../origin_allowlist.json";

import { v1 as time_uuid } from 'uuid';

interface Visitor {
	ip: {
		ip_address: string;
		isp: string;
		mobile: boolean;
		proxy: boolean;
		geo: {
			continent: string;
			country: string;
			region_name: string;
			city: string;
			district: string;
			zip: string;
			lat: number;
			lon: number;
		};
	};
	client: {
		fingerprint: string;
		confidence: number;
		timezone: string;
		browser: string;
		cpu_concurrency: number;
		gpu: {
			vendor: string;
			renderer: string;
		};
		os: {
			platform: string;
			os_cpu: string;
		};
	};
	fingerprint: string;
	page: string;
	timestamp: string;
	visit_uuid: string;
}

// global rate limiting for all IPs
// TODO: make IP specific rate-limting
const MAX_RATE = 40; // max requests per minute
let num_requests = 0;
let last_request_minute = new Date().getMinutes();

export async function POST({ request, getClientAddress }) {
	// const origin_white_list = [
	// 	"https://aryadee.dev",
	// 	"http://aryadee.dev",
	// 	"http://localhost:5173",			// for dev
	// 	"http://localhost:4173",			// for dev
	// 	"https://aryadee-dev-v2.vercel.app"	// for dev
	// ];

	const origin = request.headers.get("Origin");

	const ip_address = getClientAddress();
	const timestamp = new Date().toISOString();
	const visit_uuid = time_uuid();
	// const ip_data = fetch(`http://ip-api.com/json/${ip_address}?fields=1689337`);

	// // Rate limiting
	// doing it this way is "discrete"; it resets every minute instead of a continuous rolling window
	console.log('num requests: ', num_requests);
	if (new Date().getMinutes() == last_request_minute) {
		num_requests++;
		if (num_requests > MAX_RATE) {
			// console.log('\x1b[36m%s\x1b[0m', 'RATE LIMIT REACHED: ', num_requests); // cyan text
			return new Response(JSON.stringify({ message: "too many requests" }), { status: 429 });
		}
	}
	else {
		num_requests = 0;
		last_request_minute = new Date().getMinutes();
	}

	// this is less about security and more about preventing spam
	// this endpoint exists purely for pushing logs
	const token = request.headers.get("Authorization");
	if (!token) {
		return new Response(JSON.stringify({ message: "invalid auth" }), { status: 401 });
	} else if (token !== "SPAGHETTI") {
		return new Response(JSON.stringify({ message: "invalid auth" }), { status: 401 });
	}

	if (!origin_allowlist.includes(origin)) {
		console.error('\x1b[31m%s\x1b[0m', 'invalid origin: ', origin); // red text
		return new Response(JSON.stringify({ message: "invalid origin" }), { status: 401 });
	}


	// console.log('\x1b[36m%s\x1b[0m', 'client IP: ', getClientAddress()); // cyan text

	// // DB access
	try {
		// console.log('\x1b[36m%s\x1b[0m', 'secret api key dummy: ', VITE_SECRET_DUMMY_KEY); // cyan text
		// console.log("request body: ", await request.json());


		console.log("sending data to DB...\n\n");
	} catch (error) {
		console.error("error: ", error);
		return new Response(JSON.stringify({ message: "internal error" }), { status: 500 });
	}
	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
};