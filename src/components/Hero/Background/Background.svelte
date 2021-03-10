<script>
  import {
    Mountain,
    Lake
  } from "./SVG/";
</script>

<style>
  .container {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -10;
    --padding-tablet: var(--media-lte-md) 105px;
    padding-top: var(--padding-tablet, 180px);

    background: #F4E7F1;
  }
</style>

<div class="container">
  <Mountain />
  <Lake />
</div>
