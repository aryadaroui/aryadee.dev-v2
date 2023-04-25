<script lang="ts">
	import ColorResponse from './ColorResponse.svelte';
	import ToneCurve from './ToneCurve.svelte';
	import GrainControl from './GrainControl.svelte';
	import ToneResponseCurve from './ToneResponseCurve.svelte';
	import * as webglUtils from './webgl_utils.js';
	import * as m3 from './webgl_2d.js';
	// these components are not perfectly encapsulated by the nature of the `d3.select()` statements
	import Canvas from './Canvas.svelte';
	import { monotonic_cubic_interpolant_partial } from './monotonic_cubic_interp.js';

	import { clamp } from './functions';

	import type { FilmicLayer } from './filmic_types';
	import { onMount } from 'svelte';
	// import { debug } from "svelte/internal";

	let filmic_layer: FilmicLayer = {
		tone_curve: [
			[0, (100 / 6) * 0],
			[1, (100 / 6) * 1],
			[2, (100 / 6) * 2],
			[3, (100 / 6) * 3],
			[4, (100 / 6) * 4],
			[5, (100 / 6) * 5],
			[6, (100 / 6) * 6]
		],

		color_response_curve: {
			hue_shift: [
				[0, 0],
				[1, 0],
				[2, 0],
				[3, 0],
				[4, 0],
				[5, 0],
				[6, 0],
				[7, 0],
				[8, 0],
				[9, 0],
				[10, 0],
				[11, 0],
				[12, 0]
			],
			saturation_shift: [
				[0, 0],
				[1, 0],
				[2, 0],
				[3, 0],
				[4, 0],
				[5, 0],
				[6, 0],
				[7, 0],
				[8, 0],
				[9, 0],
				[10, 0],
				[11, 0],
				[12, 0]
			],
			value_shift: [
				[0, 0],
				[1, 0],
				[2, 0],
				[3, 0],
				[4, 0],
				[5, 0],
				[6, 0],
				[7, 0],
				[8, 0],
				[9, 0],
				[10, 0],
				[11, 0],
				[12, 0]
			],
			alpha_shift: [
				[0, 0],
				[1, 0],
				[2, 0],
				[3, 0],
				[4, 0],
				[5, 0],
				[6, 0],
				[7, 0],
				[8, 0],
				[9, 0],
				[10, 0],
				[11, 0],
				[12, 0]
			]
		},

		grain: {
			exposure_offset: 0.0,
			size: 32.5,
			intensity: 32.5,
			tone_response_curve: [
				[0, 20],
				[1, 35],
				[2, 43],
				[3, 45],
				[4, 25],
				[5, 10],
				[6, 5]
			]
		}
	};

	function file_dialog() {
		document.getElementById('file-input').click();
		// console.log("aaaa")

		// reader.onload(() => {
		// 	dummy_file = reader.result;
		// });

		// debugger
		// console.log(files)
		// reader.readAsDataURL(files[0])
	}

	let reader;

	onMount(() => {
		// debugger
		reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				dummy_file = reader.result;
			},
			false
		);
	});

	// debugger
	// const reader = new FileReader();
	// reader.addEventListener(
	// 	'load',
	// 	() => {
	// 		dummy_file = reader.result;
	// 	},
	// 	false
	// );

	// let files;

	const array_col = (arr, n) => arr.map((x) => x[n]);

	let files;

	$: if (files) {
		reader.readAsDataURL(files[0]);
	}

	// var dummy_file: any = "/sabz.jpg";
	var dummy_file: any = '/music.jpg';
	$: file = dummy_file;

	function save_image() {
		function setRectangle(gl, x, y, width, height) {
			var x1 = x;
			var x2 = x + width;
			var y1 = y;
			var y2 = y + height;
			gl.bufferData(
				gl.ARRAY_BUFFER,
				new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
				gl.STATIC_DRAW
			);
		}

		// console.log('saving image');
		// want to use offscreen canvas but that isn't supported on safari.
		// instead we'll make a new, hidden canvas, save the blob, and then delete it.

		const image = new Image();
		image.onload = () => {
			const save_canvas = document.createElement('canvas');
			save_canvas.setAttribute('id', 'save-canvas');
			save_canvas.setAttribute('width', String(image.width));
			save_canvas.setAttribute('height', String(image.height));
			// canvas.id = 'save-canvas'

			document.getElementById('hanging-canvas-anchor').appendChild(save_canvas);

			// save_canvas.setAttribute('height', '600');

			let canvas = document.querySelector('#save-canvas');
			// @ts-ignore
			let gl = canvas.getContext('webgl2');

			// let camera = {
			// 	x: 0,
			// 	y: 0,
			// 	zoom: 1,
			// };

			let texture = gl.createTexture();
			gl.activeTexture(gl.TEXTURE0 + 0);
			gl.bindTexture(gl.TEXTURE_2D, texture);
			var mipLevel = 0; // the largest mip
			var internalFormat = gl.RGBA; // format we want in the texture
			var srcFormat = gl.RGBA; // format of data we are supplying
			var srcType = gl.UNSIGNED_BYTE; // type of data we are supplying

			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				1,
				1,
				0,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				new Uint8Array([63, 0, 0, 255])
			);

			// console.log(image);
			gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, image);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

			// const fragmentShaderSourceReq = fetch("/simple.glsl").then(
			// 	(result) => result.text()
			// );
			// const vertexShaderSourceReq = fetch("/simple_vertex.glsl").then(
			// 	(result) => result.text()
			// );

			const fragmentShaderSourceReq = fetch('/filmic.glsl').then((result) => result.text());
			const vertexShaderSourceReq = fetch('/vertex_shader.glsl').then((result) => result.text());

			const shaders = Promise.all([fragmentShaderSourceReq, vertexShaderSourceReq]).then(
				(result) => {
					const fragmentShaderSource = result[0];
					const vertexShaderSource = result[1];

					// @ts-ignore
					let program = webglUtils.createProgramFromSources(gl, [
						vertexShaderSource,
						fragmentShaderSource
					]);

					// look up where the vertex data needs to go.
					let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
					let texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord');
					let resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
					let imageLocation = gl.getUniformLocation(program, 'photo');
					let vao = gl.createVertexArray();
					gl.bindVertexArray(vao);
					let positionBuffer = gl.createBuffer();
					gl.enableVertexAttribArray(positionAttributeLocation);
					gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

					let size = 2; // 2 components per iteration
					let type = gl.FLOAT; // the data is 32bit floats
					let normalize = false; // don't normalize the data
					let stride = 0; // 0 = move forward size * sizeof(type) each
					let offset = 0; // start at the beginning of the buffer
					gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

					// provide texture coordinates for the rectangle.
					var texCoordBuffer = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
					gl.bufferData(
						gl.ARRAY_BUFFER,
						new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]),
						gl.STATIC_DRAW
					);

					gl.enableVertexAttribArray(texCoordAttributeLocation);

					// var size = 2; // 2 components per iteration
					// var type = gl.FLOAT; // the data is 32bit floats
					// var normalize = false; // don't normalize the data
					// var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
					// var offset = 0; // start at the beginning of the buffer
					gl.vertexAttribPointer(texCoordAttributeLocation, size, type, normalize, stride, offset);

					// webglUtils.resizeCanvasToDisplaySize(gl.canvas);

					gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

					gl.useProgram(program);
					gl.bindVertexArray(vao);
					gl.uniform1i(imageLocation, 0);
					gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
					setRectangle(gl, -1, -1, 2, 2);

					let mat = m3.identity();
					mat = m3.scale(mat, 1, -1); // we have to flip the image because for some reason it's upside down. TODO: figure out why lol

					gl.uniformMatrix3fv(gl.getUniformLocation(program, 'u_matrix'), false, mat);

					// set all params
					function set_uniform1f(var_name, value) {
						gl.uniform1f(gl.getUniformLocation(program, var_name), value);
					}

					function set_uniform1fv(var_name, value) {
						gl.uniform1fv(gl.getUniformLocation(program, var_name), value);
					}

					function set_uniforms() {
						set_uniform1f('camera_x', 1);

						set_uniform1f('camera_y', 1);

						set_uniform1f('camera_zoom', 1);

						let c1s, c2s, c3s;

						let curve = {
							// x: array_col(filmic_layer.tone_curve, 0)
							// 	.map((x) => x / 6)
							// 	.slice(0),

							x: [
								0, 0.16666666666666666, 0.3333333333333333, 0.5, 0.6666666666666666,
								0.8333333333333334, 1
							],
							y: array_col(filmic_layer.tone_curve, 1)
								.map((x) => x / 100)
								.slice(0)
						};

						// @ts-ignore
						[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(curve.x, curve.y);
						// debugger

						set_uniform1fv('xs_tone_curve', curve.x);
						set_uniform1fv('ys_tone_curve', curve.y);
						set_uniform1fv('c1s_tone_curve', c1s);
						set_uniform1fv('c2s_tone_curve', c2s);
						set_uniform1fv('c3s_tone_curve', c3s);

						// GRAIN CONTROL
						(curve.y = array_col(filmic_layer.grain.tone_response_curve, 1)
							.map((x) => x / 100)
							.slice(0)),
							([c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(curve.x, curve.y));

						set_uniform1fv('xs_tone_response', curve.x);
						set_uniform1fv('ys_tone_response', curve.y);
						set_uniform1fv('c1s_tone_response', c1s);
						set_uniform1fv('c2s_tone_response', c2s);
						set_uniform1fv('c3s_tone_response', c3s);

						set_uniform1f('grain_size', clamp(filmic_layer.grain.size / 10, 1.0, 100 / 10));
						set_uniform1f('offset', -filmic_layer.grain.exposure_offset / 100);
						set_uniform1f('intensity', filmic_layer.grain.intensity / 100);

						// COLOR RESPONSE
						// // HUE
						// curve.x = array_col(filmic_layer.color_response_curve.hue_shift, 0)
						// .map((x) => x / 12)

						// TODO: why are there race conditions in this sync code when using the curve.x above?
						curve.y = array_col(filmic_layer.color_response_curve.hue_shift, 1)
							.map((x) => x / 100 / 12)
							.slice(0);
						curve.x = [
							0, 0.08333333333333333, 0.16666666666666666, 0.25, 0.3333333333333333,
							0.4166666666666667, 0.5, 0.5833333333333334, 0.6666666666666666, 0.75,
							0.8333333333333334, 0.9166666666666666, 1
						];

						[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(curve.x, curve.y);

						set_uniform1fv('xs_hue_shift', curve.x);
						set_uniform1fv('ys_hue_shift', curve.y);
						set_uniform1fv('c1s_hue_shift', c1s);
						set_uniform1fv('c2s_hue_shift', c2s);
						set_uniform1fv('c3s_hue_shift', c3s);

						// // SATURATION
						curve.y = array_col(filmic_layer.color_response_curve.saturation_shift, 1)
							.map((x) => x / 100)
							.slice(0);
						// curve.x = [
						// 	0, 0.08333333333333333, 0.16666666666666666, 0.25,
						// 	0.3333333333333333, 0.4166666666666667, 0.5, 0.5833333333333334,
						// 	0.6666666666666666, 0.75, 0.8333333333333334,
						// 	0.9166666666666666, 1,
						// ];

						[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(curve.x, curve.y);
						set_uniform1fv('xs_saturation_shift', curve.x);
						set_uniform1fv('ys_saturation_shift', curve.y);
						set_uniform1fv('c1s_saturation_shift', c1s);
						set_uniform1fv('c2s_saturation_shift', c2s);
						set_uniform1fv('c3s_saturation_shift', c3s);

						// // VALUE
						curve.y = array_col(filmic_layer.color_response_curve.value_shift, 1)
							.map((x) => x / 100 / 3)
							.slice(0);
						// curve.x = [
						// 	0, 0.08333333333333333, 0.16666666666666666, 0.25,
						// 	0.3333333333333333, 0.4166666666666667, 0.5, 0.5833333333333334,
						// 	0.6666666666666666, 0.75, 0.8333333333333334,
						// 	0.9166666666666666, 1,
						// ];

						[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(curve.x, curve.y);
						set_uniform1fv('xs_value_shift', curve.x);
						set_uniform1fv('ys_value_shift', curve.y);
						set_uniform1fv('c1s_value_shift', c1s);
						set_uniform1fv('c2s_value_shift', c2s);
						set_uniform1fv('c3s_value_shift', c3s);

						// // ALPHA
						curve.y = array_col(filmic_layer.color_response_curve.alpha_shift, 1)
							.map((x) => x / 100)
							.slice(0);

						[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(curve.x, curve.y);

						set_uniform1fv('xs_alpha_shift', curve.x);
						set_uniform1fv('ys_alpha_shift', curve.y);
						set_uniform1fv('c1s_alpha_shift', c1s);
						set_uniform1fv('c2s_alpha_shift', c2s);
						set_uniform1fv('c3s_alpha_shift', c3s);
					}

					set_uniforms();

					// render

					// let primitiveType = gl.TRIANGLES;
					// // let offset = 0;
					// let count = 6;
					gl.drawArrays(gl.TRIANGLES, offset, 6);

					// let download = canvas
					// 	.toDataURL("image/png")
					// 	.replace("image/png", "image/octet-stream");

					// window.location.href = download;

					let downloadLink = document.createElement('a');
					downloadLink.setAttribute('download', 'CanvasAsImage.png');

					save_canvas.toBlob(function (blob) {
						let url = URL.createObjectURL(blob);
						downloadLink.setAttribute('href', url);
						downloadLink.click();
					});

					save_canvas.remove();
				}
			);
		};
		image.src = file;

		// class FilmicCanvasSaver {

		// 	canvas: any;

		// 	constructor() {}
		// 	init(canvas_id, photo) {
		// 		this.canvas = document.querySelector(canvas_id);
		// 	}
		// }
	}
</script>
<title>aryadee | filmic</title>
<main>
	<div id="content-container">
		<Canvas {filmic_layer} {file} />

		<div id="sidebar">
			<div class="header">
				<p>Filmic v0.3 · <a href="/blog/about-filmic">About</a> · <a href="/">Home</a> · <a href="/privacy-and-copyright">License</a></p>
				<input
					type="file"
					id="file-input"
					style="display: none;"
					accept=".jpeg, .jpg, .png"
					bind:files
				/>
				<!--  -->
				<button id="choose-file-button" on:click={file_dialog}>
					{#if files && files[0]}
						{#if files[0].name.length > 10}
							<i>{files[0].name.slice(0, 10)}</i> ... {files[0].name.substr(
								files[0].name.length - 4
							)}
						{:else}
							<i>{files[0].name}</i>
						{/if}
					{:else}
						Choose file
					{/if}
				</button>
				<button id="download-button" on:click={save_image}> Download </button>

			</div>
			<div id="sidebar-contents">
				<hr />
				<h2>Color response</h2>
				<ColorResponse bind:color_response_curve={filmic_layer.color_response_curve} />
				<hr />
				<h2>Tone curve</h2>
				<ToneCurve bind:tone_curve={filmic_layer.tone_curve} />
				<hr />
				<h2>Grain control</h2>

				<GrainControl bind:grain={filmic_layer.grain} />
				<ToneResponseCurve bind:tone_response_curve={filmic_layer.grain.tone_response_curve} />

				<hr />
			</div>
		</div>
	</div>

	<div id="hanging-canvas-anchor" />
</main>

<style lang="scss">
	/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400&display=swap'); */





	button {
		border-radius: 8px;
		border: 1px solid transparent;
		padding: 0.6em 1.2em;
		font-size: 1em;
		font-weight: 200;
		font-family: inherit;
		background-color: #1a1a1a;
		cursor: pointer;
		transition: border-color 0.5s;
		color: white;
		/* transition: background-color 0.2s; */
	}
	button:hover {
		border-color: #64c6ff;
	}
	button:focus,
	button:focus-visible {
		outline: 4px auto -webkit-focus-ring-color;
	}

	button:active {
		background-color: #2d3336;
	}

	main {
		font-family: 'swiss 721';
		font-weight: 100;
		letter-spacing: 0.1em;
		text-align: center;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}

	a {
		font-family: 'swiss 721';
		font-weight: 200;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
		color: $link-color;
	}

	p {
		text-align: center;
		font-family: 'swiss 721';
		font-weight: 200;
		letter-spacing: 0.1em;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}

	h2 {
		font-family: 'swiss 721';
		font-weight: 200;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */

		background-image: none;
		box-shadow: none;
	}

	#content-container {
		display: flex;
		justify-content: space-between;
	}

	#sidebar {
		/* font-family: 'Open Sans'; */
		/* color: #dddddd; */

		width: 450px;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		padding-left: 5px;
		padding-top: 5px;
		display: block;
		/* background-color: rgb(63, 66, 69); */
		background-color: #21252add;
		/* backdrop-filter: blur(10px); */
		overflow-y: scroll;
		border-top: 0px solid darkgray;

		border-left: 1px solid darkgrey;

		/* margin-bottom: -140px; */
	}

	@media screen and (max-width: 760px) {
		#content-container {
			flex-direction: column;
			justify-content: center;
		}
		#sidebar {
			/* width: 360px; */
			/* top: 50vh; */

			top: 100vw;

			width: 100vw;
			/* border-left: 1px solid red; */
			border-top: 1px solid darkgray;
			border-right: 1px solid darkgray;
		}

		#sidebar-contents {
			transform: scale(0.8);
			justify-content: center;

			/* margin: 0; */
			left: 0;
			/* text-align: left; */
		}
	}
</style>
