<script>
  export let routeHTML, settings;
  const assetDir = settings.locations.assets.replace(
    settings.locations.public,
    "/"
  );
</script>

<svelte:head>
  <link
    rel="preload"
    href="/dist/static/fonts/Anton-Regular.woff"
    as="font"
    type="font/woff2"
    crossorigin />
  <link
    rel="preload"
    href="/dist/static/fonts/Overpass-Regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin />
  <link
    rel="preload"
    href="/dist/static/fonts/Overpass-Bold.woff2"
    as="font"
    type="font/woff2"
    crossorigin />
  <link
    rel="preload"
    href="/dist/static/fonts/Inter-Regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin />
  <link rel="stylesheet" href="{assetDir}style.css" />
</svelte:head>
<div class="container">
  {@html routeHTML}
</div>
