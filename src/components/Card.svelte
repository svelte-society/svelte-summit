<script>
  export let darkest, center;
</script>

<style>
  .container {
    padding: 35px;
    background: var(--background-dark);
    display: grid;
    grid-gap: 20px;
    place-items: start;
  }
  .darkest {
    background: var(--background-super-dark);
  }
  .center {
    margin: 0 auto;
  }
</style>

<div class="container" class:darkest class:center>
  <slot />
</div>
