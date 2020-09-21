<script>
  import { Background } from "../../components/Hero/Background/";
  export let data; // data is mainly being populated from the /plugins/edlerjs-plugin-markdown/index.js
  const { html, frontmatter } = data;
</script>

<style>
  a {
    text-decoration: none;
  }
  h1 {
    margin-bottom: 10px;
  }

  .content {
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
    content: ">";
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

<svelte:head>
  <title>{frontmatter.title}</title>
</svelte:head>
<a href="/">&LeftArrow; Home</a>

{#if html}
  {@html html}
{:else}
  <h1>Oops!! Markdown not found!</h1>
{/if}

<div class="container" id="intro">
  <div class="content">
    {@html html}
  </div>
</div>
