<script>
	import { onMount } from 'svelte';
	export let data;
	// @ts-ignore cannot find module & types. it does exist
	import Toc from 'svelte-toc';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<Header />
<main id="post">
	<div class="margin-padding" />

	<article>
		<!-- <h1>{data.title}</h1> -->
		<!-- <p>Published: {data.date}</p> -->

		<!-- <div class="paper"> -->
		<title>{data.title} - aryadee</title>
		<div data-post-title>{data.title}</div>
		<div data-post-date>{data.date}</div>

		<hr />

		<svelte:component this={data.content} />
		<Footer />
	</article>
	<aside class="table-of-contents">
		<Toc
			titleTag="strong"
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
			--toc-mobile-bg="hsl(225, 8%, 18%)"
			--toc-mobile-shadow="0px 5px 20px #00000077"
			--toc-mobile-btn-color="#FFEFD8"
			--toc-mobile-btn-border-radius="8px" />
	</aside>
</main>
<div class="light-background" />

<style global lang="scss">
	// body {
	// 	// background-color: #0e0d0d;
	// 	background-color: $background-color;

	// }

	// :root {
	// 	background-color: $background-color;
	// }

	$code-color: hsl(230, 10%, 7%);

	// li a {
	// 	color: $link-color;
	// 	// border: #e8d16f 1px solid;
	// 	transition: background-color 0.2s ease-in-out;
	// }

	// li a:hover {
	// 	// background-color: rgba($link-background, 0.8);
	// 	background-color: pink;
	// 	padding: 0.2rem;
	// 	margin: -0.2rem;
	// }

	div.light-background {
		background-color: darken($void-color, 0%);
		width: 100vw;
		height: 100vh;
		z-index: -1;
		position: fixed;
		top: 0;
	}

	main#post {
		font-family: $sans;
		font-weight: 400;

		font-size: clamp(1rem, 3vw, 1.15rem);
		text-align: justify;
		hyphens: auto;

		display: flex;
		justify-content: center;

		min-height: calc(100vh - 200px);

		border-top: 1px solid $border-translucent;

		color: black;

		// ::-webkit-scrollbar {
		// 	height: 10px;
		// 	width: 10px;
		// 	background: #00000000;

		// }

		// ::-webkit-scrollbar-thumb {
		// 	background: #aaaaaaaa;
		// 	-webkit-border-radius: 10px;
		// 	border: 2px solid transparent;
		// 	background-clip: padding-box;

		// 	// -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
		// }

		// ::-webkit-scrollbar-corner {
		// 	background: #00000000;
		// }

		@media (max-width: 690px) {
			// display: block;
			// width: 100vw;
		}

		blockquote {
			border-left: 2px solid $tan-hard;
			padding: 0.5em 1em 0.5em 1em;
			margin-left: 0;
			margin-right: 0;
			background-color: hsl(230, 10%, 18%);

			border-radius: 0 8px 8px 0;

			p {
				margin: 0;
			}
		}

		.katex {
			font-size: 1.1em;
		}

		ul {
			// line-height: 1.8em;

			padding-left: 1em;

			li {
				margin-bottom: 0.5em;

				code {
				padding: 0.3em 0.4em;
				border-radius: 0.4em;
				// background-color: hsl(230, 10%, 18%);
				background-color: $code-color;
				// background-color: lighten($void-color, 10%);
				// background-color: $gray-harder;
				// border: $border-translucent 1px solid;
				color: $tan-hard;

				hyphens: none;


				span.line {
					padding: 0;
				}
			}
			}


		}

		img {
			width: 50%;
			height: auto;
			border-radius: 8px;
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
			// font-size: 1.2em;
			// max-width: 300px;
			width: 300px;

			text-align: left;

			z-index: 3;
			// height: 100vh;
			// width: 100%;
			// background-color: #121110;

			// margin-right: auto;

			strong {
				color: $tan-hard;
			}

			@media (max-width: 1080px) {
				width: 0;
				flex-shrink: 1;
				flex-grow: 1;
				z-index: 5;
			}
		}

		article {
			background-color: darken($void-color, 0%);
			font-family: $sans;
			color: rgba($ink-color, 0.95);
			max-width: 600px;
			// width: 400px;

			line-height: 2em;
			// margin: auto;
			// font-size: 1.2em;
			padding: 80px;
			padding-top: 50px;
			padding-bottom: 0px;

			// min-width: 600px;



			flex-grow: 3;
			// margin-left: 2vw;

			.math {
				color: darken($tan-mid, 5%);
			}



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

			[data-post-title] {
				font-weight: 100;
				font-size: 2.5em;
				text-align: left;
				// margin-bottom: 0;
				line-height: 1em;
				width: 100%;
			}

			[data-post-date] {
				margin: 1em 0em;
				font-family: $mono;
			}

			em {
				color: $tan-hard;
			}

			strong {
				color: $tan-hard;
				// font-weight: 700;
			}

			h1 {
				color: $pink-hard;
				// padding-left: 0em;
				font-weight: 500;
				font-size: 1.8em;

				&::before {
					content: "# ";
					color: $gray-soft;
					font-size: 0.9em;
				}
			}

			h2 {
				color: $pink-mid;
				// padding-left: 10px;
				font-weight: 500;
				font-size: 1.5em;

				&::before {
					content: "## ";
					color: $gray-soft;
					font-size: 0.9em;
				}
			}

			h3 {
				color: $pink-soft;
				// padding-left: 20px;
				font-weight: 500;
				font-size: 1.2em;

				&::before {
					content: "### ";
					color: $gray-soft;
					font-size: 0.9em;
				}
			}

			h4 {
				color: $tan-hard;
				// padding-left: 30px;
				font-weight: 300;
				font-size: 1.1em;

				&::before {
					content: "#### ";
					color: $gray-soft;
					font-size: 0.9em;
				}
			}

			hr {
				border: $tan-mid 0.5px solid;
				width: 100%;
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
				background-color: rgba($link-background, 0.8);
				color: $cyan-soft;
				// color: $cyan-hard;
				// color: $ink-color;
				padding: 0.2rem;
				margin: -0.2rem;
				// color: $tan-mid;
				// transition: background-color 0.15s ease, color 0.15s ease;
			}



			a > code {
				transition: background-color 0.15s ease, color 0.15s ease;

				&:hover {
					background-color: transparent;
				}

				// padding: 0;
			}
			
			a.img-link:hover {
				background-color: transparent;
			}


			a > img {
				border: 1px solid transparent;
			}

			a > img:hover {
				border: 1px solid #a5e0f5;
			}

			pre > code {
				display: grid;
				padding-top: 0.5em;
				padding-bottom: 0.5em;
			}

			p code {
				padding: 0.3em 0.4em;
				border-radius: 0.4em;
				// background-color: hsl(230, 10%, 18%);
				background-color: $code-color;
				// background-color: lighten($void-color, 10%);
				// background-color: $gray-harder;
				// border: $border-translucent 1px solid;

				hyphens: none;


				span.line {
					padding: 0;
				}
			}

			p > code {
				color: $tan-hard;
			}

			p span[data-rehype-pretty-code-fragment] code {
				padding: 0.3em 0.4em;
				border-radius: 0.4em;
				background-color: $code-color;
				// border: $border-translucent 1px solid;
			}

			li span[data-rehype-pretty-code-fragment] code {
				padding: 0.3em 0.4em;
				border-radius: 0.4em;
				background-color: $code-color;
				// border: $border-translucent 1px solid;
			}

			li li {
				font-size: 1em;
			}

			li code {
				padding: 0.3em 0.4em;
				border-radius: 0.4em;
				// background-color: $background-translucent;
				// border: $border-translucent 1px solid;

				span.line {
					padding: 0;
				}
			}

			div[data-rehype-pretty-code-title] {
				font-family: $sans;
				font-size: 0.8em;
				display: inline-block;
				width: calc(100% - 1rem);
				// background-color: $;
				background-color: hsl(230, 10%, 5%);

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
				// border-radius: 15px;
				border: rgba($blue-mid, 0) 1px solid;
				overflow: hidden;
				line-height: 1em;
				user-select: contain;

				cursor: pointer;
				z-index: 4;

				width: 100%;
				// width: 45vw;

				// transition: margin-left 0.3s ease;
				transition: width 0.3s ease, margin-left 0.3s ease, border 0.15s ease;
				// margin-bottom: 2px;
				// transition: border 0.0s none;
				// border: $border-translucent 1px solid;

				border-radius: 8px;

				pre {
					background-color: $code-color;
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
				border: 1px solid $blue-hard;
				transition: width 0.3s ease, margin-left 0.3s ease, border-color 0.3s ease;
				// margin-bottom: 0px;

				// transition: left 0.3s ease;
				// transition: border-color 0.3s ease;
				// transition: border-width 0.0s none;
				z-index: 100;

				cursor: auto;

				// left: 0;

				width: 98vw;
				margin-left: calc(50% - 49vw);
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

				@media (max-width: 1350px) {
					// margin-left: calc(45% - 45vw);
					// margin-left: calc(((100vw - 100% - 300px - 200px) * -1) - 80px);
					margin-left: calc(((99vw - 100% - 300px - 160px) * -1) - 80px);
					width: 98vw;
				}

				@media (max-width: 1080px) {
					margin-left: calc(50% - 49vw);
					width: 98vw;
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
				font-size: 0.85em;

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

		table {
			border-collapse: collapse;
			font-size: 0.9em;
			font-family: $mono;
			min-width: 300px;

			margin-left: auto;
			margin-right: auto;
			margin-top: 25px;
			margin-bottom: 25px;
			border-radius: 8px;

			overflow: hidden;
			text-align: center;

			box-shadow: 0 0 0 1px rgb(41, 42, 43); /* this draws the table border  */

			/* border-collapse: separate; */
		}

		table thead tr {
			background-color: #2e343dee;
			// color: #ffffff;
			// text-align: right;
		}

		table td {
			text-align: right;

			&:first-child {
				text-align: left;
			}
		}

		table th,
		table td {
			padding: 12px 15px;
		}
	}

	// code[data-line-numbers-max-digits='2'] > .line::before {
	// 	width: 2rem;
	// }

	// code[data-line-numbers-max-digits='3'] > .line::before {
	// 	width: 3rem;
	// }
</style>
