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
	export let is_expanded = false;

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

	// TODO: add black, white, gray transparent

	const foreground_colors = {
		purple: '#C267F7',
		blue: '#6789F7',
		green: '#45DDA8',
		yellow: '#E8D16F',
		orange: '#F79767',
		red: '#F76767',
		pink: '#F7679C',
	};

	const background_colors = {
		purple: '#49304F',
		blue: '#34384F',
		green: '#345144',
		yellow: '#564B2E',
		orange: '#563B2E',
		red: '#56302E',
		pink: '#56303A',
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

	// let is_expanded = false;
	const toggle = () => (is_expanded = !is_expanded);
</script>

<div id="callout">
	<button on:click={toggle} aria-expanded={is_expanded} style="color: {foreground_color}; background: {background_color};">
		<!-- icon -->
		<div class="title" style="background-color: {background_color};">

			<div style="flex-shrink: 0">
				<svelte:component this={icon_component}/>
			</div>
			
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
		<div class="content" transition:slide={{ duration: 300 }} style="background: {background_color};">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	#callout {
		margin: 1em 0;
		button {
			cursor: pointer;

			width: 100%;
			border-radius: 8px;
			border: rgba($border-link-translucent, 0) 1px solid;
			// border: none;
			margin: 20;
			padding: 1px 1px 1px 1px;

			font-family: $sans;
			font-weight: 300;
			font-size: 1.2em;
			overflow: hidden;

			// transition: all 0.3s ease;

			// transition: border 0.3s ease;

			// transition: border 0.3s ease;

			transition: border 0.15s ease;

			.title {
				position: relative;
				padding: 8px 12px 8px 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 10px;
				border-radius: 6px;

				z-index: 2;
				// .icon {
				// 	flex-shrink: 0;
				// }
			}
		}

		button:hover {
			transition: border 0.15s ease;

			border: rgba($blue-mid, $alpha: 1) 1px solid;
		}

		button:hover + div.content {
			border: rgba($blue-mid, $alpha: 1) 1px solid;
			border-top: none;
			transition: border 0.15s ease;
		}

		div.content {
			position: relative;
			z-index: 1;

			transition: border 0.15s ease;

			border: rgba($border-link-translucent, 0) 1px solid;
			border-top: none;

			top: -15px;
			padding: 15px 15px 0px 15px;
			padding-top: 20px;
			border-radius: 0px 0px 8px 8px;
		}

		svg {
			transition: transform 0.3s ease;
		}

		[aria-expanded='true'] {
			svg {
				transform: rotate(0.25turn);
			}
		}
	}
</style>
