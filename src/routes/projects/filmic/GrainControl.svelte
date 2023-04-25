<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import * as tools from './functions';
	import { schemeDark2 } from 'd3';

	function dragstarted() {
		d3.select(this).attr('stroke', 'white').attr('stroke-width', '2').attr('r', 11.5);
	}

	function dragged_graph(event: DragEvent, d: number[]) {
		let page_value_y = tools.clamp(event.y, 0, height_graph);
		let page_value_x = tools.clamp(event.x, 0, width_graph);

		let slider_value_y = y_scale_inv_graph(page_value_y);
		let slider_value_x = x_scale_inv_graph(page_value_x);

		let handle = d3.select(this);

		handle.attr('cy', page_value_y);
		handle.attr('cx', page_value_x);

		grain.intensity = slider_value_x;
		grain.size = slider_value_y;

		// for axis markers

		d3.select('#x-marker').attr('cx', page_value_x);
		d3.select('#y-marker').attr('cy', page_value_y);
	}

	function dragged_slider(event: DragEvent, d: number[]) {
		let page_value_y = tools.clamp(event.y, 0, height_slider);

		let slider_value_y = y_scale_inv_slider(page_value_y);

		let handle = d3.select(this);

		handle.attr('cy', page_value_y);

		handle.attr(
			'fill',
			d3
				.rgb(
					(255 / 200) * slider_value_y + 100,
					(255 / 200) * slider_value_y + 100,
					(255 / 200) * slider_value_y + 100
				)
				.toString()
		); // change color fill

		// UPDATE BACKEND
		// tone_curve[d[0]][1] = slider_value;
		grain.exposure_offset = slider_value_y;
	}

	function dragended() {
		d3.select(this).attr('stroke-width', '0.5').attr('r', 9);
	}

	// Initialize //  //  //  //  //  //  //  //  //  //  //  //
	export var grain;

	const margin_graph = { top: 13, right: 30, bottom: 30, left: 12 };
	const width_graph = 300 - margin_graph.left - margin_graph.right;
	const height_graph = 300 - margin_graph.top - margin_graph.bottom;
	// const slider = { min: 0, max: 100 };

	const x_scale_graph = d3.scaleLinear().domain([0, 100]).range([0, width_graph]);
	const y_scale_graph = d3.scaleLinear().domain([0, 100]).range([height_graph, 0]);

	const y_scale_inv_graph = d3.scaleLinear().domain([height_graph, 0]).range([0, 100]);

	const x_scale_inv_graph = d3.scaleLinear().domain([width_graph, 0]).range([100, 0]);

	const drag_graph = d3
		.drag()
		.on('start', dragstarted)
		.on('drag', dragged_graph)
		.on('end', dragended);

	// SLIDER // // // //

	const margin_slider = { top: 13, right: 30, bottom: 30, left: 50 };
	const width_slider = 100 - margin_slider.left - margin_slider.right;
	const height_slider = 300 - margin_slider.top - margin_slider.bottom;
	// const slider = { min: 0, max: 100 };

	const x_scale_slider = d3.scaleLinear().domain([0, 100]).range([0, width_slider]);

	const y_scale_slider = d3.scaleLinear().domain([-100, 100]).range([height_slider, 0]);

	const y_scale_inv_slider = d3.scaleLinear().domain([height_slider, 0]).range([-100, 100]);

	// const x_scale_inv_slider = d3
	// 	.scaleLinear()
	// 	.domain([width_slider, 0])
	// 	.range([0, -100]);

	const drag_slider = d3
		.drag()
		.on('start', dragstarted)
		.on('drag', dragged_slider)
		.on('end', dragended);

	onMount(() => {
		const graph = d3
			.select('#grain-control-graph')
			.append('svg')
			.attr('width', width_graph + margin_graph.left + margin_graph.right)
			.attr('height', height_graph + margin_graph.top + margin_graph.bottom)
			.append('g')
			.attr('transform', `translate(${margin_graph.left}, ${margin_graph.top})`);

		// y axis
		graph.append('g').call(
			d3
				.axisLeft(y_scale_graph)
				// .tickValues([-100, -50, 0, 50, 100])
				.tickValues([0, 25, 50, 75, 100])
				// .ticks(2)
				.tickFormat((d) => {
					return '';
				})
		);

		graph
			.append('text')
			.attr('class', 'grain-control-graph-y-label')
			.attr('text-anchor', 'end')
			.attr('y', 6)
			.attr('dy', '.75em')
			.attr('transform', 'rotate(-90)')
			.text('Size')
			.style('fill', 'white');

		// x axis
		graph
			.append('g')
			.attr('transform', `translate(0, ${height_graph})`)
			.call(
				d3
					.axisBottom(x_scale_graph)
					// .tickValues(d3.range(0, 100, 100 / 2))
					.tickValues([0, 25, 50, 75, 100])

					.tickFormat((d) => {
						return '';
					})
			);

		graph
			.append('text')
			.attr('class', 'grain-control-graph-x-label')
			.attr('text-anchor', 'end')
			.attr('x', width_graph)
			.attr('y', height_graph - 6)
			.text('Intensity')
			.style('fill', 'white');

		// datum
		graph
			.selectAll('circle')
			.data([[grain.intensity, grain.size]])
			.join('circle')
			.attr('cx', (d) => x_scale_graph(d[0]))
			.attr('cy', (d) => y_scale_graph(d[1]))
			.attr('r', 9)
			.attr('stroke', 'white')
			.attr('stroke-width', '0.5')
			.attr('fill', (d, i) => '#64c6ff')
			.attr('class', 'grain-control-handle')
			// @ts-ignore
			.call(drag_graph);

		graph
			.append('circle')
			.data([[grain.intensity, 0]])
			// .join('circle')
			.attr('cx', (d) => x_scale_graph(d[0]))
			.attr('cy', (d) => y_scale_graph(d[1]))
			.attr('r', 4)
			// .attr("stroke", "white")
			// .attr("stroke-width", "0.5")
			.attr('fill', (d, i) => '#FFFFFF')
			.attr('id', 'x-marker');

		graph
			.append('circle')
			.data([[0, grain.size]])
			// .join('circle')
			.attr('cx', (d) => x_scale_graph(d[0]))
			.attr('cy', (d) => y_scale_graph(d[1]))
			.attr('r', 4)
			// .attr("stroke", "white")
			// .attr("stroke-width", "0.5")
			.attr('fill', (d, i) => '#FFFFFF')
			.attr('id', 'y-marker');

		// SLIDER // // // // // //
		const slider = d3
			.select('#grain-control-slider')
			.append('svg')
			.attr('width', width_slider + margin_slider.left + margin_slider.right)
			.attr('height', height_slider + margin_slider.top + margin_slider.bottom)
			.append('g')
			.attr('transform', `translate(${margin_slider.left}, ${margin_slider.top})`);

		// y axis
		slider
			.append('g')
			.attr('transform', `translate(-1.25, 0)`)
			.call(
				d3
					.axisLeft(y_scale_slider)
					// .tickValues(d3.range(0, 100, 100 / 2))
					.tickValues([-100, -50, 0, 50, 100])

					.tickFormat((d) => {
						return '';
					})
			);

		slider.append('g').call(
			d3
				.axisRight(y_scale_slider)
				// .tickValues(d3.range(0, 100, 100 / 2))
				.tickValues([-100, -50, 0, 50, 100])

				.tickFormat((d) => {
					return '';
				})
		);

		slider
			.append('text')
			.attr('class', 'grain-control-slider-y-label')
			.attr('text-anchor', 'end')
			.attr('y', 6)
			.attr('dy', '.75em')
			.attr('transform', 'rotate(-90)')
			.text('Exposure offset')
			.style('fill', 'white');

		slider
			.selectAll('circle')
			.data([[0, grain.exposure_offset]])
			.join('circle')
			.attr('cx', (d) => x_scale_slider(d[0]))
			.attr('cy', (d) => y_scale_slider(d[1]))
			.attr('r', 9)
			.attr('stroke', 'white')
			.attr('stroke-width', '0.5')
			.attr('fill', (d, i) => d3.rgb(127, 127, 127).toString())
			.attr('class', 'grain-control-handle')
			// @ts-ignore
			.call(drag_slider);
	});
</script>

<div id="grain-control-container">
	<div id="grain-control-graph" />
	<div id="grain-control-slider" />
</div>

<style>

	:global(#x-marker) {
		pointer-events: none;
	}

	:global(#y-marker) {
		pointer-events: none;
	}



	#grain-control-container {
		display: flex;
		justify-content: center;
	}

	:global(.grain-control-handle:hover) {
		stroke-width: 2;
		stroke: white;
		cursor: grab;
	}

	:global(.grain-control-handle:active) {
		cursor: grabbing;
	}

	:global(.grain-control-handle) {
		transition: stroke-width 0.2s;
	}
</style>
