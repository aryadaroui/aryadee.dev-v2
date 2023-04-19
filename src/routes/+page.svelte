<script lang="ts">
	import { onMount } from 'svelte';
	import Page2 from './Page2.svelte';
	import { page } from '$app/stores';
	import type Shape__SvelteComponent_ from '$lib/Shape.svelte'

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

	onMount(() => {
		let scroll_down_button = document.querySelector('#scroll-down-button');
		scroll_down_button.addEventListener('click', function () {
			document.querySelector('#page-2').scrollIntoView({ behavior: 'smooth' });
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
		<div id="page-1-content">
			<div id="hello">
				<h1><span class="blackground allow-pointer-events">arya<span class="accent">dee</span> </span></h1>
				<p>
					<span class="allow-pointer-events"
						><span class="blackground">computer engineer.</span> <span class="blackground">ndarray lover.</span> <span
							class="accent blackground">a person from planet earth.</span>
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
	</section>
	<section id="page-2">
		<Page2 />

	</section>
</main>

<style lang="scss">
	main {
		margin: auto;
		overflow-x: hidden;
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
		width: calc(100vw - (100vw - 100%));
		bottom: 50px;
		position: absolute;
		display: flex;
		// justify-content: center;
		justify-content: space-evenly;
		align-items: center;
	}

	#tooltip {
		right: 62px;
		bottom: 47px;
		color: $brown-soft;
		font-family: $mono;
		position: absolute;
		user-select: none;
		@media only screen and (max-width: 600px) {
			visibility: hidden;
		}
	}

	.blackground {
		background: $background-color;
		display: inline-block;
		padding: 0.1em 0.2em 0.1em 0.2em;
		border-radius: 0.2em;
		@media only screen and (max-width: 600px) {
			background: rgb(26, 22, 20); // this is unfortunately hard coded.
		}
	}

	#hello {
		font-family: $sans;
		font-size: clamp(1.2em, 5vw, 1.8em);
		font-weight: 200;
		user-select: none;

		pointer-events: none;

		margin-right: calc(20vw);

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
			color: $brown-soft;
		}
		10% {
			color: $accent-color;
		}
		50% {
			color: $accent-color;
		}
		100% {
			color: $brown-soft;
		}
	}

	@keyframes fast {
		0% {
			color: $ink-color;
		}
		100% {
			color: $brown-soft;
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

		display: flex;
		justify-content: center;

		@media only screen and (max-width: 600px) {
			margin: 0px;
		}
	}

	#page-2 {
		position: relative;
		overflow: hidden;
		height: auto;
		min-height: 100vh;

		border-top: #6d6d6357 1px solid;

		background-color: $background-color-light;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-content: space-between;

	}

</style>
