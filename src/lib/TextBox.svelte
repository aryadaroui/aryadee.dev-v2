<div id="text-box">
	<slot />
</div>

<style global lang="scss">
	// @import '/src/styles/main.scss';
	// @use '/src/styles/vars';

	.tag {
		border-radius: 0.4em;
		padding: 0.3em;

		font-size: 0.85em;
		font-weight: 300;
		text-overflow: ellipsis;
		display: inline-block;
		margin: 0.4em;
		margin-left: 0;
		margin-bottom: 0;
	}

	.lang {
		background-color: $gray-soft;
		border: $brown-soft 1px solid;
		color: $tan-soft;
	}

	.tool {
		background-color: $gray-mid;
		border: $brown-mid 1px solid;
		color: $tan-mid;
	}

	.domain {
		background-color: $gray-hard;
		border: hsl(19, 20%, 25%) 1px solid; // $brown-hard but lighter
		color: $tan-hard;
	}


	#text-box {
		// background-color: rgba(5, 5, 5, 0.7);
		background-color: $background-translucent;
		border-radius: 15px;		padding: 20px;
		box-shadow: 0px 5px 30px black;
		// box-shadow: 6px 6px 15px #1d1a19, -6px -6px 15px #3f3a37;

		// backdrop-filter: blur(27px);


		border: $border-translucent 1px solid;

		max-width: 800px;
		flex: 1;
		color: rgba($tan-soft, 0.95);

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
