<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { authorAvatar, description, title, url } from '$lib/config';
	import type { PageData, PageServerData } from './$types';

	import FullArticle from '$lib/components/FullArticle.svelte';
	import '$lib/styles/global.css';
	import 'normalize.css';

	export let data: PageData;
</script>

<Header avatar={authorAvatar} {description} {title} {url} />

<Container>
	<FullArticle post={data.post}>
		<svelte:component this={data.component} />
	</FullArticle>
</Container>

<Footer />
