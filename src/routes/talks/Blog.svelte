<script>
  export let data; // data is mainly being populated from the /plugins/edlerjs-plugin-markdown/index.js
</script>

<style>
  h1 {
    margin-bottom: 10px;
  }

  .title {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  :global(h2) {
    margin-top: 2rem;
  }

  :global(pre) {
    background: #eee;
    padding: 1rem;
    border-radius: 1rem;
  }

  :global(blockquote) {
    margin: 0;
    background: #ddd;
    padding: 3px 1.5rem 3px 3rem;
    position: relative;
    border-radius: 1rem;
  }
  :global(blockquote:after) {
    content: '>';
    color: #aaa;
    font-size: 30px;
    position: absolute;
    top: 33%;
    left: 1rem;
  }

  :global(blockquote p) {
    padding: 0;
  }
</style>
