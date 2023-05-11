import { origin_allowlist } from "../origin_allowlist.json";
import { PUBLIC_LOG_TOKEN, PUBLIC_DEV_FLAG } from "$env/static/public";
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from '@aws-sdk/util-dynamodb';


// const MARSHALL_OPTS = {
// 	convertClassInstanceToMap: true,
// 	convertEmptyValues: false, // converts empty strings, binary buffers, and sets to `null`
// 	removeUndefinedValues: true // removes undefined values from final object
// };

const client = new DynamoDBClient({
	region: 'us-west-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

const ddb = DynamoDBDocumentClient.from(client);




export async function POST({ request }) {

	const origin = request.headers.get("Origin");
	const token = request.headers.get("Authorization");

	// this is less about security and more about preventing possible spam as this endpoint only exists for pushing logs
	// technically, these could be 401s but I don't need to give away info about this endpoint. it's for my use only
	if (!token) {
		console.warn('api/mount-log POST missing auth token: ', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	} else if (token !== PUBLIC_LOG_TOKEN) {
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
			// visit_id: data.visit_id,
		};
		
		if (PUBLIC_DEV_FLAG) {
			// console.log('api/mount-log POST got client_mount:', client_mount);
			// write to DB visits table with primary key of visit_id, add new key client_mount IFF visit_id exists

			// ddb.putItem({
			// 	TableName: 'visits',
			// 	Item: marshall(client_mount, MARSHALL_OPTS),
			// 	ConditionExpression: 'attribute_exists(visit_id)',
			// }).catch((err) => {
			// 	console.error("Error updating visits table with `client_mount` item: ", client_mount, "\n┗>AWS error:", err);
			// });

			// console.log('api/mount-log POST() called');
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
		} else {
			console.info("\x1b[35m%s\x1b[0m", 'mount-log POST(): localhost detected; not writing to DB');
		}
	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}

