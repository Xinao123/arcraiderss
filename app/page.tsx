import Link from "next/link";

const Feature = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
    <div className="text-base font-semibold text-white">{title}</div>
    <div className="mt-2 text-sm text-white/70">{desc}</div>
  </div>
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0c10] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0c10]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
              🧩
            </span>
            <span className="font-semibold tracking-tight">ARC Swap</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/listings"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              Ver anúncios
            </Link>
            <Link
              href="/new"
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Criar anúncio
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              ⚡ troca com print + “quero em troca” + perfil
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Troca de itens do ARC Raiders, do jeito mais simples possível.
            </h1>

            <p className="mt-4 text-base text-white/70">
              Você posta um print do item, diz o que quer em troca e deixa seu
              Steam/ARC (e Discord se quiser). A galera chama, combina raid e fé.
              Sem burocracia, sem “marketplace fake”.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                Criar meu anúncio
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Explorar anúncios
              </Link>
            </div>

            <div className="mt-6 text-xs text-white/50">
              Dica de sobrevivência: reputação + denúncia fácil = menos golpe.
            </div>
          </div>

          {/* How it works */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Feature
              title="1) Posta o print"
              desc="Upload do item que você tem. Se quiser, descreve em texto pra busca ficar boa."
            />
            <Feature
              title="2) Diz o que quer"
              desc="Escreve “quero em troca” e pronto. Tags e região ajudam muito."
            />
            <Feature
              title="3) Combina com a pessoa"
              desc="Chat interno ou contato por Steam/Discord. Depois marca como concluído e ganha vouch."
            />
          </div>

          {/* Safety + CTA */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">🔒 Segurança básica</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Denunciar e bloquear é 1 clique.</li>
                <li>• Reputação por troca concluída.</li>
                <li>• Sugestão: esconder links até aceitar conversa (anti-spam).</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">🚀 Começa agora</div>
              <p className="mt-3 text-sm text-white/70">
                Se você tem um print e uma esperança, já dá pra trocar.
              </p>
              <div className="mt-5 flex gap-3">
                <Link
                  href="/new"
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                >
                  Criar anúncio
                </Link>
                <Link
                  href="/listings"
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Ver feed
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-14 border-t border-white/10 pt-6 text-xs text-white/50">
            Fan-made. Sem afiliação oficial. Seja civilizado, por favor. 🤝
          </footer>
        </div>
      </section>
    </main>
  );
}
