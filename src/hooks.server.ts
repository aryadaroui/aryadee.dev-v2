import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';

import { UAParser } from 'ua-parser-js';


interface Visit {
	device: {
		vendor: string;
		model: string;
		type: string;
	};
	browser: string;
	os: string;
	referrer: string;
	ip_address: string;
	timestamp: string; // ISO 8601 format - sort key for DB
	visit_id: string; // primary key for DB
}

export async function handle({ event, resolve }) {
	const user_agent = new UAParser(event.request.headers.get('user-agent'));
	const device = user_agent.getDevice();
	if (device.type === undefined) device.type = 'desktop'; // assume desktop if not specified

	const visit = {
		device: device,
		browser: user_agent.getBrowser().name,
		os: event.request.headers.get('sec-ch-ua-platform'),
		referrer: event.request.headers.get('referer'),
		ip_address: event.getClientAddress(),
		timestamp: new Date().toISOString(),
		visit_id: uuid(),
	} satisfies Visit;




	// write to DB table visits

	// const dynamoDB = new DynamoDB({region: 'us-west-1'});


	event.locals.ip_address = visit.ip_address;
	event.locals.timestamp = visit.timestamp;
	event.locals.visit_id = visit.visit_id;
	const response = await resolve(event);
	return response;
}