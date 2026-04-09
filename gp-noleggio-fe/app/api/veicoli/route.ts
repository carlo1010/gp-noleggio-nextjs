import { NextResponse } from "next/server";

import { buildBackendApiUrl } from "@/lib/backend-api";
import { applyVehicleFilters, normalizeVehicle } from "@/lib/vehicle-normalization";
import type { BackendListaVeicolo, VehicleFiltersInput } from "@/types/veicolo";

const FORWARDED_PARAMS = [
    "dataInizio",
    "dataFine",
    "oraInizio",
    "oraFine",
    "pickupTime",
    "dropoffTime",
] as const;

export async function GET(req: Request) {
    const incomingUrl = new URL(req.url);
    const upstreamParams = new URLSearchParams();

    for (const key of FORWARDED_PARAMS) {
        const value = incomingUrl.searchParams.get(key);
        if (value) upstreamParams.set(key, value);
    }

    try {
        const upstreamUrl = buildBackendApiUrl(`/nbt/veicoli/?${upstreamParams.toString()}`);
        const res = await fetch(upstreamUrl, { cache: "no-store" });

        if (!res.ok) {
            return NextResponse.json({ error: "Errore fetch veicoli." }, { status: res.status });
        }

        const payload = (await res.json()) as BackendListaVeicolo[];
        const normalized = payload.map(normalizeVehicle);

        const filters: VehicleFiltersInput = {
            cambio: incomingUrl.searchParams.get("cambio") ?? "all",
            posti: incomingUrl.searchParams.get("posti") ?? "all",
            tipologia: incomingUrl.searchParams.get("tipologia") ?? "all",
            prezzo: incomingUrl.searchParams.get("prezzo") ?? "all",
            sort: incomingUrl.searchParams.get("sort") ?? "price_asc",
        };

        return NextResponse.json(applyVehicleFilters(normalized, filters));
    } catch {
        return NextResponse.json({ error: "Errore fetch veicoli." }, { status: 500 });
    }
}
