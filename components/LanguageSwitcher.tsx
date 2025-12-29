"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/getLang";

type Props = {
  initialLang: Lang;
  label?: string;
};

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectLangClient(): Lang {
  const c = readCookie("arc_lang");
  if (c === "pt" || c === "en") return c;

  try {
    const ls = localStorage.getItem("arc_lang");
    if (ls === "pt" || ls === "en") return ls;
  } catch {}

  const nav =
    typeof navigator !== "undefined" ? (navigator.language || "").toLowerCase() : "";
  return nav.startsWith("pt") ? "pt" : "en";
}

function persistLang(next: Lang) {
  // 1 ano
  document.cookie = `arc_lang=${encodeURIComponent(
    next
  )}; Path=/; Max-Age=31536000; SameSite=Lax`;

  try {
    localStorage.setItem("arc_lang", next);
  } catch {}

  // avisa partes client (tipo /new)
  window.dispatchEvent(new CustomEvent("arc:lang", { detail: next }));
}

export default function LanguageSwitcher({ initialLang, label }: Props) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>(initialLang);

  // garante que o estado reflete cookie/storage do cliente
  useEffect(() => {
    setLang(detectLangClient());
  }, []);

  function apply(next: Lang) {
    if (next === lang) return;

    setLang(next);
    persistLang(next);

    // importante: re-renderiza Server Components (Home/Feed/Header etc)
    // setTimeout só pra evitar corrida besta com escrita do cookie em alguns browsers
    setTimeout(() => router.refresh(), 30);
  }

  const isPT = lang === "pt";

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{label ?? "Language"}</span>

      <div className="inline-flex h-9 items-center rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur">
        <button
          type="button"
          onClick={() => apply("pt")}
          className={`h-7 rounded-lg px-2.5 text-xs font-semibold transition ${
            isPT
              ? "bg-white text-black"
              : "text-white/75 hover:bg-white/10 hover:text-white"
          }`}
          aria-pressed={isPT}
        >
          PT
        </button>

        <button
          type="button"
          onClick={() => apply("en")}
          className={`h-7 rounded-lg px-2.5 text-xs font-semibold transition ${
            !isPT
              ? "bg-white text-black"
              : "text-white/75 hover:bg-white/10 hover:text-white"
          }`}
          aria-pressed={!isPT}
        >
          EN
        </button>
      </div>
    </div>
  );
}
