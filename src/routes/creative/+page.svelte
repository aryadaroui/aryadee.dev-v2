<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { FSPhotoViewer, Thumbnail, Photos, pannable } from 'svelte-photoviewer';
	import { onMount } from 'svelte';
	import '../../styles/aplayer.css';

	import test_pic from './assets/photos/TEST.webp';

	const photo_names = import.meta.glob('./assets/photos/*.webp');
	const art_names = import.meta.glob('./assets/art/*.webp');
	const song_names = import.meta.glob('./assets/music/*.m4a');

	console.log('photo_names: ', photo_names);

	// export let data;

	let imgs;

	let photos;
	let art;
	let songs;

	photos = Object.keys(photo_names).map((x) => {
		let key = x.split('/').pop();
		return {
			src: `/src/routes/creative/assets/photos/${key}`,
			thumbnail: `/src/routes/creative/assets/photos/thumbnails/${key}`,
			key: key,
		};
	});

	art = Object.keys(art_names).map((x) => {
		let key = x.split('/').pop();
		return {
			src: `/src/routes/creative/assets/art/${key}`,
			thumbnail: `/src/routes/creative/assets/art/thumbnails/${key}`,
			key: key,
		};
	});

	songs = Object.keys(song_names).map((x) => {
		let key = x.split('/').pop();
		return {
			name: key,
			url: `/src/routes/creative/assets/music/${key}`,
			artist: 'aryadee / pedestrian',
			cover: '/mini-music-me.webp',
		};
	});

	console.log('photos', photos);

	// photos = data.photo_names.map((x) => ({
	// 	src: `./assets/photos/${x}`,
	// 	thumbnail: `./assets/photos/thumbnails/${x}`,
	// 	key: x,
	// }));

	// art = data.art_names.map((x) => ({
	// 	src: `./assets/art/${x}`,
	// 	thumbnail: `./assets/art/thumbnails/${x}`,
	// 	key: x,
	// }));

	// songs = data.song_names.map((x) => ({
	// 	name: x,
	// 	url: `./assets/music/${x}`,
	// 	artist: 'aryadee / pedestrian',
	// 	cover: '/mini-music-me.webp',
	// }));

	// photoviewer needs variable called photos to handle all images
	imgs = photos.concat(art);

	onMount(async () => {
		const APlayer = (await import('aplayer')).default; // dynamic client-side import

		const ap = new APlayer({
			container: document.getElementById('aplayer'),
			audio: songs,
			theme: '#FADFA3',
		});
	});
</script>

<title>creative - aryadee</title>

<Header />
<main>
	<h1>Creative</h1>

	<h2>Music</h2>
	<div id="aplayer" />
	<p style="font-size: 0.7em; color:gray;">I do not endorse Spiro Agnew, his speech, or the Nixon administration.</p>
	<h2>Photos</h2>
	<p style="font-size: 0.7em;">Use arrow keys to navigate images.</p>

	<!-- passed in array needs to be called photos. stupid -->
	<FSPhotoViewer photos={imgs} />
	<ul>
		{#each photos as photo}
			<li>
				<Thumbnail key={photo.key}>
					<img src={photo.thumbnail} alt={photo.key} />
				</Thumbnail>
			</li>
		{/each}
		<li />
	</ul>

	<h2>Art</h2>
	<ul>
		{#each art as art_piece}
			<li>
				<Thumbnail key={art_piece.key}>
					<img src={art_piece.thumbnail} alt={art_piece.key} />
				</Thumbnail>
			</li>
		{/each}
		<li />
	</ul>
</main>
<div class="light-background" />
<Footer line="false" />

<style lang="scss">
	div.light-background {
		background-color: $background-color;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		position: fixed;
		top: 0;
	}
	img {
		/* width: 100px; */
		max-height: 100%;
		min-width: 100%;
		display: block;
		object-fit: cover;
	}

	img:hover {
		cursor: pointer;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
	}
	li {
		flex-grow: 1;
		/* flex-basis: 0; */
		position: relative;
		height: 200px;
		display: flex;
		padding: 2px;
	}
	li:last-child {
		flex-grow: 10;
	}

	main {
		// font-size: 1.25em;
		margin: auto;
		max-width: 1080px;
		background-color: $background-color;
		padding: 20px;
	}

	h1 {
		color: $pink-hard;
		// padding-left: 0em;
		font-weight: 800;
		font-size: 2em;
	}

	h2 {
		// color: $pink-mid;
		// padding-left: 10px;
		font-weight: 700;
		font-size: 1.5em;
	}
</style>
