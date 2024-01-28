<script lang="ts">
	import SummaryArticle from '$lib/components/SummaryArticle.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<section>
	{#each data.posts as post (post.slug)}
		<SummaryArticle {post} />
	{/each}
</section>
