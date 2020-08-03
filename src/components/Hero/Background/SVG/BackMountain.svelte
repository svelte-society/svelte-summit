<script>
  export let type = "morning";
  let color;

  switch (type) {
    case "morning":
      color = "#C4E4E9";
      break;
    case "evening":
      color = "#D5BCBA";
      break;
    case "night":
      color = "#12262A";
      break;

    default:
      break;
  }
</script>

<style>
  svg {
    position: absolute;
    bottom: 0;
    left: 50%;

    height: 25%;

    --hide-mobile: var(--media-lte-sm) none;
    display: var(--hide-mobile, initial);
  }
</style>

<svg viewBox="0 0 1412 289" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M132.873 91.4783C132.873 91.4783 55.3632 236.986 0 289H1411.5L1110
    124.5L834.5 76.5L641.5 0L412.782 45.7301C349.277 64.468 132.873 91.4783
    132.873 91.4783Z"
    fill={color} />
</svg>
