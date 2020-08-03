<style>
  .container {
    width: calc(100% - 50px);
    --small-max-width: var(--media-lte-sm) 300px;
    max-width: var(--small-max-width, var(--container-width));
    margin: 0 auto;
    opacity: 0.5;
    --small-padding: var(--media-lte-sm) 40px 25px 130px 25px;
    padding: var(--small-padding, 80px 25px 200px 25px);

    display: grid;
    --small-grid: var(--media-lte-sm) auto;
    grid-template-columns: var(--small-grid, auto auto);

    --small-justify: var(--media-lte-sm) center;
    justify-content: var(--small-justify, space-between);

    --text-center: var(--media-lte-sm) center;
    text-align: var(--text-center, initial);

    line-height: 200%;
  }
</style>

<div class="container">
  <div class="info">Svelte Summit is a volunteer effort. Code of Conduct.</div>
  <div class="design-by">Design by @mono_company</div>
</div>
