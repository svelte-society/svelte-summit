<style>
  .container {
    background: #17353a;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  ul {
    padding-top: 100px;
    display: grid;
    grid-gap: 50px;
    list-style: none;
  }
  li {
    color: var(--sky-blue);
    opacity: 0.6;
    font-family: Anton;
    font-size: 48px;
  }
  li:hover {
    color: white;
    opacity: 1;
  }
  img {
    padding: 30px;
    position: absolute;
    top: 6px;
    right: 6px;
  }
</style>

<div class="container">
  <ul>
    <li>Intro</li>
    <li>Call For Proposals</li>
    <li>FAQ</li>
    <li>Twitter</li>
  </ul>
</div>
<button on:click>
  <img src="/images/close.svg" alt="" />
</button>
