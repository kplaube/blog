<script lang="ts">
	import { authorName, title } from '$lib/config';
	import type { PageData } from './$types';

	import FullArticle from '$lib/components/FullArticle.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title} | {title}</title>
	<meta name="author" content={authorName} />
	<meta name="keywords" content={data.post.tags && data.post.tags.join(', ')} />
</svelte:head>

<FullArticle post={data.post}>
	<svelte:component this={data.component} />
</FullArticle>
