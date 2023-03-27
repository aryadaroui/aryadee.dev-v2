<script>
	export let data;

	// console.log(data);
</script>

<article>
	<!-- <h1>{data.title}</h1> -->
	<!-- <p>Published: {data.date}</p> -->

	<!-- <div class="paper"> -->
	<p>{data.date}</p>
	<svelte:component this={data.content} />
	<!-- </div> -->
</article>

<style global lang="scss">
	body {
		background-color: $gray-mid;
	}

	article {
		background-color: $paper-color;
		font-family: $sans;
		max-width: 1000px;
		margin: auto;
		font-size: 1.2em;
		padding: 100px;
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
		padding: 0.2rem;
		border-radius: 0.5rem;
	}

	div[data-rehype-pretty-code-fragment] {
		margin-top: 1rem;
		margin-bottom: 1rem;
		border-radius: 10px;
		border: $border-translucent 1px solid;
		overflow: hidden;
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
			border-radius: 0 0 10px 10px;
		}
	}

	code {
		padding: 0.5rem;
		border-radius: 10px;
	}

	pre {
		margin: 0;
	}

	code {
		background-color: rgba($background-color, 0.8);
		font-family: $mono;
		font-size: 0.85em;


		padding-left: 0;
		padding-right: 0;
		overflow: scroll;

		span.highlighted {
			background-color: rgba($blue-mid, $alpha: 0.2);
			border-left: $blue-hard 2px solid;
		}

		span.word {
			background-color: rgba($blue-hard, $alpha: 0.3);
			padding: 0.4em;
			border-radius: 0.4em;
			filter: brightness(1.5);
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
