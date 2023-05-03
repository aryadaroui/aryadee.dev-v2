<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import FingerprintJS from '@fingerprintjs/fingerprintjs';

	let user_data = {};

	var promise_resolve, promise_reject;
	let is_fingerprinted = new Promise((resolve, reject) => {
		promise_resolve = resolve;
		promise_reject = reject;
	});

	onMount(async () => {
		const fpPromise = FingerprintJS.load({ monitoring: false });

		fpPromise
			.then((fp) => {
				fp.get().then((result) => {
					user_data['fingerprint'] = result.visitorId;
					user_data['components'] = result.components;
					user_data['confidence'] = result.confidence.score;
					user_data['page_start'] = $page.url.pathname;
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
			user_data['page_nav'] = $page.url.pathname;
			console.log('Sending data to endpoint: ', user_data);

			fetch('/api/log', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// 'Authorization': 'DUMMY TOKEN'
				},
				body: JSON.stringify(user_data),
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
