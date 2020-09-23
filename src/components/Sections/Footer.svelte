<style>
  .container {
    color: #808080;
    width: calc(100% - 50px);
    --small-max-width: var(--media-lte-sm) 300px;
    max-width: var(--small-max-width, var(--container-width));
    margin: 0 auto;
    --small-padding: var(--media-lte-sm) 40px 25px 110px 25px;
    padding: var(--small-padding, 80px 25px 150px 25px);

    display: grid;
    grid-gap: 30px;
    --small-grid: var(--media-lte-sm) auto;
    grid-template-columns: var(--small-grid, auto auto auto);

    --small-justify: var(--media-lte-sm) center;
    justify-content: var(--small-justify, space-between);

    align-items: center;

    --text-center: var(--media-lte-sm) center;
    text-align: var(--text-center, initial);

    line-height: 200%;
  }

  .organised-by {
    display: grid;
    place-items: center;
    grid-gap: 10px;
    grid-template-columns: 1fr;
  }
  .organised-by img {
    height: 60px;
  }

  .design-by {
    display: grid;
    place-items: center;
    grid-gap: 10px;
    grid-template-columns: 1fr;
  }

  .design-by img {
    height: 30px;
  }
</style>

<div class="container">
  <div class="info">Svelte Summit is a volunteer effort.</div>
  <div class="organised-by">
    <span>Organized by</span><a target="_blank" rel="noreferrer" href="https://svelte.school"><img
        src="/images/svelteschool.svg"
        alt="Svelte School Logo" /></a>
  </div>
  <div class="design-by">
    <span> Design by </span>
    <a target="_blank" rel="noreferrer" href="https://mono.company/"><img
        src="/images/mono.svg"
        alt="mono logo" />
    </a>
  </div>
</div>
