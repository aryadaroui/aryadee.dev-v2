<script lang="ts">
	import { PUBLIC_MOUNT_LOG_TOKEN } from '$env/static/public';
	import { onMount } from 'svelte';

	import fingerprinter from '@fingerprintjs/fingerprintjs';

	export let data; // has visit id

	onMount(async () => {
		fingerprinter.load({ monitoring: false }).then((fp) => {
			fp.get().then((result) => {
				let client_data = {
					fingerprint: result.visitorId,
					confidence: result.confidence.score,
					user_agent: navigator.userAgent,
					visit_id: data.visit_id,
					// page_start: $page.url.pathname,
				};

				fetch('/api/mount-log', {
					method: 'POST',
					headers: {
						Authorization: PUBLIC_MOUNT_LOG_TOKEN,
					},
					body: JSON.stringify(client_data),
				}).then((response) => response.json());
			});
		});
	});
</script>

<slot />

<style global lang="scss">
	@import '../styles/fonts.css';
	@import '../styles/main.scss';
</style>
