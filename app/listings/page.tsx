import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function ListingsPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      user: true,
      tags: { include: { tag: true } },
    },
  });

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Anúncios</h1>
            <p className="mt-2 text-sm text-white/70">
              Prints reais, texto pra busca, e contato pra fechar.
            </p>
          </div>

          <Link
            href="/new"
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Criar anúncio
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <div
              key={l.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-white/20"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div className="aspect-[16/10]" />
                <Image
                  src={l.imageUrl}
                  alt="Print do item"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="mt-3 text-xs text-white/50">Ofereço</div>
              <div className="mt-1 line-clamp-1 text-sm font-semibold">{l.offerText}</div>

              <div className="mt-3 text-xs text-white/50">Quero</div>
              <div className="mt-1 line-clamp-1 text-sm text-white/80">{l.wantText}</div>

              <div className="mt-3 flex flex-wrap gap-2">
                {l.tags.slice(0, 6).map((t) => (
                  <span
                    key={t.tagId}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {t.tag.name}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <span>{l.region ?? "—"}</span>
                <a
                  href={l.user.steamProfileUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Steam
                </a>
              </div>
            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            Nenhum anúncio ainda. Seja o primeiro a postar um print 😈
          </div>
        )}
      </div>
    </main>
  );
}
