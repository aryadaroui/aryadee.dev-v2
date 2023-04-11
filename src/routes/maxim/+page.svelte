<script lang="ts">
	import { onMount } from 'svelte';
	import { StarSprite } from '$lib/StarSprite';
	import { clamp } from '$lib/functions';

	function generate_sprite_stars() {
		const blue_stars = new Array(200);

		for (let index = 0; index < blue_stars.length; index++) {
			blue_stars[index] = new StarSprite();
		}

		// put the closer stars latest to render
		blue_stars.sort((a, b) => {
			return a.z - b.z;
		});

		return blue_stars;
	}

	function draw_sprite_stars(ctx: CanvasRenderingContext2D, stars: StarSprite[]) {
		for (let index = 0; index < stars.length; index++) {
			stars[index].draw(ctx);
		}
	}

	function redraw_sprite_stars(ctx: CanvasRenderingContext2D, stars: StarSprite[]) {
		for (let index = 0; index < stars.length; index++) {
			stars[index].redraw(ctx);
		}
	}

	onMount(() => {
		const fps = 30;
		let w;
		let h;
		const canvas = document.getElementById('space') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d')!;
		const setCanvasExtents = () => {
			w = window.innerWidth - 2;
			h = window.innerHeight - 2;
			canvas.width = w;
			canvas.height = h;
		};

		setCanvasExtents();
		window.onresize = () => {
			setCanvasExtents();
			ctx.imageSmoothingEnabled = false;
			redraw_sprite_stars(ctx, blue_stars);
		};

		const blue_stars = generate_sprite_stars();

		ctx.imageSmoothingEnabled = false;
		draw_sprite_stars(ctx, blue_stars);

		let opacity = 1.0;

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			draw_sprite_stars(ctx, blue_stars);
			ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
			ctx.fillRect(0, 0, canvas.width, canvas.height); // TODO: just use css to fade
			opacity = clamp(opacity - 0.025, 0.0, 1.0);

			ctx.font = '32px Comic Sans MS';
			ctx.fillStyle = 'red';
			ctx.fillText('why are you breaking my website', 2000, 2000);

			setTimeout(() => {
				requestAnimationFrame(animate);
			}, 1000 / fps);
		}

		animate();
	});
</script>

<div>
	<!-- <Header2 /> -->

	<title>aryadee | quote</title>

	<main>
		<div class="overlay-pad">
			<div class="overlay">
				<blockquote>
					<p>
						There's no way I can single-handedly save the world or, perhaps, even make a perceptible difference—but how ashamed I would be to let a day pass without making one more effort. <span class="author">― <em>Isaac Asimov</em></span>
					</p>
				</blockquote>
			</div>
		</div>
	</main>
	<!-- <Footer2 /> -->

	<nav class="nav-wrapper">
		<!-- <span><a class="back-item" onclick="history.back()">back</a></span> -->
		<span> <a href="/">home</a> </span>
	</nav>

	<canvas id="space" width="500" height="500" />
</div>

<style>
	span + span {
		margin-left: 20px;
	}

	/* :global(body) {
		background-color: #090909;
	} */

	:root {
		background-color: #090909;
	}

	/* .back-item {
		cursor: pointer;
	} */

	.nav-wrapper {
		position: absolute;
		bottom: 0px;
		left: 50%;
		transform: translateX(-50%);

		margin: 10px;

		/* display: flex;
		justify-content: center;
		align-items: center; */
	}

	a {
		font-family: Hack, monospace;
		/* font-family: 'Swiss 721'; */
		/* font-weight: 900; */
		color: #ffffff;
		text-decoration: none;
		text-shadow: #000000 0 0 20px;
		transition: text-shadow 0.2s;
	}

	a:visited {
		color: #dddddd;
	}

	a:hover {
		color: #dddddd;
		text-decoration: underline;
		text-shadow: #ebf0f2 0 0 20px;
	}

	.author {
		color: #888888;
		display: inline-block;
	}

	blockquote {
		/* font-size: 50px; */
		/* text-transform: uppercase; */
		/* margin-top: 10px; */
		/* margin-bottom: 10px; */
		margin-left: 40px;
		padding-left: 10px;
		border-left: 2px solid #cccccc;
		/* display: inline-flex; */
	}

	p {
		font-size: 1.7em;
		font-weight: 200;
		color: #ebf0f2;
	}

	#space {
		background-attachment: fixed;
		background-color: #090909;
		position: fixed;
		top: 0;
		left: 0;
		/* image-rendering: optimizeQuality; */
		z-index: -1;
	}

	.overlay-pad {
		/* padding: 0px 20px 0px; */
		height: 100vh;
		/* padding-left: 20px; */
		/* padding-right: 20px; */

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.overlay {
		max-width: 800px;
		margin-left: 10px;
		margin-right: 10px;
		position: absolute;

		/* top: 50%;
		left: 50%; */
		/* left: 10%; */
		/* transform: translateY(-50%); */
		/* transform: translateX(-50%); */
		/* margin-top: 100px; */
		/* margin-bottom: auto; */
		background-size: contain;

		/* background-color: rgba(22, 23, 23, 0.084); */

		background-color: rgba(33, 35, 37, 0.2);

		border-radius: 15px;

		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		padding-left: 0px;
		padding-right: 0px;
		padding-bottom: 20px;
		padding-top: 20px;
		box-shadow: 0px 10px 20px black;
		border-top: 1.5px solid rgba(45, 50, 55, 0.9);
		border-bottom: 1.5px solid rgba(22, 25, 28, 0.9);

		/* text-align: left; */
		/* text-align: justify; */
	}

	/* @media screen and (max-width: 500px) {
		.overlay {
			padding: 20px;
		}
	} */
</style>
