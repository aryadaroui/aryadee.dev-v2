import { origin_allowlist } from "../origin_allowlist.json";
import { PUBLIC_MOUNT_LOG_TOKEN } from "$env/static/public";
import { UAParser } from 'ua-parser-js';

export async function POST({ request }) {
	const parse = new UAParser('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

	const origin = request.headers.get("Origin");
	const token = request.headers.get("Authorization");

	// this is less about security and more about preventing spam as this endpoint only exists for pushing logs
	// technically, these could be 401s but I don't need to give away info about this endpoint. my use only
	if (!token) {
		console.warn('api/mount-log POST got invalid auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (token !== PUBLIC_MOUNT_LOG_TOKEN) {
		console.warn('api/mount-log POST got invalid auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (!origin_allowlist.includes(origin)) { // don't need the else but it looks better this way
		console.warn('api/mount-log POST got invalid origin: ', origin);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	}

	request.json().then(data => {

		const parsed_UA = new UAParser(data.user_agent);
		const device = parsed_UA.getDevice();
		if (device.type === undefined) device.type = 'desktop'; // assume desktop if not specified

		const client_data = {
			fingerprint: data.fingerprint,
			confidence: data.confidence,
			browser: parse.getBrowser(),
			os: parse.getOS(),
			device: device,
			visit_id: data.visit_id,
		};

		// console.log('api/log-mount POST got data: ', data);

		// write to DB visits table

	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}

