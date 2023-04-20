<script>
	import PostBox2 from '$lib/PostBox2.svelte';
	import ImgCap from '$lib/ImgCap.svelte';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import PostCard from '$lib/PostCard.svelte';

	export let data;
	let posts = data.posts;

	// console.log(posts);
</script>

<title>blog - aryadee</title>

<Header />
<main>
	<h1>Blog</h1>
	<p>Articles, documents, and other random snippets.</p>

	<h2>Posts</h2>
	<div class="post-container">
		{#each posts as post}
			<PostCard
				title={post.title}
				tags={post.tags}
				img_src={post.thumbnail}
				link={'/blog/' + post.slug}
				alt={'thumbnail of post'}
			/>
		{/each}
	</div>

	<h2>Academic documents</h2>
	<h3>Papers</h3>
	<!-- maybe make post cards for these? -->
	<ul>
		<li>
			<a href="/blog/documents/thesis daroui.pdf">Modeling a multi-core checkerboard SoC with C++ SystemC.pdf</a>, my MS thesis
		</li>
		<li>
			<a href="/blog/documents/iess paper.pdf">Demonstrating scalability of the checkerboard GPC with SystemC TLM.pdf</a>,
			publication with UCI CECS Lab.
		</li>
		<li>
			<a href="/blog/documents/shark paper.pdf">Classification of shark behaviors using accelerometer signals and KNN.pdf</a>,
			collaborated, edited, and typeset.
		</li>
	</ul>

	<h3>Signal and data processing reports</h3>
	<ul>
		<li><a href="/blog/documents/smart upres.pdf">Super sampling neural network slideshow.pdf</a></li>
		<li><a href="/blog/documents/classification cnn.pdf">Simple image classification neural network report.pdf</a></li>
		<li><a href="/blog/indexing.pdf">Indexing with MapReduce report.pdf</a></li>
		<!-- <li><a href="/nerd-stuff/thesis.pdf">image skeletonization with Lantuéjoul's method example.pdf</a></li> -->
		<li><a href="/blog/documents/synthboy.pdf">Digital synthesizer on Logic Pro using C++ and JUCE report.pdf</a></li>
	</ul>

	<h3>Teaching</h3>
	<h4>Control systems lab prompts</h4>
	<ul>
		<li><a href="/blog/documents/lab 2.pdf">Lab 2: intro to LabVIEW.pdf</a></li>
		<li><a href="/blog/documents/lab 3.pdf">Lab 3: intro to Simulink.pdf</a></li>
		<li><a href="/blog/documents/lab 5.pdf">Lab 5: op-amp systems.pdf</a></li>
		<li><a href="/blog/documents/lab 7.pdf">Lab 7: harmonic oscillator.pdf</a></li>
	</ul>
	<p style="font-size: 0.8em; padding-left: 40px">
		If you'd like the other lab prompts, please contact me; they contain material I cannot share publicly.
	</p>

	<h4>Other</h4>
	<ul>
		<li><a href="/blog/documents/how to write lab reports.pdf">How to write lab reports.pdf</a></li>
		<li><a href="/blog/documents/ray tracing.pdf">Ray tracing diagrams.pdf</a></li>
		<li><a href="/blog/documents/fourier series example.pdf">Fourier series example.pdf</a></li>
	</ul>
</main>
<div class="light-background" />

<Footer line="false" />

<style lang="scss">
	body {
		background-color: $gray-mid;
	}

	main {
		// font-size: 1.25em;
		margin: auto;
		max-width: 1080px;
		background-color: $gray-mid;
		padding: 20px;
	}

	.post-container {
		display: flex;
		flex-direction: row;
		gap: 1em;
		flex-wrap: wrap;
		justify-content: center;
	}

	div.light-background {
		background-color: $gray-mid;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		position: fixed;
		top: 0;
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

	h4 {
		color: $tan-hard;
		padding-left: 30px;
		font-weight: 500;
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
		background-color: rgba($link-background, 0.6);
		color: $cyan-soft;
		// color: $cyan-hard;
		// color: $ink-color;
		padding: 0.2rem;
		margin: -0.2rem;
		// color: $tan-mid;
		// transition: background-color 0.15s ease, color 0.15s ease;
	}

	ul {
		list-style-type: circle;
		line-height: 1.6em;
		li {
			margin-bottom: 1em;
		}
	}
</style>
