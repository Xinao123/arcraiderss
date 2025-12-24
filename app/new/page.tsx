"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

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
      const file = formData.get("image") as File | null;

      if (!file || !(file instanceof File) || file.size === 0) {
        setError("Envie um print do item.");
        setLoading(false);
        return;
      }

      // Limite MVP: seguro pra não estourar e ainda manter qualidade.
      // Como agora o upload é direto pro Supabase Storage, pode ser maior,
      // mas manter um teto evita sofrimento no mobile e nos users.
      const maxBytes = 8 * 1024 * 1024; // 8MB
      if (file.size > maxBytes) {
        setError("Print grande demais. Tenta até 8MB (salva como JPG/WEBP que fica leve).");
        setLoading(false);
        return;
      }

      const offerText = String(formData.get("offerText") ?? "").trim();
      const wantText = String(formData.get("wantText") ?? "").trim();
      const steamProfileUrl = String(formData.get("steamProfileUrl") ?? "").trim();
      const discordHandle = String(formData.get("discordHandle") ?? "").trim();

      if (!offerText || !wantText) {
        setError("Preencha 'Ofereço' e 'Quero em troca'.");
        setLoading(false);
        return;
      }

      if (!steamProfileUrl && !discordHandle) {
        setError("Coloca pelo menos Steam ou Discord pra contato.");
        setLoading(false);
        return;
      }

      // 1) pede signed upload pro server (pra não passar o arquivo pela Vercel)
      const initRes = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type || "image/png" }),
      });

      const initContentType = initRes.headers.get("content-type") || "";
      const initBody = initContentType.includes("application/json")
        ? await initRes.json()
        : await initRes.text();

      if (!initRes.ok) {
        setError(typeof initBody === "string" ? initBody : initBody?.error ?? "Erro iniciando upload.");
        setLoading(false);
        return;
      }

      const { bucket, path, token, publicUrl } = initBody as {
        bucket: string;
        path: string;
        token: string;
        publicUrl: string;
      };

      // 2) upload direto pro Supabase Storage usando token assinado
      const { error: uploadErr } = await supabaseBrowser.storage
        .from(bucket)
        .uploadToSignedUrl(path, token, file, { contentType: file.type || "image/png" });

      if (uploadErr) {
        setError(uploadErr.message);
        setLoading(false);
        return;
      }

      // 3) cria listing no banco (JSON leve)
      const payload = {
        imageUrl: publicUrl,
        offerText,
        wantText,
        tags: String(formData.get("tags") ?? "").trim(),
        region: String(formData.get("region") ?? "").trim(),
        availabilityNote: String(formData.get("availabilityNote") ?? "").trim(),

        displayName: String(formData.get("displayName") ?? "").trim(),
        steamProfileUrl: steamProfileUrl || null,
        arcProfileUrl: String(formData.get("arcProfileUrl") ?? "").trim(),
        discordHandle: discordHandle || null,
      };

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      const body = contentType.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        setError(typeof body === "string" ? body : body?.error ?? "Erro criando anúncio.");
        setLoading(false);
        return;
      }

      router.push("/listings");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Criar anúncio</h1>
            <p className="mt-2 text-sm text-white/70">
              Sobe o print, escreve o que oferece e o que quer. Pra fechar a troca, deixa Steam ou Discord.
            </p>
          </div>

          <a
            href="/listings"
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Voltar
          </a>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Print */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">📷 Print do item</div>
              <div className="text-xs text-white/50">até 8MB</div>
            </div>

            <input
              name="image"
              type="file"
              accept="image/*"
              required
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black"
            />

            <div className="mt-2 text-xs text-white/50">
              Dica: JPG/WEBP deixa mais leve. PNG às vezes fica gigantão.
            </div>
          </section>

          {/* Oferta / Pedido */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold">🔁 Troca</div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                <label className="text-sm font-semibold">Tags (vírgula)</label>
                <input
                  name="tags"
                  placeholder="mod, rare, BR"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
                <div className="mt-2 text-xs text-white/50">
                  Ajuda na busca. Ex: <span className="text-white/70">weapon, mod, blueprint</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Região</label>
                <input
                  name="region"
                  placeholder="BR / SA / NA..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
                <div className="mt-2 text-xs text-white/50">Opcional, mas deixa tudo mais rápido.</div>
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
          </section>

          {/* Contato */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold">👤 Contato</div>
            <p className="mt-2 text-xs text-white/50">
              Pra evitar spam, você pode colocar só um (Steam ou Discord). Se quiser, coloca os dois.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Nome (opcional)</label>
                <input
                  name="displayName"
                  placeholder="Ex: Pedro"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Discord (opcional)</label>
                <input
                  name="discordHandle"
                  placeholder="Ex: pedro#0001"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">Steam Profile URL</label>
                <input
                  name="steamProfileUrl"
                  placeholder="https://steamcommunity.com/id/..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">Perfil ARC (opcional)</label>
                <input
                  name="arcProfileUrl"
                  placeholder="link do perfil"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/60">
              ⚠️ Regra de ouro: nada de dinheiro real (RMT). Isso atrai golpe e dor de cabeça.
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Postando..." : "Postar anúncio"}
            </button>

            <a
              href="/listings"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Cancelar
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
