
import { error } from '@sveltejs/kit';

// import fs from 'fs';

// import imgurl from './photos/aerial.webp';

export async function load() {
	try {
		const photos = import.meta.glob('/static/creative/photos/*.webp', );
		const photo_names = [];
		let photo_name: string;

		const art = import.meta.glob('/static/creative/art/*.webp', );
		const art_names = [];
		let art_name: string;

		const songs = import.meta.glob('/static/creative/music/*.m4a', );
		const song_names = [];
		let song_name: string;

		for (const photo in photos) {
			await photos[photo]().then(({ default: photo }) => {
				// get file name from path
				photo_name = photo.split('/').pop();
				photo_names.push(photo_name);
			});
		}

		for (const art_piece in art) {
			await art[art_piece]().then(({ default: art_piece }) => {
				// get file name from path
				art_name = art_piece.split('/').pop();
				art_names.push(art_name);
			});
		}

		for (const song in songs) {
			await songs[song]().then(({ default: song }) => {
				// get file name from path
				song_name = song.split('/').pop();
				song_names.push(song_name);
			});
		}


		return { photo_names, art_names, song_names };
	}
	catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
}

// export const prerender = true;
