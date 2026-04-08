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

function parseTimeToMinutes(value?: string) {
    if (!value) return 0;

    const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
    if (!match) return 0;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;

    return hours * 60 + minutes;
}

function diffCalendarDays(startDate: Date, endDate: Date) {
    const utcStart = Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
    );
    const utcEnd = Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
    );

    return Math.round((utcEnd - utcStart) / (1000 * 60 * 60 * 24));
}

export function calcDays(
    startDateValue?: string,
    startTimeValue?: string,
    endDateValue?: string,
    endTimeValue?: string,
) {
    const startDate = parseDateString(startDateValue);
    const endDate = parseDateString(endDateValue);
    if (!startDate || !endDate) return 1;

    const calendarDays = diffCalendarDays(startDate, endDate);
    if (calendarDays <= 0) return 1;

    const startMinutes = parseTimeToMinutes(startTimeValue);
    const endMinutes = parseTimeToMinutes(endTimeValue);

    return Math.max(1, calendarDays + (endMinutes > startMinutes ? 1 : 0));
}
