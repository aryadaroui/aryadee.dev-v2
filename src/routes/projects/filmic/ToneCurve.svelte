<script lang="ts">
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import * as tools from "./functions";

	// Definitions //  //  //  //  //  //  //  //  //  //  //  //

	function update_line(id: string, data: [number, number][]) {
		d3.select(id).attr("d", interp_line(data));
	}

	function grayscale_interp(x) {
		return d3.rgb(x, x, x);
	}

	// function distribute_along_x(
	// 	num_elements: number,
	// 	step: number,
	// 	x_offset: number,
	// 	y_offset: number
	// ): [number, number][] {
	// 	if (!Number.isSafeInteger(num_elements)) {
	// 		throw new RangeError(
	// 			"`length` must be an integer; invalid value: " + num_elements
	// 		);
	// 	}

	// 	let array = Array(num_elements);
	// 	for (let index = 0; index < num_elements; index++) {
	// 		array[index] = [(index / num_elements) * step + x_offset, y_offset];
	// 	}

	// 	return array;
	// }

	function distribute_along_x(start, stop, num, x_offset, y_offset) {
		let step = (stop - start) / num;
		let range = d3.range(start, stop, step);

		let array = Array(num);

		for (let index = 0; index < array.length; index++) {
			array[index] = [range[index] + x_offset, y_offset];
			// array[index] = [(index / num_elements) * step + x_offset, y_offset];
		}

		// debugger;

		return [array, step ]as const;
	}

	function dragstarted() {
		d3.select(this)
			.attr("stroke", "white")
			.attr("stroke-width", "2")
			.attr("r", 11.5);
	}

	function dragged(event: DragEvent, d: number[]) {
		let page_value = tools.clamp(event.y, 0, height);
		let slider_value = y_scale_inv(page_value);
		let handle = d3.select(this);

		handle.attr("cy", page_value);
		handle.attr(
			"fill",
			d3
				.rgb(
					(255 / 100) * slider_value,
					(255 / 100) * slider_value,
					(255 / 100) * slider_value
				)
				.toString()
		); // change color fill
		tone_curve[d[0]][1] = slider_value;
		update_line("#tone-curve-interp-line", tone_curve);
	}

	function dragended() {
		d3.select(this).attr("stroke-width", "0.5").attr("r", 9);
	}

	// Initialize //  //  //  //  //  //  //  //  //  //  //  //
	export var tone_curve;

	const margin = { top: 13, right: 30, bottom: 30, left: 12 };
	const width = 400 - margin.left - margin.right;
	const height = 300 - margin.top - margin.bottom;
	const slider = { min: 0, max: 100 };

	const num_handles = 7;

	const x_scale = d3.scaleLinear().domain([0, 6]).range([0, width]);
	const y_scale = d3
		.scaleLinear()
		.domain([slider.min, slider.max])
		.range([height, 0]);

	const y_scale_inv = d3
		.scaleLinear()
		.domain([height, 0])
		.range([slider.min, slider.max]);

	const interp_line = d3
		.line()
		.x((d) => x_scale(d[0] + 0.26))
		.y((d) => y_scale(d[1]))
		.curve(d3.curveMonotoneX);

	const drag = d3
		.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);

	const grayscale_axis_num = 50;
	const [ grayscale_axis_line, grayscale_axis_step ] = distribute_along_x(
		0.26,
		6.26,
		grayscale_axis_num,
		0,
		0
	);

	onMount(() => {
		const graph = d3
			.select("#tone-curve-graph")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);


		graph.append("g").call(
			d3
				.axisLeft(y_scale)
				.tickValues(d3.range(0, 100, 100 / 6))
				.tickFormat((d) => {
					return "";
				})
		);


		// axis
		graph
			.selectAll("rect")
			.data(grayscale_axis_line)
			.join("rect")
			.attr("x", (d) => x_scale(d[0]))
			.attr("y", (d) => y_scale(d[1]))
			.attr("width", 7.9)
			.attr("height", 2)
			.attr("stroke", "none")
			.attr("fill", (d, i) =>
				d3
					.rgb((255 / grayscale_axis_num) * i, (255 / grayscale_axis_num) * i, (255 / grayscale_axis_num) * i)
					.toString()
			);

		graph
		.append("rect")
		.attr("x", x_scale(0.05))
		.attr("y", y_scale(0))
		.attr("width", 12.0)
		.attr("height", 2)
		.attr("fill", d3.rgb(0, 0, 0).toString());

		graph
		.append("rect")
		.attr("x", x_scale(6.27))
		.attr("y", y_scale(0))
		.attr("width", 20.0)
		.attr("height", 2)
		.attr("fill", d3.rgb(255, 255, 255).toString());		

		graph
			.append("text")
			.attr("class", "tone-curve-graph-y-label")
			.attr("text-anchor", "end")
			.attr("y", 6)
			.attr("dy", ".75em")
			.attr("transform", "rotate(-90)")
			.style("fill", "white")
			.text("Tone");

		// control handles
		graph
			.selectAll("circle")
			.data(tone_curve)
			.join("circle")
			.attr("cx", (d) => x_scale(d[0] + 0.26))
			.attr("cy", (d) => y_scale(d[1]))
			.attr("r", 9)
			.attr("stroke", "white")
			.attr("stroke-width", "0.5")
			.attr("fill", (d, i) =>
				d3.rgb((255 / 6) * i, (255 / 6) * i, (255 / 6) * i).toString()
			)
			.attr("class", "tone-curve-handle")
			// @ts-ignore
			.call(drag);

		graph
			.append("path")
			.datum(tone_curve)
			.attr("id", "tone-curve-interp-line")
			.attr("class", "interp-line")
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-width", 1.5)
			.attr("d", interp_line);
	});
</script>

<div id="tone-curve-container">
	<div id="tone-curve-graph" />
</div>

<style>
	/* TODO: Workaround for :global(). Using :global() prevents component-level encapsulation of the styling of these classes. unfortunately, these classes are added in onMount(), so Svelte doesn't know about them at compile time and therefore they're ignored unless we use :global(). */
	:global(.interp-line) {
		/* width:100%; */
		/* height:auto; */
		pointer-events: none;
	}

	:global(.tone-curve-handle:hover) {
		stroke-width: 2;
		stroke: white;
		cursor: grab;
	}

	:global(.tone-curve-handle) {
		transition: stroke-width 0.2s;
	}

	:global(.tone-curve-handle:active) {
		cursor: grabbing;
	}

</style>
