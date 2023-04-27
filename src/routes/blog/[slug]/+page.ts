import { error } from '@sveltejs/kit';

function getParentDirectory(path) {
	const regex = /.*\/(.+)\//;
	const match = regex.exec(path);
	return match ? match[1] : null;
}

export async function load({ params }) {
	/* Blog post routing and namespace handling
	1. Try to load post posts/[slug].svx
	2. If that fails, try to load posts/[slug]/[slug].svx
	3. If that fails, try to load posts/[any]/[slug].svx\

	Posts beyond the first level of nesting are not supported. We specifically only look for .svx files in the posts directory and immediate subdirectories.

	In the case of multiple posts with the same filename [slug], the order of precedence matches the routing above:
	1. posts/[slug].svx
	2. posts/[slug]/[slug].svx
	3. posts/[any]/[slug].svx
		- where [any] is any directory that contains [slug].svx
		- this is where name collisions are possible and will throw 500 error

	It's best practice to just try to avoid name collisions in naming posts.
	*/
	let post;
	try {
		post = await import(`../../../posts/${params.slug}.svx`);
	} catch (e) {
		try {
			post = await import(`../../../posts/${params.slug}/${params.slug}.svx`);
		} catch (e) {
			const post_paths = Object.keys(import.meta.glob('../../../posts/**/*.svx', { eager: true })); // .svx in post folder and immediate subfolders
			const matches = post_paths.filter(s => s.includes(`${params.slug}.svx`));
			if (matches.length == 0) {
				throw error(404, 'Page not found');
			} else if (matches.length > 1) {
				console.error("\x1b[31m%s\x1b[0m", "Name collision for post files:");
				console.error("More than one match for post: ", matches);
				throw error(500, "Internal error -- more than one match for post ID");
			}
			post = await import(`../../../posts/${getParentDirectory(matches[0])}/${params.slug}.svx`);
		}
	}

	try {
		const { title, date, tags } = post.metadata;
		const content = post.default;
		return { title, date, content, tags };
	} catch (e) {
		console.error("\x1b[31m%s\x1b[0m", "Error loading post metadata:");
		console.error(e);
		throw error(500, "Internal error -- failed to load post metadata");
	}
}
