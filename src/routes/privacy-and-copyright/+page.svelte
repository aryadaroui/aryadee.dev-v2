<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<Header />
<main>
	<title>privacy and copyright - aryadee</title>

	<h1>Privacy and copyright</h1>

	<p><code>13 Apr 2023</code></p>
	<p>These terms are subject to change.</p>

	<h2>Privacy</h2>

	<p>
		When you select an image to edit in Filmic, it is edited <strong>locally</strong>; it does not upload the image to my
		server(s)!
	</p>

	<p>
		This website and Filmic Desktop may log basic user analytics like IP, platform, and browser. I do not share or release this
		data.
	</p>

	<p>
		Filmic does not share your data without your explicit, active consent, e.g. you uploading a custom preset to share publicly.
	</p>

	<h2>Copyright</h2>

	<h3>Website and blog</h3>

	<p>
		<u>Unless otherwise stated</u>, my code shared on this website is available to you under the
		<a href="https://opensource.org/licenses/MIT">MIT License</a>. Attribution is appreciated, but not necessary.
	</p>

	<p>
		<u>Unless otherwise stated</u>, images and audio content shared on this website belong to me, and you may not (i.e., you
		are not allowed to) redistribute them in any manner. You may download them for local, personal use, like for a desktop
		wallpaper or to test against code examples from my blog.
	</p>

	<p>
		<u>Unless otherwise stated</u>, written content is allowed to be reworked and reused. Attribution is appreciated, but
		not necesarry
	</p>

	<h3>Filmic</h3>

	<p>
		What you make with Filmic belongs to you and is your responsibility. I bear no responsibility or ownership for content you
		create and export with Filmic. Attributing Filmic is appreciated, but not necessary.
	</p>

	<h2>Contact</h2>

	<p>
		If you need permissions beyond what is described here, <a href="mailto: adaroui@uci.edu">email me</a>. I respond quickly and
		I am nice :-).
	</p>

	<p>
		I would also love to hear about it if you do use code snippets, if you've found something helpful, or if you have general
		comments or questions.
	</p>
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

	main {
		// font-size: 1.25em;
		margin: auto;
		max-width: 720px;
		background-color: $background-color;
		padding: 20px;
		line-height: 1.5;
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

	h1 {
		color: $pink-hard;
		// padding-left: 0em;
		font-weight: 800;
		font-size: 2em;
	}

	h2 {
		color: $pink-mid;
		padding-left: 10px;
		font-weight: 700;
		font-size: 1.5em;
	}

	h3 {
		color: $pink-soft;
		padding-left: 20px;
		font-weight: 600;
	}
</style>
