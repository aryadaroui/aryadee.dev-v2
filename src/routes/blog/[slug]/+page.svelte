<script>
	export let data;
	import Toc from 'svelte-toc';

	// console.log(data);
</script>

<main>
	<article>
		<!-- <h1>{data.title}</h1> -->
		<!-- <p>Published: {data.date}</p> -->

		<!-- <div class="paper"> -->
		<title>{data.title}</title>
		<!-- <div data-title>{data.title}</div> -->
		<div data-date>{data.date}</div>

		<hr />

		<svelte:component this={data.content} />
		<!-- </div> -->
	</article>
	<aside class="table-of-contents">
		<Toc
			breakpoint="1050"
			title=""
			headingSelector=":is(h1, h2, h3, h4):not(.toc-exclude)"
			activeHeadingScrollOffset="200"
			--toc-active-color="#FFEFD8"
			--toc-active-bg="#1E91D3a9"
			--toc-li-hover-color="#7AC6EC"
			--toc-z-index="3"
			--toc-mobile-bg="#26211D"
			--toc-mobile-shadow="box-shadow: 0px 5px 30px rgba(black, 0.7);"
			--toc-mobile-btn-color="#FFEFD8"
			--toc-mobile-btn-border-radius="10px"/>
	</aside>
</main>

<style global lang="scss">
	main {
		display: flex;
		justify-content: center;
	}

	aside.table-of-contents {
		// position: sticky;
		top: 0;
		float: right;
		flex-shrink: 0;
	}

	[data-title] {
		font-weight: 300;
		font-size: 2.5em;
		margin-bottom: 0;
	}
	body {
		background-color: #0e0d0d;
		font-family: $sans;
		font-weight: 300;
	}

	h1 {
		font-size: 2.5em;
		font-weight: 300;
		// background-color: $tan-mid;
		// color: #0e0d0d;
	}

	article {
		background-color: $background-color;
		font-family: $sans;
		color: rgba($ink-color, 0.85);
		max-width: 1000px;
		// margin: auto;
		font-size: 1.2em;
		padding: 100px;
		padding-top: 50px;

		min-width: 600px;
	}

	a {
		color: $link-color;
	}

	h2 {
		color: $accent-color;
	}

	pre > code {
		display: grid;
	}

	p code {
		padding: 0.4rem;
		border-radius: 0.5rem;
		border: $border-translucent 1px solid;
	}

	div[data-rehype-pretty-code-fragment] {
		margin-top: 1rem;
		margin-bottom: 1rem;
		border-radius: 15px;
		border: #2e2a28 1px solid;
		overflow: hidden;

		border-radius: 15px;
		background: #2e2a28;
		box-shadow: 0px 5px 30px rgba(black, 0.7);

		// box-shadow: 6px 6px 15px #1d1a19, -6px -6px 15px #3f3a37;
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

	code {
		padding: 0.5rem;
		border-radius: 15px;
	}

	pre {
		margin: 0;
	}

	code {
		// background-color: rgba($background-color, 0.8);
		background-color: hsl(240, 13%, 6%);
		font-family: $mono;
		font-size: 0.85em;

		padding-left: 0;
		padding-right: 0;
		overflow: scroll;

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

	span.line.highlighted::before {
		// background-color: $blue-mid;
		color: white;
		margin-left: calc(1em - 1px);
	}

	// line numbers
	code {
		counter-reset: line;
		// margin-left: 2em;
	}

	code > .line::before {
		counter-increment: line;
		content: counter(line);

		/* Other styling */
		display: inline-block;
		width: 1rem;
		margin-right: 2rem;
		text-align: right;
		color: gray;

		margin-left: 1em;
	}

	code[data-line-numbers-max-digits='2'] > .line::before {
		width: 2rem;
	}

	code[data-line-numbers-max-digits='3'] > .line::before {
		width: 3rem;
	}
</style>
