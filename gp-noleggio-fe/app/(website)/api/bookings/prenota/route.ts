import { NextResponse } from "next/server";
import { z } from "zod";

import { buildBackendApiUrl } from "@/lib/backend-api";

const prenotaSchema = z.record(z.string(), z.unknown());

const NBT_PRENOTA_PATHS = ["/api/nbt/prenota", "/nbt/prenota"] as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = prenotaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid prenota payload." }, { status: 400 });
    }

    const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
    const baseEndsWithApi = rawBaseUrl
      ? rawBaseUrl.replace(/\/+$/, "").endsWith("/api")
      : false;
    const prenotaPaths = baseEndsWithApi
      ? ["/nbt/prenota"]
      : [...NBT_PRENOTA_PATHS];

    let backendRes: Response | null = null;
    let usedPath: string | null = null;

    for (let index = 0; index < prenotaPaths.length; index += 1) {
      const candidatePath = prenotaPaths[index];
      const candidateUrl = buildBackendApiUrl(candidatePath);
      const response = await fetch(candidateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
        cache: "no-store",
      });

      backendRes = response;
      usedPath = candidatePath;

      if (response.status !== 404 || index === prenotaPaths.length - 1) {
        break;
      }
    }

    if (!backendRes || !usedPath) {
      return NextResponse.json(
        { error: "Prenota request failed before receiving a response." },
        { status: 502 },
      );
    }

    const rawBody = await backendRes.text();
    const jsonBody = (() => {
      if (!rawBody) return null;
      try {
        return JSON.parse(rawBody) as Record<string, unknown>;
      } catch {
        return null;
      }
    })();

    if (!backendRes.ok) {
      const providerError =
        (jsonBody?.error as string | undefined) ??
        (jsonBody?.message as string | undefined) ??
        (jsonBody?.description as string | undefined) ??
        "Prenotazione non riuscita.";
      const diagnostic = rawBody && !jsonBody ? ` Raw: ${rawBody.slice(0, 300)}` : "";

      return NextResponse.json(
        { error: `${providerError} (HTTP ${backendRes.status}, Endpoint: ${usedPath})${diagnostic}` },
        { status: backendRes.status >= 400 && backendRes.status < 600 ? backendRes.status : 502 },
      );
    }

    return NextResponse.json(jsonBody ?? { ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create booking.",
      },
      { status: 500 },
    );
  }
}
