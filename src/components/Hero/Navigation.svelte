<script>
  import { currentSection } from "../../actions/highlightMenuItem";
  let y;
  $: scrolled = y > 100;
  let menu = [
    {
      name: "Intro",
      url: "#intro",
    },
    {
      name: "Call For Proposals",
      url: "#cfp",
    },
    {
      name: "TEST",
      url: "#sponsors",
    },
    {
      name: "FAQ",
      url: "#faq",
    },
    {
      name: "🐧 Twitter",
      url: "https://twitter.com/sveltesociety",
    },
  ];
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
    top: 0;
    right: 0;

    --small: var(--media-lte-sm) initial;
    display: var(--small, none);
  }
</style>

<svelte:window bind:scrollY={y} />
<div class="container" class:scrolled>
  {#each menu as { url, name }}
    <a href={url} class:active={$currentSection == url} class:scrolled>
      {name}
    </a>
  {/each}
</div>
<div class="hamburger">M</div>
