import { NextResponse } from "next/server";
import { z } from "zod";

import { createPaymentSession } from "@/lib/payments/providers";

const createSessionSchema = z.object({
  provider: z.enum(["stripe", "nexi_hpp"]),
  amount: z.number().positive(),
  currency: z.literal("EUR"),
  bookingReference: z.string().min(1),
  returnUrl: z.string().url().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createSessionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payment session payload." },
        { status: 400 },
      );
    }

    const result = await createPaymentSession(parsed.data);
    if ("error" in result) {
      const status = result.error.startsWith("Missing ") ? 400 : 502;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to create payment session." },
      { status: 500 },
    );
  }
}
