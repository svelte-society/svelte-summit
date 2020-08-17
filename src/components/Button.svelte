<script>
  export let black;
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
  .black {
    background: #000000;
  }
  button:hover {
    background: #26636d;
  }
  .black:hover {
    background: #131313;
  }
</style>

<button class:black on:click>
  <slot />
</button>
