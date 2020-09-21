<script>
  export let speaker;
  const { image, title, name, blurb, twitter, twitterUser } = speaker;
</script>

<style>
  .speaker {
    display: grid;
    grid-gap: 32px;
    grid-template-columns: 80px auto;
  }
  .image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
  .name {
    color: #e4eef0;

    opacity: 0.67;
  }
  h3 {
    font-family: "Overpass";
    margin: 0 auto;
    line-height: 140%;
    padding-top: 5px;
    font-size: 2em;
  }
  .twitter {
    display: grid;
    grid-gap: 5px;
    align-items: center;
    grid-template-columns: auto 1fr;
    color: #005daa;
  }
  .twitter a {
    color: white;
    font-size: 14px;
  }
  .twitter img {
    height: 16px;
  }
  div :global(p) {
    font-size: 18px;
    color: #bedde2;
    line-height: 170%;
  }
</style>

<div class="speaker">
  <div class="image">
    <img src="/dist/static/images/speakers/{image}" alt="Speaker profile" />
  </div>
  <div>
    <span class="name">{name}</span>
    <h3>{title}</h3>
    {@html blurb}
    <div class="twitter">
      <img src="/dist/static/images/twitter.svg" alt="Twitter logo" />
      <a href={twitter}>{twitterUser}</a>
    </div>
  </div>
</div>
