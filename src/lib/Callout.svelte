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

	const pSBC = (p, c0, c1, l) => {
		let r,
			g,
			b,
			P,
			f,
			t,
			h,
			i = parseInt,
			m = Math.round,
			a = typeof c1 == 'string';
		if (typeof p != 'number' || p < -1 || p > 1 || typeof c0 != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a))
			return null;
		if (!this.pSBCr)
			this.pSBCr = (d) => {
				let n = d.length,
					x = {};
				if (n > 9) {
					([r, g, b, a] = d = d.split(',')), (n = d.length);
					if (n < 3 || n > 4) return null;
					(x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = i(g)), (x.b = i(b)), (x.a = a ? parseFloat(a) : -1);
				} else {
					if (n == 8 || n == 6 || n < 4) return null;
					if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
					d = i(d.slice(1), 16);
					if (n == 9 || n == 5)
						(x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
					else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
				}
				return x;
			};
		(h = c0.length > 9),
			(h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
			(f = this.pSBCr(c0)),
			(P = p < 0),
			(t = c1 && c1 != 'c' ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }),
			(p = P ? p * -1 : p),
			(P = 1 - p);
		if (!f || !t) return null;
		if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
		else
			(r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
				(g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
				(b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
		(a = f.a), (t = t.a), (f = a >= 0 || t >= 0), (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
		if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
		else
			return (
				'#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
			);
	};

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
		purple: '#342238',
		blue: '#252838',
		green: '#253930',
		yellow: '#3d3521',
		orange: '#3d2a21',
		red: '#3d2221',
		pink: '#3d2229',
	};

	/* The old colors. probably good for a border
	purple: '#49304F',
	blue: '#34384F',
	green: '#345144',
	yellow: '#564B2E',
	orange: '#563B2E',
	red: '#56302E',
	pink: '#56303A',
	 */

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
				<svelte:component this={icon_component} />
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
			// border: #563b2e 1px solid;
			border: transparent 1px solid;
			// border: none;
			margin: 20;
			padding: 1px 1px 1px 1px;

			font-family: $sans;
			font-weight: 300;
			font-size: 1.2em;
			overflow: hidden;


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

			// border: #563b2e 1px solid;
			border: transparent 1px solid;
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
