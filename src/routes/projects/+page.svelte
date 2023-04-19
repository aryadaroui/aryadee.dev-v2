<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';


</script>

<Header />
<main>

	<title>projects - aryadee</title>

	<h1>Projects</h1>

	<p>Coming soon. I just updated my blog for better automation, but I still have to reformat project markup.</p>
	<p> If you are reading this past <strong>05 May 2023</strong>, and you're trying to access Filmic or Logica please send me an angry email Lol :').</p>
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
	}
</style>
