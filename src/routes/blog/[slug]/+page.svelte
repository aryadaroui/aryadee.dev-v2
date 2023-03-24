<script>
	export let data;
</script>

<article>
	<!-- <h1>{data.title}</h1> -->
	<!-- <p>Published: {data.date}</p> -->

	<div class="paper">
		<svelte:component this={data.content} />
	</div>
</article>



<style global lang="scss">


	.paper {
		background-color: $paper-color;
		font-family: $sans;
		max-width: 1200px;
		margin:auto;
		font-size: 1.2em;
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
		font-size: 0.9em;
		font-family: $mono;
	}


</style>
