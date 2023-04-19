<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	// import * as Shape from './Shape';
	import {Shape} from './ShapeClass'
	import { beforeNavigate } from '$app/navigation';

	// TODO: pass in controlling element

	// a variable shape with the return type of the function Shape.init()
	// let shape: ReturnType<typeof Shape.init>;

		let shape: Shape;

	onMount(() => {
		shape = new Shape(document.getElementById('shape'), '#E2C09B', document.getElementById('page-1'));
		console.log('added shape');
	});

	onDestroy(() => {

		// console.log('onDestroy called');

		shape.destroy();

		// check if property shape exists on variable shape
		// if (shape && shape.shape) {
		// 	// remove shape from parent
		// 	shape.shape.removeFromParent();
		// 	console.log("removed shape");
		// }
	})

	// beforeNavigate(() => {
	// 	// check if property shape exists on variable shape

	// 	console.log('beforeNavigate');

	// 	if (shape && shape.shape) {
	// 		// remove shape from parent
	// 		shape.shape.removeFromParent();
	// 		console.log('removed shape');
	// 	}
	// });
</script>

<div id="shape-container">
	<!-- <div id="fader"></div> -->
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
