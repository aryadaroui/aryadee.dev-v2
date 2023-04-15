
import { error } from '@sveltejs/kit';

export async function load() {
	// error handling for imported file
	// TODO: check to see if route exists, to throw 404 or 500
	try {
		const post_paths = import.meta.glob('../../posts/*.svx');
		const posts = [];
		let slug;
		let metadata;
		let is_valid_post;
		for (const post_path in post_paths) {
			is_valid_post = true;
			slug = post_path.split('/').pop().split('.').shift();

			
			// skip files that start with an underscore. don't even check if valid post
			// because presumably they're still being worked on
			if (slug[0] === '_') {
				continue;
			}
			await post_paths[post_path]().then((post) => {

				//@ts-ignore
				metadata = post.metadata;
				if (Object.prototype.hasOwnProperty.call(post, "metadata")) {
					if (!('title' in metadata) || metadata.title === null) {
						console.error('title is missing or null in post: ' + post_path.split('/').pop());
						is_valid_post = false;
					}

					if (!('date' in metadata) || metadata.date === null) {
						console.error("http error", 500, ': date is missing or null in post: ' + post_path.split('/').pop());
						is_valid_post = false;
					}

					if (!('tags' in metadata) || metadata.tags === null) {
						console.error("http error", 500, ': tags is missing or null in post: ' + post_path.split('/').pop());
						is_valid_post = false;
					}

					if (!('thumbnail' in metadata) || metadata.thumbnail === null) {
						console.error("http error", 500, ': thumbnail is missing or null in post: ' + post_path.split('/').pop());
						metadata.thumbnail = '/creative/art/cogito.webp';
					}

					if (is_valid_post) {
						posts.push({
							post_path: post_path,
							slug: slug,
							title: metadata.title,
							tags: metadata.tags,
							thumbnail: metadata.thumbnail,
						});
					}
				} else {
					console.error("http error", 500, ': metadata is missing or null in post: ' + post_path.split('/').pop());
				}
			});
		}
		return { posts };
	} catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}
