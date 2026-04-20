import test from "node:test";
import assert from "node:assert/strict";

import {
    filterReturnSlotsSameDay,
    isAgencyOpenNow,
    getSlotsForDate,
    parseOpeningHours,
} from "./agency-opening-hours";

test("parse valid weekly + FEST payload", () => {
    const parsed = parseOpeningHours(
        "LUN=08:00-13:00,15:00-18:00;MAR=08:00-13:00,15:00-18:00;MER=08:00-13:00,15:00-18:00;GIO=08:00-13:00,15:00-18:00;VEN=08:00-13:00,15:00-18:00;SAB=08:00-12:00;DOM=CLOSED;FEST=2026-01-01,2026-04-06,2026-04-25,2026-12-25,2026-12-26",
    );

    assert.equal(parsed.isValid, true);
    assert.equal(parsed.warning, null);
    assert.deepEqual(parsed.holidays, [
        "2026-01-01",
        "2026-04-06",
        "2026-04-25",
        "2026-12-25",
        "2026-12-26",
    ]);

    const mondaySlots = getSlotsForDate(parsed.weekly, "2026-04-20", { timeZone: "Europe/Rome" });
    assert.equal(mondaySlots[0], "08:00");
    assert.equal(mondaySlots.includes("12:45"), true);
    assert.equal(mondaySlots.includes("13:00"), false);
    assert.equal(mondaySlots.includes("15:00"), true);
    assert.equal(mondaySlots[mondaySlots.length - 1], "17:45");
});

test("parse valid payload without FEST", () => {
    const parsed = parseOpeningHours(
        "LUN=08:00-13:00;MAR=08:00-13:00;MER=08:00-13:00;GIO=08:00-13:00;VEN=08:00-13:00;SAB=08:00-12:00;DOM=CLOSED",
    );

    assert.equal(parsed.isValid, true);
    assert.deepEqual(parsed.holidays, []);
    assert.equal(parsed.warning, null);
});

test("CLOSED day returns no slots", () => {
    const parsed = parseOpeningHours(
        "LUN=CLOSED;MAR=;MER=CLOSED;GIO=CLOSED;VEN=CLOSED;SAB=CLOSED;DOM=CLOSED",
    );

    assert.equal(parsed.isValid, true);
    const mondaySlots = getSlotsForDate(parsed.weekly, "2026-04-20", { timeZone: "Europe/Rome" });
    assert.deepEqual(mondaySlots, []);
});

test("malformed segments are ignored without crashing", () => {
    const parsed = parseOpeningHours(
        "LUN=08:00-09:00;BOGUS=12:00-13:00;SAB==BAD;MAR=BOGUS;DOM=CLOSED",
    );

    assert.equal(parsed.isValid, true);
    assert.equal(Boolean(parsed.warning), true);

    const mondaySlots = getSlotsForDate(parsed.weekly, "2026-04-20", { timeZone: "Europe/Rome" });
    assert.deepEqual(mondaySlots, ["08:00", "08:15", "08:30", "08:45"]);
});

test("holiday overrides open day for slots and open-now evaluation", () => {
    const parsed = parseOpeningHours(
        "LUN=08:00-13:00;MAR=CLOSED;MER=CLOSED;GIO=CLOSED;VEN=CLOSED;SAB=CLOSED;DOM=CLOSED;FEST=2026-01-05",
    );

    const mondayHolidaySlots = getSlotsForDate(parsed.weekly, "2026-01-05", {
        timeZone: "Europe/Rome",
        holidays: parsed.holidays,
    });
    assert.deepEqual(mondayHolidaySlots, []);

    // 2026-01-05 09:30 Europe/Rome (UTC+1) -> must be closed due to FEST override
    const nowOnHoliday = new Date("2026-01-05T08:30:00.000Z");
    assert.equal(isAgencyOpenNow(parsed, nowOnHoliday, "Europe/Rome"), false);

    const nonHolidayParsed = parseOpeningHours(
        "LUN=08:00-13:00;MAR=CLOSED;MER=CLOSED;GIO=CLOSED;VEN=CLOSED;SAB=CLOSED;DOM=CLOSED",
    );
    assert.equal(isAgencyOpenNow(nonHolidayParsed, nowOnHoliday, "Europe/Rome"), true);
});

test("same-day return slots are strictly after pickup slot", () => {
    const parsed = parseOpeningHours(
        "LUN=08:00-09:00;MAR=CLOSED;MER=CLOSED;GIO=CLOSED;VEN=CLOSED;SAB=CLOSED;DOM=CLOSED",
    );

    const mondaySlots = getSlotsForDate(parsed.weekly, "2026-04-20", { timeZone: "Europe/Rome" });
    const filtered = filterReturnSlotsSameDay(mondaySlots, "08:30", true);

    assert.deepEqual(filtered, ["08:45"]);
});

test("dropoff slots can include range end time", () => {
    const parsed = parseOpeningHours(
        "LUN=CLOSED;MAR=CLOSED;MER=CLOSED;GIO=CLOSED;VEN=CLOSED;SAB=08:00-12:00;DOM=CLOSED",
    );

    const saturdaySlots = getSlotsForDate(parsed.weekly, "2026-04-25", {
        timeZone: "Europe/Rome",
        includeRangeEnd: true,
    });

    assert.equal(saturdaySlots.includes("12:00"), true);
    assert.equal(saturdaySlots[saturdaySlots.length - 1], "12:00");
});
