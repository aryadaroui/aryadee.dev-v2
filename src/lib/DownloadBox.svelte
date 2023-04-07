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
		background-color: $background-translucent;
		border: $border-link-translucent 2px solid;
		box-shadow: 0px 5px 30px black;
		border-radius: 15px;
		background-size: 95px;
		background-repeat: repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 100px;
		min-height: 200px;
		max-width: 600px;

		transition: background-color 0.15s ease, border 0.15s ease;

		// backdrop-filter: blur(27px);

		:global(h2) {
			color: $link-color;
			position: absolute;
			font-family: 'Swiss 721';
			font-weight: 200;
		}
	}

	#download-box:hover {
		// background-image: url(./assets/plus_gray.svg);
		background-color: rgba($cyan-soft, 0.2);
		background-size: 112px;
		background-repeat: repeat;
		// border: rgba(245, 245, 220, 0.5) 1px solid;
		border: $border-link-translucent-hover 2px solid;


		transition: background-color 0.15s ease, border 0.15s ease;

		:global(h2) {
			// color: #;
			color: $cyan-soft;
			// text-decoration: underline;
			// text-decoration-thickness: 1.2px;
		}
	}
</style>
