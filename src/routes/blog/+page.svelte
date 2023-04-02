<script>
	import PostBox2 from '$lib/PostBox2.svelte';
	import ImgCap from '$lib/ImgCap.svelte';

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

<main>
	<p>howdy</p>

	<!-- <pre>
		<code>
			
		</code>
	</pre> -->

	{#each posts as post}
		<PostBox2
			title={post.title}
			tags={['TypeScript', 'WebGL', 'Svelte', 'image processing']}
			img_src={'filmic_thumb.png'}
			link={'/blog/' + post.slug}
			alt={'thumbnail of filmic app'} />
	{/each}

	<p>more stuff</p>
</main>

<style lang="scss">
	main {
		margin: auto;
		max-width: 1200px;
		background-color: $background-color;
	}
	:root {
		background-color: $void-color;
	}
</style>
