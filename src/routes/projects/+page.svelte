<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';


</script>

<Header />
<main>

	<title>projects - aryadee</title>

	<h1>Projects</h1>

	<p>🚧 This is page is under construction as I update my site 🚧. You can access Filmic <a href="/projects/filmic">here</a>. If you are of the few people that know about Logica, I have not added it yet.</p>

	<code>24 Apr 2023</code>

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

	a {
		color: rgba($link-color, 0.9);
		text-decoration: none;
		border-radius: 0.4rem;
		padding: 0.2rem;
		margin: -0.2rem;
		// padding: 0.1rem;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	a:hover {
		background-color: rgba($link-background, 0.8);
		color: $cyan-soft;
		// color: $cyan-hard;
		// color: $ink-color;
		padding: 0.2rem;
		margin: -0.2rem;
		// color: $tan-mid;
		// transition: background-color 0.15s ease, color 0.15s ease;
	}
</style>
