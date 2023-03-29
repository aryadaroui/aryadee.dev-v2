<script>
	import { slide } from 'svelte/transition';

	import bug from '$lib/icons/bug.svelte';
	import code from '$lib/icons/code.svelte';
	import fire from '$lib/icons/fire.svelte';
	import frown from '$lib/icons/frown.svelte';
	import heart from '$lib/icons/heart.svelte';
	import info from '$lib/icons/info.svelte';
	import lightning from '$lib/icons/lightning.svelte';
	import note from '$lib/icons/note.svelte';
	import question from '$lib/icons/question.svelte';
	import smile from '$lib/icons/smile.svelte';
	import terminal from '$lib/icons/terminal.svelte';
	import warning from '$lib/icons/warning.svelte';

	export let title = '';
	export let icon = 'info';
	export let color = '';

	let icon_component = {
		bug,
		code,
		fire,
		frown,
		heart,
		info,
		lightning,
		note,
		question,
		smile,
		terminal,
		warning,
	}[icon];

	const icon_colors = {
		bug: 'red',
		code: 'blue',
		fire: 'red',
		frown: 'red',
		heart: 'pink',
		info: 'blue',
		lightning: 'yellow',
		note: 'blue',
		question: 'yellow',
		smile: 'green',
		terminal: 'purple',
		warning: 'orange',
	};

	const foreground_colors = {
		purple: '#805AD5',
		blue: '#1E91D3',
		green: '#38A169',
		yellow: '#ECC94B',
		orange: '#ED8936',
		red: '#E53E3E',
		pink: '#D53F8C',
	};

	const background_colors = {
		purple: '#6039D5',
		blue: '#034467',
		green: '#189069',
		yellow: '#CAC74B',
		orange: '#CD6736',
		red: '#C51E1E',
		pink: '#A51F6C',
	};

	if (color === '') {
		color = icon_colors[icon];
	}

	let foreground_color = foreground_colors.blue;
	let background_color = background_colors.blue;

	if (foreground_colors.hasOwnProperty(color)) {
		foreground_color = foreground_colors[color];
	}

	if (background_colors.hasOwnProperty(color)) {
		background_color = background_colors[color];
	}

	let is_expanded = false;
	const toggle = () => (is_expanded = !is_expanded);
</script>

<div id="callout">
	<button on:click={toggle} aria-expanded={is_expanded} style="color: {foreground_color}; background: {background_color};">
		<!-- icon -->
		<div class="title" style="background-color: {background_color};">
			<!-- <Fire /> -->

			<svelte:component this={icon_component} />
			{title}
			<svg
				style="tran"
				width="20"
				height="20"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path d="M9 5l7 7-7 7" />
			</svg>
		</div>
	</button>

	{#if is_expanded}
		<div class="content" transition:slide={{ duration: 200 }} style="background: {background_color};">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	#callout {
		button {
			cursor: pointer;

			width: 100%;
			border-radius: 15px;
			border: $border-translucent 1px solid;
			margin: 0;
			padding: 1px 8px 1px 8px;

			font-family: $sans;
			font-weight: 300;
			font-size: 1.2em;
			overflow: hidden;

			.title {
				position: relative;
				padding: 10px 2px 10px 2px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// border: $accent-color 1px solid;
				// background-color: #135477;
				// background-color: $accent-color;

				z-index: 2;
			}
		}

		div.content {
			position: relative;
			z-index: 1;

			border: $border-translucent 1px solid;
			border-top: none;

			top: -15px;
			padding: 10px;
			padding-top: 20px;
			border-radius: 0px 0px 15px 15px;

		}

		svg {
			transition: transform 0.2s ease-out;
		}

		[aria-expanded='true'] {
			svg {
				transform: rotate(0.25turn);
			}
		}
	}
</style>
