<script lang="ts">
	export let title: string;
	export let tags: string[];

	export let link: string;
	export let thumbnail: string;
	export let alt: string;
	export let img_src: string;

	img_src = thumbnail;
</script>

<a href={link} id="post-box">
	<div class="thumbnail-container">
		<img class="thumbnail" src={img_src} {alt} />
	</div>
	<div class="content">
		<div class="title">
			<h2>{title}</h2>
		</div>
		<div class="tags">
				{#each tags as tag}
					<span class="tag">{tag}</span>
				{/each}
		</div>
	</div>
</a>

<style lang="scss">
	h2 {
		font-weight: 200;
		margin: 0;
	}

	.thumbnail {
		object-fit: cover;
		transform: scale(1.15);
		width: 100%;
		height: 100%;
	}

	.tags {
		margin: 0;
		margin-top: 10px;
	}

	.tag {
		background-color: $gray-mid;
		border: $brown-mid 1px solid;
		border-radius: 0.4em;
		padding: 0.3em;

		font-size: 0.8em;
		font-weight: 300;
		color: $ink-color;
		text-overflow: ellipsis;
		display: inline-block;
		margin: 0.2em;
	}

	#post-box {
		display: flex;
		justify-content: space-between;
		max-width: 800px;
		min-height: 100px;
		gap: 0;
		text-decoration: none;
		color: $link-color;

		font-family: $sans;

		border-radius: 10px;
		border: $border-link-translucent 1px solid;
		background-color: rgba(5, 5, 5, 0.6);
		box-shadow: 0px 5px 20px black;
		overflow: hidden;

		:hover h2 {
			text-decoration: underline;
			text-decoration-thickness: 0.01em;
		}
	}

	a#post-box:hover {
		text-decoration: none;
	}

	.thumbnail-container {
		overflow: hidden;
		width: 25%;
		height: auto;
		border-right: rgba(gray, 0.5) 1px solid;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 2;
		padding: 15px;
	}

	#post-box:hover {
		background-image: url(./arrow_gray.svg);
		background-size: 150px;
		background-repeat: repeat;
		border: $border-link-translucent-hover 1px solid;

		text-decoration: underline;
		text-decoration-thickness: 1.5px;
	}
</style>
