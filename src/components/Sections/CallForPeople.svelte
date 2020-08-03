<script>
  import { highlightMenuItem } from "../../actions/highlightMenuItem";
  import Card from "../Card.svelte";
  import Button from "../Button.svelte";
</script>

<style>
  .container {
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
    --small-grid: var(--media-lte-sm) 0;
    grid-gap: var(--small-grid, 30px);
  }
  h3 {
    font-size: 28px;
    font-weight: normal;
  }
  h3,
  p {
    margin: 0;
    --small-width: var(--media-lte-sm) 100%;
    width: var(--small-width, 90%);
  }
</style>

<div class="container" id="cfp" use:highlightMenuItem>
  <Card center>
    <h3>Call for initial proposals - Deadline September 1st!</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium
      illum ratione soluta reiciendis eligendi expedita. Id quasi ab quis et
      aspernatur? Omnis ad unde optio, tempore ipsum laboriosam aliquid
      voluptates!
    </p>
    <Button>Send proposal</Button>
  </Card>
  <Card center darker>
    <h3>Looking for sponsors</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium
      illum ratione soluta reiciendis eligendi expedita. Id quasi ab quis et
      aspernatur? Omnis ad unde optio, tempore ipsum laboriosam aliquid
      voluptates!
    </p>
    <Button>Send proposal</Button>
  </Card>
</div>
