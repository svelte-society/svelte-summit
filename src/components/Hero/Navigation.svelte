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
    background-color: #471318;


  }

  .big-nav {
    color: #A8434D;
    font-size: 19px;
    margin: 0 24px;
    --small-pad: var(--media-lte-md) 4px 10px;
    padding: var(--small-pad, 4px 20px);
    text-decoration: none;
    display: inline-flex;

    transition: background-color 0.3s ease;
  }

  .big-nav:visited {
    color: #A8434D;
  }

  .big-nav:hover,
  .big-nav:focus {
    background: rgba(255, 255, 255, 0.2);
  }

  a.scrolled {
    color: white;
    fill: #ffffff;
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
  svg {
    height: 16px;
    fill: var(--background);
    place-self: center;
  }
  svg.scrolled {
    fill: #ffffff;
  }
  span {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto auto;
    justify-items: center;
  }
  .container {
    background: var(--background-super-dark);
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
      href="https://emailoctopus.com/lists/a3d49b32-0df8-11eb-a3d0-06b4694bee2a/forms/subscribe"
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
        <svg
          class:scrolled
          viewBox="0 0 21 16"
          xmlns="http://www.w3.org/2000/svg"><path
            d="M20.3 2c-.7.3-1.5.4-2.4.5A3.8 3.8 0 0019.7.3c-.8.5-1.7.8-2.6 1a4.2 4.2 0 00-3-1.3 4.2 4.2 0 00-2.9 1.2 4 4 0 00-1 3.7A12.3 12.3 0 011.5.7 3.8 3.8 0 002.8 6c-.7 0-1.3-.2-1.9-.5 0 1 .3 1.9 1 2.6.5.7 1.4 1.2 2.3 1.3l-1 .1h-.9c.3.7.8 1.4 1.5 2 .6.4 1.5.7 2.3.8A8.4 8.4 0 010 13.8a12 12 0 0014.6-1.6 11.3 11.3 0 003.4-8v-.5c1-.3 1.8-1 2.3-1.8z" /></svg>
        Twitter
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
