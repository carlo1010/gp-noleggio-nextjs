import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => null);

    // TODO: persist operation status to booking/order storage.
    console.log("[NEXI_NOTIFICATION]", payload);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
