<script>
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { authorAvatar, description, title, url } from '$lib/config';

	import '$lib/styles/global.css';
	import '$lib/styles/gruvbox-dark-code.css';
	import 'normalize.css';
</script>

<Container>
	<Header avatar={authorAvatar} {description} {title} {url} />

	<slot />

	<Footer />
</Container>
