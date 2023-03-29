<script lang="ts">
	export let link: string;
</script>

<a href={link}>
	<div id="link-box">
		<slot />
	</div>
</a>

<style lang="scss">
	// @import '/src/styles/main.scss';

	a {
		text-decoration: none;
		padding: 0;
		flex: 1;

	}

	#link-box {
		background-color: $background-translucent;
		border: $border-link-translucent 1px solid;
		box-shadow: 0px 5px 30px black;
		border-radius: 15px;
		// background-image: url(./arrow_gray.svg);
		background-size: 88px;
		background-repeat: repeat;

		// backdrop-filter: blur(27px);


		display: flex;
		justify-content: center;
		align-items: center;

		min-width: 120px;
		min-height: 90px;

		max-width: 800px;
		max-height: 200px;
		margin: 0;

		:global(h2) {
			color: $link-color;
			font-family: 'Swiss 721';
			font-weight: 200;

			margin: 10px 20px;
		}
	}

	#link-box:hover {
		background-image: url(./assets/arrow_gray.svg);
		background-size: 120px;
		background-repeat: repeat;
		// border: rgba(245, 245, 220, 0.5) 1px solid;
		border: $border-link-translucent-hover 1px solid;

		:global(h2) {
			text-decoration: underline;
			text-decoration-thickness: 1.2px;
		}
	}
</style>
