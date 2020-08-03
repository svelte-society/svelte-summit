<script>
  import cssVars from "svelte-css-vars";
  import {
    BackMountain,
    MidMountain,
    FrontMountain,
    Reflection,
    Bears,
    Moon,
    EveningSun,
    MorningSun,
  } from "./SVG/";

  let type = "morning";

  $: styleVars = {
    background:
      type === "night" ? "#17353A" : type === "evening" ? "#E4D6D5" : "#D6F1F5",
  };
</script>

<style>
  .container {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;

    background: var(--background);
  }
</style>

<div class="container" use:cssVars={styleVars}>
  {#if type === 'night'}
    <Moon />
  {:else if type === 'evening'}
    <EveningSun />
  {:else}
    <MorningSun />
  {/if}
  <BackMountain {type} />
  <MidMountain {type} />
  <FrontMountain {type} />
  <Bears />
  <Reflection />
</div>
