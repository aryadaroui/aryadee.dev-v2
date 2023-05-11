<script lang="ts">
	import { PUBLIC_LOG_TOKEN } from '$env/static/public';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import fingerprinter from '@fingerprintjs/fingerprintjs';
	import { afterNavigate } from '$app/navigation';

	export let data; // has visit id

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
						Authorization: PUBLIC_LOG_TOKEN,
					},
					keepalive: false,
					body: JSON.stringify(client_mount),
				}).then((response) => response.json());
			});
		});
	});

	afterNavigate(async () => {
		fetch('/api/nav-log', {
			method: 'POST',
			headers: {
				Authorization: PUBLIC_LOG_TOKEN,
			},
			body: JSON.stringify({
				visit_id: data.visit_id,
				page: $page.url.pathname,
			}),
		});
	});
</script>

<slot />

<style global lang="scss">
	@import '../styles/fonts.css';
	@import '../styles/main.scss';
</style>
