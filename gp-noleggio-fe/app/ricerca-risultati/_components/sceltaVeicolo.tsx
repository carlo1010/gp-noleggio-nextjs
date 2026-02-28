"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import StepStatus from "@/components/checkout/stepstatus";
import CardNoleggio from "@/components/card-noleggio";
import FiltroAuto from "@/components/filtro-auto";
import { SceltaTariffa } from "@/components/scelta-tariffa";
import { listaVeicoli } from "@/hook/useVeicoli";

export default function SceltaVeicolo() {
    const [open, setOpen] = useState(false);
    const [selectedVeicolo, setSelectedVeicolo] = useState<any>(null);

    const sp = useSearchParams();

    const pickupDate = sp.get("pickupDate");
    const dropoffDate = sp.get("dropoffDate");

    const cambio = sp.get("cambio") ?? "all";
    const posti = sp.get("posti") ?? "all";
    const tipologia = sp.get("tipologia") ?? "all";
    const prezzo = sp.get("prezzo") ?? "all";
    const sort = sp.get("sort") ?? "price_desc";

    const { isPending: isLoadingVeicoli, data: veicoli } = listaVeicoli({
        datainizio: pickupDate,
        datafine: dropoffDate,
        cambio,
        posti,
        tipologia,
        prezzo,
        sort,
    });

    return (
        <>
            {selectedVeicolo && veicoli && (() => {
                const veicolo = veicoli.find((item) => item.codiceClasse === selectedVeicolo);

                console.log(veicolo);

                if (!veicolo) return null;

                const cambio = veicolo.cambio ?? "Automatico";
                const posti = veicolo.posti ?? 4;
                const porte = veicolo.porte ?? 3;
                const ariaCondizionata = veicolo.ariaCondizionata ?? true;
                const etaMin = veicolo.etaMin ?? 18;

                return (
                    <SceltaTariffa
                        veicolo={veicolo}
                        imageUrl={veicolo.urlImmagine}
                        nome={veicolo.descrizioneClasse}
                        cambio={cambio}
                        posti={posti}
                        ariaCondizionata={ariaCondizionata}
                        eta={String(etaMin)}
                        porte={porte}
                        alimentazione={"Benzina"}
                        prezzoGiornalieroRitiro={veicolo.tariffaBanco}
                        prezzoGiornalieroOnline={veicolo.tariffaWeb}
                        prezzoTotaleRitiro={veicolo.totalTariffaBanco}
                        prezzoTotaleOnline={veicolo.totalTariffaWeb}
                        open={open}
                        onOpenChange={() => setOpen(false)}
                    />
                );
            })()}


            <div className="container mx-auto py-4 space-y-10 min-h-[80vh] relative">
                <FiltroAuto />

                {/* Show Loading Overlay or Text without unmounting the list if possible */}
                {isLoadingVeicoli && (
                    <div className="text-sm text-primary font-bold animate-pulse absolute top-32 left-1/2 transform -translate-x-1/2">
                        Aggiornamento veicoli...
                    </div>
                )}

                {!isLoadingVeicoli && veicoli?.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                        Nessun veicolo trovato.
                    </div>
                )}

                <div className={`space-y-10 transition-opacity duration-300 ${isLoadingVeicoli ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                    {veicoli?.map((veicolo, idx: number) => {
                        const cambio = veicolo.cambio ?? "Automatico";
                        const posti = veicolo.posti ?? 4;
                        const porte = veicolo.porte ?? 3;
                        const ariaCondizionata = veicolo.ariaCondizionata ?? true;
                        const etaMin = veicolo.etaMin ?? 18;

                        return (
                            <CardNoleggio
                                key={veicolo.codiceClasse}
                                imageUrl={veicolo.urlImmagine}
                                nome={veicolo.descrizioneClasse}
                                codiceClasse={veicolo.codiceClasse}
                                cambio={cambio}
                                posti={posti}
                                ariaCondizionata={ariaCondizionata}
                                eta={`${etaMin}+`}
                                porte={porte}
                                openDialog={(event, codiceClasse) => {
                                    setSelectedVeicolo(codiceClasse);
                                    setOpen(true);
                                }}
                                alimentazione={"diesel"}
                                prezzoTotale={veicolo.totalTariffaWeb}
                                prezzoGiornaliero={veicolo.tariffaWeb}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
