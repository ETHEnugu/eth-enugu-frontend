import { withAccountKitUi, createColorSet } from "@account-kit/react/tailwind";

// wrap your existing tailwind config with 'withAccountKitUi'
export default withAccountKitUi(
  {
    // your tailwind config here
    // if using tailwind v4, this can be left empty since most options are configured via css
    // if using tailwind v3, add your existing tailwind config here - https://v3.tailwindcss.com/docs/installation/using-postcss
  },
  {
    // override account kit themes
    colors: {
      "btn-primary": createColorSet("#f3a035", "#FF66CC"),
      "fg-accent-brand": createColorSet("#f3a035", "#FF66CC"),
    },
  }
);
