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

                return (
                    <SceltaTariffa
                        veicolo={veicolo}
                        imageUrl={veicolo.urlImmagine}
                        nome={veicolo.descrizioneClasse}
                        cambio={"automatico"}
                        posti={4}
                        ariaCondizionata={true}
                        eta="26"
                        porte={2}
                        alimentazione={"Benzina"}
                        prezzoGiornalieroRitiro={veicolo.tariffaBanco}
                        prezzoGiornalieroOnline={veicolo.tariffaWeb}
                        prezzoTotaleRitiro={veicolo.totalTariffaBanco}
                        prezzoTotaleOnline={veicolo.totalTariffaWeb}
                        codiceTariffa={veicolo.codiceTariffa}
                        open={open}
                        onOpenChange={() => setOpen(false)}
                    />
                );
            })()}


            <div className="container mx-auto px-4 py-4 space-y-10 max-w-[1240px]">
                <FiltroAuto />

                {isLoadingVeicoli && (
                    <div className="text-sm text-muted-foreground">
                        Caricamento veicoli...
                    </div>
                )}

                {!isLoadingVeicoli && veicoli?.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                        Nessun veicolo trovato.
                    </div>
                )}

                {veicoli?.map((veicolo, idx: number) => (
                    <CardNoleggio
                        key={veicolo.codiceClasse}
                        imageUrl={veicolo.urlImmagine}
                        nome={veicolo.descrizioneClasse}
                        codiceClasse={veicolo.codiceClasse}
                        cambio={"Automatico"}
                        posti={4}
                        ariaCondizionata={true}
                        eta={"26+"}
                        porte={3}
                        openDialog={(event, codiceClasse) => {
                            setSelectedVeicolo(codiceClasse);
                            setOpen(true);
                        }}
                        alimentazione={"diesel"}
                        prezzoTotale={veicolo.totalTariffaWeb}
                        prezzoGiornaliero={veicolo.tariffaWeb}
                    />
                ))}
            </div>
        </>
    );
}
