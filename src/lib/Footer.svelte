<div id="footer">
	<hr />
	<div class="container">
		<span>Arya "Dee" Daroui&nbsp; · &nbsp<a href="mailto:adaroui@uci.edu">adaroui@uci.edu</a>&nbsp; · &nbsp;<a href="/privacy-and-copyright">privacy & copyright</a>&nbsp;</span>
	</div>
	<span id="easter-egg">:-)</span>
</div>

<style lang="scss">
	div#footer {
		margin: 20px;
		font-weight: 300;
		// background-color: $void-color;
		color: rgba($tan-soft, 0.7);
		height: 100px;
		// width: 100%;

		// position: absolute;
		// bottom: 0;

		text-align: center;

		a {
			color: rgba($link-color, 0.8);
			text-decoration: none;
			border-radius: 0.4rem;
			padding: 0.2rem;
			margin: -0.2rem;
			// padding: 0.1rem;
			transition: background-color 0.15s ease, color 0.15s ease;
		}

		a:hover {
			background-color: rgba($link-background, 0.5);
			color: $cyan-soft;
			// color: $cyan-hard;
			// color: $ink-color;
			padding: 0.2rem;
			margin: -0.2rem;
			// color: $tan-mid;
			// transition: background-color 0.15s ease, color 0.15s ease;
		}

		hr {
			max-width: 720px;
			height: 0px;
			border: 1px solid $brown-soft;
		}

		.container {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		#easter-egg {
			position: absolute;
			transform: translateY(-25px);
		}

		// nav {
		// 	margin: auto;
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	font-size: 1.2em;
		// 	max-width: 720px;
		// 	height: 3em;

		// 	a {
		// 		text-decoration: none;
		// 		// color: $cyan-mid;
		// 		color: $tan-soft;

		// 		font-family: $sans;
		// 		font-weight: 300;
		// 		font-size: 1.3rem;
		// 		margin: 0px 20px;

		// 		// border-radius: 0.2rem;
		// 		// border: pink 1px solid;
		// 		// padding: 0.5rem;
		// 		border-radius: 0.4rem;
		// 		padding: 0.4rem;

		// 		transition: background-color 0.15s ease, color 0.15s ease;
		// 	}

		// 	.link {
		// 		border-radius: 0.4rem;
		// 		padding: 0.4rem;
		// 	}

		// 	.home {
		// 		// flex: 1;
		// 		font-size: 1.5rem;
		// 		font-weight: 800;
		// 	}

		// 	.current {
		// 		background-color: rgba($link-background, 0.5);
		// 		color: $tan-soft;
		// 	}
		// }
	}
</style>
