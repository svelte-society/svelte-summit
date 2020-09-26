<script>
  import BackMountain from "../Hero/Background/SVG/BackMountain.svelte";
</script>

<style>
  .background {
    --small-padding: var(--media-lte-sm) 45px 25px;
    padding: var(--small-padding, 90px 40px);
    background: var(--background-dark);
  }
  .container {
    display: grid;
    grid-gap: 5px;
    justify-items: start;
    margin: 0 auto;
    max-width: var(--container-width);
  }
  h2 {
    margin: 0;
  }
  a {
    font-family: "Inter";
    text-decoration: none;
    padding: 15px 20px;
    font-weight: 500;
    background: #050606;
    font-size: 20px;
    color: #bedde2;
  }
  p {
    color: #bedde2;
  }
</style>

<div class="background" id="signup">
  <div class="container">
    <h2>Sign up for the event</h2>
    <p>Hit the button below and enter your email.</p>
    <a
      rel="noreferrer"
      href="https://forms.gle/6PBKXng9jfrvxjhX8"
      target="_blank">Sign Up</a>
  </div>
</div>
