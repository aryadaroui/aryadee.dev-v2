<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';


</script>

<Header />
<main>
	<h1>Projects</h1>

	<p>Coming soon. I have so many things to reformat for this new website.</p>
	<p> If you are reading this past <strong>05 May 2023</strong>, and you're looking to access Filmic or Logica please send me an angry email Lol :').</p>
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
		max-width: 720px;
		background-color: $background-color;
		padding: 20px;
	}

	h1 {
		color: $pink-hard;
	}
</style>
