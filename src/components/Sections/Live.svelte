<script>
  export let videoId = '';
</script>
<div class="background" id="live">
  <div class="container">
    <h2>
      Watch it
      <span class="live">LIVE</span>
      now on
      <a
        href="hhttps://www.youtube.com/watch?v={videoId}"
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
