<script lang="ts">
	import * as d3 from "d3";
	import { geoOrthographic } from "d3";
	import * as d3_hsv from "d3-hsv";
	import { onMount } from "svelte";
	// import * as d3_color from "d3-color";
	import * as tools from "./functions";

	// Definitions //  //  //  //  //  //  //  //  //  //  //  //
	// type ColorResponseCurve = {
	// 	hue_shift: [number, number][];
	// 	saturation_shift: [number, number][];
	// 	value_shift: [number, number][];
	// 	alpha_shift: [number, number][];
	// }

	type ColorResponseCurve = {
		hue_shift: [number, number][];
		saturation_shift: [number, number][];
		value_shift: [number, number][];
		alpha_shift: [number, number][];
	};

	enum Colors {
		red = "red",
		orange = "orange",
		yellow = "yellow",
		chartreuse = "chartreuse",
		green = "green",
		spring = "spring",
		cyan = "cyan",
		azure = "azure",
		blue = "blue",
		violet = "violet",
		magenta = "magenta",
		rose = "rose",
	}

	enum ColorResponseMode {
		hue = "hue",
		saturation = "saturation",
		value = "value",
		alpha = "alpha",
	}

	function update_line(id: string, data: [number, number][]) {
		d3.select(id).attr("d", interp_line(data));
	}

	function hue_color_fill_interp(d) {
		return d3.interpolateSinebow((d[0] + d[1] / slider.max) / num_colors);
	}

	function saturation_color_fill_interp(d) {
		var hsv = d3_hsv.hsv(d3.interpolateSinebow(d[0] / 12));
		hsv.s = tools.clamp((hsv.s + d[1] / slider.max) * 0.75, 0.0, 1.0);

		// @ts-ignore
		return d3.rgb(hsv);
	}

	function value_color_fill_interp(d) {
		var hsv = d3_hsv.hsv(d3.interpolateSinebow(d[0] / 12));
		hsv.v = tools.clamp((hsv.v + d[1] / slider.max) * 0.75, 0.2, 1.0);

		// @ts-ignore
		return d3.rgb(hsv);
	}

	function alpha_color_fill_interp(d) {
		var hsv = d3_hsv.hsv(d3.interpolateSinebow(d[0] / 12));
		hsv.opacity = tools.clamp(hsv.opacity + d[1] / slider.max, 0.5, 1.0);

		// @ts-ignore
		return d3.rgb(hsv);
	}

	function set_color_response_mode(mode: ColorResponseMode) {
		color_response_mode = mode;
		let t = d3.transition().duration(500).ease(d3.easeCubicInOut);
		let handles = d3.selectAll(".color-response-handle").join("circle");
		let handle_interp_line = d3.select("#handle-interp-line").transition(t);

		switch (color_response_mode) {
			case ColorResponseMode.hue:
				handle_interp_line.attr(
					"d",
					interp_line(color_response_curve.hue_shift)
				);
				handles
					.data(color_response_curve.hue_shift)
					.transition(t)
					.attr("cy", (d) => y_scale(d[1]))
					.attr("fill", (d) => hue_color_fill_interp(d));
				break;
			case ColorResponseMode.saturation:
				handle_interp_line.attr(
					"d",
					interp_line(color_response_curve.saturation_shift)
				);
				// @ts-ignore

				handles
					.data(color_response_curve.saturation_shift)
					.transition(t)
					.attr("cy", (d) => y_scale(d[1]))
					.attr("fill", (d) => saturation_color_fill_interp(d));
				break;

			case ColorResponseMode.value:
				handle_interp_line.attr(
					"d",
					interp_line(color_response_curve.value_shift)
				);
				// @ts-ignore

				handles
					.data(color_response_curve.value_shift)
					.transition(t)
					.attr("cy", (d) => y_scale(d[1]))
					.attr("fill", (d) => value_color_fill_interp(d));
				break;

			case ColorResponseMode.alpha:
				handle_interp_line.attr(
					"d",
					interp_line(color_response_curve.alpha_shift)
				);
				// @ts-ignore

				handles
					.data(color_response_curve.alpha_shift)
					.transition(t)
					.attr("cy", (d) => y_scale(d[1]))
					.attr("fill", (d) => alpha_color_fill_interp(d));
				break;

			default:
				throw new Error(
					"Invalid color response mode: " + color_response_mode
				);
		}
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

		return [array, step] as const;
	}

	function dragstarted() {
		d3.select(this)
			.attr("stroke", "white")
			.attr("stroke-width", "2")
			.attr("r", 11);
	}

	// I hate this function. needs rework
	function dragged(event: DragEvent, d: number[]) {
		var page_value = tools.clamp(event.y, 0, height);
		var slider_value = y_scale_inv(page_value);

		let handle: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

		// this is still so uglyyyyyyyyyy
		// TODO: smarter way of doing this
		if (d[0] == 0 || d[0] == 12) {
			handle = d3.selectAll('circle[id = "red"]');
		} else {
			handle = d3.select(this);
		}
		handle.attr("cy", page_value);

		switch (color_response_mode) {
			case ColorResponseMode.hue:
				handle.attr("fill", hue_color_fill_interp(d));

				if (d[0] == 0 || d[0] == 12) {
					color_response_curve.hue_shift[0][1] = slider_value;
					color_response_curve.hue_shift[12][1] = slider_value;
				} else {
					color_response_curve.hue_shift[d[0]][1] = slider_value;
				}
				update_line(
					"#handle-interp-line",
					color_response_curve.hue_shift
				);
				update_line("#hue-interp-line", color_response_curve.hue_shift);

				break;
			case ColorResponseMode.saturation:
				// @ts-ignore

				handle.attr("fill", saturation_color_fill_interp(d));

				if (d[0] == 0 || d[0] == 12) {
					color_response_curve.saturation_shift[0][1] = slider_value;
					color_response_curve.saturation_shift[12][1] = slider_value;
				} else {
					color_response_curve.saturation_shift[d[0]][1] =
						slider_value;
				}
				update_line(
					"#handle-interp-line",
					color_response_curve.saturation_shift
				);
				update_line(
					"#sat-interp-line",
					color_response_curve.saturation_shift
				);
				break;

			case ColorResponseMode.value:
				// @ts-ignore

				handle.attr("fill", value_color_fill_interp(d));

				if (d[0] == 0 || d[0] == 12) {
					color_response_curve.value_shift[0][1] = slider_value;
					color_response_curve.value_shift[12][1] = slider_value;
				} else {
					color_response_curve.value_shift[d[0]][1] = slider_value;
				}
				update_line(
					"#handle-interp-line",
					color_response_curve.value_shift
				);
				update_line(
					"#val-interp-line",
					color_response_curve.value_shift
				);
				break;

			case ColorResponseMode.alpha:
				// @ts-ignore

				handle.attr("fill", alpha_color_fill_interp(d));

				if (d[0] == 0 || d[0] == 12) {
					color_response_curve.alpha_shift[0][1] = slider_value;
					color_response_curve.alpha_shift[12][1] = slider_value;
				} else {
					color_response_curve.alpha_shift[d[0]][1] = slider_value;
				}
				update_line(
					"#handle-interp-line",
					color_response_curve.alpha_shift
				);
				update_line(
					"#alp-interp-line",
					color_response_curve.alpha_shift
				);
				break;

			default:
				throw new Error(
					"Invalid color response mode: " + color_response_mode
				);
		}
	}

	function dragended() {
		d3.select(this).attr("stroke-width", "0.5").attr("r", 9);
	}

	// managing the active modes and buttons is a bit messy
	function switch_active_button(e) {
		let mode_buttons = Array.from(
			document.getElementsByClassName(
				"mode-button"
			) as HTMLCollectionOf<HTMLElement>
		);

		for (var i = 0; i < mode_buttons.length; i++) {
			mode_buttons[i].style.backgroundColor = "#1a1a1a";
		}
		e.target.style.backgroundColor = "#64c6ff";
	}

	function set_color_response_mode_hue_wrapper(e) {
		set_color_response_mode(ColorResponseMode.hue);
		switch_active_button(e);

		// d3.select('.color-response-graph-y-label')
		// 	.text("Hue shift")
		// graph
		// 	.append("text")
		// 	.attr("class", "tone-curve-graph-y-label")
		// 	.attr("text-anchor", "end")
		// 	.attr("y", 6)
		// 	.attr("dy", ".75em")
		// 	.attr("transform", "rotate(-90)")
		// 	.style("fill", "white")
		// 	.text("Tone curve")
	}

	function set_color_response_mode_saturation_wrapper(e) {
		set_color_response_mode(ColorResponseMode.saturation);
		switch_active_button(e);

		// d3.select('.color-response-graph-y-label')
		// 	.transition()
		// 	.duration(500)
		// 	.text("Saturation shift")
	}

	function set_color_response_mode_value_wrapper(e) {
		set_color_response_mode(ColorResponseMode.value);
		switch_active_button(e);
	}

	function set_color_response_mode_alpha_wrapper(e) {
		set_color_response_mode(ColorResponseMode.alpha);
		switch_active_button(e);
	}

	// Initialize //  //  //  //  //  //  //  //  //  //  //  //
	export var color_response_curve: ColorResponseCurve; // should this be "curve" or "curves"? Each curve must have 13 elements!
	var color_response_mode = ColorResponseMode.hue;

	const margin = { top: 12, right: 30, bottom: 12, left: 12 };
	const width = 400 - margin.left - margin.right;
	const height = 300 - margin.top - margin.bottom;
	const slider = { max: 100, min: -100 };
	const num_colors = 12; // can get this from length of Object.values of Colors too
	const num_handles = num_colors + 1; // because color is a wheel, and we want to show the the last handle as the first

	const x_scale = d3.scaleLinear().domain([0, 12]).range([0, width]);
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
		.x((d) => x_scale(d[0] + 0.5))
		.y((d) => y_scale(d[1]))
		.curve(d3.curveMonotoneX);

	const drag = d3
		.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);

	const num_rainbow_rect = 50;
	// const rainbow_axis_line = distribute_along_x(
	// 	num_rainbow_rect,
	// 	num_colors,
	// 	0.5,
	// 	0
	// );

	const [rainbow_axis_line, rainbow_axis_step] = distribute_along_x(
		0.5,
		12.5,
		num_rainbow_rect,
		0,
		0
	);

	const background_line_gray_level = 200;
	const background_line_gray_level_opacity = 0.7;

	onMount(() => {
		// the mode has already been init to hue, but we need to show this visually
		document.getElementById("hue-button").style.backgroundColor = "#64c6ff";

		const graph = d3
			.select("#color-response-graph")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		graph.append("g").call(
			d3
				.axisLeft(y_scale)
				.ticks(4)
				.tickFormat((d) => {
					return "";
				})
		);

		graph
			.append("text")
			.attr("class", "color-response-graph-y-label")
			.attr("text-anchor", "end")
			.attr("y", 6)
			.attr("dy", ".75em")
			.attr("transform", "rotate(-90)")
			.style("fill", "white")
			.text("Shift");

		graph
			.append("path")
			.datum(color_response_curve.hue_shift)
			.attr("id", "hue-interp-line")
			.attr("class", "interp-line")
			.attr("fill", "none")
			.attr(
				"stroke",
				d3
					.rgb(
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level_opacity
					)
					.toString()
			)
			.attr("stroke-width", 1.25)
			.attr("d", interp_line);

		graph
			.append("path")
			.datum(color_response_curve.saturation_shift)
			.attr("id", "sat-interp-line")
			.attr("class", "interp-line")
			.attr("fill", "none")
			.attr(
				"stroke",
				d3
					.rgb(
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level_opacity
					)
					.toString()
			)
			.attr("stroke-width", 1.25)
			.attr("d", interp_line);

		graph
			.append("path")
			.datum(color_response_curve.value_shift)
			.attr("id", "val-interp-line")
			.attr("class", "interp-line")
			.attr("fill", "none")
			.attr(
				"stroke",
				d3
					.rgb(
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level_opacity
					)
					.toString()
			)
			.attr("stroke-width", 1.25)
			.attr("d", interp_line);

		graph
			.append("path")
			.datum(color_response_curve.alpha_shift)
			.attr("id", "alp-interp-line")
			.attr("class", "interp-line")
			.attr("fill", "none")
			.attr(
				"stroke",
				d3
					.rgb(
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level,
						background_line_gray_level_opacity
					)
					.toString()
			)
			.attr("stroke-width", 1.25)
			.attr("d", interp_line);

		graph
			.selectAll("rect")
			.data(rainbow_axis_line)
			.join("rect")
			.attr("x", (d) => x_scale(d[0]))
			.attr("y", (d) => y_scale(d[1] + 0.7))
			.attr("width", 7)
			.attr("height", 2)
			.attr("stroke", "none")
			.attr("fill", (d, i) =>
				d3.interpolateSinebow(i / num_rainbow_rect)
			);
		// expanded red sides of rainbow axis
		graph
			.append("rect")
			.attr("x", x_scale(0.05))
			.attr("y", y_scale(+0.7))
			.attr("width", 13.0)
			.attr("height", 2)
			.attr("fill", d3.rgb(255, 64, 64).toString());
		graph
			.append("rect")
			.attr("x", x_scale(12.45))
			.attr("y", y_scale(+0.7))
			.attr("width", 17.0)
			.attr("height", 2)
			.attr("fill", d3.rgb(255, 64, 64).toString());

		// control handles
		graph
			.selectAll("circle")
			.data(color_response_curve.hue_shift)
			.join("circle")
			.attr("cx", (d) => x_scale(d[0] + 0.5))
			.attr("cy", (d) => y_scale(d[1]))
			.attr("r", 9)
			.attr("stroke", "white")
			.attr("stroke-width", "0.5")
			.attr("fill", (d, i) => d3.interpolateSinebow(i / 12))
			.attr("id", (d, i) => Object.values(Colors)[i % 12])
			.attr("class", "color-response-handle")
			// @ts-ignore
			.call(drag);

		graph
			.append("path")
			.datum(color_response_curve.hue_shift)
			.attr("id", "handle-interp-line")
			.attr("class", "interp-line")
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-width", 1.5)
			.attr("d", interp_line);
	});
</script>

<div id="color-response-container">
	<div id="color-response-graph" />
	<!-- <p>
		hue shift red: {color_response_curve.hue_shift[0]}
	</p> -->
	<div id="color-response-buttons">
		<button
			id="hue-button"
			class="mode-button"
			on:click={set_color_response_mode_hue_wrapper}
		>
			H
		</button>
		<button
			id="saturation-button"
			class="mode-button"
			on:click={set_color_response_mode_saturation_wrapper}
		>
			S
		</button>
		<button
			id="value-button"
			class="mode-button"
			on:click={set_color_response_mode_value_wrapper}
		>
			V
		</button>
		<button
			id="alpha-button"
			class="mode-button"
			on:click={set_color_response_mode_alpha_wrapper}
		>
			A
		</button>
	</div>
</div>

<style>
	/* TODO: Workaround for :global(). Using :global() prevents component-level encapsulation of the styling of these classes. unfortunately, these classes are added in onMount(), so Svelte doesn't know about them at compile time and therefore they're ignored unless we use :global(). */
	:global(.interp-line) {
		/* width:100%; */
		/* height:auto; */
		pointer-events: none;
	}


	:global(.color-response-handle) {
		transition: stroke-width 0.2s;
	}

	:global(.color-response-handle:hover) {
		stroke-width: 2;
		stroke: white;
		cursor: grab;
	}

	:global(.color-response-handle:active) {
		cursor: grabbing;
	}

	.mode-button {
		border-radius: 8px;
		border: 1px solid transparent;
		padding: 0.6em 1.2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: #1a1a1a;
		cursor: pointer;
		transition: border-color 0.5s;
		color: white;
	}

	.mode-button:hover {
		border-color: #64c6ff;
	}

	.mode-button:active {
		background-color: #2d3336;
	}

	.mode-button:focus,
	.mode-button:focus-visible {
		outline: 4px auto -webkit-focus-ring-color;
	}





	
</style>
