
import { error } from '@sveltejs/kit';

// import fs from 'fs';

// import imgurl from './photos/aerial.webp';

export async function load() {
	try {
		const photos = import.meta.glob('/static/creative/photos/*.webp');
		const photo_names = [];
		let photo_name: string;

		for (const photo in photos) {
			photos[photo]().then(({ default: photo}) => {
				// get file name from path
				photo_name = photo.split('/').pop()
				photo_names.push(photo_name);
			});
		}

		const art = import.meta.glob('/static/creative/art/*.webp');
		const art_names = [];
		let art_name: string;

		for (const art_piece in art) {
			art[art_piece]().then(({ default: art_piece}) => {
				// get file name from path
				art_name = art_piece.split('/').pop()
				art_names.push(art_name);
			});
		}


		// console.log(photo_names, art_names);
		return { photo_names, art_names };
	}
	catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}
