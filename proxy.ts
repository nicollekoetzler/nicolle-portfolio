import { NextResponse, type NextRequest } from "next/server";

/* legal.nicollekoetzler.com is the same site with its text pitched at legal tech. Its Home, About, CV and Contact
   live under /legal and are served at the root of that domain; the case studies have a variant each, assets are shared.
   On the main domain, /legal/* sends visitors to the legal domain so each page has one address. */
const LEGAL_HOST = "legal.nicollekoetzler.com";
const LEGAL_PAGES = ["/", "/about", "/cv", "/contact"];
/* case studies with a legal variant, kept at <case>/legal (it adds the client logo carousel) */
const LEGAL_CASES = ["/case-connector", "/performance-dashboard"];

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0];
  const { pathname } = request.nextUrl;
  // legal.localhost lets the legal site be previewed locally
  const isLegal = host === LEGAL_HOST || host === "legal.localhost";

  if (isLegal && LEGAL_PAGES.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/legal" : `/legal${pathname}`;
    return NextResponse.rewrite(url);
  }
  if (isLegal && LEGAL_CASES.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/legal`;
    return NextResponse.rewrite(url);
  }
  if (!isLegal && LEGAL_CASES.some((c) => pathname === `${c}/legal`) && host.endsWith("nicollekoetzler.com")) {
    return NextResponse.redirect(new URL(pathname.replace(/\/legal$/, ""), `https://${LEGAL_HOST}`), 308);
  }
  if (!isLegal && pathname.startsWith("/legal") && host.endsWith("nicollekoetzler.com")) {
    const rest = pathname.replace(/^\/legal/, "") || "/";
    return NextResponse.redirect(new URL(rest, `https://${LEGAL_HOST}`), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/about", "/cv", "/contact", "/legal/:path*", "/case-connector", "/case-connector/legal", "/performance-dashboard", "/performance-dashboard/legal"],
};
