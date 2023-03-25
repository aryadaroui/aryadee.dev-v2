<script>
	export let data;

	console.log(data);
</script>

<article>
	<!-- <h1>{data.title}</h1> -->
	<!-- <p>Published: {data.date}</p> -->

	<div class="paper">
		<p>{data.date}</p>
		<svelte:component this={data.content} />
	</div>
</article>



<style global lang="scss">

	body {
		background-color: $gray-mid;
	}

	.paper {
		background-color: $paper-color;
		font-family: $sans;
		max-width: 1000px;
		margin:auto;
		font-size: 1.2em;
		padding: 100px;
	}

	a {
		color: $link-color;
	}

	h2 {
		color: $accent-color;
	}

	p code {
		background-color: rgb(36, 34, 34);
		color: $pink-mid;
		padding: 0.15em;
		border-radius: 0.3em;
		font-size: 0.91em;
		font-family: $mono;
	}


</style>
