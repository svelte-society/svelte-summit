<script>
  export let type = "morning";
  let color;

  switch (type) {
    case "morning":
      color = "#B9D7DB";
      break;
    case "evening":
      color = "#F2DBBF";
      break;
    case "night":
      color = "#F2F5F5";
      break;

    default:
      break;
  }
</script>

<style>
  svg {
    position: absolute;
    bottom: 0;
    --center-mobile: var(--media-lte-sm) 50%;
    left: var(--center-mobile, 20%);
    right: var(--center-mobile, initial);
    --translate-mobile: var(--media-lte-sm) -50%;
    transform: translateX(var(--translate-mobile, initial));

    --height: var(--media-lte-sm) 80%;
    height: var(--height, 60%);
  }
</style>

<svg viewBox="0 0 1253 646" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M132.873 240.924C132.873 240.924 55.3632 539.33 0 646H1253L997.759
    490.964L770 240.924L599.5 0L412.782 147.104C349.277 185.531 132.873 240.924
    132.873 240.924Z"
    fill={color} />
  <mask
    id="mask0"
    mask-type="alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="1253"
    height="646">
    <path
      d="M132.873 240.924C132.873 240.924 55.3632 539.33 0 646H1253L997.759
      490.964L770 240.924L599.5 0L412.782 147.104C349.277 185.531 132.873
      240.924 132.873 240.924Z"
      fill="#B9D7DB" />
  </mask>
  <g mask="url(#mask0)">
    <path
      opacity="0.1"
      d="M751.669 245.016L711.809 157L733.011 254.713L739.372 313.639L742.753
      521L875.809 649H929.809L778.809 521L760.998 294.94L751.669 245.016Z"
      fill="black" />
    <path
      opacity="0.05"
      d="M345.918 617.142L289.207 660.194L357.029 635.279L395.231 612.383L509.48
      613.488L669.807 414L499.932 590.006L380.419 598.519L345.918 617.142Z"
      fill="black" />
    <path
      d="M413 41.5222L522.5 94.8728H584.5H630L716.5 77.3062L785 -17.684L611.5
      -140L502 -100.963L413 41.5222Z"
      fill="white" />
  </g>
</svg>
