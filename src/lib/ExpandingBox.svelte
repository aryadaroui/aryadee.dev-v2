<script>
	import { onMount } from "svelte";


	onMount(() => {
	})
	   
</script>

<div id="ExpandingBox" tabindex="0">
	<div id="container">
		<slot />
	</div>
</div>

<style lang="scss">
	#ExpandingBox {
		margin: 0;
		border-radius: 8px;
		border: transparent 1px solid;
		overflow: scroll;
		width: 100%;


		padding: 15px 20px;
		// padding: 0;

		background-color: hsl(230, 10%, 7%);

		transition: width 0.3s ease, margin-left 0.3s ease, border 0.15s ease;
		&:hover {
			cursor: pointer;
			border: rgba($blue-mid, 1) 1px solid;
			transition: border 0.15s ease;
		}

		&:focus {
			transition: width 0.3s ease, margin-left 0.3s ease, border-color 0.3s ease;
			border: 1px solid $blue-hard;
			cursor: auto;
			position: relative;
			z-index: 100;

			width: calc(98vw - 40px);
			margin-left: calc(50% - 49vw);

			@media (max-width: 1350px) {
				// margin-left: calc(45% - 45vw);
				// margin-left: calc(((100vw - 100% - 300px - 200px) * -1) - 80px);
				margin-left: calc(((99vw - 100% - 300px - 160px ) * -1) - 80px);
				width: calc(98vw - 40px);
			}

			@media (max-width: 1080px) {
				margin-left: calc(50% - 49vw);
				width: calc(98vw - 40px);
			}

			@media (max-width: 690px) {
				margin-left: calc(50% - 50vw);
				width: calc(99vw - 40px);
			}
		}

		#container {
			width: 98vw;
		}
	}
</style>
