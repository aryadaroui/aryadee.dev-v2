<script>
	import { onMount } from 'svelte';
	export let data;
	import Toc from 'svelte-toc';

	// console.log(data);

	// console.log(document.querySelectorAll('[data-rehype-pretty-code]'));

	// document.querySelectorAll('[data-rehype-pretty-code]').forEach(
	// 	(el) => {
	// 		el.onclick = () => {
	// 			console.log('clicked');
	// 		}
	// 	}
	// )

	// onMount(() => {
	// 	console.log(document.querySelectorAll('[data-rehype-pretty-code-fragment]'));
	// 	document.querySelectorAll('[data-rehype-pretty-code-fragment]').forEach((el) => {
	// 		el.setAttribute('tabindex', '0');

	// 		// console.log(el);

	// 		// el.addEventListener('click', () => {
	// 		// 	// console.log('clicked');

	// 		// 	// focus the element
	// 		// });
	// 	});
	// });
</script>

<main>
	<article>
		<!-- <h1>{data.title}</h1> -->
		<!-- <p>Published: {data.date}</p> -->

		<!-- <div class="paper"> -->
		<title>{data.title}</title>
		<div data-title>{data.title}</div>
		<div data-date>{data.date}</div>

		<hr />

		<svelte:component this={data.content} />
		<!-- </div> -->
	</article>
	<!-- <aside class="table-of-contents">
		<Toc
			breakpoint="1050"
			title=""
			headingSelector=":is(h1, h2, h3):not(.toc-exclude)"
			activeHeadingScrollOffset="150"
			--toc-active-color="#FFEFD8"
			--toc-active-bg="#1ED3D350"
			--toc-li-hover-color="#1ED3D3dd"
			--toc-z-index="3"
			--toc-mobile-bg="#26211D"
			--toc-mobile-shadow="box-shadow: 0px 5px 30px rgba(black, 0.7);"
			--toc-mobile-btn-color="#FFEFD8"
			--toc-mobile-btn-border-radius="10px" />
	</aside> -->
</main>

<style global lang="scss">
	main {
		display: flex;
		justify-content: center;
	}

	article {
		background-color: $paper-color;
		font-family: $sans;
		color: rgba($ink-color, 0.9);
		max-width: 1000px;
		// margin: auto;
		font-size: 1.4em;
		padding: 100px;
		padding-top: 50px;
		min-width: 600px;

		flex-grow: 2;
	}

	aside.table-of-contents {
		// position: absolute;
		top: 0;
		// float: right;
		// left: 100%;
		flex-shrink: 0;
		font-size: 1.2em;
		max-width: 300px;
		background-color: #121110;
	}

	[data-title] {
		font-weight: 200;
		font-size: 2.5em;
		margin-bottom: 0;
		width: 100%;
	}
	body {
		// background-color: #0e0d0d;
		background-color: $void-color;
		font-family: $sans;
		font-weight: 300;
	}

	h1 {
		font-size: 2em;
		font-weight: 300;
		color: $pink-hard;
	}
	h2 {
		font-size: 1.6em;
		font-weight: 300;
		color: $pink-mid;
	}
	h3 {
		font-size: 1.2em;
		font-weight: 300;
		color: $pink-soft;
	}
	h4 {
		font-size: 1.1em;
		font-weight: 300;
		color: $tan-hard;
	}

	hr {
		border: $tan-mid 0.5px solid;
	}

	a {
		color: $link-color;
		text-decoration: none;
	}

	a:hover {
		color: $tan-hard;
		text-decoration: underline;
	}

	pre > code {
		display: grid;
	}

	p code {
		padding: 0.4em;
		border-radius: 0.5em;
		border: $border-translucent 1px solid;
	}

	li code {
		padding: 0.4em;
		border-radius: 0.5em;
		border: $border-translucent 1px solid;
	}

	div[data-rehype-pretty-code-title] {
		font-family: $mono;
		font-size: 0.8em;
		display: inline-block;
		width: calc(100% - 1rem);
		background-color: rgba($background-color, 0.5);

		padding: 0.5em;
		text-align: right;

		+ pre code {
			border-radius: 0 0 15px 15px;
		}
	}

	div[data-rehype-pretty-code-fragment] {
		// margin-top: 1em;
		// margin-bottom: 1em;
		border-radius: 15px;
		border: #2e2a28 1px solid;
		overflow: hidden;


		width: 100%;
		// width: 45vw;

		transition: all 0.3s ease;
		// transition: margin 0.3s ease;

		border-radius: 15px;

		pre {
			background-color: hsl(240, 17%, 11%);
		}
		// background: #2e2a28;
		// box-shadow: 0px 5px 30px rgba(black, 0.7);

		// box-shadow: 6px 6px 15px #1d1a19, -6px -6px 15px #3f3a37;
	}

	div[data-rehype-pretty-code-fragment]:focus {
		// position: absolute;

		// margin: 50px;
		// left: 10px;
		// margin: 0;
		// bottom: 10px;
		border: 1px solid $blue-hard;
		width: 99vw;
		z-index: 100;

		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);

		transition: all 0.3s ease;

		// transition: width 0.3s ease;
		// transition: margin 0.3s ease;

		// margin-right: calc(70% - 50vw);
		// padding-left: calc(50vw - 50%);
		// padding-right: calc(50vw - 50%);
	}

	code {
		padding: 0.5rem;
		// border-radius: 15px;
		font-size: 0.85em;
		// margin-left: 1em;
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
			background-color: rgba($blue-mid, $alpha: 0.15);
			border-left: $blue-hard 2px solid;
			filter: brightness(1.1);
			z-index: 0;
			position: relative;
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
		color: gray;

		// margin-left: 1em;
	}

	// code[data-line-numbers-max-digits='2'] > .line::before {
	// 	width: 2rem;
	// }

	// code[data-line-numbers-max-digits='3'] > .line::before {
	// 	width: 3rem;
	// }
</style>
