<script>
	// import '/src/styles/main.scss';
	// import '/src/styles/main.scss';
</script>

<slot />

<!-- <style lang="scss">
	// @import '../styles/main.scss';
	// @use '/src/styles/vars';
	
	// a {
	// 	color: vars.$link-color
	// }
		// @import '/src/styles/hack.css';
		// @import '/src/styles/main.scss';
		// @use '/src/styles/main.scss';
</style> -->

<style global lang="scss">

@import '../styles/main.scss';
// @use '../styles/vars';
// @use '../styles/vars'


	// $red-color: #ff0000;

	:global(body) {
		background-color: black;
		font-family: Hack, monospace;
		color: $test-red;
		// color: beige;
		margin: 0;
	}

	// ::selection {
	// 	background: #f5dce860;
	// 	/* WebKit/Blink Browsers */
	// }
</style>
