<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	import { FSPhotoViewer, Thumbnail, Photos, pannable } from 'svelte-photoviewer';
	export let data;

	let photos_ = data.photo_names.map((x) => ({
		src: `/creative/photos/${x}`,
		thumbnail: `/creative/photos/thumbnails/${x}`,
		key: x,
	}));

	let art = data.art_names.map((x) => ({
		src: `/creative/art/${x}`,
		thumbnail: `/creative/art/thumbnails/${x}`,
		key: x,
	}));

	// photoviewer needs variable called photos to handle all images
	let photos = photos_.concat(art);
</script>

<Header />
<main>
	<h1>Creative</h1>

	<h2>Music</h2>

	<audio src="/creative/music/entropy.m4a" controls></audio>
	
	<!-- <li><a href="/creative/music/entropy.m4a">entropy</a></li>
	<li><a href="/creative/music/be.m4a">be</a></li>
	<li><a href="/creative/music/waves.m4a">waves</a></li>
	<li><a href="/creative/music/demo excerpt 1.m4a">demo 1</a></li>
	<li><a href="/creative/music/demo excerpt 2.m4a">demo 2</a></li>
	<li><a href="/creative/music/strangers.m4a">strangers</a></li>
	<li><a href="/creative/music/impudent snob.m4a">impudent snob</a></li> -->

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
