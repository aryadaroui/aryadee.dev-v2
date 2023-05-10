import { origin_allowlist } from "../origin_allowlist.json";
import { PUBLIC_MOUNT_LOG_TOKEN } from "$env/static/public";

export async function POST({ request }) {
	const origin = request.headers.get("Origin");
	const token = request.headers.get("Authorization");

	// this is less about security and more about preventing possible spam as this endpoint only exists for pushing logs
	// technically, these could be 401s but I don't need to give away info about this endpoint. it's for my use only
	if (!token) {
		console.warn('api/mount-log POST missing auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (token !== PUBLIC_MOUNT_LOG_TOKEN) {
		console.warn('api/mount-log POST got invalid auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (!origin_allowlist.includes(origin)) { // don't need the else but it looks better this way
		console.warn('api/mount-log POST got invalid origin: ', origin);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	}

	request.json().then(data => {

		const client_mount = {
			fingerprint: data.fingerprint,
			confidence: data.confidence,
			visit_id: data.visit_id,
		};

		// console.log('api/log-mount POST got data: ', data);

		// write to DB visits table

	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}

