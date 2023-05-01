<script lang="ts">
	export let img_src: string;
	export let link_src: string;
</script>

<a href={link_src} id="ProjCard">
	<!-- <div class="thumbnail-container"> -->
	<img src={img_src} />
	<!-- </div> -->
	<div class="content-container">
		<slot />
	</div>
</a>

<style lang="scss">
	#ProjCard {
		margin: 20px 0;
		width: 100%;
		min-height: 150px;
		max-height: 300px;
		display: flex;
		flex-direction: row;
		// justify-content: ;
		// align-items: center;
		align-content: flex-start;
		border-radius: 15px;
		// gap: 15px;
		border: transparent 1px solid;
		background-color: $void-color;
		text-decoration: none;
		color: $ink-color;

		.thumbnail-container {
			width: 20%;
			border-radius: 15px 0 0 15px;
			overflow: hidden;

			// border: pink 1px solid;
		}

		&:hover {
			background-color: rgba($cyan-soft, 0.3);
			border: transparent 1px solid;

			transition: background-color 0.15s ease, border 0.15s ease;
		}

		img {
			max-width: 20%;
			// min-width: 10px;
			border-radius: 15px 0 0 15px;
			height: auto;
			object-fit: cover;
		}
		// }

		.content-container {
			padding: 10px 20px;

			// width: 70%;
			// border: pink 1px solid;

			:global(h2) {
				margin-top: 0;
				color: $cyan-mid;
				font-weight: 200;
			}

			:global(p) {
				font-size: 0.9em;
			}
		}
	}
</style>
