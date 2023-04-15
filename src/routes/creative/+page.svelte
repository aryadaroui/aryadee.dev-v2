<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { FSPhotoViewer, Thumbnail, Photos, pannable } from 'svelte-photoviewer';
	import { onMount } from 'svelte';
	import '../../styles/aplayer.css';

	export let data;

	let photos;
	let photos_;
	let art;
	let songs;

	photos_ = data.photo_names.map((x) => ({
		src: `/creative/photos/${x}`,
		thumbnail: `/creative/photos/thumbnails/${x}`,
		key: x,
	}));

	art = data.art_names.map((x) => ({
		src: `/creative/art/${x}`,
		thumbnail: `/creative/art/thumbnails/${x}`,
		key: x,
	}));

	songs = data.song_names.map((x) => ({
		name: x,
		url: `/creative/music/${x}`,
		artist: 'aryadee / pedestrian',
		cover: '/mini-music-me.webp',
	}));

	// photoviewer needs variable called photos to handle all images
	photos = photos_.concat(art);

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
	<p style="font-size: 0.7em;">I do not endorse Spiro Agnew, his speech, or the Nixon administration.</p>
	<div id="aplayer" />

	<h2>Photos</h2>
	<p style="font-size: 0.7em;">Use arrow keys to navigate images.</p>

	<!-- passed in array needs to be called photos. stupid -->
	<FSPhotoViewer {photos} />
	<ul>
		{#each photos_ as photo}
			<li>
				<Thumbnail key={photo.key}>
					<img src={photo.thumbnail} alt={photo.key} />
				</Thumbnail>
			</li>
		{/each}
		<li />
	</ul>

	<h2>Art</h2>
	<!-- <FSPhotoViewer {art} /> -->
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
		background-color: $background-color-light;
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
		background-color: $background-color-light;
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
