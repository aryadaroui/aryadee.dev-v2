<script>
	import { slide } from 'svelte/transition';

	export let title;
	export let color = 'blue';

	const foreground_colors = {
		violet: '#805AD5',
		blue: '#1E91D3',
		green: '#38A169',
		yellow: '#ECC94B',
		orange: '#ED8936',
		red: '#E53E3E',
		pink: '#D53F8C',
	};

	const background_colors = {
		violet: '#805AD5',
		blue: '#135477',
		green: '#38A169',
		yellow: '#ECC94B',
		orange: '#ED8936',
		red: '#E53E3E',
		pink: '#D53F8C',
	};

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
	</button>

	{#if is_expanded}
		<div
			class="content"
			transition:slide={{ duration: 200 }}
			style="background: {background_color};">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	#callout {
		button {
			display: block;
			cursor: pointer;

			width: 100%;
			border-radius: 15px;
			border: $border-translucent 1px solid;
			margin: 0;
			padding-top: 15px;
			padding-bottom: 15px;

			font-family: $sans;
			font-weight: 200;
			font-size: 1.4em;
		}

		div.content {
			position: relative;

			border: $border-translucent 1px solid;
			border-top: none;

			top: -15px;
			padding: 20px;
			border-radius: 0px 0px 15px 15px;

			div[data-rehype-pretty-code-fragment] {
				box-shadow: none;
			}
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
