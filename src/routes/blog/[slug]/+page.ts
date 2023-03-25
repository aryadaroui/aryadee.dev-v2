import {error} from '@sveltejs/kit';

export async function load({ params }) {
	// error handling for imported file
	// TODO: check to see if route exists, to throw 404 or 500
	try {
		const post = await import(`../../../posts/${params.slug}.svx`);
		const { title, date, tags } = post.metadata;
		const content = post.default;

		return { title, date, content, tags };
	} catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}
