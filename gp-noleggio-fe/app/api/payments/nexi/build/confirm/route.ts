import { NextResponse } from "next/server";
import { z } from "zod";

import { confirmNexiBuildPayment } from "@/lib/payments/nexi-build";

const confirmSchema = z.object({
  sessionId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = confirmSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid Nexi confirm payload." },
        { status: 400 },
      );
    }

    const result = await confirmNexiBuildPayment(parsed.data.sessionId);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to confirm Nexi Build payment." },
      { status: 500 },
    );
  }
}
