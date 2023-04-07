<script>
	import { onMount } from 'svelte';
	export let data;
	// @ts-ignore cannot find module & types. it does exist
	import Toc from 'svelte-toc';
	import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';

	onMount(() => {
		window.onunhandledrejection = (e) => {
		  console.log('we got exception, but the app has crashed', e);
			// here we should gracefully show some fallback error or previous good known state
			// this does not work though:
			// current = C1; 
			
			// todo: This is unexpected error, send error to log server
			// only way to reload page so that users can try again until error is resolved
			// uncomment to reload page:
			// window.location = "/oi-oi-oi";
		}
	})
</script>

<Header />
<main id="post">
	<div class="margin-padding" />
	<article>

		<!-- <h1>{data.title}</h1> -->
		<!-- <p>Published: {data.date}</p> -->

		<!-- <div class="paper"> -->
		<title>{data.title} - aryadee</title>
		<div data-title>{data.title}</div>
		<div data-date>{data.date}</div>

		<!-- <hr /> -->

		<svelte:component this={data.content} />
		<!-- </div> -->
	</article>
	<aside class="table-of-contents">
		<Toc
		titleTag='strong'
			breakpoint="1080"
			title="On this page"
			headingSelector=":is(h1, h2, h3):not(.toc-exclude)"
			activeHeadingScrollOffset="150"

			--toc-li-color="#FFEFD8"
			--toc-active-border-radius="0.5rem"
			--toc-active-color="#F7679C"
			--toc-active-bg="#A7687D00"
			--toc-li-hover-color="#FF99BE"
			--toc-z-index="3"
			--toc-mobile-bg="#171312"
			--toc-mobile-shadow="box-shadow: 0px 5px 30px rgba(black, 0.7);"
			--toc-mobile-btn-color="#FFEFD8"
			--toc-mobile-btn-border-radius="10px"
			/>
	</aside>
</main>
<Footer />

<style global lang="scss">
	// body {
	// 	// background-color: #0e0d0d;
	// 	background-color: $void-color;

	// }

	:root {
		background-color: $background-color;
	}

	main#post {
		font-family: $sans;
		font-weight: 300;

		display: flex;
		justify-content: center;

		@media (max-width: 690px) {
			// display: block;
			// width: 100vw;
		}

		.katex {
			font-size: 1.1em;
		}

		ul {
			// line-height: 1.8em;

			li {
				margin-bottom: 0.5em;
			}
		}

		img {
			width: 50%;
			height: auto;
			border-radius: 15px;
		}

		div.margin-padding {
			max-width: 300px;
			flex-shrink: 0;
			flex-grow: 1;

			@media (max-width: 1080px) {
				width: 0;
				// flex-shrink: 1;
				// flex-grow: 1;
				visibility: hidden;
			}
		}

		aside.table-of-contents {
			// position: sticky;
			// left: 0;
			// right: 0;
			// top: 0;
			// float: right;
			// left: 100%;
			flex-shrink: 0;
			font-size: 1.2em;
			// max-width: 300px;
			width: 300px;

			z-index: 3;
			// height: 100vh;
			// width: 100%;
			// background-color: #121110;

			// margin-right: auto;
			@media (max-width: 1080px) {
				width: 0;
				flex-shrink: 1;
				flex-grow: 1;
				z-index: 5;
			}
		}

		article {
			background-color: $background-color;
			font-family: $sans;
			color: rgba($ink-color, 0.9);
			max-width: 720px;

			line-height: 1.5em;
			// margin: auto;
			font-size: 1.2em;
			padding: 80px;
			padding-top: 50px;

			min-width: 640px;

			flex-grow: 3;
			margin-left: 2vw;

			@media (max-width: 1080px) {
				// width: 0;
				// flex-shrink: 1;
				// flex-grow: 1;
				// visibility: hidden;
				margin-left: 0;
			}

			@media (max-width: 690px) {
				padding: 20px;
				min-width: 0px;
				// width: 100%;
				// color: #e8d16f;
			}

			[data-title] {
				font-weight: 200;
				font-size: 2.5em;
				margin-bottom: 0;
				width: 100%;
			}

			h1 {
				font-size: 1.8em;
				font-weight: 300;
				color: $pink-hard;
			}
			h2 {
				font-size: 1.6em;
				font-weight: 300;
				color: $pink-mid;
			}
			h3 {
				font-size: 1.4em;
				font-weight: 300;
				color: $pink-soft;
			}
			h4 {
				font-size: 1.2em;
				font-weight: 300;
				color: $tan-hard;
			}

			hr {
				border: $tan-mid 0.5px solid;
			}

			a {
				color: $link-color;
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

			pre > code {
				display: grid;
				padding-top: 0.5em;
				padding-bottom: 0.5em;
			}

			p span[data-rehype-pretty-code-fragment] code {
				padding: 0.3em 0.4em;
				border-radius: 0.4em;
				background-color: hsl(230, 10%, 10%);
				border: $border-translucent 1px solid;
			}

			p code {
				padding: 0.3em 0.4em;
				border-radius: 0.4em;
				background-color: hsl(230, 10%, 25%);
				// background-color: $gray-harder;
				// border: $border-translucent 1px solid;

				span.line {
					padding: 0;
				}
			}

			li li {
				font-size: 1em;
			}

			li code {
				padding: 0.25em;
				border-radius: 0.5em;
				background-color: $void-color;
				border: $border-translucent 1px solid;

				span.line {
					padding: 0;
				}
			}

			div[data-rehype-pretty-code-title] {
				font-family: $mono;
				font-size: 0.8em;
				display: inline-block;
				width: calc(100% - 1rem);
				// background-color: $;
				background-color: hsl(230, 10%, 20%);

				padding: 0.5em;
				text-align: right;

				// + pre code {
				// 	border-radius: 0 0 15px 15px;
				// }
			}

			div[data-rehype-pretty-code-fragment] {
				// margin-top: 1em;
				// margin-bottom: 1em;
				position: relative;
				border-radius: 15px;
				border: rgba($blue-mid, 0.5) 1px solid;
				overflow: hidden;
				line-height: 1em;

				cursor: pointer;
				z-index: 4;

				width: 100%;
				// width: 45vw;

				// transition: margin-left 0.3s ease;
				transition: width 0.3s ease, margin-left 0.3s ease, border 0.15s ease;
				margin-bottom: 2px;
				// transition: border 0.0s none;

				border-radius: 15px;

				pre {
					background-color: hsl(230, 10%, 10%);
				}

				// background: #2e2a28;
				// box-shadow: 0px 5px 30px rgba(black, 0.7);

				// box-shadow: 6px 6px 15px #1d1a19, -6px -6px 15px #3f3a37;
			}

			div[data-rehype-pretty-code-fragment]:hover {
				border: rgba($blue-mid, 1) 1px solid;
				transition: border 0.15s ease;
			}

			// a lot of silliness to make the code blocks responsive but not overflow
			div[data-rehype-pretty-code-fragment]:focus {
				position: relative;
				border: 2px solid $blue-hard;
				transition: width 0.3s ease, margin-left 0.3s ease, border-color 0.3s ease;
				margin-bottom: 0px;

				// transition: left 0.3s ease;
				// transition: border-color 0.3s ease;
				// transition: border-width 0.0s none;
				z-index: 100;

				cursor: auto;

				// left: 0;

				width: 98vw;
				margin-left: calc(50% - 50vw);
				// margin-right: calc(50% - 50vw);

				// @media (max-width: 1820px) {
				// 	margin-left: calc(50% - 42vw);
				// 	width: 90vw;
				// }

				// @media (max-width: 1550px) {
				// 	margin-left: -100px;
				// 	width: 95vw;
				// }

				span:not(.line) {
					cursor: text;
					// border: $accent-color 1px solid;
				}

				@media (max-width: 1500px) {
					// margin-left: calc(45% - 45vw);
					// margin-left: calc(((100vw - 100% - 300px - 200px) * -1) - 80px);
					margin-left: calc(((98vw - 100% - 300px - 160px) * -1) - 80px);
					width: 96vw;
				}

				@media (max-width: 1500px) {
					// margin-left: calc(45% - 45vw);
					// margin-left: calc(((100vw - 100% - 300px - 200px) * -1) - 80px);
					margin-left: calc(((98vw - 100% - 300px - 160px) * -1) - 85px);
					width: 96vw;
				}

				@media (max-width: 1080px) {
					margin-left: calc(50% - 48vw);
					width: 96vw;
				}

				@media (max-width: 690px) {
					margin-left: calc(50% - 50vw);
					width: 99vw;
				}
			}

			pre {
				margin: 0;
			}

			code {
				// background-color: rgba($background-color, 0.8);
				// background-color: hsl(240, 13%, 6%);
				font-family: $mono;
				font-size: 0.75em;

				padding-left: 0;
				padding-right: 0;
				overflow: scroll;

				tab-size: 1.2em;

				span.highlighted {
					background-color: rgba(#e8d16f, $alpha: 0.15);
					border-left: #e8d16f 5px solid;
					filter: brightness(1.1);
					z-index: 0;
					position: relative;

					padding-left: 0.8em;
				}

				span.word {
					background-color: rgba($blue-hard, $alpha: 0.3);
					padding: 0.2em 0.2em 0.2em 0.2em;
					margin: -0.2em -0.2em -0.2em -0.2em;
					border-radius: 0.4em;
					filter: brightness(1.5);
					z-index: 0;
					position: relative;
				}

				span {
					z-index: 1;
					position: relative;
				}
			}

			// span::before {
			// 	// background-color: $blue-mid;
			// 	color: white;
			// 	margin-left: 1em;
			// }

			span.line {
				padding-left: 1em;
			}

			span.line.highlighted::before {
				// background-color: $blue-mid;
				color: white;
				margin-left: -1px;
				// margin-left: 1em;
			}

			// line numbers
			code {
				counter-reset: line;
				// margin-left: 2em;
			}

			code[data-line-numbers] > .line::before {
				counter-increment: line;
				content: counter(line);

				/* Other styling */
				display: inline-block;
				width: 1rem;
				margin-right: 2rem;
				text-align: right;
				color: rgb(97, 104, 114);

				// margin-left: 1em;
			}
		}
	}

	// code[data-line-numbers-max-digits='2'] > .line::before {
	// 	width: 2rem;
	// }

	// code[data-line-numbers-max-digits='3'] > .line::before {
	// 	width: 3rem;
	// }
</style>
