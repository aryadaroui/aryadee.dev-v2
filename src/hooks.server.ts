import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';

import { UAParser } from 'ua-parser-js';


interface Visit {
	device: { // { vendor: 'Apple', model: 'iPhone', type: 'mobile' }
		vendor: string;
		model: string;
		type: string;
	};
	browser: string;
	os: string;
	referrer: string;
	page: string;
	ip_address: string;
	timestamp: string; // ISO 8601 format - sort key for DB
	visit_id: string; // primary key for DB
}

function dir_and_slug(url_string: string) {
	const url = new URL(url_string);
	const pathname = url.pathname;
	const pathParts = pathname.split('/');
	const directory = pathParts[1];
	const pageSlug = pathParts[2];
	return { directory, pageSlug };
}

/**Gives the path of a URL only, i.e. removes the domain. `apple.com/product` -> `/product`*/
function path_only(url_string: string) {
	return url_string.replace(/^.*\/\/[^\/]+/, '')
}

export async function handle({ event, resolve }) {



	if (dir_and_slug(event.request.url).directory !== 'api') { // normal page visit
		const user_agent = new UAParser(event.request.headers.get('user-agent'));
		const device = user_agent.getDevice();
		if (device.type === undefined) device.type = 'desktop'; // assume desktop if not specified

		const visit: Visit = {
			device: device,
			browser: user_agent.getBrowser().name,
			os: user_agent.getOS().name,
			referrer: event.request.headers.get('referer'),
			page: path_only(event.request.url),
			ip_address: event.getClientAddress(),
			timestamp: new Date().toISOString(),
			visit_id: uuid(),
		};

		console.log('hooks handle page got data:', visit);

		if (visit.ip_address !== "::1") {

			// write to DB table visits
			// const dynamoDB = new DynamoDB({region: 'us-west-1'});
		}
		else {
			console.info("\x1b[35m%s\x1b[0m", 'hooks handle: localhost detected; not writing to DB');
		}
		event.locals.timestamp = visit.timestamp;
		event.locals.visit_id = visit.visit_id;
		event.locals.ip_address = visit.ip_address;
	} else {// api call
		// you might be tempted to populate event.locals to validate the API, but don't.
		// each time handle() is called is a new instance, so your uuid and timestamp will be different. although you could maybe use the IP
	}

	const response = await resolve(event);
	return response;
}