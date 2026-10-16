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
        {/* Microsoft Clarity: heatmaps, session recordings and visit stats; loads after the page is interactive.
            Opening any page with ?notrack marks this browser (localStorage) so Clarity never loads in it again;
            ?track removes the mark. Used to keep the site owner's own visits out of the stats. */}
        <Script id="ms-clarity-init" strategy="afterInteractive">
          {`(function(){
            var KEY = "nk-notrack", q = location.search, note = "";
            try {
              if (/[?&]notrack(=|&|$)/.test(q)) { localStorage.setItem(KEY, "1"); note = "Tracking off for this browser"; }
              else if (/[?&]track(=|&|$)/.test(q)) { localStorage.removeItem(KEY); note = "Tracking back on for this browser"; }
              if (note) {
                history.replaceState(null, "", location.pathname + location.hash);
                var t = document.createElement("div");
                t.textContent = note;
                t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;padding:10px 16px;border-radius:999px;background:#2d2d2d;color:#fff;font:500 14px/1.2 system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.4);transition:opacity .4s";
                document.body.appendChild(t);
                setTimeout(function(){ t.style.opacity = "0"; setTimeout(function(){ t.remove(); }, 400); }, 2600);
              }
              if (localStorage.getItem(KEY) === "1") return;
            } catch (e) {}
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yysp28ijo0");
          })();`}
        </Script>
      </body>
    </html>
  );
}
