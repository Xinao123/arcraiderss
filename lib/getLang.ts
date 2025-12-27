import "server-only";
import { cookies, headers } from "next/headers";

export type Lang = "pt" | "en";

export function getLang(): Lang {
  const c = cookies().get("arc_lang")?.value;
  if (c === "pt" || c === "en") return c;

  const country = headers().get("x-vercel-ip-country") || "";
  if (country === "BR") return "pt";
  if (country) return "en";

  const al = (headers().get("accept-language") || "").toLowerCase();
  return al.includes("pt") ? "pt" : "en";
}
