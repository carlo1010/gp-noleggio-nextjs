export function parsePrice(value: string | number) {
    if (typeof value === "number") return value;
    const normalized = value.includes(",")
        ? value.replace(/\./g, "").replace(",", ".")
        : value;
    const parsed = Number(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
}
