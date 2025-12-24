import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;
// (opcional) garante que não tente rodar em edge
export const runtime = "nodejs";

export default async function ListingsPage() {
  noStore();

  let listings: any[] = [];
  let dbError: string | null = null;

  try {
    listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: {
        user: true,
        tags: { include: { tag: true } },
      },
    });
  } catch (e: any) {
    // Não deixa a página “sumir” se acontecer algo no DB
    dbError = e?.message ?? "Erro no banco.";
  }

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

        {dbError && (
          <div className="mt-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-100">
            {dbError}
          </div>
        )}

        {listings.length === 0 && !dbError && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            Nenhum anúncio ainda. Posta o primeiro print 😈
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <div
              key={l.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-white/20"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div className="aspect-[16/10]" />
                {/* Se o Image der problema de host, troca por <img> por enquanto */}
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
                {l.tags?.slice(0, 6).map((t: any) => (
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
                {l.user?.steamProfileUrl ? (
                  <a
                    href={l.user.steamProfileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    Steam
                  </a>
                ) : (
                  <span className="text-white/40">sem steam</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
