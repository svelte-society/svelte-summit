<script>
	import { Background } from "./Background/";
	import Navigation from "./Navigation.svelte";
	import Info from "./Info.svelte";
	import Title from "./Title.svelte";

	const menu = [
		{
			name: "Intro",
			url: "#intro",
		},
		{
			name: "Live!",
			url: "#live",
		},
		{
			name: "Sponsors",
			url: "#sponsors",
		},
		{
			name: "Speakers",
			url: "#speakers",
		},
		{
			name: "FAQ",
			url: "#faq",
		},
	];
</script>

<div class="container" id="intro">
	<Navigation
		hydrate-client={{ menu }}
		hydrate-options={{ preload: true, loading: "eager" }} />
	<div class="logo">
		<a href="https://sveltesociety.dev/"
			><img src="/images/svelte-society-logo.svg" alt="Svelte Society" /></a>
		<span class="present">presents</span>
	</div>
	<div class="text">
		<Title />
		<Info />
	</div>
	<Background />
</div>

<style>
	.container {
		position: relative;

		--small-padding: var(--media-lte-sm) 350px;
		padding-bottom: var(--small-padding, 125px);

		display: grid;
		--small-gap: var(--media-lte-sm) 42px;
		--medium-gap: var(--media-md) 42px;
		grid-gap: var(--small-gap, var(--medium-gap, 82px));
		place-items: center;
	}

	.logo {
		display: grid;
		place-items: center;
		--small-padding: var(--media-lte-sm) 43px;
		padding-top: var(--small-padding, 125px);

		--small: var(--media-lte-sm) 21px;
		grid-gap: var(--small, 34px);
	}

	img {
		--small: var(--media-lte-sm) 65px;
		height: var(--small, 85px);
		width: var(--small, 85px);
	}

	.present {
		font-size: 14px;
		line-height: 150%;
		letter-spacing: 0.5em;
		text-transform: uppercase;

		color: #38332d;
	}
	.text {
		display: grid;
		--columns-small: var(--media-lte-sm) 1fr;
		grid-template-columns: var(--columns-small, 1fr 1fr);

		--small-gap: var(--media-lte-sm) 10px;
		grid-gap: var(--small-gap, 20px);

		padding: 0 20px;

		align-items: start;
		color: var(--background);
		line-height: 125%;
	}
</style>
