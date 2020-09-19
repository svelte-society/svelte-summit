<script>
  export let routeHTML, settings;
  const assetDir = settings.locations.assets.replace(settings.locations.public, '/');
</script>

<svelte:head>
  <link rel="stylesheet" href="{assetDir}style.css" />
</svelte:head>
<div class="container">
  {@html routeHTML}
</div>
