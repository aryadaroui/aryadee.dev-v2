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
	<!-- <div id="background"></div> -->
</div>

<style lang="scss">
	#shape {
		z-index: -1;

		animation: 4s ease-in fade-in;
		// background-color: $gray-mid;
	}

	#background {
		z-index: -2;
		background-color: $gray-mid;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		animation: 1s linear normal fade-in;
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
