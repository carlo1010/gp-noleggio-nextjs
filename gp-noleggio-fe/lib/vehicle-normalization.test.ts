import test from "node:test";
import assert from "node:assert/strict";

import type { BackendListaVeicolo } from "@/types/veicolo";
import { normalizeVehicle } from "./vehicle-normalization";
import { getCombustioneDisplayLabel } from "./vehicle-combustione";

function createRawVehicle(
    patch: Partial<BackendListaVeicolo> = {},
): BackendListaVeicolo {
    return {
        codiceAgenzia: "001",
        descrizioneAgenzia: "Napoli Centro",
        codiceClasse: "A10",
        descrizioneClasse: "ECONOMY",
        codiceTariffa: "WEB",
        descrizioneTariffa: "Tariffa Web",
        tariffaWeb: "35.00",
        tariffaBanco: "45.00",
        urlImmagine: "/A10.png",
        isTruck: 0,
        isYoung: 0,
        giorniNoleggio: 3,
        totalTariffaWeb: "105.00",
        totalTariffaBanco: "135.00",
        tariffaFranchigiaFurto: "0",
        tariffaFranchigiaDanno: "0",
        ...patch,
    };
}

test("uses backend combustioneLabel when present", () => {
    const normalized = normalizeVehicle(createRawVehicle({
        porte: 5,
        combustione: "D",
        combustioneLabel: "Diesel",
        ac: 1,
        cambio: "M",
    }));

    assert.equal(normalized.porte, 5);
    assert.equal(normalized.combustione, "D");
    assert.equal(normalized.combustioneLabel, "Diesel");
    assert.equal(normalized.alimentazione, "Diesel");
    assert.equal(normalized.ac, 1);
    assert.equal(normalized.ariaCondizionata, true);
    assert.equal(normalized.cambio, "Manuale");
});

test("maps raw combustione code when combustioneLabel is missing", () => {
    const normalized = normalizeVehicle(createRawVehicle({
        combustione: "B",
        combustioneLabel: null,
    }));

    assert.equal(normalized.combustione, "B");
    assert.equal(normalized.combustioneLabel, "Benzina");
    assert.equal(normalized.alimentazione, "Benzina");
});

test("unknown or null combustione falls back to N/D in UI helper", () => {
    const unknown = normalizeVehicle(createRawVehicle({
        combustione: "X",
        combustioneLabel: null,
    }));

    const nullable = normalizeVehicle(createRawVehicle({
        combustione: null,
        combustioneLabel: null,
        alimentazione: null,
    }));

    assert.equal(unknown.combustioneLabel, null);
    assert.equal(getCombustioneDisplayLabel({
        combustioneLabel: unknown.combustioneLabel,
        combustione: unknown.combustione,
        alimentazione: unknown.alimentazione,
    }), "N/D");

    assert.equal(nullable.combustioneLabel, null);
    assert.equal(getCombustioneDisplayLabel({
        combustioneLabel: nullable.combustioneLabel,
        combustione: nullable.combustione,
        alimentazione: nullable.alimentazione,
    }), "N/D");
});
