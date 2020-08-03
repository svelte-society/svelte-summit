<style>
  h1 {
    margin-block-start: 0;
    margin-block-end: 0;
    --small-margin: var(--media-lte-sm) 0px;
    margin-top: var(--small-margin, 155px);

    display: grid;
    --small-placement: var(--media-lte-sm) center;
    place-items: var(--small-placement, center end);
  }
  .leading {
    color: var(--background-darkest);
  }
  .lagging {
    color: var(--background);
  }
</style>

<h1 class="display">
  <span class="leading">SVELTE</span>
  <span class="lagging">SUMMIT</span>
</h1>
