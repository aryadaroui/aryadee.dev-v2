<script lang="ts">
	export let link: string;
	export let title: string;
</script>

<a href={link}>
	<div id="link-box">
		<h3>{title}</h3>
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
		border: $border-link-translucent 2px solid;
		box-shadow: 0px 5px 30px black;
		border-radius: 15px;
		// background-image: url(./arrow_gray.svg);
		background-size: 88px;
		background-repeat: repeat;

		// backdrop-filter: blur(27px);


		display: flex;
		justify-content: center;
		align-items: center;

		// min-width: 120px;
		// min-height: 90px;
		// height: 50px;

		max-width: 800px;
		max-height: 40px;
		margin: 0;

		transition: background-color 0.15s ease, border 0.15s ease;


		:global(h3) {
			color: $link-color;
			font-family: 'Swiss 721';
			font-weight: 200;

			// margin: 10px 20px;
		}
	}

	#link-box:hover {
		// background-image: url(./assets/arrow_gray.svg);
		background-color: rgba($cyan-soft, 0.2);
		background-size: 120px;
		background-repeat: repeat;
		// border: rgba(245, 245, 220, 0.5) 1px solid;
		color: $cyan-soft;
		border: $border-link-translucent-hover 2px solid;

		transition: background-color 0.15s ease, border 0.15s ease;


		:global(h2) {
			color: $cyan-soft;

			// text-decoration: underline;
			// text-decoration-thickness: 1.2px;
		}
	}
</style>
