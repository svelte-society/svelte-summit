<script>
  export let title;
</script>

<style>
  p {
    color: var(--sky-blue);
    font-size: 14px;
  }
  .container {
    min-width: 0;
  }
</style>

<div class="container">
  <h3>{title}</h3>
  <p>
    <slot />
  </p>
</div>
