<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import fingerprinter from '@fingerprintjs/fingerprintjs';
	// import type { UnknownComponents,  } from '@fingerprintjs/fingerprintjs';

	export let data;

	let client_data = {};

	var promise_resolve, promise_reject;
	let is_fingerprinted = new Promise((resolve, reject) => {
		promise_resolve = resolve;
		promise_reject = reject;
	});

	onMount(async () => {
		const fpPromise = fingerprinter.load({ monitoring: false });
		// console.log("mounted data: ", data.visit_id)

		fpPromise
			.then((fp) => {
				fp.get().then((result) => {
					client_data['fingerprint'] = result.visitorId;
					client_data['confidence'] = result.confidence.score;
					client_data['platform'] = navigator.platform
					client_data['browser'] = navigator.userAgent;
					// user_data['page_start'] = $page.url.pathname;
					promise_resolve(true);
				});
			})
			.catch((err) => {
				console.error(err);
				promise_reject(false);
			});
	});

	afterNavigate(async () => {
		is_fingerprinted.then(() => {
			client_data['page'] = $page.url.pathname;
			// client_data['referer'] = $page.url.searchParams.get('referer');

			fetch('/api/log', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'SPAGHETTI',
				},
				body: JSON.stringify(client_data),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		});
	});
</script>

<slot />

<style global lang="scss">
	@import '../styles/fonts.css';
	@import '../styles/main.scss';
</style>
