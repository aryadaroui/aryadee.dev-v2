<script>
	export let line = 'true';
	export let smiley = 'true';
</script>

<div id="footer">
	{#if line === 'true'}
		<hr />
	{/if}
	<div class="footer">
		<span>arya<span class="accent">dee</span></span>&nbsp; · &nbsp<a href="mailto:adaroui@uci.edu">adaroui@uci.edu</a>&nbsp; ·
		&nbsp;<a href="/privacy-and-copyright">privacy & copyright</a>
	</div>
	{#if smiley === 'true'}
		<span id="smiley">:-)</span>
	{/if}
</div>

<style lang="scss">
	div#footer {
		margin: 20px;
		font-weight: 300;
		// background-color: $void-color;
		color: rgba($tan-soft, 0.8);
		height: 100px;
		// width: 100%;

		// position: absolute;
		// bottom: 0;

		text-align: center;


		hr {
			max-width: 720px;
			height: 0px;
			border: 1px solid $brown-soft;
		}

		#smiley {
			position: absolute;
			// transform: translateY(px);
		}

		.footer {
			margin: 20px;

			font-weight: 300;
			// background-color: $void-color;
			// color: rgba($tan-soft, 0.7);
			// opacity: 0.1;
			// height: 100px;
			// width: 100%;

			// position: absolute;
			// bottom: 0;
			margin-bottom: 20px;

			text-align: center;

			> * {
				opacity: 0.8;
				transition: all 0.15s ease;
			}

			> span:hover {
				opacity: 1;
				transition: all 0.15s ease;
			}

			> a:hover {
				opacity: 1;
				transition: all 0.15s ease;
			}

			a {
				color: rgba($link-color, 0.9);
				text-decoration: none;
				border-radius: 0.4rem;
				padding: 0.2rem;
				margin: -0.2rem;
				// padding: 0.1rem;
				transition: background-color 0.15s ease, color 0.15s ease;
			}

			a:hover {
				background-color: rgba($link-background, 0.6);
				color: $cyan-soft;
				// color: $cyan-hard;
				// color: $ink-color;
				padding: 0.2rem;
				margin: -0.2rem;
				// color: $tan-mid;
				// transition: background-color 0.15s ease, color 0.15s ease;
			}
		}
	}
</style>
