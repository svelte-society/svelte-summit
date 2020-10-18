<script>
  export let videoId = '';
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
  .live {
    background-color: #ff3e00;
    padding: 0 3px 0 5px;
    border-radius: 3px;
    font-size: 75%;
    letter-spacing: 2px;
    position: relative;
    z-index: 1;
  }
  .live:before {
    content: '';
    z-index: -1;
    position: absolute;
    display: block;
    border-radius: inherit;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    box-shadow: 0 0 5px #ffffff80, 0 0 10px 8px var(--svelte-orange);
    opacity: 0.3;
    transform: scale(0.8);
    animation: fade-radiosity infinite 2s ease-in-out;
  }
  @keyframes fade-radiosity {
    0%, 100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    40% {
      opacity: .6;
      transform: scale(1);
    }
  }
  a:hover {
    color: #e4eef0;
  }
  iframe {
    max-width: 90%;
    max-height: 80vmin;
    margin: auto;
  }
</style>

<div class="background" id="live">
  <div class="container">
    <h2>
      Watch it
      <span class="live">LIVE</span>
      on
      <a
        href="https://www.youtube.com/watch?v={videoId}"
        rel="noreferrer"
        target="_blank"
      >YouTube</a>!
    </h2>
    <iframe
      width="840"
      height="420"
      src="https://www.youtube.com/embed/{videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</div>
