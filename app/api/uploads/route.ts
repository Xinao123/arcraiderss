import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function extFromContentType(ct: string) {
  const m = ct?.split("/")?.[1]?.toLowerCase();
  if (!m) return "png";
  if (m.includes("jpeg")) return "jpg";
  if (m.includes("png")) return "png";
  if (m.includes("webp")) return "webp";
  return "png";
}

export async function POST(req: Request) {
  try {
    const { contentType } = await req.json();
    if (!contentType) {
      return NextResponse.json({ error: "contentType é obrigatório." }, { status: 400 });
    }

    const bucket = "listing-prints";
    const ext = extFromContentType(contentType);
    const path = `prints/${crypto.randomUUID()}.${ext}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUploadUrl(path);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const publicUrl = supabaseAdmin.storage.from(bucket).getPublicUrl(path).data.publicUrl;

    return NextResponse.json({
      bucket,
      path,
      token: data.token,
      signedUrl: data.signedUrl,
      publicUrl,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Erro inesperado" }, { status: 500 });
  }
}
