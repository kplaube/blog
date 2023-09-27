<script lang="ts">
	import Container from './Container.svelte';

	export let avatar: string;
	export let description: string;
	export let title: string;
	export let url: string;
</script>

<header>
	<Container>
		<div class="inside-container">
			<a href={url}>
				<img src={avatar} alt="Avatar" />

				<div>
					<h1>{title}</h1>

					<span>{description}</span>
				</div>
			</a>
		</div>
	</Container>
</header>

<style>
	.inside-container {
		margin: 0 auto;
		max-width: 492px;
	}

	a {
		align-items: center;
		display: flex;
		text-decoration: none;
	}
	a:hover h1 {
		color: var(--primary-color);
	}

	header {
		padding: 3.5rem 0;
	}

	h1 {
		color: var(--brand-color);
		font-size: 1rem;
		font-weight: 300;
		letter-spacing: -0.96px;
		margin: 0 0 0.25rem;
		text-transform: uppercase;
	}

	img {
		background-color: var(--secondary-color);
		border-radius: 50%;
		filter: grayscale(60%);
		height: 64px;
		margin-right: 16px;
		width: 64px;
	}

	span {
		color: var(--secondary-color);
		font-size: 1rem;
		font-weight: 300;
	}
</style>
