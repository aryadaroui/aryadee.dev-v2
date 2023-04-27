<script>
	import { page } from '$app/stores';

	let main_route = $page.url.pathname.match(/^\/([^\/]+)/)[1]; // extracts the first part of the url path, e.g. "blog" from "/blog/post"
</script>

<div id="header">
	<nav>
		<div>
			<a href="/" class="link home"> <span class="normal">arya</span><span class="accent">dee</span> </a>
		</div>

		<div>
			<a href="/blog" class="link" class:current={main_route === 'blog'}> blog </a>

			<a href="/projects" class="link" class:current={main_route === 'projects'}> projects </a>

			<a href="/creative" class="link" class:current={main_route === 'creative'}> creative </a>
		</div>
	</nav>
</div>

<style lang="scss">
	div#header {
		background-color: darken($void-color, 0%);
		width: 100%;

		nav {
			margin: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.2em;
			max-width: 720px;
			height: 3em;

			@media screen and (max-width: 502px) {
				flex-direction: column;
				// height: 4em;
				gap: 10px;
				padding-top: 5px;
				padding-bottom: 20px;
				// margin-bottom: 0px;
			}

			a {
				text-decoration: none;
				// color: $cyan-mid;
				color: $tan-soft;

				font-family: $sans;
				font-weight: 300;
				font-size: 1.3rem;
				margin: 0px 20px;

				// border-radius: 0.2rem;
				// border: pink 1px solid;
				// padding: 0.5rem;
				border-radius: 0.4rem;
				padding: 0.4rem;

				transition: background-color 0.15s ease, color 0.15s ease;

				@media screen and (max-width: 600px) {
					font-size: 0.9em;
				}
			}

			.link {
				border-radius: 0.4rem;
				padding: 0.4rem;
			}

			.home {
				// flex: 1;
				font-size: 1.5rem;
				font-weight: 400;
			}

			.current {
				background-color: rgba($link-background, 0.5);
				color: $ink-color;
				// color: $background-color;
				// background-color: rgba($cyan-soft, 0.2);
				// color: $pink-hard;
				// color: $cyan-hard;
				transition: background-color 0.15s ease, color 0.15s ease;
				// text-decoration: underline;
				// text-underline-offset: 0.4rem;
				// text-decoration-thickness: 0.05rem;
			}

			a:hover {
				color: $cyan-hard;
			}

			// a.home :hover {
			// 	color: $tan-hard;
			// }

			.normal {
				transition: color 0.15s ease;
			}

			.accent {
				transition: color 0.15s linear;
			}

			a:hover > .normal {
				color: $cyan-soft;
				transition: color 0.15s ease;
			}

			a:hover > .accent {
				color: $cyan-hard;
				transition: color 0.15s linear;
			}

			a:active {
				color: $cyan-hard;
				// transition: background-color 0.15s ease, color 0.15s ease;
			}
		}
	}
</style>
