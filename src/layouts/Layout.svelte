<script>
  export let templateHtml;
</script>

<svelte:head>
  <!-- <link
    rel="preload"
    href="/fonts/Anton-Regular.woff"
    as="font"
    type="font/woff2"
    crossorigin />
  <link
    rel="preload"
    href="/fonts/Overpass-Regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin />
  <link
    rel="preload"
    href="/fonts/Overpass-Bold.woff2"
    as="font"
    type="font/woff2"
    crossorigin />
  <link
    rel="preload"
    href="/fonts/Inter-Regular.woff"
    as="font"
    type="font/woff2"
    crossorigin /> -->
  <link rel="stylesheet" href="/style.css" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏔️</text></svg>">

  <!-- <link rel="stylesheet" href="/fonts/fonts.css" /> -->
</svelte:head>
<div class="container">
  {@html templateHtml}
</div>
