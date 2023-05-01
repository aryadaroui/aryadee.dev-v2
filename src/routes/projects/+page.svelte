<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import ProjCard from '$lib/ProjCard.svelte';

	import blogv1_thumb from './assets/blogv1.webp';
	import blogv2_thumb from './assets/blogv2.webp';
	import filmic_thumb from './assets/filmic.webp';
	import synthboy_thumb from './assets/synthboy.webp';
	import bubble_thumb from './assets/bubble.webp';
	import banner_report_thumb from './assets/banner_report.webp';
</script>

<Header />
<main>
	<title>projects - aryadee</title>

	<h1>Projects</h1>

	<ProjCard title="This blog" type="GitHub" img_src={blogv2_thumb} link_src="https://github.com/aryadaroui/aryadee.dev-v2">
		<p>This is my blog is built mostly from scratch using SvelteKit.</p>
	</ProjCard>

	<ProjCard title="Filmic" type="Web app" img_src={filmic_thumb} link_src="/projects/filmic">
		<p>Filmic is a photo editing web app. Its desktop version is in development</p>
	</ProjCard>

	<ProjCard title="Old blog" type="GitHub" img_src={blogv1_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>Old version of my blog that I built with SvelteKit. Not as good as this one, and not as automated.</p>
	</ProjCard>

	<ProjCard title="SynthBoy, digital synth plugin" type="GitHub" img_src={synthboy_thumb} link_src="https://github.com/aryadaroui/synthboy">
		<p>Digital synth</p>
	</ProjCard>

	<ProjCard title="Logica" type="GitHub" img_src={blogv1_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>a</p>
	</ProjCard>

	<ProjCard title="hud" type="GitHub" img_src={blogv1_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>a</p>
	</ProjCard>

	<ProjCard title="bubble dark" type="GitHub" img_src={bubble_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>a</p>
	</ProjCard>

	<ProjCard title="Banner report" type="GitHub" img_src={banner_report_thumb} link_src="https://github.com/aryadaroui/banner-report">
		<p>a</p>
	</ProjCard>
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
		// height: 200px;
		display: flex;
		padding: 2px;
	}
	li:last-child {
		flex-grow: 10;
	}

	main {
		// font-size: 1.25em;
		margin: auto;
		max-width: 700px;
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
