"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import StepStatus from "@/components/checkout/stepstatus";
import CardNoleggio from "@/components/card-noleggio";
import FiltroAuto from "@/components/filtro-auto";
import { SceltaTariffa } from "@/components/scelta-tariffa";
import { useListaVeicoli } from "@/hook/useVeicoli";
import { resolveVehicleImageSrc } from "@/lib/vehicle-image";
import { getNormalizedVehiclePricing } from "@/lib/vehicle-pricing";

export default function SceltaVeicolo() {
    const [open, setOpen] = useState(false);
    const [selectedVeicolo, setSelectedVeicolo] = useState<any>(null);

    const sp = useSearchParams();

    const pickupDate = sp.get("pickupDate");
    const dropoffDate = sp.get("dropoffDate");
    const pickupTime = sp.get("pickupTime");
    const dropoffTime = sp.get("dropoffTime");

    const cambio = sp.get("cambio") ?? "all";
    const posti = sp.get("posti") ?? "all";
    const tipologia = sp.get("tipologia") ?? "all";
    const prezzo = sp.get("prezzo") ?? "all";
    const sort = sp.get("sort") ?? "price_asc";

    const { isPending: isLoadingVeicoli, data: veicoli } = useListaVeicoli({
        datainizio: pickupDate,
        datafine: dropoffDate,
        oraInizio: pickupTime,
        oraFine: dropoffTime,
        cambio,
        posti,
        tipologia,
        prezzo,
        sort,
    });

    const availableCategoryCount = useMemo(
        () => new Set((veicoli ?? []).map((veicolo) => veicolo.codiceClasse)).size,
        [veicoli],
    );

    return (
        <>
            {selectedVeicolo && veicoli && (() => {
                const veicolo = veicoli.find((item) => item.codiceClasse === selectedVeicolo);

                console.log(veicolo);

                if (!veicolo) return null;
                const pricing = getNormalizedVehiclePricing(veicolo, {
                    pickupDate,
                    pickupTime,
                    dropoffDate,
                    dropoffTime,
                });
                const { src: imageSrc } = resolveVehicleImageSrc(veicolo);

                const cambio = veicolo.cambio;
                const posti = veicolo.posti;
                const porte = veicolo.porte;
                const ariaCondizionata = veicolo.ariaCondizionata;
                const etaMin = veicolo.etaMin;

                return (
                    <SceltaTariffa
                        veicolo={veicolo}
                        imageUrl={imageSrc}
                        nome={veicolo.descrizioneClasse}
                        cambio={cambio}
                        posti={posti}
                        ariaCondizionata={ariaCondizionata}
                        eta={etaMin != null ? String(etaMin) : undefined}
                        porte={porte}
                        alimentazione={veicolo.alimentazione}
                        prezzoGiornalieroRitiro={pricing.prezzoGiornalieroBanco}
                        prezzoGiornalieroOnline={pricing.prezzoGiornalieroWeb}
                        prezzoTotaleRitiro={pricing.prezzoTotaleBanco}
                        prezzoTotaleOnline={pricing.prezzoTotaleWeb}
                        open={open}
                        onOpenChange={() => setOpen(false)}
                    />
                );
            })()}


            <div className="container mx-auto py-4 space-y-10 min-h-[80vh] relative">
                <FiltroAuto availableCount={availableCategoryCount} />

                {!isLoadingVeicoli && veicoli?.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                        Nessun veicolo trovato.
                    </div>
                )}

                {isLoadingVeicoli && (
                    <div className="space-y-10">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <VehicleCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                <div className={`space-y-10 transition-opacity duration-300 ${isLoadingVeicoli ? 'opacity-0 h-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                    {veicoli?.map((veicolo, idx: number) => {
                        const pricing = getNormalizedVehiclePricing(veicolo, {
                            pickupDate,
                            pickupTime,
                            dropoffDate,
                            dropoffTime,
                        });
                        const { src: imageSrc } = resolveVehicleImageSrc(veicolo);
                        const cambio = veicolo.cambio;
                        const posti = veicolo.posti;
                        const porte = veicolo.porte;
                        const ariaCondizionata = veicolo.ariaCondizionata;
                        const etaMin = veicolo.etaMin;

                        return (
                            <CardNoleggio
                                key={veicolo.codiceClasse}
                                imageUrl={imageSrc}
                                nome={veicolo.descrizioneClasse}
                                descrizioneGruppo={veicolo.descrizioneGruppo}
                                codiceClasse={veicolo.codiceClasse}
                                cambio={cambio}
                                posti={posti}
                                ariaCondizionata={ariaCondizionata}
                                eta={etaMin != null ? `${etaMin}+` : undefined}
                                porte={porte}
                                openDialog={(event, codiceClasse) => {
                                    setSelectedVeicolo(codiceClasse);
                                    setOpen(true);
                                }}
                                alimentazione={veicolo.alimentazione}
                                prezzoTotale={pricing.prezzoTotaleWeb}
                                prezzoGiornaliero={pricing.prezzoGiornalieroWeb}
                                eagerImage={idx === 0}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

function VehicleCardSkeleton() {
    return (
        <div className="flex flex-col md:grid md:grid-cols-7 gap-x-4 border-b border-gray-200 pb-6 md:pb-0 animate-pulse">
            <div className="w-full md:col-span-2 flex items-center justify-center p-4 md:p-0">
                <div className="w-full max-w-[300px] aspect-[300/219] rounded-md bg-gray-200" />
            </div>

            <div className="flex flex-col gap-y-3 w-full md:col-span-3 px-4 md:px-0">
                <div className="h-6 w-40 rounded bg-gray-200" />
                <div className="h-8 w-28 rounded-tl-sm rounded-br-sm bg-gray-200" />

                <div className="flex flex-row flex-wrap gap-3">
                    <div className="h-5 w-20 rounded bg-gray-200" />
                    <div className="h-5 w-12 rounded bg-gray-200" />
                    <div className="h-5 w-14 rounded bg-gray-200" />
                </div>

                <div className="flex flex-col gap-y-2">
                    <div className="h-5 w-48 rounded bg-gray-200" />
                    <div className="h-5 w-56 rounded bg-gray-200" />
                    <div className="h-5 w-52 rounded bg-gray-200" />
                </div>
            </div>

            <div className="flex flex-col w-full md:col-span-2 items-center md:items-end justify-center gap-y-3 px-4 md:px-0 mt-4 md:mt-0">
                <div className="h-5 w-24 rounded bg-gray-200" />
                <div className="h-8 w-32 rounded bg-gray-200" />
                <div className="h-5 w-24 rounded bg-gray-200" />
                <div className="h-11 w-full md:w-40 rounded bg-gray-200" />
            </div>
        </div>
    );
}
