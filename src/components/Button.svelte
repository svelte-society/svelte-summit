<script>
  export let black;
  export let href;
</script>

<style>
  a {
    text-decoration: none;
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
  a:hover {
    background: #26636d;
  }
  .black:hover {
    background: #131313;
  }
</style>

<a {href} target="_blank" class:black>
  <slot />
</a>
