<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	import { FSPhotoViewer, Thumbnail, Photos, pannable } from 'svelte-photoviewer';





	let unsplash = [
		{
			id: '8YdGi6rC6Z0',
			w: 2400,
			h: 3000,
		},
		{
			id: 'Jqa53u4Q2g4',
			w: 2400,
			h: 1600,
		},
		{
			id: 'c6M7AoevSXE',
			w: 2400,
			h: 1600,
		},
		{
			id: 'qCn0kU9M_uk',
			w: 2400,
			h: 1490,
		},
		{
			id: 'p3OzJuT_Dks',
			w: 2400,
			h: 1600,
		},
		{
			id: 'zv3ckJKftC4',
			w: 2400,
			h: 3200,
		},
	];
	let photos = unsplash.map((x) => ({
		src: `https://source.unsplash.com/${x.id}/${x.w}x${x.h}`,
		thumbnail: `https://source.unsplash.com/${x.id}/${x.w}x${x.h}`,
		key: x.id,
		// ratio: x.w / x.h,
	}));
</script>

<Header />
<main>
	<h1>Creative</h1>

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
