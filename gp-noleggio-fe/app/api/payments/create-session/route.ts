import { NextResponse } from "next/server";
import { z } from "zod";

import { createPaymentSession } from "@/lib/payments/providers";

const createSessionSchema = z.object({
  provider: z.enum(["stripe", "nexi_build_v3"]),
  amount: z.number().positive(),
  currency: z.literal("EUR"),
  bookingReference: z.string().min(1),
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
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to create payment session." },
      { status: 500 },
    );
  }
}
