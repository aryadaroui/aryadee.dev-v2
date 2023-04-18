<script>
	import { onMount } from 'svelte';
	import * as Shape from './Shape';

	// TODO: pass in controlling element

	onMount(() => {
		Shape.init(document.getElementById('shape'), '#E2C09B', document.getElementById('page-1'));

	});
</script>

<div id="shape-container">
	<!-- <div id="fader"></div> -->
	<div id="shape"></div>
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