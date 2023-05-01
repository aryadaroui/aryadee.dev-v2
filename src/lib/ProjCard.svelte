<script lang="ts">
	export let img_src: string;
	export let link_src: string;
	export let title: string;
	export let type: string;
</script>

<a href={link_src} id="ProjCard">
	<!-- <div class="thumbnail-container"> -->
	<img src={img_src} />
	<!-- </div> -->
	<div class="content-container">
		<div class="title-container">
			<h2>{title}</h2>
			<aside>{type}</aside>
		</div>
		<slot />
	</div>
</a>

<style lang="scss">
	#ProjCard {
		margin: 20px 0;
		width: 100%;
		min-height: 100px;
		max-height: 200px;
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
			width: 100%;

			// width: 70%;
			// border: pink 1px solid;

			.title-container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				// border: pink 1px solid;

				:global(h2) {
					margin: 0;
					color: $cyan-mid;
					font-weight: 400;
				}

				aside {
					margin: 0;
					font-size: 0.9em;
					font-weight: 200;
					color: transparentize($cyan-hard, 0.1);
				}
			}

			:global(p) {
				font-size: 0.9em;
			}
		}
	}
</style>
