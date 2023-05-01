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
	import jm_mod from './assets/jm_mod.webp';
</script>

<Header />
<main>
	<title>projects - aryadee</title>

	<h1>Projects</h1>

	<p>Source, documentation, and other stuff for my projects.</p>

	<ProjCard title="Filmic" type="Web app" img_src={filmic_thumb} link_src="/projects/filmic">
		<p>Filmic is a photo editing web app. Its desktop version is in development</p>
	</ProjCard>

	<ProjCard title="This blog" type="GitHub" img_src={blogv2_thumb} link_src="https://github.com/aryadaroui/aryadee.dev-v2">
		<p>The source for this blog, built with SvelteKit, Vite, and MDsveX.</p>
	</ProjCard>

	<ProjCard title="Old blog" type="GitHub" img_src={blogv1_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>Old version of my blog, also built with SvelteKit and Vite.</p>
	</ProjCard>

	<ProjCard
		title="SynthBoy, digital synth plugin"
		type="GitHub"
		img_src={synthboy_thumb}
		link_src="https://github.com/aryadaroui/synthboy">
		<p>Simple digital synthesizer VST. Can be used as a plugin in common DAWs.</p>
	</ProjCard>

	<ProjCard title="Logica" type="GitHub" img_src={blogv1_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>A command-line, offline audio FX tool for resampling audio in rhythmic patterns.</p>
	</ProjCard>

	<ProjCard title="hud" type="GitHub" img_src={blogv1_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>A command-line tool I made to manage deadlines. It's been abandoned since I started using Obsidian MD.</p>
	</ProjCard>

	<ProjCard title="bubble dark" type="GitHub" img_src={bubble_thumb} link_src="https://github.com/aryadaroui/aryadee.dev">
		<p>My preferred color theme for Python and C</p>
	</ProjCard>

	<ProjCard
		title="Banner report"
		type="GitHub"
		img_src={banner_report_thumb}
		link_src="https://github.com/aryadaroui/banner-report">
		<p>A LaTeX template for simple reports.</p>
	</ProjCard>

	<ProjCard title="Jazzmaster mod" type="GitHub" img_src={jm_mod} link_src="https://github.com/aryadaroui/jazzmaster-mod">
		<p>PDF plan and LTspice schematic for a PBT parallel-series mod for a jazzmaster.</p>
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
