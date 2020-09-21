<script>
  import Speaker from "../Speaker.svelte";
  const speakers = [
    {
      name: "Luke Edwards",
      title: "Svelte at the Edge: Powering Svelte Apps with Cloudflare Workers",
      blurb:
        "<p>Will Svelte run inside a Cloudflare Worker? What are the benefits? Are there trade-offs? Can we make this easier?</p>",
      twitter: "https://twitter.com/lukeed05",
      twitterUser: "@lukeed05",
      image: "lukeed.jpeg",
    },
    {
      name: "Peter Allen",
      title: "REPLicant",
      blurb:
        "<p>A REPL, or online playground, is a great way to allow users to test-drive tools you have built without needing to install a thing, but they are also great for interactive tutorials, sharing snippets and reporting bugs!</p><p>The Svelte REPL has been a feature of the svelte ecosystem since time immemorial and while REPLs can be complex, the principles are simple when you know them.</p><p> We will take a dive into how the Svelte REPL works and build the simplest possible version. LIVE!</>",
      twitter: "https://twitter.com/evilpingwin",
      twitterUser: "@evilpingwin",
      image: "peter.png",
    },
    {
      name: "Nick Reese",
      title: "Building SEO Friendly Sites with Svelte and Elder.js",
      blurb:
        "<p>Svelte makes interactivity a breeze but building SEO focused websites with Svelte isn't as easy as it seems.</p><p>In this talk we'll explore how you can use Svelte and Elder.js to build flagship SEO sites. We'll cover routing, partial hydration, hooks, and shortcodes so you can hit the ground running.</p>",
      twitter: "https://twitter.com/nickreese",
      twitterUser: "@nickreese",
      image: "nick.jpeg",
    },
  ];
</script>

<style>
  .shaded {
    --small-padding: var(--media-lte-sm) 0 25px 120px 25px;
    padding: var(--small-padding, 0 40px 170px 40px);
    background: var(--background);
    background-image: url(/dist/static/images/forest.svg);
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
      {#each speakers as speaker}
        <Speaker {speaker} />
      {/each}
    </div>
  </section>
</div>
