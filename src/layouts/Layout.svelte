<script>
  export let templateHtml;
</script>

<svelte:head>

  <meta name="theme-color" content="#2D626B" />
  <link rel="stylesheet" href="/style.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏔️</text></svg>">

  <meta
    property="twitter:image"
    content="https://sveltesummit.com/images/metatagimg.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sveltesociety" />

</svelte:head>

<div class="container">
  {@html templateHtml}
</div>
