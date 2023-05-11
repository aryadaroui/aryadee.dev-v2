import { origin_allowlist } from "../origin_allowlist.json";
import { PUBLIC_LOG_TOKEN, PUBLIC_DEV_FLAG } from "$env/static/public";
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, VISIT_HASH_KEY } from '$env/static/private';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from '@aws-sdk/util-dynamodb';

import { createHmac } from 'crypto';


const client = new DynamoDBClient({
	region: 'us-west-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

const ddb = DynamoDBDocumentClient.from(client);

type IncomingData = {
	fingerprint: string,
	confidence: number,
	visit_id: string,
}

const ms_to_min = (ms: number) => ms / 1000 / 60;


export async function POST({ request }) {

	const origin = request.headers.get("Origin");
	const token = request.headers.get("token");

	const hashes = [
		createHmac('md5', Math.floor(ms_to_min(new Date().getTime())).toString()).update(VISIT_HASH_KEY).digest('base64'), // current minute
		createHmac('md5', (Math.floor(ms_to_min(new Date().getTime())) - 1).toString()).update(VISIT_HASH_KEY).digest('base64') // previous minute
	]

	// this is less about security and more about preventing possible spam as this endpoint only exists for pushing logs
	// technically, these could be 401s but I don't need to give away info about this endpoint. it's for my use only


	if (!token) {
		console.warn('api/mount-log POST missing auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (!hashes.includes(token)) {
		console.warn('api/mount-log POST got invalid auth token: ', token, "\n┗>with possible tokens:", hashes);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (!origin_allowlist.includes(origin)) { // don't need the else but it looks better this way
		console.warn('api/mount-log POST got invalid origin: ', origin);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	}

	request.json().then((data: IncomingData) => {
		const client_mount = {
			fingerprint: data.fingerprint,
			confidence: data.confidence,
		};

		console.log("client token:", token);
		
		if (PUBLIC_DEV_FLAG) {

			const params = {
				TableName: "visits",
				Key: {
					visit_id: data.visit_id,
				},
				UpdateExpression: "set client_mount = :cm",
				ExpressionAttributeValues: {
					":cm": client_mount,
				},
				ReturnValues: "ALL_NEW",
			};

			// ddb.send(new UpdateCommand(params)).catch((err) => {
			// 	console.error("\x1b[31m%s\x1b[0m", "Error updating visits table with `client_mount` item: ", client_mount, "\n┗>AWS error:", err);
			// });
		} else {
			console.info("\x1b[35m%s\x1b[0m", 'mount-log POST(): localhost detected; not writing to DB');
		}
	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}

