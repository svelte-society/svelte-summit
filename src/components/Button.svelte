<script>
  export let dark;
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

  .dark {
    background: #2C0C0A;
  }

  a:hover,
  a:active,
  a:focus {
   opacity: 0.7;
  }

</style>

<a {href} rel="noreferrer" target="_blank" class:dark>
  <slot />
</a>
