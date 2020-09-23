<script>
  export let talks;
  import Speaker from "../Speaker.svelte";
</script>

<style>
  .shaded {
    --small-padding: var(--media-lte-sm) 0 25px 120px 25px;
    padding: var(--small-padding, 0 40px 170px 40px);
    background: var(--background);
    background-image: url(/images/forest.svg);
    background-position: bottom left;
    background-repeat: repeat-x;
  }
  section {
    display: grid;
    justify-content: initial;
    margin: 0 auto;

    --small-padding: var(--media-lte-sm) 50px 0;
    padding: var(--small-padding, initial 0);
    max-width: var(--container-width);
  }
  .grid {
    display: grid;
    grid-gap: 50px;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
  /* @media screen and (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  } */
</style>

<div class="shaded">
  <section id="speakers">
    <h2>SPEAKERS</h2>
    <div class="grid">
      {#each talks as speaker}
        <Speaker {speaker} />
      {/each}
    </div>
  </section>
</div>
