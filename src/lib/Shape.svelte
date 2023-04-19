<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	// import * as Shape from './Shape';
	import { Shape } from '$lib/ShapeClass';
	import { beforeNavigate } from '$app/navigation';

	// TODO: pass in controlling element

	let shape: Shape;

	onMount(() => {
		shape = new Shape(document.getElementById('shape'), '#E2C09B', document.getElementById('control-layer'));
	});

	onDestroy(() => {
		shape.destroy();
	});
</script>

<div id="shape-container">
	<div id="shape" />
</div>

<style lang="scss">
	#shape {
		z-index: -1;

		animation: 3s ease-in-out normal fade-in;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
