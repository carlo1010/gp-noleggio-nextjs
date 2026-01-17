export function parseDateString(value?: string): Date | null {
    if (!value) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [y, m, d] = value.split("-").map(Number);
        return new Date(y, m - 1, d);
    }

    if (/^\d{2}[\/-]\d{2}[\/-]\d{4}$/.test(value)) {
        const [d, m, y] = value.split(/[\/-]/).map(Number);
        return new Date(y, m - 1, d);
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDate(date: Date, format: string = "DD/MM/YYYY") {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return format
        .replace("DD", day)
        .replace("MM", month)
        .replace("YYYY", year);
}

export function calcDays(start?: string, end?: string) {
    const startDate = parseDateString(start);
    const endDate = parseDateString(end);
    if (!startDate || !endDate) return 1;

    const ms = endDate.getTime() - startDate.getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    // Aggiungo +1 per contare il giorno di ritiro come richiesto
    return Math.max(1, days + 1);
}
