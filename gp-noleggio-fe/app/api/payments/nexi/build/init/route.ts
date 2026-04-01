import { NextResponse } from "next/server";
import { z } from "zod";

import { initNexiBuildSession } from "@/lib/payments/nexi-build";

const initSchema = z.object({
  amount: z.number().positive(),
  currency: z.literal("EUR"),
  bookingReference: z.string().min(1),
  cardholderEmail: z.string().email().optional(),
  cardholderName: z.string().min(2).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = initSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid Nexi init payload." },
        { status: 400 },
      );
    }

    const result = await initNexiBuildSession(parsed.data);
    if ("error" in result) {
      const status = result.error.startsWith("Missing ") ? 400 : 500;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to initialize Nexi Build session." },
      { status: 500 },
    );
  }
}
