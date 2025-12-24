"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Deu ruim criando anúncio.");
        return;
      }

      router.push("/listings");
    } catch (err: any) {
      setError(err?.message ?? "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Criar anúncio</h1>
        <p className="mt-2 text-sm text-white/70">
          Sobe o print, escreve o que oferece e o que quer. Contato é obrigatório pra galera te achar.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold">📷 Print do item</div>
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm"
            />
            <div className="mt-2 text-xs text-white/50">Até 4MB (print normal tá perfeito).</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Ofereço</label>
                <input
                  name="offerText"
                  required
                  placeholder="Ex: Blueprint: Shock Module (Rare)"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Quero em troca</label>
                <input
                  name="wantText"
                  required
                  placeholder="Ex: Bateria Militar + 2x Medkit"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Tags (separadas por vírgula)</label>
                <input
                  name="tags"
                  placeholder="mod, rare, BR"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Região</label>
                <input
                  name="region"
                  placeholder="BR / SA / NA..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold">Disponibilidade</label>
              <input
                name="availabilityNote"
                placeholder="Ex: hoje 19-23h / fim de semana / etc"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold">👤 Seu contato (pra fechar a troca)</div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Nome (opcional)</label>
                <input
                  name="displayName"
                  placeholder="Ex: Yas"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Discord (opcional)</label>
                <input
                  name="discordHandle"
                  placeholder="Ex: yas#0001"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Steam Profile URL</label>
                <input
                  name="steamProfileUrl"
                  required
                  placeholder="https://steamcommunity.com/id/..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Perfil ARC (opcional)</label>
                <input
                  name="arcProfileUrl"
                  placeholder="link do perfil"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              disabled={loading}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Postando..." : "Postar anúncio"}
            </button>
            <a
              href="/"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Voltar
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
