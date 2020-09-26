<script>
  export let sponsors;

  const gold = sponsors.filter((s) => s.type === "gold");
  const silver = sponsors.filter((s) => s.type === "silver");
</script>

<style>
  .background {
    --small-padding: var(--media-lte-sm) 50px 0;
    padding: var(--small-padding, 200px 40px 50px 40px);

    background: #2b636c;
    background-image: url(/images/lake.svg);
    background-position: top;
    background-repeat: no-repeat;

    --mobile-backgrounds: var(--media-lte-sm) auto 130px;
    background-size: var(--mobile-backgrounds, auto 150px);
  }
  .container {
    display: grid;
    --small-grid: var(--media-lte-sm) 0;
    grid-gap: var(--small-grid, 30px);
    max-width: var(--container-width);
    --small-margin: var(--media-lte-sm) 0px 20px -50px 20px;
    margin: var(--small-margin, -120px auto 70px auto);
  }
  h2 {
    --small-font: var(--media-lte-sm) 34px;
    font-size: var(--small-font, 60px);
    font-family: "Anton";
    line-height: 150%;
    text-align: center;
  }
  .sponsors {
    --small-margin: var(--media-lte-sm) 0 15px;
    margin: var(--small-margin, initial);
    display: grid;
    justify-content: center;
    grid-gap: 43px;
  }
  .sponsors + .sponsors {
    --small-top: var(--media-lte-sm) 40px;
    margin-top: var(--small-top, 0);
  }
  .gold {
    grid-template-columns: repeat(auto-fit, minmax(300px, 330fr));
  }
  .silver {
    grid-template-columns: repeat(auto-fit, minmax(150px, 240px));
  }
  .sponsor {
    display: grid;
    justify-content: center;
    align-items: center;
    background: #1c464d;
    padding: 30px 50px;
  }

  .silver.sponsors .sponsor {
    padding: 20px 40px;
  }

  .gold img {
    height: 66px;
    max-height: 66px;
  }

  .silver img {
    height: 50px;
    max-height: 50px;
    max-width: 100%;
    object-fit: contain;
  }
  .info {
    min-width: 0;
    color: #e4eef0;
    opacity: 50%;
    margin: 0 auto;
    margin-top: 40px;
    max-width: 575px;
    text-align: center;
  }

  [data-tooltip] {
    position: relative;
  }

  [data-tooltip]:before,
  [data-tooltip]:after {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
      -webkit-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    -moz-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
      -moz-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
      transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    pointer-events: none;
  }

  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after,
  [data-tooltip]:focus:before,
  [data-tooltip]:focus:after {
    visibility: visible;
    opacity: 1;
  }

  [data-tooltip]:after {
    z-index: 1000;
    padding: 8px;
    width: 260px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    font-weight: normal;
    content: attr(data-tooltip);
    font-size: 14px;
    line-height: 1.2;
  }

  [data-tooltip]:before,
  [data-tooltip]:after {
    top: 100%;

    --small-adjust: var(--media-lte-sm) calc(50% - 138px);
    left: var(--small-adjust, calc(70% - 138px));
  }
</style>

<div class="background" id="sponsors">
  <div class="container">
    <h2>SPONSORED BY</h2>
    <div class="gold sponsors">
      {#each gold as { url, description, name, image }}
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          class="sponsor"
          data-tooltip={description}>
          <img src="/images/sponsors/{image}" alt="{name} logo" />
        </a>
      {/each}
    </div>
    <div class="silver sponsors">
      {#each silver as { url, description, name, image }}
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          class="sponsor"
          data-tooltip={description}>
          <img src="/images/sponsors/{image}" alt="{name} logo" />
        </a>
      {/each}
    </div>
    <p class="info">
      More sponsors welcome! Any financial backing will be used to support the
      event and further development of Svelte itself. <a
        href="mailto:sponsors@sveltesociety.dev">Get in touch</a>.
    </p>
  </div>
</div>
