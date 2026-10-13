import type { Metadata } from "next";
import { Instrument_Sans, Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-inter" });
const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["500"], variable: "--font-instrument-sans" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["600"], variable: "--font-nunito-sans" });

export const metadata: Metadata = {
  title: "Nicolle Koetzler · Product Designer & Software Engineer",
  description: "Portfolio of Nicolle Koetzler, Product Designer and Software Engineer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSans.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
