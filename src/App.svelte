<script>
  import { highlightMenuItem } from "./actions/highlightMenuItem.js";
  import { Hero } from "./components/Hero";
  import Question from "./components/Question.svelte";
  import Sponsors from "./components/Sections/Sponsors.svelte";
  import FAQ from "./components/Sections/FAQ.svelte";
  import Footer from "./components/Sections/Footer.svelte";
</script>

<div id="intro" use:highlightMenuItem />
<Hero />
<Sponsors />
<FAQ>
  <Question title="What is this?">
    Svelte Summit is an event dedicated to Svelte and everything that is
    happening in the community. You'll be able to tune in to a full day of talks
    and discussions all while chatting to other Svelthusiasts on the Discord
    server.
  </Question>
  <Question title="When is it? What time?">
    October 18th, 2020! The exact hour of the day is not set in stone but we
    will aim to do what we did last time and have talks all throughout the day.
    In practice this means that we will start around 12GMT and continue until
    we're done. This has the added benefit of making it possible for our
    speakers to be present when their talks are given so that they can answer
    questions.
  </Question>
  <Question title="Will it be recorded">
    Absolutely! You'll find it on the Svelte Society
    <a
      rel="noreferrer"
      target="_blank"
      href="https://www.youtube.com/channel/UCZSr5B0l07JXK2FIeWA0-jw">
      YouTube channel
    </a>
    once the event has been finished.
  </Question>
  <Question title="How do I watch it?">
    Once the day arrives, tune in to the Svelte Society YouTube channel and
    start watching. We'll also make sure to post a notice at the top of this
    page if you forget where to go.
  </Question>
  <Question title="Can you remind me when the date gets closer?">
    Yes,
    <a
      rel="noreferrer"
      href="https://forms.gle/6PBKXng9jfrvxjhX8"
      target="_blank">
      enter your email here.
    </a>
  </Question>
</FAQ>
<Footer />
