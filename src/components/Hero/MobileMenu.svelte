<script>
  export let menu;
</script>

<style>
  .container {
    background: #17353a;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  ul {
    padding-top: 100px;
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
  li:hover {
    color: white;
    opacity: 1;
  }
  a {
    color: var(--sky-blue);
    opacity: 0.6;
    text-decoration: none;
  }
  img {
    padding: 30px;
    position: absolute;
    top: 6px;
    right: 6px;
  }
</style>

<div class="container">
  <ul>
    {#each menu as { name, url }}
      <li>
        <a on:click href="/{url}">{name}</a>
      </li>
    {/each}
    <li>
      <a on:click target="_blank" href="twitter.com/sveltesociety">Twitter</a>
    </li>
  </ul>
</div>
<button on:click>
  <img src="/images/close.svg" alt="" />
</button>
