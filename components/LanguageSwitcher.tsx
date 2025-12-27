"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageSwitcher({
  initialLang,
  label,
}: {
  initialLang: "pt" | "en";
  label: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  function setLang(lang: "pt" | "en") {
    const params = new URLSearchParams(search.toString());
    params.set("lang", lang); // middleware salva cookie e remove o param via redirect
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <span className="text-xs text-white/60">{label}</span>
      <select
        value={initialLang}
        onChange={(e) => setLang(e.target.value as "pt" | "en")}
        className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
        aria-label={label}
      >
        <option value="pt">PT-BR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
