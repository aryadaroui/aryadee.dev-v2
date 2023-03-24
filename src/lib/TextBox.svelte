<div id="text-box">
	<slot />
</div>

<style lang="scss">
	// @import '/src/styles/main.scss';
	// @use '/src/styles/vars';


	#text-box {
		background-color: rgba(5, 5, 5, 0.7);
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0px 5px 20px black;
		// border: rgba(245, 245, 220, 0.2) 1px solid;
		border: $border-translucent 1px solid;

		max-width: 800px;
		flex: 1;

		:global(ul) {
			font-family: $sans;
			font-weight: 300;
			margin-bottom: 0;
		}

		:global(li) {
			margin-bottom: 0.5em;
		}

		:global(li):first-child {
			margin-top: 0;
		}

		:global(li):last-child {
			margin-bottom: 0;
		}

		:global(p) {
			font-family: $sans;
			font-weight: 300;
		}

		:global(p):first-child {
			margin-top: 0;
		}

		:global(p):last-child {
			margin-bottom: 0;
		}

		:global(h1) {
			font-family: $sans;
		}
		:global(h1):first-child {
			margin-top: 0;
		}
		:global(h1):last-child {
			margin-bottom: 0;
		}

		:global(h2) {
			font-family: $sans;
		}
		:global(h2):first-child {
			margin-top: 0;
		}
		:global(h2):last-child {
			margin-bottom: 0;
		}

		:global(h3) {
			font-family: $sans;
			color: $accent-color;
			font-weight: 300;
		}
		:global(h3):first-child {
			margin-top: 0;
		}
		:global(h3):last-child {
			margin-bottom: 0;
		}
	}
</style>
