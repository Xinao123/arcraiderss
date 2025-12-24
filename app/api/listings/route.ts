import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const image = form.get("image");
    const offerText = String(form.get("offerText") ?? "").trim();
    const wantText = String(form.get("wantText") ?? "").trim();
    const tagsRaw = String(form.get("tags") ?? "").trim();
    const region = String(form.get("region") ?? "").trim() || null;
    const availabilityNote = String(form.get("availabilityNote") ?? "").trim() || null;

    const displayName = String(form.get("displayName") ?? "").trim() || null;
    const steamProfileUrl = String(form.get("steamProfileUrl") ?? "").trim() || null;
    const arcProfileUrl = String(form.get("arcProfileUrl") ?? "").trim() || null;
    const discordHandle = String(form.get("discordHandle") ?? "").trim() || null;

    if (!offerText || !wantText) {
      return NextResponse.json({ error: "Preencha 'Ofereço' e 'Quero'." }, { status: 400 });
    }

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Envie um print (imagem)." }, { status: 400 });
    }

    // Limite MVP (Vercel route). Mantém print leve.
    const maxBytes = 4 * 1024 * 1024; // 4MB
    if (image.size > maxBytes) {
      return NextResponse.json(
        { error: "Imagem muito grande. Use até 4MB (print normal já dá)." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const ext = (image.type.split("/")[1] || "png").toLowerCase();
    const bucket = "listing-prints";
    const filePath = `prints/${crypto.randomUUID()}.${ext}`;

    const uploadRes = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: image.type || "image/png",
        upsert: false,
      });

    if (uploadRes.error) {
      return NextResponse.json({ error: uploadRes.error.message }, { status: 500 });
    }

    const publicUrl = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath).data.publicUrl;

    // MVP sem login: tenta reaproveitar usuário pelo Steam/Discord se tiver
    const existingUser =
      (steamProfileUrl
        ? await prisma.user.findFirst({ where: { steamProfileUrl } })
        : null) ||
      (discordHandle ? await prisma.user.findFirst({ where: { discordHandle } }) : null);

    const user =
      existingUser ??
      (await prisma.user.create({
        data: {
          displayName,
          steamProfileUrl,
          arcProfileUrl,
          discordHandle,
        },
      }));

    // Tags
    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 10)
      : [];

    const listing = await prisma.listing.create({
      data: {
        imageUrl: publicUrl,
        offerText,
        wantText,
        region,
        availabilityNote,
        userId: user.id,
        tags: tags.length
          ? {
              create: await Promise.all(
                tags.map(async (name) => {
                  const slug = slugify(name);
                  const tag = await prisma.tag.upsert({
                    where: { slug },
                    create: { name, slug },
                    update: { name },
                  });
                  return { tagId: tag.id };
                })
              ),
            }
          : undefined,
      },
      include: {
        user: true,
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Erro inesperado" }, { status: 500 });
  }
}
