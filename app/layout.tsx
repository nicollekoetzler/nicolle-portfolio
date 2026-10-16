import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-inter" });
const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["500"], variable: "--font-instrument-sans" });

/* dark browser chrome (status bar, toolbars) to match the site */
export const viewport: Viewport = {
  themeColor: "#1c1c1c",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nicollekoetzler.com"),
  title: "Nicolle Koetzler · Product Designer & Software Developer",
  description: "Portfolio of Nicolle Koetzler, Product Designer and Software Developer.",
  openGraph: {
    title: "Nicolle Koetzler · Product Designer & Software Developer",
    description: "Portfolio of Nicolle Koetzler, Product Designer and Software Developer.",
    url: "/",
    siteName: "Nicolle Koetzler",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSans.variable}`}>
      <body>
        {children}
        {/* Microsoft Clarity: heatmaps, session recordings and visit stats; loads after the page is interactive */}
        <Script id="ms-clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yysp28ijo0");`}
        </Script>
      </body>
    </html>
  );
}
