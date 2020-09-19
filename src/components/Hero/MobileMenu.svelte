<script>
  export let menu;
</script>

<style>
  .container {
    background: #17353a;
    position: fixed;
    z-index: 1001;
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
    color: var(--sky-blue);
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

<div class="container">
  <ul>
    {#each menu as { name, url }}
      <li><a on:click href="/{url}">{name}</a></li>
    {/each}
    <li><a href="https://forms.gle/6PBKXng9jfrvxjhX8" rel="noreferrer" target="_blank"> Sign up </a></li>
    <li><a target="_blank" href="https://twitter.com/sveltesociety">Twitter</a></li>
  </ul>
  <button on:click> <img src="dist/static/images/close.svg" alt="" /> </button>
</div>
