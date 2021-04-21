<script>
	const gold = [
		{
			url: "https://filevine.com/",
			name: "Filevine",
			description:
				"Client, workflow and document management - the Work Operating System for Professionals",
			image: "filevine.svg",
		},
		{
			url: "https://www.gitpod.io",
			name: "Gitpod",
			description:
				"Remove all friction from the developer experience to be always ready-to-code and make software engineering more collaborative, joyful, and secure.",
			image: "gitpod.svg",
		},
		{
			url: "https://www.budibase.com",
			name: "Budibase",
			description: "Build internal tools on your own infrastructure in minutes",
			image: "budibase.svg",
		},
	];
</script>

<div class="background" id="sponsors">
	<div class="container">
		<h2>SPONSORED BY</h2>
		<div class="gold sponsors">
			{#each gold as sp}
				{#if sp.name}
					<a
						href={sp.url}
						rel="noopener noreferrer"
						target="_blank"
						class="sponsor"
						data-tooltip={sp.description}
						><img src="/images/sponsors/{sp.image}" alt="{sp.name} logo" /></a
					>
				{:else}
					<div class="sponsor">Your company (Gold)</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.background {
		--small-padding: var(--media-lte-sm) 50px 0;
		padding: var(--small-padding, 200px 40px 50px 40px);

		background: var(--background-dark);
	}
	.container {
		display: grid;
		--small-grid: var(--media-lte-sm) 0;
		grid-gap: var(--small-grid, 30px);
		max-width: var(--container-width);
		--small-margin: var(--media-lte-sm) -300px 20px 0px 20px;
		margin: var(--small-margin, -120px auto 70px auto);
	}
	h2 {
		--small-font: var(--media-lte-sm) 34px;
		font-size: var(--small-font, 60px);
		font-family: "Anton";
		line-height: 150%;
		text-align: center;
	}
	.sponsors {
		--small-margin: var(--media-lte-sm) 0 15px;
		margin: var(--small-margin, initial);
		display: grid;
		justify-content: center;
		grid-gap: 43px;
	}
	.sponsors + .sponsors {
		--small-top: var(--media-lte-sm) 40px;
		margin-top: var(--small-top, 0);
	}
	.gold {
		grid-template-columns: repeat(auto-fit, minmax(300px, 330fr));
	}
	.silver {
		grid-template-columns: repeat(auto-fit, minmax(150px, 240px));
	}
	.sponsor {
		display: grid;
		justify-content: center;
		align-items: center;
		background: var(--background-super-dark);
		padding: 30px 50px;
	}

	.silver.sponsors .sponsor {
		padding: 20px 40px;
	}

	.gold img {
		height: 66px;
		max-height: 66px;
	}

	.silver img {
		height: 50px;
		max-height: 50px;
		max-width: 100%;
		object-fit: contain;
	}
	.info {
		min-width: 0;
		color: #e4eef0;
		opacity: 50%;
		margin: 0 auto;
		margin-top: 40px;
		max-width: 575px;
		text-align: center;
	}

	[data-tooltip] {
		position: relative;
	}

	[data-tooltip]:before,
	[data-tooltip]:after {
		position: absolute;
		visibility: hidden;
		opacity: 0;
		-webkit-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
			-webkit-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
		-moz-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
			-moz-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
		transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
			transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		pointer-events: none;
	}

	[data-tooltip]:hover:before,
	[data-tooltip]:hover:after,
	[data-tooltip]:focus:before,
	[data-tooltip]:focus:after {
		visibility: visible;
		opacity: 1;
	}

	[data-tooltip]:after {
		z-index: 1000;
		padding: 8px;
		width: 260px;
		background-color: hsla(4, 63%, 11%, 0.86);
		color: #fff;
		font-weight: normal;
		content: attr(data-tooltip);
		font-size: 14px;
		line-height: 1.2;
	}

	[data-tooltip]:before,
	[data-tooltip]:after {
		top: 100%;

		--small-adjust: var(--media-lte-sm) calc(50% - 138px);
		left: var(--small-adjust, calc(70% - 138px));
	}
</style>
