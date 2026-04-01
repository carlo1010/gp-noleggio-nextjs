import { NextResponse } from "next/server";

import { getNexiBuildIntegrity } from "@/lib/payments/nexi-build";

export async function GET() {
  const result = await getNexiBuildIntegrity();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json(result);
}
