<script>
  import SunMoon from "./SunMoon.svelte";
  import {
    BackMountain,
    MidMountain,
    FrontMountain,
    Reflection,
    Bears,
  } from "./SVG/";

  let type = "morning";
</script>

<style>
  .container {
    overflow-x: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;

    background: var(--sky-blue);
  }
</style>

<div class="container">
  <BackMountain {type} />
  <MidMountain {type} />
  <FrontMountain {type} />
  <Bears />
  <Reflection />
</div>
