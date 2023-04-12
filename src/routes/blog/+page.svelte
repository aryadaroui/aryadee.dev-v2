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

<Header />
<main>
	<h1>Blog</h1>
	<p>Articles, documents, and other random snippets.</p>

	<h2>Posts</h2>
	<div class="post-container">
		{#each posts as post}
			<!-- <PostBox2
				title={post.title}
				tags={['TypeScript', 'WebGL', 'Svelte', 'image processing']}
				img_src={'filmic_thumb.png'}
				link={'/blog/' + post.slug}
				alt={'thumbnail of filmic app'} /> -->
			<PostCard
				title={post.title}
				tags={post.tags}
				img_src={'filmic_thumb.png'}
				link={'/blog/' + post.slug}
				alt={'thumbnail of filmic app'} />
		{/each}
	</div>

	<h2>Documents</h2>
	<p>Coming soon...</p>
</main>
<div class="light-background" />

<Footer line="false" />

<style lang="scss">
	body {
		background-color: $background-color-light;
	}

	main {
		// font-size: 1.25em;
		margin: auto;
		max-width: 1080px;
		background-color: $background-color-light;
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
		background-color: $background-color-light;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		position: absolute;
		top: 0;
	}

	h1 {
		color: $pink-hard;
	}

	// html {
	// 	background-color: $background-color-light;
	// }

	// body {
	// 	background-color: $background-color-light;
	// }
	// :root {
	// 	background-color: $background-color-light;
	// }
</style>
