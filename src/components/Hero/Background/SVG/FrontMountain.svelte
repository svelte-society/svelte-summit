<script>
  export let type = "morning";
  let color;

  switch (type) {
    case "morning":
      color = "#D5E2E4";
      break;
    case "evening":
      color = "#F5E6D4";
      break;
    case "night":
      color = "#D5E2E4";
      break;

    default:
      break;
  }
</script>

<style>
  svg {
    position: absolute;
    bottom: 0;
    left: 0%;

    height: 45%;

    --hide-mobile: var(--media-lte-sm) none;
    display: var(--hide-mobile, initial);
  }
</style>

<svg viewBox="0 0 910 535" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M96.5 210.5C96.5 210.5 40.2079 449.549 0 535H910L724.63 410.804L581.832
    318.452L404.444 0L299.786 135.342C253.665 166.126 96.5 210.5 96.5 210.5Z"
    fill={color} />
  <path
    opacity="0.1"
    d="M408.49 230.931L479 137L431.302 230.931L278.357 345.101L255.027
    534H170L242.065 345.101L408.49 230.931Z"
    fill="black" />
  <path
    d="M509.5 418L576 312L530 418L576 496L615 535H576L530 496L509.5 418Z"
    fill="#C0CBCD" />
</svg>
