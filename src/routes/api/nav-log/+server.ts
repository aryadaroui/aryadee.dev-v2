import { origin_allowlist } from "../origin_allowlist.json";
import { PUBLIC_LOG_TOKEN, PUBLIC_DEV_FLAG } from "$env/static/public";
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { marshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({
	region: 'us-west-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

const ddb = DynamoDBDocumentClient.from(client);

// const MARSHALL_OPTS = {
// 	convertClassInstanceToMap: true,
// 	convertEmptyValues: false, // converts empty strings, binary buffers, and sets to `null`
// 	removeUndefinedValues: true // removes undefined values from final object
// };

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
		};

		if (PUBLIC_DEV_FLAG) {
			// console.log('api/mount-log POST got new_page:', new_page);

			// console.log('api/nav-log POST() called: ');
			const params = {
				TableName: 'visits',
				Key: {
					'visit_id': data.visit_id,
				},
				UpdateExpression: 'set #pages = list_append(#pages, :new_page)',
				ExpressionAttributeNames: {
					'#pages': 'pages',
				},
				ExpressionAttributeValues: {
					':new_page': [new_page],
				},
				ReturnValues: 'ALL_NEW',
			};

			// Execute the update command
			ddb.send(new UpdateCommand(params))
				.catch(err => {
					console.error("\x1b[31m%s\x1b[0m", "Error updating visits table when appending `pages` with `new_page` item: ", new_page, "\n┗>on primary key `visit_id`:", data.visit_id, "\n┗>AWS error:", err);
				});
		} else {
			console.info("\x1b[35m%s\x1b[0m", 'nav-log POST(): localhost detected; not writing to DB');
		}
	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}