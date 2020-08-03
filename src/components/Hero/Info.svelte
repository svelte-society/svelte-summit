<style>
  .info {
    display: grid;
    grid-gap: 12px;

    --columns-small: var(--media-lte-sm) 2fr 3fr;
    grid-template-columns: var(--columns-small, 1fr);

    --small-placement: var(--media-lte-sm) start end;
    place-items: var(--small-placement, start);
  }
  time {
    line-height: 105%;
    --small: var(--media-lte-sm) 40px;

    display: grid;
    --small-placement: var(--media-lte-sm) end;
    place-items: var(--small-placement, center start);
    --small: var(--media-lte-sm) 50px;
    font-size: var(--small, 73px);
  }
  span {
    --align-text-mobile: var(--media-lte-sm) right;
    text-align: var(--align-text-mobile, initial);
  }
  .sub {
    --small: var(--media-lte-sm) 33px;
    font-size: var(--small, 40px);

    --small-line: var(--media-lte-sm) 100%;
    line-height: var(--small-line, 105%);

    display: grid;
    --small-placement: var(--media-lte-sm) left;
    text-align: var(--small-placement, left);

    --small-width: var(--media-lte-sm) 250px;
    max-width: var(--small-width, 300px);
  }
</style>

<div class="info">
  <time class="display" datetime="2020-10-18">
    <span>OCT 18</span>
    <span>2020</span>
  </time>
  <div class="sub display">THE 2ND VIRTUAL CONFERENCE ABOUT SVELTE</div>
</div>
