<script>
	export let menu;
</script>

<div class="container">
	<ul>
		{#each menu as { name, url }}
			<li><a on:click href="/{url}">{name}</a></li>
		{/each}
		<li>
			<a
				href="https://emailoctopus.com/lists/a3d49b32-0df8-11eb-a3d0-06b4694bee2a/forms/subscribe"
				rel="noreferrer"
				target="_blank">
				Sign up
			</a>
		</li>
		<li>
			<a target="_blank" href="https://twitter.com/sveltesociety">Twitter</a>
		</li>
	</ul>
	<button on:click> <img src="/images/close.svg" alt="" /> </button>
</div>

<style>
	.container {
		background: var(--background-super-dark);
		position: fixed;
		z-index: 990;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}
	ul {
		padding-top: 100px;
		padding-bottom: 100px;
		display: grid;
		grid-gap: 40px;
		list-style: none;
	}
	li {
		text-transform: uppercase;
		font-family: Anton;
		font-size: 48px;
		line-height: 120%;
	}
	a:hover {
		color: white;
		opacity: 1;
	}
	a {
		color: white;
		opacity: 0.6;
		text-decoration: none;
		letter-spacing: 0.6px;
	}
	button {
		position: absolute;
		top: 6px;
		right: 6px;
	}
	img {
		padding: 30px;
	}
</style>
