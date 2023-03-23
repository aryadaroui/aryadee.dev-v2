<script lang="ts">
	import { onMount } from 'svelte';
	import * as Shape from './Shape';
	import Page2 from './Page2.svelte';

	onMount(() => {
		Shape.init(document.getElementById('shape-container'), '#DFCCAF', document.getElementById('page-1'));

		let scroll_down_button = document.querySelector('#scroll-down-button');
		scroll_down_button.addEventListener('click', function () {
			document.querySelector('#page-2').scrollIntoView({ behavior: 'smooth' });
		});

		let scroll_up_button = document.querySelector('#scroll-up-button');
		scroll_up_button.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});

		let tooltip = document.querySelector('#tooltip');
		let page1 = document.querySelector('#page-1');

		let modifier_held = false;

		let key_tip = document.querySelector('#key-tip');
		let plus_tip = document.querySelector('#plus-tip');
		let mouse_tip = document.querySelector('#mouse-tip');

		window.addEventListener('keydown', function (key) {
			modifier_held = true;
			key_tip.classList.add('opaque');
		});
		window.addEventListener('keyup', function (key) {
			modifier_held = false;
			key_tip.classList.remove('opaque');
		});

		page1.addEventListener('mousedown', function () {
			mouse_tip.classList.add('opaque');
			if (modifier_held) {
				plus_tip.classList.add('opaque');
			}
		});

		page1.addEventListener('mouseup', function () {
			mouse_tip.classList.remove('opaque');
			if (modifier_held) {
				plus_tip.classList.remove('opaque');
			} else {
				// debugger
				plus_tip.classList.remove('opaque');
				tooltip.classList.remove('hint-tooltip');
				// @ts-ignore - this is a hack to force a reflow
				void tooltip.offsetWidth;
				tooltip.classList.add('hint-tooltip');
			}
		});

		page1.addEventListener('wheel', function () {
			// console.log('a');
			mouse_tip.classList.remove('show-wheel');
			// @ts-ignore - this is a hack to force a reflow
			void mouse_tip.offsetWidth;
			mouse_tip.classList.add('show-wheel');
			if (modifier_held) {
				plus_tip.classList.remove('show-wheel');
				// @ts-ignore - this is a hack to force a reflow
				void plus_tip.offsetWidth;
				plus_tip.classList.add('show-wheel');
			}
		});

		document.getElementById('fader').classList.add('black-fade-in');
	});
</script>

<title>aryadee</title>
<div class="background">
	<div id="fader" />
	<div id="shape-container" />
</div>

<div id="tooltip" class="hint-tooltip">
	<p>
		<span class="blackground">
			<span id="key-tip">[key] </span><span id="plus-tip"> + </span><span id="mouse-tip"> [mouse]</span>
		</span>
	</p>
</div>

<div class="scroll-button-container">
	<button id="scroll-down-button" class="scroll-button">
		<span style="vertical-align: 2px;"> ♥ ♥ ♥ </span>
	</button>
</div>

<main>
	<section id="page-1" style="touch-action: pan-y;">
		<div id="page-1-content" class="corner-border">
			<div id="hello">
				<h1><span class="blackground"> aryadee </span></h1>
				<p>
					<span class="blackground"
						>computer engineer. ndarray lover.
						<span style="color: #f5dce8">a person from planet earth.</span>
					</span>
				</p>

				<nav>
					<p>
						<a href="/blog" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground">/blog</span>
						</a>
					</p>

					<p>
						<a href="/photo-art-audio" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground">/photo-art-audio</span>
						</a>
					</p>
					<p>
						<a href="/filmic-beta" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground">/filmic-beta</span>
						</a>
					</p>
				</nav>
				<div id="mail-link">
					<a href="mailto:adaroui@uci.edu" class="chevron-link">
						<span class="select-chevron blackground">»</span>
						<span class="link blackground">adaroui@uci.edu</span>
						<span class="select-chevron blackground">»</span>
					</a>
				</div>
			</div>
		</div>


	</section>
	<!-- <section id="page-2">
		<Page2 />
		<div class="scroll-button-container">
			<button id="scroll-up-button" class="scroll-button">
				<span style="vertical-align: 2px;"> ♥ ♥ ♥ </span>
			</button>
		</div>
	</section> -->
</main>

<style lang="scss">
	// @import '$styles/hack.css';
	// @import '/src/styles/main.scss';
	// @import '/src/styles/main.scss';

	main {
		margin: auto;
		overflow-x: hidden;
		font-size: 1.2em;

		@media only screen and (max-width: 400px) {
			font-size: 0.9em;
		}
	}

	button {
		font-family: Hack;
		color: beige;
		background-color: transparent;
	}

	a {
		color: $test-red;
		text-decoration: none;
	}

	a:hover {
		color: beige;
	}

	#fader {
		position: absolute;
		z-index: 1;
		background-color: black;
		opacity: 0;
		width: 100vw;
		height: 100vh;
	}

	:global(.opaque) {
		color: beige;
	}

	:global(.black-fade-in) {
		animation: 3s ease-in-out normal fade-in;
	}

	@keyframes fade-in {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.background {
		position: fixed;
		z-index: -1;
	}

	.scroll-button {
		background-color: black;
		border: beige 0.5px solid;
		width: 80px;
		height: 40px;
		text-align: center;
		z-index: 2;

		&:hover {
			filter: brightness(66%);
		}

		&:active {
			filter: brightness(33%);
		}
	}

	.scroll-button-container {
		width: 100vw;
		bottom: 50px;
		position: absolute;
		display: flex;
		// justify-content: center;
		justify-content: space-evenly;
		align-items: center;
	}

	// PAGE 1

	#tooltip {
		right: 62px;
		bottom: 47px;
		// opacity: 0.2;
		color: rgba(245, 245, 220, 0.2);

		position: absolute;
		user-select: none;

		@media only screen and (max-width: 600px) {
			visibility: hidden;
		}
	}

	.blackground {
		background: black;
	}

	#shape-container {
		position: absolute;
		background-color: black;
		left: 0px;

		@media only screen and (max-width: 600px) {
			margin-top: 100px;
		}
	}

	#hello {
		margin: auto;

		max-width: 1300px;

		padding: 20px 50px 50px 50px;

		@media only screen and (max-width: 600px) {
			padding: 1px 25px 25px 25px;
		}
	}

	.chevron-link {
		visibility: hidden;
	}

	.chevron-link:hover {
		visibility: visible;
	}

	.link {
		visibility: visible;
	}

	.link:hover {
		text-decoration: underline;
	}

	.select-chevron {
		color: beige;
	}

	a {
		// color: $link-color;
		color: #9ee2fd;
		text-decoration: none;
	}

	a:hover {
		color: beige;
	}

	.hint-tooltip {
		animation: hint 1.5s 1;
	}

	:global(.show-wheel) {
		animation: fast 0.5s 1;
	}

	@keyframes hint {
		0% {
			// opacity: 1;
			color: rgba(245, 245, 220, 0.2);
		}
		10% {
			color: hsl(330, 100%, 85%);
		}
		50% {
			// opacity: 1;
			color: hsl(330, 100%, 85%);
		}
		100% {
			// opacity: 0.2;
			color: rgba(245, 245, 220, 0.2);
		}
	}

	@keyframes fast {
		0% {
			color: rgba(245, 245, 220, 1);
		}
		100% {
			color: rgba(245, 245, 220, 0.2);
		}
	}

	#page-1 {
		border: rgba(0, 0, 0, 0) 1px solid; // fixes overside page1 pushing down issue. it's a hack though
		@media only screen and (max-width: 600px) {
			background-color: rgba($color: #000000, $alpha: 0.3);
			height: 100vh;
		}
	}

	#page-1-content {
		margin: 50px;
		height: calc(100vh - 100px);

		@media only screen and (max-width: 600px) {
			margin: 20px;
			height: calc(100vh - 40px);
		}
	}

	.corner-border {
		background: linear-gradient(to right, beige 1px, transparent 1px) 0 0,
			linear-gradient(to right, beige 1px, transparent 1px) 0 100%,
			linear-gradient(to left, beige 1px, transparent 1px) 100% 0,
			linear-gradient(to left, beige 1px, transparent 1px) 100% 100%,
			linear-gradient(to bottom, beige 1px, transparent 1px) 0 0,
			linear-gradient(to bottom, beige 1px, transparent 1px) 100% 0,
			linear-gradient(to top, beige 1px, transparent 1px) 0 100%,
			linear-gradient(to top, beige 1px, transparent 1px) 100% 100%;
		background-repeat: no-repeat;
		background-size: 10px 10px;
	}

	#page-2 {
		position: relative;
		overflow: hidden;
		height: auto;
		min-height: 100vh;
		width: 100vw;
		background-color: rgba(20, 20, 20, 0.5);
		border-top: #6d6d6357 1px solid;
		backdrop-filter: blur(50px) saturate(200%);
		-webkit-backdrop-filter: blur(50px);

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-content: space-between;

		.scroll-button-container {
			width: calc(100vw - 100px);
			margin: 50px 50px 0px 50px;
			position: relative;
			display: flex;
			justify-content: center;
		}
	}

	#scroll-up-button {
		transform: scale(1, -1);
	}
</style>
