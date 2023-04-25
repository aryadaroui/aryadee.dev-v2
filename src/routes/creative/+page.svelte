<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import '../../styles/aplayer.css';

	import PhotoSwipeGallery from 'svelte-photoswipe';
	import type { GalleryItem, GalleryData } from 'svelte-photoswipe';

	function addTabIndexToImagesInAnchors() {
		const anchors = document.querySelectorAll('a');

		anchors.forEach((anchor) => {
			const img = anchor.querySelector('img');

			if (img) {
				img.tabIndex = 0;
			}
		});
	}

	let photo_gallery: GalleryData = [];
	let art_gallery: GalleryData = [];

	let photos_full = Object.entries(import.meta.glob('./assets/photos/*.webp', { eager: true })).map(([path, module]) => ({
		path, //@ts-ignore
		url: module.default,
	}));

	let photos_thumb = Object.entries(import.meta.glob('./assets/photos/thumbnails/*.webp', { eager: true })).map(
		([path, module]) => ({
			path, //@ts-ignore
			url: module.default,
		}),
	);

	let songs = Object.entries(import.meta.glob('./assets/music/*.m4a', { eager: true })).map(([path, module]) => ({
		name: path.split('/').pop().split('.').slice(0, -1).join('.'),
		// @ts-ignore
		url: module.default,
		artist: 'aryadee / pedestrian',
		cover: '/mini-music-me.webp',
	}));

	let photos = photos_full.map((photo, i) => ({
		url: photo.url,
		thumbnail_url: photos_thumb[i].url, // lists are alphabetical, so this works, but not the most robust
		key: photo.url.split('/').pop(),
	}));

	photos.forEach((photo) => {
		photo_gallery.push({
			src: photo.url,
			width: 3000,
			height: 3000,
			cropped: true,
			thumbnail: {
				src: photo.thumbnail_url,
				// width: "100%",
				// height: "200px",
			},
		});
	});

	let art_full = Object.entries(import.meta.glob('./assets/art/*.webp', { eager: true })).map(([path, module]) => ({
		path, //@ts-ignore
		url: module.default,
	}));

	let art_thumb = Object.entries(import.meta.glob('./assets/art/thumbnails/*.webp', { eager: true })).map(([path, module]) => ({
		path, //@ts-ignore
		url: module.default,
	}));

	let art = art_full.map((art, i) => ({
		url: art.url,
		thumbnail_url: art_thumb[i].url, // lists are alphabetical, so this works, but not the most robust
		key: art.url.split('/').pop(),
	}));

	art.forEach((art) => {
		art_gallery.push({
			src: art.url,
			width: 1500,
			height: 1500,
			cropped: true,
			thumbnail: {
				src: art.thumbnail_url,
				// width: '48%',
				// height: '200px',
			},
		});
	});

	onMount(async () => {
		const APlayer = (await import('aplayer')).default; // dynamic client-side import

		const ap = new APlayer({
			container: document.getElementById('aplayer'),
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
	<div id="aplayer" />
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
