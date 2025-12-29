import Link from "next/link";
import { getLang } from "@/lib/getLang";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const copy = {
  pt: {
    home: "Início",
    feed: "Feed",
    faq: "FAQ",
    post: "Postar troca",
    lang: "Idioma",
    feedback: "Feedback",
  },
  en: {
    home: "Home",
    feed: "Feed",
    faq: "FAQ",
    post: "Post trade",
    lang: "Language",
    feedback: "Feedback",
  },
} as const;

export default async function SiteHeader() {
  const lang = await getLang();
  const t = copy[lang];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07080c]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
            ⚡
          </span>
          <span className="font-semibold tracking-tight">ARC Traders</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            <span className="hidden sm:inline">{t.home}</span>
            <span className="sm:hidden">🏠</span>
          </Link>

          <Link
            href="/listings"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            <span className="hidden sm:inline">{t.feed}</span>
            <span className="sm:hidden">🗂️</span>
          </Link>

          <Link
            href="/faq"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            <span className="hidden sm:inline">{t.faq}</span>
            <span className="sm:hidden">❓</span>
          </Link>

      
          <div className="ml-1 rounded-xl border border-white/10 bg-white/5 px-2 py-1 backdrop-blur hover:bg-white/10">
          <span className="sr-only">{t.lang}</span>
          <div className="[&_*]:!text-xs [&_*]:!text-white/80 [&_*]:!bg-transparent [&_*]:!border-0 [&_*]:!outline-none">
              <LanguageSwitcher initialLang={lang} label={t.lang} />
            </div>
          </div>

          <Link
            href="/feedback"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            <span className="hidden sm:inline">{t.feedback}</span>
            <span className="sm:hidden">🛠️</span>
          </Link>

          <Link
            href="/new"
            className="ml-1 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            <span className="hidden sm:inline">{t.post}</span>
            <span className="sm:hidden">＋</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
