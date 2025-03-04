import { Roboto } from "next/font/google";
import localFont from "next/font/local";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const formula_condensed = localFont({
  src: [
    {
      path: "../public/fonts/formulacondensed-light-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FormulaCondensed-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/formulacondensed-bold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/FormulaCondensed-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--formula-condensed",
});

export {formula_condensed, roboto}