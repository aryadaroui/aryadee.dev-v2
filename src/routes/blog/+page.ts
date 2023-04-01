
import { error } from '@sveltejs/kit';

export async function load() {
	// error handling for imported file
	// TODO: check to see if route exists, to throw 404 or 500
	try {
		// const post_paths = import.meta.glob('../../../posts/*.svx');
		const post_paths = import.meta.glob('../../posts/*.svx');

		// slug: post_path.split('/').pop().split('.').shift(),

		const posts = [];
		for (const post_path in post_paths) {
			post_paths[post_path]().then((post) => {
				// debugger;
				if (Object.prototype.hasOwnProperty.call(post, "metadata")) {
					posts.push({
						post_path: post_path,
						title: post.metadata.title,
						tags: post.metadata.tags,
					});
				}
			});
		}


		return { posts };
	} catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}
