import { NextResponse } from "next/server";
import { z } from "zod";

import { getNexiBuildCardData } from "@/lib/payments/nexi-build";

const querySchema = z.object({
  sessionId: z.string().min(1),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = querySchema.safeParse({
    sessionId: searchParams.get("sessionId"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Missing or invalid sessionId." },
      { status: 400 },
    );
  }

  const result = await getNexiBuildCardData(parsed.data.sessionId);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
