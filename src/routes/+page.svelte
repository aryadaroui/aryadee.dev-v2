<script lang="ts">
	import { onMount } from 'svelte';
	import * as Shape from './Shape';
	import Page2 from './Page2.svelte';

	onMount(() => {
		Shape.init(document.getElementById('shape-container'), '#E2C09B', document.getElementById('page-1'));

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

		// // for reducing motion
		// let reduce_motion_button = document.querySelector('#reduce-motion-button');
		// let motion_text = document.querySelector('#motion-text');

		// reduce_motion_button.addEventListener('click', function () {
		// 	motion_text.classList.toggle('crossed-out');
		// 	toggle_motion_func();
		// });

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

<!-- <button id="reduce-motion-button"> reduce <span id="motion-text">motion</span> </button> -->

<div class="scroll-button-container">
	<button id="scroll-down-button" class="scroll-button">
		<span style="vertical-align: 2px;"> ♥ ♥ ♥ </span>
	</button>
</div>

<main>
	<section id="page-1" style="touch-action: pan-y;">
		<div id="page-1-content" >
			<div id="hello">
				<h1><span class="blackground allow-pointer-events"> aryadee </span></h1>
				<p>
					<span class="blackground allow-pointer-events"
						>computer engineer.<wbr /> ndarray lover.<wbr /> <span class="accent">a person from planet earth.</span>
					</span>
				</p>

				<nav>
					<p>
						<a href="/blog" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground allow-pointer-events">blog</span>
						</a>
					</p>
					<p>
						<a href="/filmic-beta" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground allow-pointer-events">projects</span>
						</a>
					</p>
					<p>
						<a href="/photo-art-audio" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground allow-pointer-events">photo-art-music</span>
						</a>
					</p>
				</nav>

				<div id="mail-link">
					<a href="mailto:adaroui@uci.edu" class="chevron-link">
						<span class="select-chevron blackground">»</span>
						<span class="link blackground allow-pointer-events">adaroui@uci.edu</span>
						<span class="select-chevron blackground">»</span>
					</a>
				</div>
			</div>
		</div>
	</section>
	<section id="page-2">
		<Page2 />
		<div class="scroll-button-container">
			<button id="scroll-up-button" class="scroll-button">
				<span style="vertical-align: 2px;"> ♥ ♥ ♥ </span>
			</button>
		</div>
	</section>
</main>

<style lang="scss">
	main {
		margin: auto;
		overflow-x: hidden;
		font-size: 1.29em;

		@media only screen and (max-width: 400px) {
			font-size: 0.9em;
		}
	}

	button {
		font-family: Hack;
		color: $ink-color;
		background-color: transparent;
	}

	a {
		color: $link-color;
	}

	a:hover {
		color: $link-color;
	}

	#fader {
		position: absolute;
		z-index: 1;
		background-color: $background-color;
		opacity: 0;
		width: 100vw;
		height: 100vh;
	}

	:global(.opaque) {
		color: $ink-color;
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
		background-color: $background-color;
		border: $ink-color 1px solid;
		width: 100px;
		height: 50px;
		font-size: large;
		text-align: center;
		z-index: 2;
		user-select: none;
		border-radius: 15px;
		cursor: pointer;

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

	// #reduce-motion-button {
	// 	position: absolute;
	// 	left: 62px;
	// 	bottom: 60px;
	// 	background-color: $background-color;
	// 	border: $ink-color 0.5px solid;
	// 	z-index: 4;
	// 	// border: none;
	// 	padding: 0.5em;
	// 	user-select: none;
	// 	cursor: pointer;

	// 	&:hover {
	// 		filter: brightness(66%);
	// 	}

	// 	&:active {
	// 		filter: brightness(33%);
	// 	}

	// 	@media only screen and (max-width: 600px) {
	// 		left: 20px;
	// 		bottom: 55px;
	// 	}
	// }

	// .crossed-out {
	// 	text-decoration: line-through;
	// }

	#tooltip {
		right: 62px;
		bottom: 47px;
		// opacity: 0.2;
		color: $gray-soft;
		// font-family: $sans;
		// font-weight: 200;
		// font-size: 1.5em;

		position: absolute;
		user-select: none;

		@media only screen and (max-width: 600px) {
			visibility: hidden;
		}
	}

	.blackground {
		background: $background-color;
		@media only screen and (max-width: 600px) {
			background: rgb(16, 13, 13); // this is unfortunately hard coded.
		}
	}

	#shape-container {
		position: absolute;
		background-color: $background-color;
		left: 0px;

		@media only screen and (max-width: 600px) {
			margin-top: 20px;
		}
	}

	#hello {
		font-family: $sans;
		font-size: 1.4em;
		font-weight: 200;
		margin: auto;
		position: absolute;
		pointer-events: none;

		max-width: 1300px;

		padding: 20px 50px 50px 50px;

		@media only screen and (max-width: 600px) {
			padding: 1px 25px 25px 25px;
		}
	}

	.allow-pointer-events {
		pointer-events: auto;
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
		color: $link-color;
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
			color: $gray-soft;
		}
		10% {
			color: $accent-color;
		}
		50% {
			// opacity: 1;
			color: $accent-color;
		}
		100% {
			// opacity: 0.2;
			color: $gray-soft;
		}
	}

	@keyframes fast {
		0% {
			color: $ink-color;
		}
		100% {
			color: $gray-soft;
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
		background: linear-gradient(to right, $ink-color 1px, transparent 1px) 0 0,
			linear-gradient(to right, $ink-color 1px, transparent 1px) 0 100%,
			linear-gradient(to left, $ink-color 1px, transparent 1px) 100% 0,
			linear-gradient(to left, $ink-color 1px, transparent 1px) 100% 100%,
			linear-gradient(to bottom, $ink-color 1px, transparent 1px) 0 0,
			linear-gradient(to bottom, $ink-color 1px, transparent 1px) 100% 0,
			linear-gradient(to top, $ink-color 1px, transparent 1px) 0 100%,
			linear-gradient(to top, $ink-color 1px, transparent 1px) 100% 100%;
		background-repeat: no-repeat;
		background-size: 10px 10px;
	}

	#page-2 {
		position: relative;
		overflow: hidden;
		height: auto;
		min-height: 100vh;
		width: 100vw;
		// background-color: rgba(20, 20, 20, 0.5);
		// background-color: #3a353045;
		// background-color: rgba($gray-mid, 0.3);
		background-color: hsla(0, 0%, 0%, 0.7);

		border-top: #6d6d6357 1px solid;
		backdrop-filter: blur(27px) saturate(1.3) brightness(1.3);
		// -webkit-backdrop-filter: blur(50px);

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

	#scroll-up-button.scroll-button {
		transform: scale(1, -1);
		border-radius: 15px; // box-shadow: 0px 5px 20px black;
		background-color: rgba($background-color, 0.7);
	}

	// #scroll-up-button.scroll-button:active {
	// 	// box-shadow: 0px 1px 15px black;

	// 	// transform: translateY(2px) scale(1, -1);
	// }
</style>
