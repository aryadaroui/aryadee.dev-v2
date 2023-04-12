
import { error } from '@sveltejs/kit';

// import fs from 'fs';

// import imgurl from './photos/aerial.webp';

export async function load() {
	// error handling for imported file
	// TODO: check to see if route exists, to throw 404 or 500
	try {
		const photos = import.meta.glob('/static/photos/*.webp');
		// const photos = import.meta.glob()
		// const photos = import.meta.glob('./photos/*.webp');
		// console.log(photos);

		// const imgurl = new URL ('./photos/aerial.webp', import.meta.url).href;

		// console.log(imgurl)

		const photo_names = [];
		let photo_name: string;

		for (const photo in photos) {
			photos[photo]().then(({ default: photo}) => {
				// get file name from path
				
				photo_name = photo.split('/').pop()
				photo_names.push(photo_name);
			});
		}
		return { photo_names };
	}
	catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}
