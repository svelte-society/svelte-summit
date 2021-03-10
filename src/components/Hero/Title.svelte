<style>
  h1 {
    margin-block-start: 0;
    margin-block-end: 0;

    display: grid;
    --small-placement: var(--media-lte-sm) center;
    place-items: var(--small-placement, center end);

  }
  .leading {
    color: #A8434D;
  }
  .lagging {
    --text-color: var(--media-lte-sm) #A8434D;
    color: var(--text-color, #D6F1F5);
    
    --center-mobile: var(--media-lte-sm) center;
    text-align: var(--center-mobile, right);
    
    --small-margin-top: var(--media-lte-sm) 0;
    margin-top: var(--small-margin-top, -15px)
  }
</style>

<h1 class="display">
  <span class="leading">SVELTE</span>
  <span class="lagging">SUMMIT<br>SPRING</span>
</h1>
