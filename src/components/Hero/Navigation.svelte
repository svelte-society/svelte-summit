<script>
  import { currentSection } from "../../actions/highlightMenuItem";
  let y;
  $: scrolled = y > 100;
  export let menu;
</script>

<style>
  .container {
    position: fixed;
    top: 0;
    padding: 25px 0 20px 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    --small: var(--media-lte-sm) none;
    display: var(--small, flex);
  }
  .container.scrolled {
    background-color: #162b2e;
  }

  a {
    color: #2a8290;
    font-size: 19px;
    margin: 0 24px;
    padding: 8px 20px;
    text-decoration: none;

    transition: background-color 0.3s ease;
  }
  a:visited {
    color: #2a8290;
  }
  a.active {
    color: white;
    background: #6aa8b3;
  }

  a.scrolled {
    color: white;
  }

  a.scrolled:visited {
    color: white;
  }

  a.scrolled.active {
    background-color: #2a8290;
  }

  .hamburger {
    position: absolute;
    padding: 30px;
    top: 6px;
    right: 6px;

    --small: var(--media-lte-sm) initial;
    display: var(--small, none);
  }
  img {
    height: 16px;
    place-self: center;
  }
  span {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto auto;
    justify-items: center;
  }
</style>

<svelte:window bind:scrollY={y} />
<div class="container" class:scrolled>
  {#each menu as { url, name }}
    <a href={url} class:active={$currentSection == url} class:scrolled>
      {name}
    </a>
  {/each}
  <a target="_blank" href="https://twitter.com/sveltesociety" class:scrolled>
    <span>
      <img src="/images/twitter.svg" alt="" />
      Twitter
    </span>
  </a>
</div>
<div class="hamburger" on:click>
  <img src="/images/burger.svg" alt="" />
</div>
