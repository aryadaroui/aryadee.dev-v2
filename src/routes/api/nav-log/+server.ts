import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, VISIT_HASH_KEY } from '$env/static/private';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

import { minute_hash_absolute } from '$lib/utils';

const client = new DynamoDBClient({
	region: 'us-west-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

const ddb = DynamoDBDocumentClient.from(client);

type IncomingData = {
	visit_id: string;
	page: string;
};

export async function POST({ request, url }) {
	const origin = request.headers.get("Origin");
	const token = request.headers.get("token");

	// this is less about security and more about preventing possible spam as this endpoint only exists for pushing logs
	// technically, these could be 401s but I don't need to give away info about this endpoint. it's for my use only
	if (!token) {
		console.warn('api/nav-log POST missing auth token:', token);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	}
	if (origin != url.origin) { // don't need the else but it looks better this way
		console.warn('api/nav-log POST got invalid origin:', origin);
		return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
	}

	request.json().then(async (data: IncomingData) => {
		const new_page = {
			page: data.page,
			timestamp: new Date().toISOString()
		};


		try {
			const item = (await ddb.send(new GetCommand({ TableName: 'visits', Key: { 'visit_id': data.visit_id, }, }))).Item;

			if (!item) {
				console.warn('api/nav-log POST invalid visit_id:', data.visit_id);
				return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
			}

			const initial_timestamp = item.timestamp;

			const hash = minute_hash_absolute(VISIT_HASH_KEY, new Date(initial_timestamp));


			if (hash !== token) {
				console.warn('api/nav-log POST() got invalid auth token:', token, "\n┗>against expected hash token:", hash, "\n┗>for visit_id:", data.visit_id);

				return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 });
			}

		} catch (err) {

			console.warn("\x1b[31m%s\x1b[0m", " api/nav-log POST() got error validating token:", token, "\n┗>on primary key `visit_id`:", data.visit_id, "\n┗>Error info:", err);
			return new Response(JSON.stringify({ message: "forbidden" }), { status: 403 }); // assume forbidden rather than internal server error
		}


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

		ddb.send(new UpdateCommand(params)).catch(err => {
			console.error("\x1b[31m%s\x1b[0m", "Error updating visits table when appending `pages` with `new_page` item:", new_page, "\n┗>on primary key `visit_id`:", data.visit_id, "\n┗>AWS error:", err);
		});

	});

	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
};