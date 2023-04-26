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
	const category = ['code', 'photo', 'music', 'writing', 'workflow', 'snippet', 'project', 'app'];

	let lang_tags = tags.filter((tag) => langs.includes(tag));
	let tool_tags = tags.filter((tag) => tools.includes(tag));
	let domain_tags = tags.filter((tag) => domains.includes(tag));
	let category_tags = tags.filter((tag) => category.includes(tag));
</script>

<a href={link} id="post-card">
	<div class="thumbnail-container">
		<img class="thumbnail" src={img_src} {alt} onerror="this.src='/creative/art/cogito.webp'"/>
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
			{#each category_tags as tag}
				<span class="tag category">{tag}</span>
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
		// transform: scale(1.1);
		position: static;
		// transform-style: flat;
		// z-index: 0;
		// --webkit-transform: zoom(1.1);

		// width: auto;
		// height: auto;

		// max-width: 110%;
		// max-height: 110%;

		// border-radius: 15px 15px 0px 0px;

		width: 100%;
		height: 100%;

		// width: 110%;
		// height: 110%;
		// width: auto;
		// height: 150%;
		// image-rendering: smooth;
		animation: fadein 1s;
		// pointer-events: none;
		@media (max-width: 1040px) {
			border-radius: 15px 0px 0px 15px;

		}

	}

	.thumbnail-container {
		overflow: hidden;
		// position: relative;
		// z-index: ;
		// clip-path: content-box;
		// -webkit-clip-path: content-box;
		// -webkit-mask-image: -webkit-radial-gradient(white, black);

		// width: 25%;
		// height: auto;
		display: flex;
		justify-content: center;
		align-items: center;

		width: auto;
		// min-height: 25%;
		height: 30%;
		@media (max-width: 1040px) {
			height: auto;
			width: 25%;
		}
	}

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
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

		font-size: clamp(0.9em, 2vw, 1.2em);

		// backdrop-filter: blur(27px);

		font-family: $sans;

		border-radius: 15px;
		border: transparentize($border-link-translucent, 1) 1px solid;
		// background-color: $background-translucent;
		background-color: var(--background-color, $background-translucent);
		overflow: hidden;

		transition: background-color 0.5s ease, border 0.15s ease;

		flex-grow: 1;
		flex-basis: 0;

		@media (max-width: 1040px) {
			flex-direction: row;
			// max-height: 300px;
			min-height: 150px;
			max-width: 800px;
			justify-content: flex-start;
		}
	}



	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 2;
		padding: 15px;
	}

	#post-card:hover {
		background-color: rgba($cyan-soft, 0.3);

		background-size: 150px;
		background-repeat: repeat;
		// border: $border-link-translucent-hover 1px solid;

		transition: background-color 0.15s ease, border 0.15s ease;

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
		// border: $navy-soft 1px solid;
		color: $tan-soft;
	}

	.tool {
		background-color: $gray-mid;
		// border: $navy-mid 1px solid;
		color: $tan-mid;
	}

	.domain {
		background-color: $gray-harder;
		border: hsl(220, 20%, 25%) 1px solid; // $navy-hard but lighter
		color: $tan-hard;
	}

	.category {
		// background-color: $gray-soft;
		border: transparentize($pink-soft, 0.7) 1px solid;
		// color: $pink-mid;
		// font-weight: 400;
		background-color: hsl(345, 50%, 30%);
		color: $pink-soft;
	}
</style>
