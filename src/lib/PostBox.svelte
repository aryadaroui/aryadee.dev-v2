<!--
  @component
	A text box where the whole thing links to a post.

	props:

	link: `string`
-->
<script lang="ts">
	export let link: string;
	export let thumbnail: string;
	export let thumbnail_alt: string;
</script>

<a href={link}>
	<div class="post-box">
		<div class="thumbnail-container">
			<img src={thumbnail} alt={thumbnail_alt} class="thumbnail" />
		</div>

		<slot />
	</div>
</a>

<style lang="scss">
	// @use '/src/styles/main.scss';
	// @use '/src/styles/vars';

	a {
		text-decoration: none;
	}

	.post-box {
		max-width: 800px;
		max-height: 600px;

		background-color: rgba(5, 5, 5, 0.6);
		border-radius: 10px;
		border: rgba(158, 226, 253, 0.3) 1px solid;

		box-shadow: 0px 5px 20px black;

		:global(h2) {
			font-family: 'Swiss 721', Helvetica, sans-serif;
			font-weight: 300;
			color: $link-color;
			font-size: 1.1em;

			margin-left: 20px;
			margin-right: 20px;
		}

		:global(p) {
			font-family: 'Swiss 721', Helvetica, sans-serif;
			font-weight: 300;

			margin-left: 20px;
			margin-right: 20px;
			overflow: hidden;
			height: auto;
			color: beige;
			font-size: 0.95em;
		}
	}

	.post-box:hover {
		background-image: url(./arrow_gray.svg);
		background-size: 150px;
		background-repeat: repeat;
		border: rgba(245, 245, 220, 0.5) 1px solid;

		:global(h2) {
			text-decoration: underline;
			text-decoration-thickness: 1.5px;
		}
	}

	.thumbnail-container {
		height: 80px;
		border-bottom: #6d6d6357 1px solid;
		overflow: hidden;
		border-radius: 10px 10px 0px 0px;
	}

	.thumbnail {
		width: 100%;
		transform: translate(0, -50%);
	}
</style>
