<script lang="ts">
	import { onMount } from 'svelte';
	import Page2 from './Page2.svelte';
	import { page } from '$app/stores';
	import type Shape__SvelteComponent_ from '$lib/Shape.svelte';

	let Shape: typeof Shape__SvelteComponent_ | null = null;

	// only keep shape stored when on home page
	$: {
		if ($page.url.pathname === '/') {
			import('$lib/Shape.svelte').then((module) => {
				Shape = module.default;
			});
		} else {
			Shape = null;
		}
	}

	let hobbies = [
		'a person from planet earth',
		'n-dimensional array lover',
		'visualization enthusiast',
		'dataframe wizard',
		'spaghetti code chef',
		'workflow optimizer',
		'parallelization fanatic',
		'signal processing nerd',
		'fake film photographer',
		'Java disliker',
		'Python lover',
		'TypeScript fan',
		'Rust evangelist',
		'big data explorer',
		'music maker',
		'graduate degree waster',
		'email replier',
		'open source contributor',
		'sadistic tester',
		'circuit solderer',
		'tape loop maker',
		'pedal builder',
		'reverb hydrologist',
		'video game hoarder',
		'keyboard collector',
		'synth experimentalist',
		'jazzmaster fiddler',
		'tube amp denier',
		'data structure over thinker',
		'FFT admirer',
		'UNIX apologist',
		'server desirer',
		'RISC-V believer',
		'Intel GPU hoper',
		'web assembly dreamer',
		'Windows begrudger',
		'web standard abuser',
		'WebGPU waiter',
		'SCSS truster',
		'SvelteKit aficionado',
		'React denier',
		'JS framework skeptic',
		'prod destroyer',
		'VS Code zealot',
		'vim tolerator',
		'git command forgetter',
	]

	$: hobby = hobbies[0];

	function change_hobby() {
		let current_thing = hobby;

		let new_hobby = hobbies[Math.floor(Math.random() * hobbies.length)];

		while (new_hobby === current_thing) {
			new_hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
		}

		hobby = new_hobby;
	}



	onMount(() => {
		let scroll_down_button = document.querySelector('#scroll-down-button');
		scroll_down_button.addEventListener('click', function () {
			document.querySelector('#page-2').scrollIntoView({ behavior: 'smooth' });
		});

		let tooltip = document.querySelector('#tooltip');
		let page1 = document.querySelector('#control-layer');

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
				plus_tip.classList.remove('opaque');
				tooltip.classList.remove('hint-tooltip');
				// @ts-ignore - this is a hack to force a reflow
				void tooltip.offsetWidth;
				tooltip.classList.add('hint-tooltip');
			}
		});

		page1.addEventListener('wheel', function () {
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
	});
</script>

<title>aryadee</title>
<div class="background">
	{#if Shape}
		<svelte:component this={Shape} />
	{/if}
</div>

<div id="tooltip" class="hint-tooltip">
	<div class="hover-tooltip">
		<p>Press any key to rotate.<br><code>S</code> and <code>D</code> to zoom and pan.</p>
	</div>
	<p>
		<span class="blackground">
			<span id="key-tip">[key] </span><span id="plus-tip"> + </span><span id="mouse-tip"> [mouse]</span>
		</span>
	</p>
</div>

<main>
	<section id="page-1" style="touch-action: pan-y;">
		<div id="control-layer"  on:click={change_hobby}/>
		<div style="display: flex; justify-content: center;">
			<div id="hello">
				<h1><span class="blackground">arya<span class="accent">dee</span> </span></h1>
				<p>
					<span
						><span class="blackground">computer engineer.</span> <span class="blackground">programmer.</span><br />
						<!-- <span class="accent blackground">a person from planet earth.</span> -->
						<span class="accent blackground">{hobby}.</span>
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
						<a href="/projects" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground allow-pointer-events">projects</span>
						</a>
					</p>
					<p>
						<a href="/creative" class="chevron-link">
							<span class="select-chevron blackground">»</span>
							<span class="link blackground allow-pointer-events">creative</span>
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
		<div class="scroll-button-container">
			<button id="scroll-down-button" class="scroll-button">
				<span style="vertical-align: 2px;"> ♥ ♥ ♥ </span>
			</button>
		</div>
	</section>
	<section id="page-2">
		<Page2 />
	</section>
</main>

<style lang="scss">
	main {
		margin: auto;

		@media only screen and (max-width: 400px) {
			font-size: 1em;
		}
	}

	h1 {
		font-weight: 600;
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
		text-decoration: none;
	}

	@keyframes fade-in {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	// this is needed for the tooltip to work
	:global(.opaque) {
		color: $ink-color;
	}

	.background {
		position: absolute;
		z-index: -1;
	}

	.scroll-button {
		background-color: darken($void-color, 5%);
		border: $ink-color 1px solid;
		width: 100px;
		height: 50px;
		font-size: large;
		text-align: center;
		z-index: 3;
		user-select: none;
		border-radius: 15px;
		cursor: pointer;
		transition: all 0.15s ease;

		&:hover {
			// filter: brightness(90%);
			border: rgba($blue-mid, 1) 1px solid;
			color: $blue-mid 1px solid;
		}

		&:active {
			filter: brightness(70%);
		}

		@media only screen and (max-width: 600px) and (max-height: 600px) {
			display: none;
		}

		@media only screen and (max-height: 500px) {
			display: none;
		}
	}

	.scroll-button-container {
		width: calc(100vw - (100vw - 100%));
		// margin: 50px;
		bottom: 50px;
		position: fixed;
		display: flex;
		// justify-content: center;
		justify-content: space-evenly;
		align-items: center;
	}

	.hover-tooltip {
		font-family: $sans;
		font-size: 0.7em;

		visibility: hidden;
		width: 180px;
		background-color: $background-color;
		color: #fff;
		text-align: center;

		border-radius: 6px;
		padding: 0.3em 0.4em;

		bottom: 60px;

		/* Position the tooltip text - see examples below! */
		position: absolute;
	}

	#tooltip:hover .hover-tooltip {
		visibility: visible;
	}


	#tooltip {
		right: 62px;
		bottom: 40px;
		color: $navy-soft;
		font-family: $mono;
		position: absolute;
		z-index: 2;

		user-select: none;
		@media only screen and (max-width: 700px) {
			visibility: hidden;
		}
	}

	.blackground {
		background: $void-color;
		display: inline-block;
		padding: 0.3em 0.4em;
		border-radius: 0.4em;
		@media only screen and (max-width: 600px) {
			background: hsl(220, 14%, 8%); // this is unfortunately hard coded.
		}
	}

	#hello {
		font-family: $sans;
		font-size: clamp(1em, 4vw, 2em);
		font-weight: 200;
		user-select: none;

		pointer-events: none;

		z-index: 2;
		display: block;

		margin-bottom: 2em;

		margin-right: calc(30vw);
		// margin-left: 10%;

		// overflow-y: visible;

		@media only screen and (max-height: 800px) {
			font-size: clamp(1.1em, 4vmin, 2em);
			// h1 {
			// 	margin-top: 1em;
			// }
			// font-size: clamp(0.9em, 4vh, 1.8em);
		}

		@media only screen and (max-width: 600px) {
			padding: 1px 0px 10px 5px;
		}

		@media only screen and (max-width: 500px) {
			margin-right: calc(20vw);
		}
	}

	#control-layer {
		position: absolute;
		margin: auto;
		top: 0;
		width: calc(100% - 2px);
		height: 100%;
	}

	.allow-pointer-events {
		pointer-events: all;
	}

	.chevron-link {
		visibility: hidden;
	}

	.chevron-link:hover {
		@media screen and (min-width: 500px) {
			visibility: visible;
		}
	}

	.link {
		visibility: visible;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.link:hover {
		background-color: #1c4a52;
		color: $cyan-soft;
		transition: background-color 0.15s ease, color 0.15s ease;
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
			color: $navy-soft;
		}
		10% {
			color: $accent-color;
		}
		50% {
			color: $accent-color;
		}
		100% {
			color: $navy-soft;
		}
	}

	@keyframes fast {
		0% {
			color: $ink-color;
		}
		100% {
			color: $navy-soft;
		}
	}

	#page-1 {
		// border: rgba(0, 0, 0, 0) 1px solid; // fixes overside page1 pushing down issue. it's a hack though
		min-height: 100vh;
		@media only screen and (max-width: 600px) {
			background-color: rgba($color: #000000, $alpha: 0.3);
			// height: 100vh;
		}
		// overflow: overlay;
	}

	// #page-1-content {
	// 	margin: 50px;
	// 	height: calc(100vh - 100px);

	// 	// display: flex;
	// 	// justify-content: center;

	// 	// flex-grow: 2;

	// 	@media only screen and (max-width: 600px) {
	// 		margin: 0px;
	// 	}

	// 	@media only screen and (max-height: 500px) {
	// 		height: 100vh;
	// 		margin: 0px;
	// 	}
	// }

	#page-2 {
		position: relative;
		// overflow: hidden;
		height: auto;
		min-height: 100vh;

		border-top: #6d6d6357 1px solid;

		// background-color: hsl(26, 12%, 10%);
		// background-color: darken($void-color, 0%);
		background-color: $gray-mid;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-content: space-between;
	}
</style>
