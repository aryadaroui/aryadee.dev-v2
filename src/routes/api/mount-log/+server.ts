import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, VISIT_HASH_KEY } from '$env/static/private';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";


import { minute_hash } from '$lib/utils';


const client = new DynamoDBClient({
	region: 'us-west-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

const ddb = DynamoDBDocumentClient.from(client);

type IncomingData = {
	fingerprint: string,
	confidence: number,
	visit_id: string,
};


export async function POST({ request, url }) {

	const origin = request.headers.get("Origin");
	const token = request.headers.get("token");

	const hashes = [
		minute_hash(VISIT_HASH_KEY, 0), // 0 is the current minute
		minute_hash(VISIT_HASH_KEY, -1), // -1 is the previous minute
	];

	// this is less about security and more about preventing possible spam as this endpoint only exists for pushing logs
	// technically, these could be 401s but I don't need to give away info about this endpoint. it's for my use only
	if (!token) {
		console.warn('api/mount-log POST() missing auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (!hashes.includes(token)) {
		console.warn('api/mount-log POST() got invalid auth token: ', token, "\n┗>with possible hash tokens:", hashes);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (origin !== url.origin) { // don't need the else but it looks better this way
		console.warn('api/mount-log POST() got invalid origin: ', origin);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	}

	request.json().then((data: IncomingData) => {
		const client_mount = {
			fingerprint: data.fingerprint,
			confidence: data.confidence,
		};

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

		ddb.send(new UpdateCommand(params)).catch((err) => {
			console.error("\x1b[31m%s\x1b[0m", "Error updating visits table with `client_mount` item: ", client_mount, "\n┗>AWS error:", err);
		});

	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}

