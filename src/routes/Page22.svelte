<script>
	import ImgBox from '$lib/ImgBox.svelte';
</script>

<div id="page-2">
	<div>
		fancy header
	</div>
	<div class="side-stack">
		<div>
			<h3>My name is Arya “Dee” Daroui</h3>
			<p>I like to code, take photos, and make music.</p>
			<p>Most of what I do is at the intersection of these things.</p>
		</div>
		<div>
			<ImgBox />
		</div>
	</div>
	<div class="side-stack">
		<div>
			Langs and tools
		</div>
		<div>
			Domains
		</div>
		<div>
			Uses <br>
			Maxim <br>
			Resume
		</div>
	</div>
	<div class="link-stack">
		<div>
			box 1
		</div>
		<div>
			box 2
		</div>
		<div>
			box 3
		</div>
	</div>


</div>

<style lang="scss">

	#page-2 {
		margin: auto;
		max-width: 1000px;
		border: pink 1px solid;
	}

	.side-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.link-stack {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	div {
		// for debugging
		border: 1px solid cadetblue;
	}


</style>
