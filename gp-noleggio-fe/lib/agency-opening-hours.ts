export const NBT_DAY_CODES = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"] as const;

export type NbtDayCode = (typeof NBT_DAY_CODES)[number];
export type IsoDateString = string;

export type OpeningTimeRange = {
    start: string;
    end: string;
    startMinutes: number;
    endMinutes: number;
};

export type WeeklyOpeningHours = Record<NbtDayCode, OpeningTimeRange[]>;
export type AgencyOpeningHours = {
    weekly: WeeklyOpeningHours;
    holidays: IsoDateString[];
};

export type ParseOpeningHoursResult = {
    isValid: boolean;
    weekly: WeeklyOpeningHours;
    holidays: IsoDateString[];
    warning: string | null;
};

const ISO_DAY_TO_NBT: Record<string, NbtDayCode> = {
    MON: "LUN",
    TUE: "MAR",
    WED: "MER",
    THU: "GIO",
    FRI: "VEN",
    SAT: "SAB",
    SUN: "DOM",
};

function createEmptyWeeklyOpeningHours(): WeeklyOpeningHours {
    return {
        LUN: [],
        MAR: [],
        MER: [],
        GIO: [],
        VEN: [],
        SAB: [],
        DOM: [],
    };
}

function createEmptyOpeningHours(): AgencyOpeningHours {
    return {
        weekly: createEmptyWeeklyOpeningHours(),
        holidays: [],
    };
}

function parseTimeToMinutes(value: string): number | null {
    const normalized = value.trim();
    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(normalized)) return null;

    const [hours, minutes] = normalized.split(":").map(Number);
    return (hours * 60) + minutes;
}

function formatMinutesToHHmm(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function parseRangesForDay(value: string): OpeningTimeRange[] | null {
    const normalized = value.trim().toUpperCase();
    if (normalized === "CLOSED") return [];

    if (!normalized) return [];

    const chunks = normalized
        .split(",")
        .map((chunk) => chunk.trim())
        .filter(Boolean);

    if (!chunks.length) return null;

    const ranges: OpeningTimeRange[] = [];
    for (const chunk of chunks) {
        const [startRaw, endRaw, ...rest] = chunk.split("-").map((part) => part.trim());
        if (rest.length > 0 || !startRaw || !endRaw) return null;

        const startMinutes = parseTimeToMinutes(startRaw);
        const endMinutes = parseTimeToMinutes(endRaw);
        if (startMinutes === null || endMinutes === null || startMinutes >= endMinutes) return null;

        ranges.push({
            start: startRaw,
            end: endRaw,
            startMinutes,
            endMinutes,
        });
    }

    const ordered = [...ranges].sort((a, b) => a.startMinutes - b.startMinutes);
    for (let i = 1; i < ordered.length; i += 1) {
        if (ordered[i].startMinutes < ordered[i - 1].endMinutes) {
            return null;
        }
    }

    return ordered;
}

function toIsoDateKey(
    dateValue: Date,
    timeZone: string = "Europe/Rome",
): IsoDateString | null {
    if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime())) return null;

    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(dateValue);

    const year = parts.find((part) => part.type === "year")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const day = parts.find((part) => part.type === "day")?.value;

    if (!year || !month || !day) return null;
    return `${year}-${month}-${day}`;
}

function isValidIsoDateString(value: string): value is IsoDateString {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    if (!match) return false;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const parsed = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

    return (
        parsed.getUTCFullYear() === year &&
        parsed.getUTCMonth() + 1 === month &&
        parsed.getUTCDate() === day
    );
}

function parseHolidayList(value: string): IsoDateString[] | null {
    const normalized = value.trim();
    if (!normalized) return [];

    const tokens = normalized
        .split(",")
        .map((token) => token.trim())
        .filter(Boolean);

    const holidays: IsoDateString[] = [];
    for (const token of tokens) {
        if (!isValidIsoDateString(token)) return null;
        holidays.push(token);
    }

    return [...new Set(holidays)].sort();
}

function getMinutesForDate(
    dateValue: Date,
    timeZone: string = "Europe/Rome",
): number | null {
    if (!(dateValue instanceof Date) || Number.isNaN(dateValue.getTime())) return null;

    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(dateValue);

    const hours = Number(parts.find((part) => part.type === "hour")?.value ?? NaN);
    const minutes = Number(parts.find((part) => part.type === "minute")?.value ?? NaN);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    return (hours * 60) + minutes;
}

function isHoliday(
    holidays: readonly IsoDateString[],
    dateValue: string | Date,
    timeZone: string = "Europe/Rome",
): boolean {
    const dateKey =
        typeof dateValue === "string"
            ? (isValidIsoDateString(dateValue.trim()) ? dateValue.trim() : null)
            : toIsoDateKey(dateValue, timeZone);

    if (!dateKey) return false;
    return holidays.includes(dateKey);
}

export function parseOpeningHours(raw: string | null | undefined): ParseOpeningHoursResult {
    const empty = createEmptyOpeningHours();
    if (!raw || !raw.trim()) {
        return {
            isValid: false,
            weekly: empty.weekly,
            holidays: empty.holidays,
            warning: "Orari apertura non disponibili per questa sede.",
        };
    }

    const parts = raw
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean);

    if (!parts.length) {
        return {
            isValid: false,
            weekly: empty.weekly,
            holidays: empty.holidays,
            warning: "Formato orari apertura non valido.",
        };
    }

    const weekly = createEmptyWeeklyOpeningHours();
    const holidays = new Set<IsoDateString>();
    const seenDays = new Set<NbtDayCode>();
    let ignoredSegments = 0;

    for (const part of parts) {
        const separatorIndex = part.indexOf("=");
        if (separatorIndex <= 0) {
            ignoredSegments += 1;
            continue;
        }

        const key = part.slice(0, separatorIndex).trim().toUpperCase();
        const value = part.slice(separatorIndex + 1).trim();

        if (key === "FEST") {
            const parsedHolidays = parseHolidayList(value);
            if (parsedHolidays === null) {
                ignoredSegments += 1;
                continue;
            }

            for (const holiday of parsedHolidays) {
                holidays.add(holiday);
            }
            continue;
        }

        if (!NBT_DAY_CODES.includes(key as NbtDayCode)) {
            ignoredSegments += 1;
            continue;
        }

        const day = key as NbtDayCode;
        if (seenDays.has(day)) {
            ignoredSegments += 1;
            continue;
        }

        const ranges = parseRangesForDay(value);
        if (ranges === null) {
            ignoredSegments += 1;
            continue;
        }

        weekly[day] = ranges;
        seenDays.add(day);
    }

    if (seenDays.size === 0) {
        return {
            isValid: false,
            weekly: createEmptyWeeklyOpeningHours(),
            holidays: [],
            warning: "Orari apertura non disponibili per questa sede.",
        };
    }

    return {
        isValid: true,
        weekly,
        holidays: [...holidays].sort(),
        warning:
            ignoredSegments > 0
                ? "Formato orari apertura parziale: alcuni segmenti sono stati ignorati."
                : null,
    };
}

export function getNbtDayCodeForDate(
    dateValue: string | Date,
    timeZone: string = "Europe/Rome",
): NbtDayCode | null {
    let date: Date | null = null;

    if (typeof dateValue === "string") {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue.trim());
        if (!match) return null;
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    } else if (dateValue instanceof Date && !Number.isNaN(dateValue.getTime())) {
        date = new Date(
            Date.UTC(
                dateValue.getFullYear(),
                dateValue.getMonth(),
                dateValue.getDate(),
                12,
                0,
                0,
            ),
        );
    }

    if (!date) return null;

    const weekday = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        timeZone,
    }).format(date).toUpperCase();

    return ISO_DAY_TO_NBT[weekday] ?? null;
}

export function generateSlotsFromRanges(
    ranges: readonly OpeningTimeRange[],
    chunkMinutes: number = 15,
    options?: {
        includeRangeEnd?: boolean;
    },
): string[] {
    if (!Number.isInteger(chunkMinutes) || chunkMinutes <= 0) return [];

    const slots: string[] = [];
    const includeRangeEnd = options?.includeRangeEnd === true;

    for (const range of ranges) {
        for (let cursor = range.startMinutes; cursor + chunkMinutes <= range.endMinutes; cursor += chunkMinutes) {
            slots.push(formatMinutesToHHmm(cursor));
        }

        if (includeRangeEnd) {
            const endSlot = formatMinutesToHHmm(range.endMinutes);
            if (!slots.includes(endSlot)) {
                slots.push(endSlot);
            }
        }
    }
    return slots;
}

export function getSlotsForDate(
    weekly: WeeklyOpeningHours,
    dateValue: string | Date,
    options?: {
        timeZone?: string;
        chunkMinutes?: number;
        holidays?: readonly IsoDateString[];
        includeRangeEnd?: boolean;
    },
): string[] {
    const timeZone = options?.timeZone ?? "Europe/Rome";
    if (options?.holidays?.length && isHoliday(options.holidays, dateValue, timeZone)) {
        return [];
    }

    const dayCode = getNbtDayCodeForDate(dateValue, timeZone);
    if (!dayCode) return [];
    return generateSlotsFromRanges(weekly[dayCode] ?? [], options?.chunkMinutes ?? 15, {
        includeRangeEnd: options?.includeRangeEnd,
    });
}

export function isAgencyOpenNow(
    openingHours: Pick<ParseOpeningHoursResult, "weekly" | "holidays">,
    now: Date = new Date(),
    timeZone: string = "Europe/Rome",
): boolean {
    if (isHoliday(openingHours.holidays, now, timeZone)) {
        return false;
    }

    const dayCode = getNbtDayCodeForDate(now, timeZone);
    if (!dayCode) return false;

    const currentMinutes = getMinutesForDate(now, timeZone);
    if (currentMinutes === null) return false;

    return (openingHours.weekly[dayCode] ?? []).some((range) =>
        currentMinutes >= range.startMinutes && currentMinutes < range.endMinutes,
    );
}

export function filterReturnSlotsSameDay(
    slots: readonly string[],
    pickupTime: string | null | undefined,
    isSameDay: boolean,
): string[] {
    if (!isSameDay || !pickupTime) return [...slots];

    const pickupMinutes = parseTimeToMinutes(pickupTime);
    if (pickupMinutes === null) return [];

    return slots.filter((slot) => {
        const slotMinutes = parseTimeToMinutes(slot);
        return slotMinutes !== null && slotMinutes > pickupMinutes;
    });
}
