import { origin_allowlist } from "../origin_allowlist.json";
import { PUBLIC_LOG_TOKEN } from "$env/static/public";
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

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

export async function POST({ request }) {
	const origin = request.headers.get("Origin");
	const token = request.headers.get("Authorization");

	// this is less about security and more about preventing possible spam as this endpoint only exists for pushing logs
	// technically, these could be 401s but I don't need to give away info about this endpoint. it's for my use only
	if (!token) {
		console.warn('api/nav-log POST missing auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (token !== PUBLIC_LOG_TOKEN) {
		console.warn('api/nav-log POST got invalid auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (!origin_allowlist.includes(origin)) { // don't need the else but it looks better this way
		console.warn('api/nav-log POST got invalid origin: ', origin);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	}

	request.json().then((data) => {
		const new_page = {
			page: data.page,
			timestamp: new Date().toISOString()
		}

		if (!origin.includes('localhost')) {
			// console.log('api/mount-log POST got new_page:', new_page);

			// console.log('api/log-mount POST got data: ', data);
			// write to DB visits table
			// with primary key of visit_id, append to page list with page name and timestamp IFF visit_id exists

			// ddb.putItem({
			// 	TableName: 'visits',
			// 	Item: marshall(new_page, MARSHALL_OPTS),
			// 	ConditionExpression: 'attribute_exists(visit_id)',
			// }).catch((err) => {
			// 	console.error("Error writing to visits table with `client_mount` item: ", new_page, "\n┗>AWS error:", err);
			// });
		} else {
			console.info("\x1b[35m%s\x1b[0m", 'nav-log POST(): localhost detected; not writing to DB');
		}
	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}