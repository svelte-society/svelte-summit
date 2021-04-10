<script>
	export let talks;
	import Speaker from "../Speaker.svelte";
</script>

<div class="container">
	<section id="speakers">
		<h2>SPEAKERS</h2>
		<div class="grid">
			{#each talks as speaker}
				<Speaker {speaker} />
			{/each}
		</div>
	</section>
</div>

<style>
	.container {
		--small-margin: var(--media-lte-sm) 0 20px 50px 20px;
		margin: var(--small-margin, 0 auto 50px auto);
	}
	h2 {
		--small-font: var(--media-lte-sm) 34px;
		font-size: var(--small-font, 60px);
		font-family: "Anton";
		line-height: 150%;
		text-align: center;
	}
	section {
		display: grid;
		justify-content: initial;
		margin: 0 auto;

		--small-padding: var(--media-lte-sm) 50px 0;
		padding: var(--small-padding, initial 0);
		max-width: var(--container-width);
	}
	.grid {
		display: grid;
		grid-gap: 50px;
		--small-grid: var(--media-lte-sm) 300px 1fr;
		grid-template-columns: repeat(
			auto-fill,
			minmax(var(--small-grid, 400px, 1fr))
		);
	}
</style>
