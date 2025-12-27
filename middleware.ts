import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "arc_lang";

function detectLang(req: NextRequest): "pt" | "en" {
  const country = req.headers.get("x-vercel-ip-country") || "";
  if (country === "BR") return "pt";
  if (country) return "en";

  const al = (req.headers.get("accept-language") || "").toLowerCase();
  return al.includes("pt") ? "pt" : "en";
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // troca manual via ?lang=
  const forced = searchParams.get("lang");
  if (forced === "pt" || forced === "en") {
    const url = req.nextUrl.clone();
    url.searchParams.delete("lang");

    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, forced, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  // auto se não tem cookie
  const existing = req.cookies.get(COOKIE)?.value;
  if (existing !== "pt" && existing !== "en") {
    const res = NextResponse.next();
    res.cookies.set(COOKIE, detectLang(req), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
