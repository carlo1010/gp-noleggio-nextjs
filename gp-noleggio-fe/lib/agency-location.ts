import type { Agenzia } from "@/types/agenzia";

export interface AgencyMapPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  lat: number | null;
  lng: number | null;
  searchText: string;
}

const COORDINATE_KEYS = [
  ["latitudineAgenzia", "longitudineAgenzia"],
  ["latitudine", "longitudine"],
  ["latitude", "longitude"],
  ["lat", "lng"],
  ["lat", "lon"],
] as const;

function parseCoordinate(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const normalized = Number(value.replace(",", "."));
    return Number.isFinite(normalized) ? normalized : null;
  }

  return null;
}

export function getAgencyLocality(agency: Agenzia) {
  return agency.localitaAgenzia?.trim() || agency.descrizioneAgenzia?.trim() || agency.codiceAgenzia;
}

export function getAgencyLocationLabel(agency: Agenzia) {
  const locality = agency.localitaAgenzia?.trim();
  const province = agency.provinciaAgenzia?.trim();

  if (locality && province) {
    return `${locality} (${province})`;
  }

  return locality || province || agency.descrizioneAgenzia?.trim() || agency.codiceAgenzia;
}

export function getAgencyDisplayName(agency: Agenzia) {
  return agency.descrizioneAgenzia?.trim() || getAgencyLocality(agency);
}

export function getAgencyAddress(agency: Agenzia) {
  const parts = [
    agency.indirizzoAgenzia?.trim(),
    getAgencyLocality(agency),
    agency.provinciaAgenzia?.trim(),
  ].filter(Boolean);

  return parts.join(", ");
}

export function getAgencyCoordinates(agency: Agenzia) {
  const source = agency as unknown as Record<string, unknown>;

  for (const [latKey, lngKey] of COORDINATE_KEYS) {
    const lat = parseCoordinate(source[latKey]);
    const lng = parseCoordinate(source[lngKey]);

    if (lat !== null && lng !== null) {
      return { lat, lng };
    }
  }

  return null;
}

export function getAgencyMapPoints(agencies: Agenzia[]): AgencyMapPoint[] {
  return agencies.map((agency) => {
    const coordinates = getAgencyCoordinates(agency);
    const city = getAgencyLocality(agency);
    const province = agency.provinciaAgenzia?.trim() || "";

    return {
      id: agency.codiceAgenzia,
      name: getAgencyDisplayName(agency),
      address: getAgencyAddress(agency),
      city,
      province,
      lat: coordinates?.lat ?? null,
      lng: coordinates?.lng ?? null,
      searchText: [getAgencyLocationLabel(agency), "Italia"].filter(Boolean).join(", "),
    };
  });
}

export function getUniqueAgencyLocations(agencies: Agenzia[]) {
  return Array.from(
    new Map(
      agencies.map((agency) => {
        const label = getAgencyLocationLabel(agency);
        return [label.toLocaleLowerCase("it-IT"), label];
      }),
    ).values(),
  ).sort((left, right) => left.localeCompare(right, "it-IT"));
}

export function chunkItems<T>(items: T[], chunkCount: number) {
  if (!items.length || chunkCount <= 0) {
    return [];
  }

  const size = Math.ceil(items.length / chunkCount);
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}
