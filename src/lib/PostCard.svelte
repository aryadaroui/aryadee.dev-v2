<script lang="ts">
	export let title: string;
	export let tags: string[];

	export let link: string;
	// export let thumbnail: string;
	export let alt: string;
	export let img_src: string;

	const langs = [
		'Python',
		'TypeScript',
		'JavaScript',
		'C',
		'C++',
		'Rust',
		'HTML',
		'CSS',
		'Markdown',
		'LaTeX',
		'BibTeX',
		'TeX',
		'Git',
	];
	const tools = [
		'NumPy',
		'Pandas',
		'SciKit',
		'OpenCV',
		'Plotly',
		'Rich',
		'Svelte',
		'SvelteKit',
		'D3.js',
		'Three.js',
		'WebGL',
		'SystemC',
		'Boost',
		'Tauri',
		'Rayon',
		'Git',
		'VS Code',
		'Jupyter',
	];
	const domains = [
		'signal processing',
		'image processing',
		'audio processing',
		'n-D data',
		'data analysis',
		'data visualization',
		'machine learning',
		'parallelization',
		'embedded systems',
		'modeling',
		'frontend',
		'graphics',
	];

	let lang_tags = tags.filter((tag) => langs.includes(tag));
	let tool_tags = tags.filter((tag) => tools.includes(tag));
	let domain_tags = tags.filter((tag) => domains.includes(tag));
</script>

<a href={link} id="post-card">
	<div class="thumbnail-container">
		<img class="thumbnail" src={img_src} {alt} />
	</div>
	<div class="content">
		<div class="title">
			<h2>{title}</h2>
		</div>
		<div class="tags">
			{#each lang_tags as tag}
				<span class="tag lang">{tag}</span>
			{/each}
			{#each tool_tags as tag}
				<span class="tag tool">{tag}</span>
			{/each}
			{#each domain_tags as tag}
				<span class="tag domain">{tag}</span>
			{/each}
		</div>
	</div>
</a>

<style lang="scss">
	h2 {
		font-weight: 200;
		margin: 0;
		font-size: 1.2em;
	}

	.thumbnail {
		object-fit: cover;
		transform: scale(1.1);
		width: 100%;
		height: 100%;
		image-rendering: smooth;
	}

	#post-card {
		display: flex;
		justify-content: space-between;
		min-height: 100px;
		min-width: 300px;
		max-width: 300px;
		max-height: 400px;
		gap: 0;
		flex-direction: column;
		text-decoration: none;
		color: $link-color;

		// backdrop-filter: blur(27px);

		font-family: $sans;

		border-radius: 15px;
		border: transparentize($border-link-translucent, 1) 1px solid;
		background-color: $background-translucent;
		// box-shadow: 0px 5px 30px black;
		overflow: hidden;

		transition: background-color 0.15s ease, border 0.15s ease;

		// :hover h2 {
		// 	text-decoration: underline;
		// 	text-decoration-thickness: 0.01em;
		// }

		flex-grow: 1;
		flex-basis: 0;

		@media (max-width: 850px) {
			// max-width: 400px;

			flex-direction: row;
			// max-height: 300px;
			min-height: 150px;
			max-width: 100%;
			justify-content: flex-start;
		}
	}

	// a#post-card:hover {
	// 	text-decoration: none;
	// }

	.thumbnail-container {
		overflow: hidden;
		// width: 25%;
		// height: auto;
		width: auto;
		// min-height: 25%;
		height: 30%;
		@media (max-width: 850px) {
			height: auto;
			width: 25%;
		}

		// border-bottom: rgba($border-link-translucent-hover, 0.5) 1px solid;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 2;
		// flex-shrink: 2;
		padding: 15px;
		// gap: 10px;
		// height: 63%;
	}

	#post-card:hover {
		// background-image: url(./assets/arrow_gray.svg);
		background-color: rgba($cyan-soft, 0.3);
		// background-color: $link-background;

		background-size: 150px;
		background-repeat: repeat;
		border: $border-link-translucent-hover 1px solid;

		transition: background-color 0.15s ease, border 0.15s ease;

		// text-decoration: underline;
		// text-decoration-thickness: 1.5px;

		h2 {
			text-decoration: none;
			color: $cyan-soft;
		}
	}

	.tags {
		margin: 0;
		margin-top: 10px;
	}

	.tag {
		border-radius: 0.4em;
		padding: 0.3em;

		font-size: 0.72em;
		font-weight: 300;
		text-overflow: ellipsis;
		display: inline-block;
		margin: 0.4em;
		margin-left: 0;
		margin-bottom: 0;
	}

	.lang {
		background-color: $gray-soft;
		border: $brown-soft 1px solid;
		color: $tan-soft;
	}

	.tool {
		background-color: $gray-mid;
		border: $brown-mid 1px solid;
		color: $tan-mid;
	}

	.domain {
		background-color: $gray-harder;
		border: hsl(19, 20%, 25%) 1px solid; // $brown-hard but lighter
		color: $tan-hard;
	}
</style>
