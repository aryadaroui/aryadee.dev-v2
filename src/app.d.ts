/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		visit_id: string;
		ip_address: string;
		timestamp: string;
	}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}
