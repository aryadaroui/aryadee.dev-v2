<script lang="ts">
	import Plotly from '../lib/Plotly.svelte';

	async function get_plot_json(plot_json: URL | string | JSON) {
		if (typeof plot_json === 'object') {
			return new Promise((resolve, reject) => {
				resolve(plot_json);
			});
		} else {
			const response = await fetch(plot_json);
			const plot_data = await response.json();

			if (response.ok) {
				return plot_data;
			} else {
				throw new Error(plot_data);
			}
		}
	}

	function init(loaded, plot_loader) {
		// console.log('loaded', loaded);
		if (loaded) {
			if (plot_loader) {
				plot_loader.classList.add('loaded');
			}
		}
	}

	export let plot_json: URL | string | JSON;
	let plot_loader;
	let loaded;
	$: init(loaded, plot_loader);

	let plot_data = get_plot_json(plot_json);

	const config = {responsive: true};
</script>

<div class="skeleton">
	{#await plot_data}
		<p>Loading plot data</p>
	{:then data}
		<div bind:this={plot_loader}>
			<Plotly data={data.data} layout={data.layout} config={config} bind:loaded />
		</div>
	{:catch error}
		<p>{error}</p>
	{/await}
</div>

<style global lang="scss">
	.skeleton {
		// width: calc(100% - 2px);
		height: 450px;
		border-radius: 8px;
		background-color: rgb(17, 17, 17);
		padding: 0px;
		// margin: 1em 0;
		margin: 0;

		border: transparent 1px solid;
		transition: border 0.15s ease;
		// &:hover {
		// 	border: hsl(220, 20%, 30%) 1px solid;
		// 	transition: border 0.15s ease;
		// }

		// &:active {
		// 	border: hsl(220, 20%, 30%) 1px solid;
		// 	transition: border 0.15s ease;
		// }

		overflow: hidden;

		p {
			margin: 0px;
			padding-left: 1em;
			font-size: 0.8em;
		}
	}

	.js-plotly-plot {
		.draglayer:active {
			border: hsl(220, 20%, 30%) 1px solid;
			transition: border 0.15s ease;
		}
	}

	.loaded {
		animation: expand 0.9s ease;
		overflow: hidden;
	}

	@keyframes expand {
		from {
			height: 0;
			border-bottom: hsl(220, 20%, 30%) 1px solid;
		}
		to {
			height: 100%;
			border-bottom: hsl(220, 20%, 30%) 1px solid;
		}
	}
</style>
