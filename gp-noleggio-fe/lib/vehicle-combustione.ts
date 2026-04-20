const COMBUSTIONE_CODE_TO_LABEL = {
    C: "Combustione",
    B: "Benzina",
    D: "Diesel",
    E: "Elettrico",
} as const;

function normalizeText(value: string | null | undefined): string | null {
    if (typeof value !== "string") return null;
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
}

export function mapCombustioneCodeToLabel(code: string | null | undefined): string | null {
    const normalized = normalizeText(code)?.toUpperCase();
    if (!normalized) return null;

    return COMBUSTIONE_CODE_TO_LABEL[normalized as keyof typeof COMBUSTIONE_CODE_TO_LABEL] ?? null;
}

export function resolveCombustioneLabel(input: {
    combustioneLabel?: string | null;
    combustione?: string | null;
    alimentazione?: string | null;
}): string | null {
    const fromBackendLabel = normalizeText(input.combustioneLabel);
    if (fromBackendLabel) return fromBackendLabel;

    const fromCode = mapCombustioneCodeToLabel(input.combustione);
    if (fromCode) return fromCode;

    const rawCombustione = normalizeText(input.combustione);
    // Backward compatibility for old payloads where combustione could already be a descriptive string.
    if (rawCombustione && rawCombustione.length > 1) return rawCombustione;

    return normalizeText(input.alimentazione);
}

export function getCombustioneDisplayLabel(input: {
    combustioneLabel?: string | null;
    combustione?: string | null;
    alimentazione?: string | null;
}): string {
    return resolveCombustioneLabel(input) ?? "N/D";
}
