import { NextResponse } from "next/server";
import { z } from "zod";

import { finalizeNexiBuildPayment } from "@/lib/payments/nexi-build";

const finalizeSchema = z.object({
  sessionId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = finalizeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid Nexi finalize payload." },
        { status: 400 },
      );
    }

    const result = await finalizeNexiBuildPayment(parsed.data.sessionId);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to finalize Nexi Build payment." },
      { status: 500 },
    );
  }
}
