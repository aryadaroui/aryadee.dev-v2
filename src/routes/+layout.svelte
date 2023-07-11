<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PlotlyLib, plotly_status } from '$lib/store';

	import fingerprinter from '@fingerprintjs/fingerprintjs';
	import { afterNavigate } from '$app/navigation';

	export let data; // has visit id and token

	let pre_navigated = false; // to prevent logging on first load

	function init() {
		if (!$PlotlyLib) {
			$PlotlyLib = window?.Plotly;
		}
	}

	onMount(async () => {
		fingerprinter.load({ monitoring: false }).then((fp) => {
			fp.get().then((result) => {
				let client_mount = {
					fingerprint: result.visitorId,
					confidence: result.confidence.score,
					visit_id: data.visit_id,
				};

				fetch('/api/mount-log', {
					method: 'POST',
					headers: {
						token: data.token,
					},
					keepalive: false,
					body: JSON.stringify(client_mount),
				}).then((response) => response.json());
			});
		});

		const script = document.createElement('script');
		script.src = 'https://cdn.plot.ly/plotly-latest.min.js';

		script.onload = () => {
			$plotly_status = 'Loaded Plotly.js';
			init();
		};

		script.onerror = () => {
			$plotly_status = 'Error loading Plotly.js';
		};

		document.head.appendChild(script);
	});

	afterNavigate(async () => {
		if (pre_navigated) {
			fetch('/api/nav-log', {
				method: 'POST',
				headers: {
					token: data.token,
				},
				body: JSON.stringify({
					visit_id: data.visit_id,
					page: $page.url.pathname,
				}),
			});
		}

		pre_navigated = true;
	});
</script>

<slot />

<style global lang="scss">
	@import '../styles/fonts.css';
	@import '../styles/main.scss';
</style>
