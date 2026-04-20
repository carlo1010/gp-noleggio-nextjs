import { parsePrice } from "@/lib/price";
import { resolveCombustioneLabel } from "@/lib/vehicle-combustione";
import type {
    BackendListaVeicolo,
    ListaVeicolo,
    VehicleFiltersInput,
    VehicleTipologia,
} from "@/types/veicolo";

const COMPACT_CATEGORIES = new Set(["M", "E", "H", "C", "D"]);
const SEDAN_BODY_CODES = new Set(["B", "L", "W", "D", "T", "E", "Z"]);
const CATEGORY_MAP: Record<string, string> = {
    M: "Mini",
    E: "Economica",
    H: "Economica Elite",
    C: "Compatta",
    D: "Compatta Elite",
    I: "Intermedia",
    J: "Intermedia Elite",
    S: "Standard",
    R: "Standard Elite",
    F: "Fullsize",
    G: "Fullsize Elite",
    P: "Premium",
    U: "Premium Elite",
    L: "Lusso",
    W: "Lusso Elite",
    X: "Straordinaria",
};

const TRANSMISSION_MAP = {
    M: { key: "manuale", label: "Manuale" },
    A: { key: "automatico", label: "Automatico" },
    D: { key: "automatico", label: "Automatico" },
} as const;

const FUEL_MAP = {
    R: { alimentazione: "Combustione", ariaCondizionata: true },
    H: { alimentazione: "Ibrido Plug-in", ariaCondizionata: true },
    E: { alimentazione: "Elettrica", ariaCondizionata: true },
    C: { alimentazione: "Elettrica", ariaCondizionata: true },
} as const;

function toNumber(value: string | number | null | undefined): number | undefined {
    if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
    if (typeof value !== "string" || !value.trim()) return undefined;

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeTransmissionLabel(value: string | null | undefined): string | undefined {
    if (typeof value !== "string") return undefined;

    const normalized = value.trim();
    if (!normalized) return undefined;

    const mapped = TRANSMISSION_MAP[normalized.toUpperCase() as keyof typeof TRANSMISSION_MAP];
    return mapped?.label ?? normalized;
}

function normalizeAcValue(value: number | string | null | undefined): number | null | undefined {
    if (value === null) return null;
    if (value === undefined) return undefined;

    const parsed = toNumber(value);
    if (parsed === 0) return 0;
    if (parsed === 1) return 1;
    return null;
}

function hasOwnProperty<K extends string>(object: unknown, key: K): object is Record<K, unknown> {
    return Object.prototype.hasOwnProperty.call(object, key);
}

function getAcrissSuffix(code: string): string | null {
    const normalized = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    const suffix = normalized.slice(-4);
    return /^[A-Z]{4}$/.test(suffix) ? suffix : null;
}

function inferTipologia(
    acrissCategory: string | undefined,
    acrissBody: string | undefined,
    isTruck: number,
): VehicleTipologia | undefined {
    if (isTruck === 1 || acrissBody === "V") return "van";
    if (acrissBody === "F") return "suv";
    if (acrissCategory && COMPACT_CATEGORIES.has(acrissCategory)) return "citycar";
    if (acrissBody && SEDAN_BODY_CODES.has(acrissBody)) return "berlina";
    return undefined;
}

function matchesPriceRange(price: number, filter: string) {
    switch (filter) {
        case "0-50":
            return price <= 50;
        case "50-80":
            return price > 50 && price <= 80;
        case "80-120":
            return price > 80 && price <= 120;
        case "120+":
            return price > 120;
        default:
            return true;
    }
}

export function normalizeVehicle(raw: BackendListaVeicolo): ListaVeicolo {
    const acrissSuffix = getAcrissSuffix(raw.codiceClasse);
    const acrissCategory = acrissSuffix?.[0];
    const acrissBody = acrissSuffix?.[1];
    const acrissTransmission = acrissSuffix?.[2] as keyof typeof TRANSMISSION_MAP | undefined;
    const acrissFuel = acrissSuffix?.[3] as keyof typeof FUEL_MAP | undefined;
    const rawTransmissionCode =
        typeof raw.cambio === "string"
            ? raw.cambio.trim().toUpperCase()
            : undefined;

    const transmission =
        (rawTransmissionCode
            ? TRANSMISSION_MAP[rawTransmissionCode as keyof typeof TRANSMISSION_MAP]
            : undefined) ??
        (acrissTransmission ? TRANSMISSION_MAP[acrissTransmission] : undefined);
    const fuel = acrissFuel ? FUEL_MAP[acrissFuel] : undefined;
    const normalizedCambio = normalizeTransmissionLabel(raw.cambio) ?? transmission?.label;
    const rawAc = hasOwnProperty(raw, "ac")
        ? (raw as BackendListaVeicolo & { ac?: number | string | null }).ac
        : undefined;
    const normalizedAc = normalizeAcValue(rawAc);
    const normalizedCombustioneLabel = resolveCombustioneLabel({
        combustioneLabel: raw.combustioneLabel,
        combustione: raw.combustione,
        alimentazione: raw.alimentazione ?? fuel?.alimentazione ?? null,
    });
    const normalizedAriaCondizionata =
        normalizedAc === 1
            ? true
            : normalizedAc === 0
              ? false
              : raw.ariaCondizionata ?? fuel?.ariaCondizionata;

    return {
        ...raw,
        giorniNoleggio: toNumber(raw.giorniNoleggio) ?? 0,
        disponibilita: toNumber(raw.disponibilita) ?? 0,
        cambio: normalizedCambio ?? null,
        cambioKey: raw.cambioKey ?? transmission?.key,
        categoria: raw.categoria ?? (acrissCategory ? CATEGORY_MAP[acrissCategory] : undefined),
        posti: toNumber(raw.posti),
        porte: toNumber(raw.porte) ?? null,
        ariaCondizionata: normalizedAriaCondizionata,
        ac: normalizedAc,
        etaMin: toNumber(raw.etaMin),
        combustione: raw.combustione ?? null,
        combustioneLabel: normalizedCombustioneLabel,
        alimentazione: normalizedCombustioneLabel,
        tipologia: raw.tipologia ?? inferTipologia(acrissCategory, acrissBody, raw.isTruck),
    };
}

export function applyVehicleFilters(
    vehicles: ListaVeicolo[],
    filters: VehicleFiltersInput,
): ListaVeicolo[] {
    const filtered = vehicles.filter((vehicle) => {
        if (filters.cambio && filters.cambio !== "all" && vehicle.cambioKey !== filters.cambio) {
            return false;
        }

        if (filters.tipologia && filters.tipologia !== "all" && vehicle.tipologia !== filters.tipologia) {
            return false;
        }

        if (filters.posti && filters.posti !== "all" && vehicle.posti != null) {
            const minimumSeats = Number(filters.posti);
            if (Number.isFinite(minimumSeats) && vehicle.posti < minimumSeats) {
                return false;
            }
        }

        if (filters.prezzo && filters.prezzo !== "all") {
            const dailyPrice = parsePrice(vehicle.tariffaWeb);
            if (!matchesPriceRange(dailyPrice, filters.prezzo)) {
                return false;
            }
        }

        return true;
    });

    const sorted = [...filtered];
    switch (filters.sort) {
        case "price_asc":
            sorted.sort((a, b) => parsePrice(a.tariffaWeb) - parsePrice(b.tariffaWeb));
            break;
        case "name_asc":
            sorted.sort((a, b) => a.descrizioneClasse.localeCompare(b.descrizioneClasse, "it"));
            break;
        case "name_desc":
            sorted.sort((a, b) => b.descrizioneClasse.localeCompare(a.descrizioneClasse, "it"));
            break;
        case "price_desc":
        default:
            sorted.sort((a, b) => parsePrice(b.tariffaWeb) - parsePrice(a.tariffaWeb));
            break;
    }

    return sorted;
}
