<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import PhotoSwipeGallery from 'svelte-photoswipe';
	import type { GalleryData } from 'svelte-photoswipe';

	import '../../styles/aplayer.css';
	import photo_image_sizes from './assets/photos/photos_image_sizes.json';
	import art_image_sizes from './assets/art/art_image_sizes.json';

	/** adds tab index to <img> tags in <a> tags, making them focusable in the browser*/
	function addTabIndexToImagesInAnchors() {
		const anchors = document.querySelectorAll('a');

		anchors.forEach((anchor) => {
			const img = anchor.querySelector('img');

			if (img) {
				img.tabIndex = 0;
			}
		});
	}

	/* 
	All of this import nonsense could be put in a function, but Vite demands object literals for imports
	so you can't really reap the benefits of it.

	IMPORT all photo and art URLS, full size and thumbnail size. do it eagerly to avoid async.
	Then make the photoswipe galleries from the URLS, and the image sizes from the json file
	*/

	// Photos
	let photo_gallery: GalleryData = [];
	let photos_full = {};
	let photos_thumb = {};
	let photos = {}; // merge full and thumb together

	Object.entries(import.meta.glob('./assets/photos/*.webp', { eager: true })).map(([path, module]) => {
		photos_full[module.default.split('/').pop()] = module.default;
	});
	Object.entries(import.meta.glob('./assets/photos/thumbnails/*.webp', { eager: true })).map(([path, module]) => {
		photos_thumb[module.default.split('/').pop()] = module.default;
	});
	Object.keys(photos_full).forEach((key) => {
		photo_gallery.push({
			src: photos_full[key],
			width: photo_image_sizes[key].width,
			height: photo_image_sizes[key].height,
			cropped: true,
			thumbnail: {
				src: photos_thumb[key],
				// width: "100%",
				// height: "200px",
			},
		});
	});

	// Art
	let art_gallery: GalleryData = [];
	let art_full = {};
	let art_thumb = {};
	let art = {}; // merge full and thumb together

	Object.entries(import.meta.glob('./assets/art/*.webp', { eager: true })).map(([path, module]) => {
		art_full[module.default.split('/').pop()] = module.default;
	});
	Object.entries(import.meta.glob('./assets/art/thumbnails/*.webp', { eager: true })).map(([path, module]) => {
		art_thumb[module.default.split('/').pop()] = module.default;
	});
	Object.keys(art_full).forEach((key) => {
		art_gallery.push({
			src: art_full[key],
			width: art_image_sizes[key].width,
			height: art_image_sizes[key].height,
			cropped: true,
			thumbnail: {
				src: art_thumb[key],
				// width: "100%",
				// height: "200px",
			},
		});
	});

	// Songs
	// literally just import the song URLS to be used by aplayer
	let songs = Object.entries(import.meta.glob('./assets/music/*.m4a', { eager: true })).map(([path, module]) => ({
		name: path.split('/').pop().split('.').slice(0, -1).join('.'),
		// @ts-ignore
		url: module.default,
		artist: 'aryadee / pedestrian',
		cover: '/mini-music-me.webp',
	}));

	let aplayer;
	onMount(async () => {
		const APlayer = (await import('aplayer')).default; // dynamic client-side import

		const ap = new APlayer({
			container: aplayer,
			audio: songs,
			theme: '#FADFA3',
		});

		addTabIndexToImagesInAnchors();
	});
</script>

<title>creative - aryadee</title>

<Header />
<main id="creative">
	<h1>Creative</h1>
	<h2>Music</h2>
	<div bind:this={aplayer}/>
	<p style="font-size: 0.7em; color:gray;">I do not endorse Spiro Agnew, his speech, or the Nixon administration.</p>
	<h2>Photos</h2>
	<PhotoSwipeGallery images={photo_gallery} styling="none" />
	<h2>Art</h2>
	<PhotoSwipeGallery images={art_gallery} styling="none" />
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

	:global(div.gallery img) {
		margin: 4px;
		width: calc(50% - 12px);
		max-height: 200px;
		object-fit: cover;
		transition: all 0.8s ease, border 0.15s ease;
		border: rgba($blue-mid, 0) 1px solid;
		border-radius: 8px;
	}

	:global(div.gallery > a > img:hover) {
		max-height: 400px;
		transition: all 0.4s ease, border 0.15s ease;
		border: rgba($blue-mid, 1) 1px solid;
	}

	:global(div.gallery > a > img:focus) {
		max-height: 800px;
		transition: all 0.333s ease, border 0.15s ease;
		border: rgba($blue-hard, 1) 1px solid;
	}

	:global(div.pswp.pswp--open.pswp--ui-visible) {
		opacity: 1 !important;
	}

	:global(div.pswp.pswp--open) {
		opacity: 0 !important;
		transition: opacity 0.333s linear;
	}

	img:hover {
		cursor: pointer;
	}

	main {
		margin: auto;
		max-width: 1080px;
		background-color: $background-color;
		padding: 20px;
	}

	h1 {
		color: $pink-hard;
		font-weight: 800;
		font-size: 2em;
	}

	h2 {
		font-weight: 700;
		font-size: 1.5em;
	}

	:global(#creative) {
		:global(img) {
			animation: fadein 0.3s ease;
		}
	}

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeout {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
