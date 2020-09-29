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
  <!-- <link rel="stylesheet" href="/fonts/fonts.css" /> -->
</svelte:head>
<div class="container">
  {@html templateHtml}
</div>
