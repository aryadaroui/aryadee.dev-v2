
import { error } from '@sveltejs/kit';

// async function get_thumbnail() {

// }

export async function load() {
	// error handling for imported file
	// TODO: check to see if route exists, to throw 404 or 500
	const post_paths = import.meta.glob('../../posts/**/*.svx'); // .svx in post folder and immediate subfolders
	try {
		const posts = [];
		let slug;
		let metadata;
		let is_valid_post;
		// let thumbnail;
		for (const post_path in post_paths) {
			is_valid_post = true;
			slug = post_path.split('/').pop().split('.').shift();
			// thumbnail = '/blog/thumbnails/' + slug + '.webp';
			
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

					if (is_valid_post) {
						posts.push({
							post_path: post_path,
							slug: slug,
							title: metadata.title,
							tags: metadata.tags,
							date: new Date(metadata.date),
						});
					}
				} else {
					console.error("http error", 500, ': metadata is missing or null in post: ' + post_path.split('/').pop());
				}
			});
		}

		// sort posts by date
		posts.sort((a, b) => {
			return b.date - a.date;
		});

		return { posts };
	} catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}
