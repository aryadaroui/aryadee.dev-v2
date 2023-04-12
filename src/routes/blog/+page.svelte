<script>
	import PostBox2 from '$lib/PostBox2.svelte';
	import ImgCap from '$lib/ImgCap.svelte';
	import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';

	export let data;
	let posts = data.posts;

	// console.log(posts);
</script>

<!-- <h1>blog</h1>

<a href="/blog/test1">1</a>
<a href="/blog/test2">2</a>

<PostBox2
	title={'Deploying a JPEG encoder on a modeled, multi-core "checkerboard" CPU'}
	tags={['C++', 'SystemC', 'embedded systems', 'parallelization', 'modeling', 'image processing']}
	img_src={'thesis_thumb.png'}
	alt={'thumbnail of thesis'}
	link={'/post1'} /> -->
<Header />
<main>
	<h1>Blog</h1>
	<p>Articles, snippets, and other random thoughts.</p>

	<!-- <pre>
		<code>
			
		</code>
	</pre> -->

	<div class="post-container">
		{#each posts as post}
			<PostBox2
				title={post.title}
				tags={['TypeScript', 'WebGL', 'Svelte', 'image processing']}
				img_src={'filmic_thumb.png'}
				link={'/blog/' + post.slug}
				alt={'thumbnail of filmic app'} />
		{/each}
	</div>
</main>
<Footer />

<style lang="scss">
	main {
		margin: auto;
		max-width: 720px;
		background-color: #332D29;
	}

	.post-container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		// flex-wrap: wrap;
		justify-content: center;
	}
	:root {
		background-color: #332D29;
	}
</style>
