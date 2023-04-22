import { error } from '@sveltejs/kit';

export async function load({ params, page }) {
	// error handling for imported file
	// TODO: check to see if route exists, to throw 404 or 500

	let post;
	try {
		post = await import(`../../../posts/${params.slug}.svx`);
	} catch (e) {
		// console.error(e);
		// throw error(404, 'Page not found');
		try {
			post = await import(`../../../posts/${params.slug}/${params.slug}.svx`);
		} catch (e) {
			// console.error("\x1b[31m%s\x1b[0m", "Error loading post:");
			// console.error(e);
			throw error(404, 'Page not found');
		}
	}

	try {
		const { title, date, tags } = post.metadata;
		const content = post.default;
		return { title, date, content, tags };
	} catch (e) {
		// technically this is a server error, but we'll treat it as a 404
		// because the file exists but doesn't have the right metadata
		// we'll just log the error to the console
		console.error("\x1b[31m%s\x1b[0m", "Error loading post metadata:");
		console.error(e);
		throw error(404, "Page not found");

	}
}
