<script>
  import Card from '../Card.svelte';
  import Button from '../Button.svelte';
</script>

<style>
  .background {
    --small-padding: var(--media-lte-sm) 0 0 220px 0;
    padding: var(--small-padding, 200px 40px 270px 40px);

    background: #2b636c;
    background-image: url(/images/forest.svg), url(/images/lake.svg);
    background-position: bottom left, top;
    background-repeat: repeat-x, no-repeat;

    --mobile-backgrounds: var(--media-lte-sm) auto 130px;
    background-size: var(--mobile-backgrounds, auto 150px);

    display: grid;
    justify-content: center;
  }
  .container {
    display: grid;
    --small-grid: var(--media-lte-sm) 0;
    grid-gap: var(--small-grid, 30px);
    max-width: var(--container-width);
  }
  h3 {
    font-size: 28px;
    font-weight: normal;
  }
  p {
    font-size: 16px;
    --small-font-size: var(--media-lte-sm) 14px;
  }
  h3,
  p {
    margin: 0;
    --small-width: var(--media-lte-sm) 100%;
    width: var(--small-width, 90%);
    color: var(--sky-blue);
  }
</style>

<div class="background" id="cfp">
  <div class="container">
    <Card center>
      <h3>Call for initial proposals - March 21st, 2021!</h3>
      <p>
        If you're interested in doing a talk, the button below will bring you to the right place! First time doing a
        talk? No Problem! We welcome talks of all levels, from beginner to advanced, long and short. If you have more
        specific questions you can reach us on the <a
          rel="noreferrer"
          target="_blank"
          href="https://discord.gg/qzfM2JU">
          Svelte discord server
        </a> .
      </p>
      <Button href="https://forms.gle/sGLyg5sLd4kKwRXZ6">Send proposal</Button>
    </Card>
    <Card center darkest>
      <h3>Looking for sponsors</h3>
      <p>
        Since last time we've decided to try to bring the online experience to another level by improving the quality.
        If you (or your company) are interested in sponsoring the event, reach out to us via email using the link below
        and we can have a chat.
      </p>
      <Button href="mailto:sponsors@sveltesociety.dev" black>Send email</Button>
    </Card>
  </div>
</div>
