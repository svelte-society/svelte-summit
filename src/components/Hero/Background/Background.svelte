<script>
  import {
    BackMountain,
    MidMountain,
    FrontMountain,
    Reflection,
    Bears,
    MorningSun,
  } from "./SVG/";
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

    background: #d6f1f5;
  }
</style>

<div class="container">
  <MorningSun />
  <BackMountain type="morning" />
  <MidMountain type="morning" />
  <FrontMountain type="morning" />
  <Bears />
  <Reflection />
</div>
