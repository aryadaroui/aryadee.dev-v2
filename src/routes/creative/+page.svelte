<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	import { FSPhotoViewer, Thumbnail, Photos, pannable } from 'svelte-photoviewer';
	export let data;

	let photos = data.photo_names.map((x) => ({
		src: `/photos/${x}`,
		thumbnail: `/photos/thumbnails/${x}`,
		key: x,
	}));
</script>

<Header />
<main>
	<h1>Creative</h1>

	<h2>Photos</h2>
	<FSPhotoViewer {photos} />
	<ul>
		{#each photos as p}
			<li>
				<Thumbnail key={p.key}>
					<img src={p.thumbnail} alt={p.key} />
				</Thumbnail>
			</li>
		{/each}
		<li />
	</ul>

	<h2>Art</h2>

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
