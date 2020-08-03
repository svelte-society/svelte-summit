<script>
  import { highlightMenuItem } from "../../actions/highlightMenuItem.js";
</script>

<style>
  .background {
    --small-padding: var(--media-lte-sm) 45px 25px;
    padding: var(--small-padding, 140px 40px);

    background: var(--background-dark);
    display: grid;
    place-items: center;
  }
  .container {
    max-width: var(--container-width);
  }
  .questions {
    display: grid;
    grid-gap: 40px 50px;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
</style>

<div class="background">
  <div class="container">
    <h2 id="faq" use:highlightMenuItem>Frequently Asked Questions</h2>
    <div class="questions">
      <slot />
    </div>
  </div>
</div>
