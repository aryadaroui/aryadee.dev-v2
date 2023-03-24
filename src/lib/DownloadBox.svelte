<script lang="ts">
	export let link: string;
</script>

<a href={link}>
	<div id="download-box">
		<slot />
	</div>
</a>

<style lang="scss">
	// @import '/src/styles/main.scss';
	// @use '/src/styles/vars';


	a {
		text-decoration: none;
		flex: 2;
	}

	#download-box {
		background-color: rgba(5, 5, 5, 0.7);
		// border: rgba(158, 226, 253, 0.3) 1px solid;
		border: $border-link-translucent 1px solid;
		box-shadow: 0px 5px 20px black;
		border-radius: 10px;
		background-image: url(./plus_gray.svg);
		background-size: 95px;
		background-repeat: repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 100px;
		min-height: 200px;
		max-width: 600px;

		:global(h2) {
			color: $link-color;
			position: absolute;
			font-family: 'Swiss 721';
			font-weight: 200;
		}
	}



	#download-box:hover {
		background-image: url(./plus.svg);
		background-size: 95px;
		background-repeat: repeat;
		// border: rgba(245, 245, 220, 0.5) 1px solid;
		border: $border-link-translucent-hover 1px solid;

		:global(h2) {
			text-decoration: underline;
			text-decoration-thickness: 1.2px;
		}
	}
</style>
