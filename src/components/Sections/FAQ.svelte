<div class="background" id="faq">
	<div class="container">
		<h2>Frequently Asked Questions</h2>
		<div class="questions">
			<slot />
		</div>
	</div>
</div>

<style>
	.background {
		--small-padding: var(--media-lte-sm) 45px 25px;
		padding: var(--small-padding, 140px 40px);

		background: var(--background-super-dark);
		display: grid;
		place-items: center;
	}
	.container {
		max-width: var(--container-width);
	}
	.questions {
		display: grid;
		grid-gap: 40px 50px;

		--small-grid: var(--media-lte-sm) auto;
		grid-template-columns: repeat(
			auto-fit,
			minmax(var(--small-grid, 350px), 1fr)
		);
	}
</style>
