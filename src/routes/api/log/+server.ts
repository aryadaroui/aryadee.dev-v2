import { VITE_SECRET_DUMMY_KEY } from '$env/static/private';

export async function POST({ request, getClientAddress }) {
	const origin_white_list = [
		"https://aryadee.dev",
		"http://aryadee.dev",
		"http://localhost:5173",
		"http://localhost:4173",
		"https://aryadee-dev-v2.vercel.app"
	];
	const origin = request.headers.get("Origin");





	/* might use real token / auth later if it proves to be a problem.
	For now, will use origin whitelist and body data to verify request.
	*/
	// const token = request.headers.get("Authorization");
	// if (!token) {
	// 	return new Response(JSON.stringify({ message: "no auth" }), { status: 401 });
	// }
	// if (token !== "DUMMY TOKEN") {
	// 	return new Response(JSON.stringify({ message: "invalid auth" }), { status: 401 });
	// }

	if (!origin_white_list.includes(origin)) {
		console.error('\x1b[31m%s\x1b[0m', 'invalid origin: ', origin); // red text
		return new Response(JSON.stringify({ message: "invalid origin" }), { status: 401 });
	}

	// can't really check if this is working correctly because of localhost
	// will have to test on deployment
	console.log('\x1b[36m%s\x1b[0m', 'client IP: ', getClientAddress()); // cyan text

	try {
		console.log('\x1b[36m%s\x1b[0m', 'secret api key dummy: ', VITE_SECRET_DUMMY_KEY); // cyan text
		console.log("request body: ", await request.json());


		console.log("sending data to DB...\n\n");

	} catch (error) {
		console.error("error: ", error);
		return new Response(JSON.stringify({ message: "external error" }), { status: 401 });
	}
	return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
};