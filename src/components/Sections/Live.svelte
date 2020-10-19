<script>
  export let videoId = "";
</script>

<style>
  .background {
    --small-padding: var(--media-lte-sm) 45px 25px;
    padding: var(--small-padding, 140px 40px);

    background: var(--background);
    background-image: url(/images/lake.svg);
    background-position: top;
    background-repeat: no-repeat;

    --mobile-backgrounds: var(--media-lte-sm) auto 130px;
    background-size: var(--mobile-backgrounds, auto 150px);

    display: grid;
    place-items: center;
  }
  .container {
    max-width: var(--container-width);
    text-align: center;
  }
  h2 {
    width: 100%;
  }

  @keyframes fade-radiosity {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    40% {
      opacity: 0.6;
      transform: scale(1);
    }
  }

  iframe {
    max-width: 90%;
    max-height: 80vmin;
    margin: auto;
  }
</style>

<div class="background" id="live">
  <div class="container">
    <h2>Thank you for being a part of Svelte Summit 2020!</h2>
    <!-- svelte-ignore a11y-missing-attribute -->

    <iframe
      width="840"
      height="420"
      src="https://www.youtube.com/embed/{videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen />
  </div>
</div>
