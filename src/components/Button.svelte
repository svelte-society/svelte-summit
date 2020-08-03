<script>
  export let darker;
</script>

<style>
  button {
    border: 0;
    padding: 12px 30px;
    background: #307f8b;
    color: white;
    font-size: 18px;
    font-family: "Inter";
    border-radius: 4px;
    cursor: pointer;
  }
  .darker {
    background: #09191c;
  }
</style>

<button class:darker on:click>
  <slot />
</button>
