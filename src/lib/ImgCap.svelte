<script lang="ts">
	export let src: string;
	export let alt: string;
	export let caption: string;
	export let make_fit = "true";

	// debugger;
	// console.log(make_fit);
</script>

<div id="img-cap">
	{#if make_fit === 'true'}
		<img {src} {alt} class="fit" />
	{:else}
		<img {src} {alt} />
	{/if}

	<p>{caption}</p>
</div>

<style lang="scss">
	#img-cap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		img.fit {
			width: 100%;
			height: auto;
			max-height: 300px;
			object-fit: cover;
		}
		img {
			width: auto;
			height: auto;
			max-height: 350px;
			max-width: 100%;
			margin: 1em 0 0 0;
		}
		p {
			font-size: 0.9em;
			font-weight: 320;
			color: $tan-mid;
			text-align: center;
		}
	}
</style>
