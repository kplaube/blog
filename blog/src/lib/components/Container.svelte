<script lang="ts">
	export let width = '720px';
</script>

<div class="container" style="--width: {width}">
	<slot />
</div>

<style>
	.container {
		height: 100%;
		margin: 0 auto;
		padding: 0 2rem;
	}

	@media (min-width: 480px) {
		.container {
			max-width: var(--width);
		}
	}
</style>
