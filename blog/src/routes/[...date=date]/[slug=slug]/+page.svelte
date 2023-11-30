<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { authorAvatar, authorName, description, title, url } from '$lib/config';
	import type { PageData } from './$types';

	import FullArticle from '$lib/components/FullArticle.svelte';
	import '$lib/styles/global.css';
	import '$lib/styles/gruvbox-dark-code.css';
	import 'normalize.css';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title} | {title}</title>
	<meta name="author" content={authorName} />
	<meta name="keywords" content={data.post.tags.join(', ')} />
</svelte:head>

<Container>
	<Header avatar={authorAvatar} {description} {title} {url} />
	<FullArticle post={data.post}>
		<svelte:component this={data.component} />
	</FullArticle>
</Container>

<Footer />
