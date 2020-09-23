<script>
  let y;
  $: scrolled = y > 100;
  export let menu;
  let menuOpen = false;
</script>

<style>
  .navcontainer {
    position: fixed;
    top: 0;
    left: 0;
    padding: 25px 0 20px 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    --small: var(--media-lte-sm) none;
    display: var(--small, flex);
  }
  .navcontainer.scrolled {
    background-color: #162b2e;
  }

  .big-nav {
    color: #2a8290;
    font-size: 19px;
    margin: 0 24px;
    padding: 4px 20px;
    text-decoration: none;
    display: inline-flex;

    transition: background-color 0.3s ease;
  }

  .big-nav:visited {
    color: #2a8290;
  }

  .big-nav:hover,
  .big-nav:focus {
    background: rgba(255, 255, 255, 0.2);
  }

  a.scrolled {
    color: white;
  }

  a.scrolled:visited {
    color: white;
  }

  .hamburger {
    position: absolute;
    padding: 30px;
    top: 6px;
    right: 6px;

    --small: var(--media-lte-sm) initial;
    display: var(--small, none);
  }
  .twitter {
    height: 16px;
    place-self: center;
  }
  span {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto auto;
    justify-items: center;
  }
  .container {
    background: #17353a;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
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
  .small-nav:hover {
    color: white;
    opacity: 1;
  }
  .small-nav {
    color: var(--sky-blue);
    opacity: 0.6;
    text-decoration: none;
    letter-spacing: 0.6px;
  }
  button {
    background: transparent;
    border: none;
    position: absolute;
    top: 6px;
    right: 6px;
  }
  .close {
    padding: 30px;
  }
</style>

<svelte:window bind:scrollY={y} />
<div class="navcontainer" class:scrolled>
  <nav>
    {#each menu as { url, name }}
      <a class="big-nav" href={url} class:scrolled> {name} </a>
    {/each}

    <a
      class="big-nav"
      rel="noreferrer"
      href="https://forms.gle/6PBKXng9jfrvxjhX8"
      target="_blank"
      class:scrolled>
      Sign Up
    </a>

    <a
      class="big-nav"
      rel="noreferrer"
      target="_blank"
      href="https://twitter.com/sveltesociety"
      class:scrolled>
      <span>
        <img class="twitter" src="/images/twitter.svg" alt="" /> Twitter
      </span>
    </a>
  </nav>
</div>
<div class="hamburger" on:click={() => (menuOpen = true)}>
  <img src="/images/burger.svg" alt="" />
</div>

{#if menuOpen}
  <div class="container">
    <ul>
      {#each menu as { name, url }}
        <li>
          <a
            class="small-nav"
            on:click={() => (menuOpen = false)}
            href="/{url}">{name}</a>
        </li>
      {/each}
      <li>
        <a
          class="small-nav"
          href="https://forms.gle/6PBKXng9jfrvxjhX8"
          rel="noreferrer"
          target="_blank">
          Sign up
        </a>
      </li>
      <li>
        <a
          class="small-nav"
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/sveltesociety">Twitter</a>
      </li>
    </ul>
    <button on:click={() => (menuOpen = false)}>
      <img class="close" src="images/close.svg" alt="" />
    </button>
  </div>
{/if}
