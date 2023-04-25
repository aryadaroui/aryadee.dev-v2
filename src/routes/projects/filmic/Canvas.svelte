<script>
	import * as webglUtils from "./webgl_utils.js";
	import * as m3 from "./webgl_2d.js";
	import { onMount } from "svelte";
	import { monotonic_cubic_interpolant_partial } from "./monotonic_cubic_interp.js";
	import { clamp } from "./functions";
    import { debug } from "svelte/internal";

	// import type {FilmicLayer } from "./filmic_types";

	const array_col = (arr, n) => arr.map((x) => x[n]);

	export let filmic_layer;
	export let file;

	// let photo = new Image();

	// debugger

	$: photo = handle_file(file);

	$: on_film_change(filmic_layer);

	var count = 0;

	function handle_file(file) {
		// debugger

		if (count > 0) {
			filmic_canvas.init("#canvas", file);
		}
		count++;
		return file;
	}

	// function handle_file(file) {
	// 	// debugger
	// 	let dummy;
	// 	const reader = new FileReader();
	// 	reader.addEventListener(
	// 		"load",
	// 		() => {
	// 			// return reader.result;
	// 			dummy = reader.result;
	// 		},
	// 		false
	// 	);
	// 	if (typeof file === "undefined") {
	// 		return "/sabz.jpg";
	// 	} else {
	// 		// return "/log.jpg";
	// 		reader.readAsDataURL(file[0]);
	// 		filmic_canvas.init("#canvas", dummy);
	// 		// debugger
	// 		return dummy;
	// 	}
	// 	// return file;
	// }

	function on_film_change(filmic_layer) {
		if (filmic_canvas.is_init) {
			// TONE CURVE
			let xs, ys, c1s, c2s, c3s;

			// debugger
			let curve = {
				// x: array_col(filmic_layer.tone_curve, 0)
				// 	.map((x) => x / 6)
				// 	.slice(0),

				x: [
					0, 0.16666666666666666, 0.3333333333333333, 0.5,
					0.6666666666666666, 0.8333333333333334, 1,
				],
				y: array_col(filmic_layer.tone_curve, 1)
					.map((x) => x / 100)
					.slice(0),
			};

			[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(
				curve.x,
				curve.y
			);

			filmic_canvas.set_uniform1fv("xs_tone_curve", curve.x);
			filmic_canvas.set_uniform1fv("ys_tone_curve", curve.y);
			filmic_canvas.set_uniform1fv("c1s_tone_curve", c1s);
			filmic_canvas.set_uniform1fv("c2s_tone_curve", c2s);
			filmic_canvas.set_uniform1fv("c3s_tone_curve", c3s);

			// GRAIN CONTROL
			(curve.y = array_col(filmic_layer.grain.tone_response_curve, 1)
				.map((x) => x / 100)
				.slice(0)),
				([c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(
					curve.x,
					curve.y
				));

			filmic_canvas.set_uniform1fv("xs_tone_response", curve.x);
			filmic_canvas.set_uniform1fv("ys_tone_response", curve.y);
			filmic_canvas.set_uniform1fv("c1s_tone_response", c1s);
			filmic_canvas.set_uniform1fv("c2s_tone_response", c2s);
			filmic_canvas.set_uniform1fv("c3s_tone_response", c3s);

			filmic_canvas.set_uniform1f(
				"grain_size",
				clamp(filmic_layer.grain.size / 10, 1.0, 100 / 10)
			);
			filmic_canvas.set_uniform1f(
				"offset",
				-filmic_layer.grain.exposure_offset / 100
			);
			filmic_canvas.set_uniform1f(
				"intensity",
				filmic_layer.grain.intensity / 100
			);

			// COLOR RESPONSE
			// // HUE
			// curve.x = array_col(filmic_layer.color_response_curve.hue_shift, 0)
			// .map((x) => x / 12)

			// TODO: why are there race conditions in this sync code when using the curve.x above?
			curve.y = array_col(filmic_layer.color_response_curve.hue_shift, 1)
				.map((x) => x / 100 / 12)
				.slice(0);
			curve.x = [
				0, 0.08333333333333333, 0.16666666666666666, 0.25,
				0.3333333333333333, 0.4166666666666667, 0.5, 0.5833333333333334,
				0.6666666666666666, 0.75, 0.8333333333333334,
				0.9166666666666666, 1,
			];

			[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(
				curve.x,
				curve.y
			);

			filmic_canvas.set_uniform1fv("xs_hue_shift", curve.x);
			filmic_canvas.set_uniform1fv("ys_hue_shift", curve.y);
			filmic_canvas.set_uniform1fv("c1s_hue_shift", c1s);
			filmic_canvas.set_uniform1fv("c2s_hue_shift", c2s);
			filmic_canvas.set_uniform1fv("c3s_hue_shift", c3s);

			// // SATURATION
			curve.y = array_col(
				filmic_layer.color_response_curve.saturation_shift,
				1
			)
				.map((x) => x / 100)
				.slice(0);
			// curve.x = [
			// 	0, 0.08333333333333333, 0.16666666666666666, 0.25,
			// 	0.3333333333333333, 0.4166666666666667, 0.5, 0.5833333333333334,
			// 	0.6666666666666666, 0.75, 0.8333333333333334,
			// 	0.9166666666666666, 1,
			// ];

			[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(
				curve.x,
				curve.y
			);
			filmic_canvas.set_uniform1fv("xs_saturation_shift", curve.x);
			filmic_canvas.set_uniform1fv("ys_saturation_shift", curve.y);
			filmic_canvas.set_uniform1fv("c1s_saturation_shift", c1s);
			filmic_canvas.set_uniform1fv("c2s_saturation_shift", c2s);
			filmic_canvas.set_uniform1fv("c3s_saturation_shift", c3s);

			// // VALUE
			curve.y = array_col(
				filmic_layer.color_response_curve.value_shift,
				1
			)
				.map((x) => x / 100 / 3)
				.slice(0);
			// curve.x = [
			// 	0, 0.08333333333333333, 0.16666666666666666, 0.25,
			// 	0.3333333333333333, 0.4166666666666667, 0.5, 0.5833333333333334,
			// 	0.6666666666666666, 0.75, 0.8333333333333334,
			// 	0.9166666666666666, 1,
			// ];

			[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(
				curve.x,
				curve.y
			);
			filmic_canvas.set_uniform1fv("xs_value_shift", curve.x);
			filmic_canvas.set_uniform1fv("ys_value_shift", curve.y);
			filmic_canvas.set_uniform1fv("c1s_value_shift", c1s);
			filmic_canvas.set_uniform1fv("c2s_value_shift", c2s);
			filmic_canvas.set_uniform1fv("c3s_value_shift", c3s);

			// // ALPHA
			curve.y = array_col(
				filmic_layer.color_response_curve.alpha_shift,
				1
			)
				.map((x) => x / 100)
				.slice(0);

			[c1s, c2s, c3s] = monotonic_cubic_interpolant_partial(
				curve.x,
				curve.y
			);

			filmic_canvas.set_uniform1fv("xs_alpha_shift", curve.x);
			filmic_canvas.set_uniform1fv("ys_alpha_shift", curve.y);
			filmic_canvas.set_uniform1fv("c1s_alpha_shift", c1s);
			filmic_canvas.set_uniform1fv("c2s_alpha_shift", c2s);
			filmic_canvas.set_uniform1fv("c3s_alpha_shift", c3s);

			filmic_canvas.render();
		}
	}

	// // //

	class FilmicCanvas {
		// gl: any;
		// canvas: any;

		// camera: { x: number; y: number; rotation: number; zoom: number };
		constructor() {
			this.is_init = false;
		}

		draw() {
			// this.gl.clear(this.gl.COLOR_BUFFER_BIT);

			this.updateViewProjection();

			let mat = m3.identity();
			// mat = m3.translate(mat, , 0);
			// mat = m3.translate(mat, this.camera.x, this.camera.y);
			// // mat = m3.rotate(mat, rotation);
			// mat = m3.scale(mat, 1, 1);
			// mat = m3.scale(mat,  1, this.camera.zoom);

			mat = m3.multiply(this.viewProjectionMat, mat);

			// debugger
			this.gl.uniformMatrix3fv(
				this.gl.getUniformLocation(this.program, "u_matrix"),
				false,
				mat
			);

			this.set_uniform1f("camera_x", this.camera.x);
			this.set_uniform1f("camera_y", this.camera.y);
			this.set_uniform1f("camera_zoom", this.camera.zoom);

			this.render();
		}
		makeCameraMatrix() {
			const zoomScale = 1 / this.camera.zoom;
			let cameraMat = m3.identity();
			cameraMat = m3.translate(cameraMat, this.camera.x, this.camera.y);
			// cameraMat = m3.rotate(cameraMat, this.camera.rotation);
			cameraMat = m3.scale(cameraMat, zoomScale, zoomScale);
			return cameraMat;
		}

		updateViewProjection() {
			// same as ortho(0, width, height, 0, -1, 1)
			const projectionMat = m3.projection(
				this.canvas.width,
				this.canvas.height
			);
			const cameraMat = this.makeCameraMatrix();
			let viewMat = m3.inverse(cameraMat);
			this.viewProjectionMat = m3.multiply(projectionMat, viewMat);
		}

		getClipSpaceMousePosition(e) {
			// get canvas relative css position
			const rect = this.canvas.getBoundingClientRect();
			const cssX = e.clientX - rect.left;
			const cssY = e.clientY - rect.top;

			// get normalized 0 to 1 position across and down canvas
			const normalizedX = cssX / this.canvas.clientWidth;
			const normalizedY = cssY / this.canvas.clientHeight;

			// convert to clip space
			const clipX = normalizedX * 2 - 1;
			const clipY = normalizedY * -2 + 1;

			return [clipX, clipY];
		}

		init(canvas_id, photo) {
			// this.canvas = document.querySelector("#canvas");
			// image.src = "/cassie.jpg";
			// debugger

			this.canvas = document.querySelector(canvas_id);
			this.gl = this.canvas.getContext("webgl2");
			if (!this.gl) {
				return;
			}

			this.camera = {
				x: 0,
				y: 0,
				rotation: 0,
				zoom: 1,
			};

			let startInvViewProjMat;
			let startCamera;
			let startPos;
			let startClipPos;
			let startMousePos;

			this.updateViewProjection();
			var self = this;

			function moveCamera(e) {
				const [clipX, clipY] = self.getClipSpaceMousePosition(e);

				// clipX = 0.0;
				// clipY = 0.0;

				const pos = m3.transformPoint(startInvViewProjMat, [
					clipX,
					clipY,
				]);

				self.camera.x = startCamera.x + startPos[0] - pos[0];
				self.camera.y = startCamera.y + startPos[1] - pos[1];
				self.draw();
			}

			function handleMouseUp(e) {
				// this.rotate = false;
				self.draw();
				window.removeEventListener("mousemove", moveCamera);
				window.removeEventListener("mouseup", handleMouseUp);
			}

			self.canvas.addEventListener("mousedown", (e) => {
				if (e.button === 0 || e.button === 1) {
					e.preventDefault();
					window.addEventListener("mousemove", moveCamera);
					window.addEventListener("mouseup", handleMouseUp);

					// rotate = e.shiftKey;
					startInvViewProjMat = m3.inverse(self.viewProjectionMat);
					startCamera = Object.assign({}, self.camera);
					startClipPos = self.getClipSpaceMousePosition(e);
					startPos = m3.transformPoint(
						startInvViewProjMat,
						startClipPos
					);
					startMousePos = [e.clientX, e.clientY];
					self.draw();
				}
			});

			self.canvas.addEventListener("wheel", (e) => {
				e.preventDefault();
				var [clipX, clipY] = self.getClipSpaceMousePosition(e);
				const [preZoomX, preZoomY] = m3.transformPoint(
					m3.inverse(self.viewProjectionMat),
					[clipX, clipY]
				);
				const newZoom =
					self.camera.zoom * Math.pow(2.0, e.deltaY * -0.001);
				self.camera.zoom = Math.max(0.05, Math.min(8, newZoom));
				self.updateViewProjection();

				// position after zooming
				const [postZoomX, postZoomY] = m3.transformPoint(
					m3.inverse(self.viewProjectionMat),
					[clipX, clipY]
				);

				// camera needs to be moved the difference of before and after
				self.camera.x += preZoomX - postZoomX;
				self.camera.y += preZoomY - postZoomY;

				// console.log("zoom", self.camera.zoom);

				self.draw();
			});

			/// /// /// ///
			const fragmentShaderSourceReq = fetch("/filmic.glsl").then(
				(result) => result.text()
			);

			// const fragmentShaderSourceReq = fetch(vert_shader_src).then(
			// 	(result) => result.text()
			// );
			const vertexShaderSourceReq = fetch("/vertex_shader.glsl").then(
				(result) => result.text()
			);
			// debugger

			// var tex = this.gl.createTexture();
			// this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
			// this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
			//               new Uint8Array([255, 0, 0, 255])); // red

			// image.onload = () =>

			// image.addEventListener("load", () => {
			
			// debugger
			const image = new Image();
			image.onload = () => {
				// debugger
				// Create a texture.
				var texture = self.gl.createTexture();

				// make unit 0 the active texture uint
				// (ie, the unit all other texture commands will affect
				self.gl.activeTexture(self.gl.TEXTURE0 + 0);

				// Bind it to texture unit 0' 2D bind point
				self.gl.bindTexture(self.gl.TEXTURE_2D, texture);

				// Fill the texture with a 1x1 blue pixel.
				self.gl.texImage2D(
					self.gl.TEXTURE_2D,
					0,
					self.gl.RGBA,
					1,
					1,
					0,
					self.gl.RGBA,
					self.gl.UNSIGNED_BYTE,
					new Uint8Array([0, 0, 255, 255])
				);

				var mipLevel = 0; // the largest mip
				var internalFormat = self.gl.RGBA; // format we want in the texture
				var srcFormat = self.gl.RGBA; // format of data we are supplying
				var srcType = self.gl.UNSIGNED_BYTE; // type of data we are supplying

				// console.image(image)
				// debugger

				self.gl.texImage2D(
					self.gl.TEXTURE_2D,
					mipLevel,
					internalFormat,
					srcFormat,
					srcType,
					image
				);

				// Set the parameters so we don't need mips and so we're not filtering
				// and we don't repeat at the edges
				self.gl.texParameteri(
					self.gl.TEXTURE_2D,
					self.gl.TEXTURE_WRAP_S,
					self.gl.CLAMP_TO_EDGE
				);
				self.gl.texParameteri(
					self.gl.TEXTURE_2D,
					self.gl.TEXTURE_WRAP_T,
					self.gl.CLAMP_TO_EDGE
				);

				self.gl.texParameteri(
					self.gl.TEXTURE_2D,
					self.gl.TEXTURE_MIN_FILTER,
					self.gl.NEAREST
				);
				// self.gl.texParameteri(self.gl.TEXTURE_2D, self.gl.TEXTURE_MIN_FILTER, self.gl.LINEAR_MIPMAP_NEAREST);

				self.gl.texParameteri(
					self.gl.TEXTURE_2D,
					self.gl.TEXTURE_MAG_FILTER,
					self.gl.NEAREST
				);

				// console.log("image loaded: " + image.src);

				window.addEventListener("keypress", (e) => {
					e.preventDefault();
					// console.log(e.key);
					if (e.key == "Enter") {
						// set the camera so that the image is in the center
						if (image.width > image.height) {
							self.camera.zoom = self.canvas.width / image.width;
							self.camera.y =
								-(
									self.canvas.height / self.camera.zoom -
									image.height
								) / 2;
							self.camera.x = 0;
						} else {
							self.camera.zoom =
								self.canvas.height / image.height;
							self.camera.x =
								-(
									self.canvas.width / self.camera.zoom -
									image.width
								) / 2;
							self.camera.y = 0;
						}
					} else if (e.key == " ") {
						self.camera.zoom = 1.0;
						self.camera.x =
							-(
								self.canvas.width / self.camera.zoom -
								image.width
							) / 2;
						self.camera.y =
							-(
								self.canvas.height / self.camera.zoom -
								image.height
							) / 2;
					}

					self.draw();
				});
				// self.draw();

				// used to stop here

				const shaders = Promise.all([
					fragmentShaderSourceReq,
					vertexShaderSourceReq,
				]).then((result) => {
					const fragmentShaderSource = result[0];
					const vertexShaderSource = result[1];
					// Upload the image into the texture.

					// if (image.complete) {
					// 	console.log(" AAAAA")
					// }

					// image.src = "sabz.jpg";
					//  image.src = "luke.jpg";
					// image.src = "/cassie.jpg";
					// image.src = "/music.jpg";

					// var program;
					// Promise.all([fragmentShaderSource, vertexShaderSource]).then(results => program = webglUtils.createProgramFromSources(this.gl, [results[0], results[1]]));

					// setup GLSL program
					// @ts-ignore
					this.program = webglUtils.createProgramFromSources(
						this.gl,
						[vertexShaderSource, fragmentShaderSource]
					);

					// look up where the vertex data needs to go.
					var positionAttributeLocation = this.gl.getAttribLocation(
						this.program,
						"a_position"
					);
					var texCoordAttributeLocation = this.gl.getAttribLocation(
						this.program,
						"a_texCoord"
					);
					var resolutionLocation = this.gl.getUniformLocation(
						this.program,
						"u_resolution"
					);
					var imageLocation = this.gl.getUniformLocation(
						this.program,
						"photo"
					);

					// Create a vertex array object (attribute state)
					// and make it the one we're currently working with
					var vao = this.gl.createVertexArray();
					this.gl.bindVertexArray(vao);

					// Create a buffer and put a single pixel space rectangle in
					// it (2 triangles)
					var positionBuffer = this.gl.createBuffer();

					// Turn on the attribute
					this.gl.enableVertexAttribArray(positionAttributeLocation);

					// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

					// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
					var size = 2; // 2 components per iteration
					var type = this.gl.FLOAT; // the data is 32bit floats
					var normalize = false; // don't normalize the data
					var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
					var offset = 0; // start at the beginning of the buffer
					this.gl.vertexAttribPointer(
						positionAttributeLocation,
						size,
						type,
						normalize,
						stride,
						offset
					);

					// provide texture coordinates for the rectangle.
					var texCoordBuffer = this.gl.createBuffer();
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
					this.gl.bufferData(
						this.gl.ARRAY_BUFFER,
						new Float32Array([
							0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0,
							1.0, 1.0,
						]),
						this.gl.STATIC_DRAW
					);

					// Turn on the attribute
					this.gl.enableVertexAttribArray(texCoordAttributeLocation);

					// Tell the attribute how to get data out of texCoordBuffer (ARRAY_BUFFER)
					var size = 2; // 2 components per iteration
					var type = this.gl.FLOAT; // the data is 32bit floats
					var normalize = false; // don't normalize the data
					var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
					var offset = 0; // start at the beginning of the buffer
					this.gl.vertexAttribPointer(
						texCoordAttributeLocation,
						size,
						type,
						normalize,
						stride,
						offset
					);

					// this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

					// this.gl.clearColor(0.3, 0.3, 0.3, 1.0);

					// this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, image);

					// // testing mipmap stuff
					// this.gl.generateMipmap(this.gl.TEXTURE_2D);

					// this.gl.canvas.width = 800;
					// this.gl.canvas.height = 100;

					webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);

					// Tell WebGL how to convert from clip space to pixels
					this.gl.viewport(
						0,
						0,
						this.gl.canvas.width,
						this.gl.canvas.height
					);

					// Clear the canvas
					this.gl.clearColor(0.3, 0.31, 0.32, 1.0);
					// this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

					// Tell it to use our program (pair of shaders)
					this.gl.useProgram(this.program);

					// Bind the attribute/buffer set we want.
					this.gl.bindVertexArray(vao);

					// Pass in the canvas resolution so we can convert from
					// pixels to clipspace in the shader
					this.gl.uniform2f(
						resolutionLocation,
						this.gl.canvas.width,
						this.gl.canvas.height
					);

					// Tell the shader to get the texture from texture unit 0
					this.gl.uniform1i(imageLocation, 0);

					// this.gl.uniform1f(this.gl.getUniformLocation(this.program, "brightness"), 1.0);

					// Bind the position buffer so gl.bufferData that will be called
					// in setRectangle puts data in the position buffer
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

					// Set a rectangle the same size as the image.

					// this.setRectangle(this.gl, 0, 0, image.width, image.height);

					// set the camera so that the image is in the center
					if (image.width > image.height) {
						this.camera.zoom = this.canvas.width / image.width;
						this.camera.y =
							-(
								this.canvas.height / this.camera.zoom -
								image.height
							) / 2;
					} else {
						this.camera.zoom = this.canvas.height / image.height;
						this.camera.x =
							-(
								this.canvas.width / this.camera.zoom -
								image.width
							) / 2;
					}
					this.set_uniform1f("camera_zoom", this.camera.zoom);

					// this.setRectangle(this.gl, (this.gl.canvas.width - image.width) / 2, (this.gl.canvas.height - image.height) / 2, image.width, image.height);
					this.setRectangle(this.gl, 0, 0, image.width, image.height);
					// this.setRectangle(this.gl, -1.0, 1.0, image.width, image.height);

					this.updateViewProjection();
					let mat = m3.identity();

					// mat = m3.translate(mat, 100, 100);
					// mat = m3.rotate(mat, rotation);
					// mat = m3.scale(mat, scale, scale);
					// mat = m3.scale(mat, 1.5, 1.5);

					mat = m3.multiply(this.viewProjectionMat, mat);

					this.gl.uniformMatrix3fv(
						this.gl.getUniformLocation(this.program, "u_matrix"),
						false,
						mat
					);

					// // Draw the rectangle.
					// var primitiveType = this.gl.TRIANGLES;
					// var offset = 0;
					// var count = 6;
					// this.gl.drawArrays(primitiveType, offset, count);
					// this.draw()

					this.is_init = true;

					on_film_change(filmic_layer);

					this.render();
				});
			};
			image.src = photo;
		}

		// async fetch_shaders() {
		// 	this.fragmentShaderSource = await fetch("./frag_shader.glsl").then(result => result.text());
		// 	// const fragmentShaderSource = await fetch("./tone_curve_5.glsl").then(result => result.text());
		// 	this.vertexShaderSource = await fetch("./vertex_shader.glsl").then(result => result.text());
		// }

		setRectangle(gl, x, y, width, height) {
			var x1 = x;
			var x2 = x + width;
			var y1 = y;
			var y2 = y + height;
			gl.bufferData(
				gl.ARRAY_BUFFER,
				new Float32Array([
					x1,
					y1,
					x2,
					y1,
					x1,
					y2,
					x1,
					y2,
					x2,
					y1,
					x2,
					y2,
				]),
				gl.STATIC_DRAW
			);
		}

		render() {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);

			var primitiveType = this.gl.TRIANGLES;
			var offset = 0;
			var count = 6;
			this.gl.drawArrays(primitiveType, offset, count);

			// var pixel_count = 0;

			// pixel_count = this.gl.getUniform(this.program, this.gl.getUniformLocation(this.program, "count"));

			// console.log(pixel_count);
		}

		set_uniform1f(var_name, value) {
			this.gl.uniform1f(
				this.gl.getUniformLocation(this.program, var_name),
				value
			);
		}

		set_uniform1fv(var_name, value) {
			this.gl.uniform1fv(
				this.gl.getUniformLocation(this.program, var_name),
				value
			);
		}
	}

	var filmic_canvas = new FilmicCanvas();

	onMount(() => {
		// debugger;
		filmic_canvas.init("#canvas", photo);
		// debugger
		// console.log(filmic_canvas.is_init);
	});
</script>

<svelte:head>
	<!-- <script src="https://cdn.rawgit.com/adriancooney/console.image/c9e6d4fd/console.image.min.js"></script> -->
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/remarkable/2.0.0/remarkable.min.js" on:load={initializeRemarkable}></script> -->

	<!-- <script src="https://webglfundamentals.org/webgl/resources/m3.js"></script> -->
	<!-- <script type="text/javascript" src="./webgl-utils.js"></script>
	<script type="text/javascript" src="./webgl_2d.js"></script> -->
</svelte:head>

<canvas id="canvas" width="1200" height="1200" />

<!-- <img src="/me2.jpg"> -->
<style>
	#canvas {
		background-color: #fff;
		border: 1px solid rgb(169, 169, 169);
		/* NOTE: This size is changed if in iframe - see below '.iframe canvas' */
		width: calc(100vw - 455px);
		height: calc(100vw - 455px);

		/* height: 100vh; */
		/* display: block; */
		/* margin-right:; */
		/* margin: 0px; */
		/* position: relative; */
		/* display: inline-block; */
		/* left: 0; */
		/* padding-left: 0; */
		overflow: hidden;
		/* max-width: 100%; */

		/* width: 99.8vh; */
		/* height: 99.8vh; */

		min-width: 200px;
		min-height: 200px;

		/* max-width: calc(100vw - 455px); */

		/* max-height: 100vw !important; */


	}

	#canvas:hover {
		cursor: grab;
	}

	#canvas:active {
		cursor: grabbing;
	}

	@media screen and (max-width: 760px) {
		#canvas {
			/* border: 1px solid rgb(156, 0, 0); */
			width: 99.5vw;
		height: 99.5vw;
justify-content: center;
		}
	}
</style>
