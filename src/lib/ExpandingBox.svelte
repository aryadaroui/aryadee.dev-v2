<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<script lang="ts">
	import { onMount } from 'svelte';

	export let dispatch_event = true; // dispatches a resize event when the box is expanded. This is useful for plots that need to be resized when the box is expanded.

	let expanding_box: HTMLDivElement;

	onMount(() => {
		if (dispatch_event) {
			expanding_box.addEventListener('transitionend', (event) => {
				if (event.propertyName === 'width') {
					window.dispatchEvent(new Event('resize'));
				}
			});
		}

		expanding_box.addEventListener('scroll', () => {
			expanding_box.focus();
		});
	});
</script>

<div class="expanding-box" tabindex="0" bind:this={expanding_box}>
	<div class="container">
		<slot />
	</div>
</div>

<style lang="scss">
	.expanding-box {
		margin: 1em 0;
		border-radius: 8px;
		border: transparent 1px solid;
		overflow: scroll;
		width: 100%;

		padding: 0;

		position: relative;
		z-index: 5;
		background-color: hsl(230, 10%, 7%);

		display: flex;
		justify-content: center;

		transition: width 0.3s ease, margin-left 0.3s ease, border 0.15s ease;
		&:hover {
			cursor: pointer;
			border: rgba($blue-mid, 1) 1px solid;
			transition: border 0.15s ease;
		}

		&:focus {
			transition: width 0.3s ease, margin-left 0.3s ease, border-color 0.3s ease;
			border: 1px solid $blue-hard;
			cursor: auto;

			width: calc(98vw);
			margin-left: calc(50% - 49vw);

			@media (max-width: 1350px) {
				// margin-left: calc(45% - 45vw);
				// margin-left: calc(((100vw - 100% - 300px - 200px) * -1) - 80px);
				margin-left: calc(((99vw - 100% - 300px - 160px) * -1) - 80px);
				width: calc(98vw);
			}

			@media (max-width: 1080px) {
				margin-left: calc(50% - 49vw);
				width: calc(98vw);
			}

			@media (max-width: 690px) {
				margin-left: calc(50% - 50vw);
				width: calc(99vw);
			}
		}

		.container {
			// border: pink 1px solid;
			white-space: nowrap;

			// width: calc(98vw - 40px);
			width: calc(98vw);
		}
	}
</style>
