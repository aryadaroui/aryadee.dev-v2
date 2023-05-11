/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		visit_id: string;
		token: string;
	}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}
