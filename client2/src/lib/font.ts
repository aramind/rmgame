// /lib/fonts.ts
import {
  Abel,
  Barlow_Condensed,
  Inter,
  Montserrat_Alternates,
  Nunito,
  Poppins,
  Roboto,
} from "next/font/google";

export const abel = Abel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abel",
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat-alternates",
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});
