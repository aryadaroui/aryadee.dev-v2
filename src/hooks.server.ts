import { v4 as uuid } from 'uuid';


// interface Visitor {
// 	ip: {
// 		ip_address: string;
// 		isp: string;
// 		mobile: boolean;
// 		proxy: boolean;
// 		geo: {
// 			continent: string;
// 			country: string;
// 			region_name: string;
// 			city: string;
// 			district: string;
// 			zip: string;
// 			lat: number;
// 			lon: number;
// 		};
// 	};
// 	referrer: string;
// 	fingerprint: string;
// 	timestamp: string; // ISO 8601 format - sort key for DB
// 	visit_uuid: string // primary key for DB
// }

export async function handle({ event, resolve }) {
	const ip_address = event.getClientAddress();
	const timestamp = new Date().toISOString();
	const referrer = event.request.headers.get('referer');
	const visit_id = uuid();

	// write to DB table Visits

	event.locals.ip_address = ip_address;
	event.locals.timestamp = timestamp;
	event.locals.visit_id = visit_id;

	const response = await resolve(event);
	return response;
}