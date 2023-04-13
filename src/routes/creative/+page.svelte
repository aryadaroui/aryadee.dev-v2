<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { FSPhotoViewer, Thumbnail, Photos, pannable } from 'svelte-photoviewer';
	import { onMount } from 'svelte';

	import Aplayer from "$lib/aplayer/svelte-aplayer.es.js";
	import '$lib/aplayer/style.css';
	// import Aplayer from '$lib/aplayer/Aplayer.svelte';

	
	export let data;

	let photos;
	let photos_;
	let art;
	let songs;

	let show_player = "false";



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
		artist: "aryadee / pedestrian",
		cover: "/mini-music-me.webp",
	}));


	// photoviewer needs variable called photos to handle all images
	photos = photos_.concat(art);
	// console.log(photos)

	// songs = [
	// 	{
	// 		name: "entropy",
	// 		url: "/creative/music/entropy.m4a",
	// 		artist: "aryadee",
	// 		cover: "/mini-music-me.webp"
	// 	},
	// 	{
	// 		name: "be",
	// 		url: "/creative/music/be.m4a",
	// 		artist: "aryadee",
	// 	},
	// ]

	onMount(() => {
		show_player = "true";
		// console.log(photos)
		// console.log(photos_)
		// console.log(art)
		// console.log(songs)
	});

</script>

<Header />
<main>
	<h1>Creative</h1>

	<h2>Music</h2>

	{#if show_player == "true"}
	<div>
		<Aplayer
			audio={songs}
			base_font_size="16px"
			/>
	</div>
	{/if}



	<h2>Photos</h2>
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
<!-- <div class="light-background" /> -->
<Footer line="false" />

<style lang="scss">
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
	}
</style>


