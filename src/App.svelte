<script>
  import { highlightMenuItem } from "./actions/highlightMenuItem.js";
  import { Hero } from "./components/Hero";
  import Question from "./components/Question.svelte";
  import CallForPeople from "./components/Sections/CallForPeople.svelte";
  import FAQ from "./components/Sections/FAQ.svelte";
  import Footer from "./components/Sections/Footer.svelte";
</script>

<div id="intro" use:highlightMenuItem />
<Hero />
<CallForPeople />
<FAQ>
  <Question title="This is a question">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat corrupti
    assumenda obcaecati voluptate sunt, accusamus voluptas beatae iure
    recusandae natus itaque officia in a soluta inventore molestias architecto
    temporibus ad.
  </Question>
  <Question title="This is a question">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat corrupti
    assumenda obcaecati voluptate sunt, accusamus voluptas beatae iure
    recusandae natus itaque officia in a soluta inventore molestias architecto
    temporibus ad.
  </Question>
  <Question title="This is a question">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat corrupti
    assumenda obcaecati voluptate sunt, accusamus voluptas beatae iure
    recusandae natus itaque officia in a soluta inventore molestias architecto
    temporibus ad.
  </Question>
  <Question title="This is a question">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat corrupti
    assumenda obcaecati voluptate sunt, accusamus voluptas beatae iure
    recusandae natus itaque officia in a soluta inventore molestias architecto
    temporibus ad.
  </Question>
  <Question title="This is a question">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat corrupti
    assumenda obcaecati voluptate sunt, accusamus voluptas beatae iure
    recusandae natus itaque officia in a soluta inventore molestias architecto
    temporibus ad.
  </Question>
</FAQ>
<Footer />
