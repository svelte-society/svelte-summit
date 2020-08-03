<script>
  import { Background } from "./Background/";
  import MobileMenu from "./MobileMenu.svelte";
  import Navigation from "./Navigation.svelte";
  import Info from "./Info.svelte";
  import Title from "./Title.svelte";
  import { writable } from "svelte/store";

  const menuOpen = writable(false);
</script>

<style>
  .container {
    position: relative;

    --small-padding: var(--media-lte-sm) 43px;
    padding-bottom: var(--small-padding, 125px);

    display: grid;
    --small-gap: var(--media-lte-sm) 42px;
    --medium-gap: var(--media-md) 42px;
    grid-gap: var(--small-gap, var(--medium-gap, 82px));
    place-items: start center;
  }

  .logo {
    display: grid;
    place-items: center;
    --small-padding: var(--media-lte-sm) 43px;
    padding-top: var(--small-padding, 125px);

    --small: var(--media-lte-sm) 21px;
    grid-gap: var(--small, 34px);
  }

  img {
    --small: var(--media-lte-sm) 65px;
    height: var(--small, 85px);
    width: var(--small, 85px);
  }

  .present {
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0.5em;

    color: #38332d;
  }
  .text {
    display: grid;
    --columns-small: var(--media-lte-sm) 1fr;
    grid-template-columns: var(--columns-small, auto auto);

    --small-gap: var(--media-lte-sm) 30px;
    grid-gap: var(--small-gap, 40px);

    --mobile-justify: var(--media-lte-sm);
    justify-self: var(--small-gap, end);

    --mobile-margin-offset: var(--media-lte-sm) 0;
    margin-right: var(--mobile-margin-offset, 15vw);

    padding: 0 20px;

    place-items: start center;
    color: var(--background);
    line-height: 125%;
  }
</style>

<div class="container">
  <Navigation on:click={() => ($menuOpen = true)} />
  <div class="logo">
    <img src="/images/svelte-society-logo.svg" alt="Svelte Society Logo" />
    <span class="present">PRESENTS</span>
  </div>
  <div class="text">
    <Title />
    <Info />
  </div>
  <Background />
</div>

{#if $menuOpen}
  <MobileMenu on:click={() => ($menuOpen = false)} />
{/if}
