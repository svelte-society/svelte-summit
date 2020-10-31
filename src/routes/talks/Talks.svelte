<script>

  import Speaker from "../../components/Speaker.svelte";
  import Footer from "../../components/Sections/Footer.svelte";

  export let data; // data is mainly being populated from the /plugins/edlerjs-plugin-markdown/index.js

  $: otherTalks = data.speakers.filter((spkr) => spkr.slug !== data.slug); // not the current talk
  $: nextTalk = otherTalks[Math.floor(Math.random() * otherTalks.length)];
  $: seoTitle = `${data.name} - ${data.title}: SvelteSummit.com`;

</script>

<style>

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }


  .container {
    display: grid;
    min-height: 80vh;
    min-width: 80vw;
    place-items: center;
    padding: 3rem;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  #speaker {
    margin-right: 2rem;
  }


  .nextTalk {
    display: flex;
    background: #307F8B;
    padding: 1em;
  }

  @media (min-width: 1000px) {

    .content {
      flex-direction: row;
    }

    #speaker {
      max-width: 400px;
    }

  }

  #HomeButton {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-left: 3rem;
    background: #1C464D;
    border-radius: 50%;
    padding: 1rem;
  }

  @media (min-width: 1000px) {

    #HomeButton {
      position: absolute;
      top: 3rem;
      left: 2rem;
    }

  }

  /* Footer */

  .Footer {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
  }

  .Footer a {
    display: grid;
    place-items: center;
  }

  @media (min-width: 1000px) {

    .Footer {
      margin-top: 1rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      font-size: 1.25rem;
      flex-direction: row;
    }
  }

</style>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="theme-color" content="#317EFB" />
  <meta property="title" content={seoTitle} />
  <meta property="og:title" content={seoTitle} />
  <meta name="description" content={data.name + "'s talk at Svelte Summit!"} />
  <meta
    property="og:description"
    content={data.name + "'s talk at Svelte Summit!"} />
  <meta
    property="og:image"
    content="https://sveltesummit.com/images/metatagimg.png" />
  <meta property="og:url" content="http://sveltesummit.com" />
  <meta property="twitter:title" content={seoTitle} />
  <meta
    property="twitter:description"
    content={data.name + "'s talk at Svelte Summit!"} />
  <meta
    property="twitter:image"
    content="https://sveltesummit.com/images/metatagimg.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sveltesociety" />
</svelte:head>
<div id="HomeButton">
  <a href="/#speakers"><svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.8337 14.4582H7.98657L19.3995 3.04525L16.5003 0.166504L0.166992 16.4998L16.5003 32.8332L19.3791 29.9544L7.98657 18.5415H32.8337V14.4582Z"
        fill="white" />
    </svg>
  </a>
</div>
<div class="container" id="intro">
  <div class="content">
    <div id="speaker">
      <Speaker speaker={data} singleTalk />
    </div>

    <iframe
      width="420"
      height="315"
      title={data.title}
      src={data.video}
      frameborder="0"
      allowfullscreen />
  </div>
  <div class="Footer">
    <a
      id="signUp"
      rel="noreferrer"
      href="https://emailoctopus.com/lists/a3d49b32-0df8-11eb-a3d0-06b4694bee2a/forms/subscribe"
      target="_blank">✉️ Sign up for Svelte Summit 2021!</a>
    <div class="nextTalk">
      <span>Next talk: &nbsp; </span>
      <div><a href={`/talks/${nextTalk.slug}`}> {nextTalk.title}</a></div>
    </div>
  </div>
</div>

<Footer />
