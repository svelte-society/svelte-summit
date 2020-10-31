<script>
  export let link = false;
  export let viewTalk = false;
  export let singleTalk = false;
  export let speaker;
  const { image, title, name, twitter } = speaker;
</script>

<style>

  .speaker {
    display: grid;
    grid-gap: 32px;
    --small-grid: var(--media-lte-sm) 1fr;
    grid-template-columns: var(--small-grid, 80px auto);
  }

  .image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  .meta {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: auto 1fr;
    margin-bottom: 8px;
  }

  .name {
    color: #e4eef0;
    opacity: 0.67;
  }

  h1 {
    font-family: "Overpass", Arial, sans-serif;
    margin: 0 auto;
    line-height: 140%;
    padding-top: 5px;
    font-size: 2em;
  }

  h3 {
    font-family: "Overpass", Arial, sans-serif;
    margin: 0 auto;
    line-height: 140%;
    padding-top: 5px;
    font-size: 2em;
  }

  a {
    text-decoration: none;
  }

  .twitter {
    display: grid;
    grid-gap: 5px;
    align-items: center;
    grid-template-columns: auto 1fr;
    color: #005daa;
  }

  .twitter a {
    color: #e4eef0;

    opacity: 0.67;
    font-size: 14px;
  }

  .twitter img {
    width: 15px;
  }

  div :global(p) {
    font-size: 18px;
    color: #bedde2;
    line-height: 170%;
  }

  .viewTalk {
    margin-top: 2em;
  }

  .viewTalk a {
    background: #307f8b;
    padding: 1em;
  }

</style>

<div class="speaker">
  <div class="image">
    <img src="/images/speakers/{image}" alt="Speaker profile" />
  </div>
  <div>
    <div class="meta">
      <span class="name">{name}</span>
      {#if twitter}
        <div class="twitter">
          <img src="/images/twitter.svg" alt="Twitter logo" />
          <a
            rel="noreferrer"
            target="_blank"
            href="http://twitter.com/{twitter}">{twitter}</a>
        </div>
      {/if}
    </div>
    {#if singleTalk}
      <h1>
        {#if link}<a href="/talks/{speaker.slug}">{title}</a>{:else}{title}{/if}
      </h1>
    {:else}
      <h3>
        {#if link}<a href="/talks/{speaker.slug}">{title}</a>{:else}{title}{/if}
      </h3>
    {/if}
    {@html speaker.content}
    {#if viewTalk}
      <div class="viewTalk"><a href="/talks/{speaker.slug}">View Talk</a></div>
    {/if}
  </div>
</div>
