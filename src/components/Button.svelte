<script>
  export let black;
  export let href;
</script>

<style>
  a {
    text-decoration: none;
    border: 0;
    padding: 12px 30px;
    background: var(--background-super-dark);
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
   opacity: 0.9;
  }
  .black:hover {
    background: #131313;
  }
</style>

<a {href} rel="noreferrer" target="_blank" class:black>
  <slot />
</a>
