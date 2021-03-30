<script>
	import Card from "../Card.svelte";
	import Button from "../Button.svelte";
</script>

<div class="background" id="cfp">
	<div class="container">
		<Card center>
			<h3>Looking for sponsors</h3>
			<p>
				Since last time we've decided to try to bring the online experience to
				another level by improving the quality. If you (or your company) are
				interested in sponsoring the event, reach out to us via email using the
				link below and we can have a chat.
			</p>
			<Button href="mailto:sponsors@sveltesociety.dev" black>Send email</Button>
		</Card>
	</div>
</div>

<style>
	.background {
		padding: 100px 0;

		background: var(--background-super-dark);
		display: grid;
		justify-content: center;
	}
	.container {
		display: grid;
		--small-grid: var(--media-lte-sm) 0;
		grid-gap: var(--small-grid, 30px);
		max-width: var(--container-width);
	}
	h3 {
		font-size: 28px;
		font-weight: normal;
	}
	p {
		font-size: 16px;
		--small-font-size: var(--media-lte-sm) 14px;
	}
	h3,
	p {
		margin: 0;
		--small-width: var(--media-lte-sm) 100%;
		width: var(--small-width, 90%);
		color: var(--sky-blue);
	}
</style>
