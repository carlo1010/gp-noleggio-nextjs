"use client";

import {useSearchParams} from "next/navigation";
import {useMemo, useState} from "react";

import SceltaVeicolo from "@/app/ricerca-risultati/_components/sceltaVeicolo";

import {TuteleDisponibili, TutelaKey, TutelePrezzi} from "./_components/tuteleDisponibili";
import {ExtraTutelaCards} from "@/app/ricerca-risultati/_components/extra";
import ExtraDisponibili from "@/app/ricerca-risultati/_components/extraDisponibili";

export default function RicercsRisultati() {
    const sp = useSearchParams();
    const step = sp.get("step");

    const [openExtra, setOpenExtra] = useState(false);
    const [selectedExtra, setSelectedExtra] = useState<"basic" | "medium" | "premium">("basic");

    const [tutelaSelezionata, setTutelaSelezionata] = useState<TutelaKey | null>(null);

    const prezzi: TutelePrezzi = useMemo(
        () => ({
            danni: 32.2,
            furto: 32.2,
            assistenza: 32.2,
        }),
        []
    );

    function handleToggle(key: TutelaKey) {
        setTutelaSelezionata((prev) => (prev === key ? null : key));
    }

    function handleInfo(key: TutelaKey) {
        console.log("Scopri di più:", key);
        // qui poi puoi aprire un Dialog informativo
    }

    // 🔁 STEP RENDER
    if (step === "2") {
        return <SceltaVeicolo/>;
    }

    if (step === "3") {
        return (
            <div className="container mx-auto">
                {/* Sezione tutele (pagina) */}
                <TuteleDisponibili
                    selected={tutelaSelezionata}
                    prezzi={prezzi}
                    onToggle={handleToggle}
                    onInfo={handleInfo}
                    title="Formule di Tutela disponibili"
                />


                <div className="font-bold text-sm text-black py-4">
                    Extra Disponibili
                        <div className=" grid grid-cols-2 gap-x-4 py-4">


                            <ExtraDisponibili codice={"1"} titolo={"Guidatore Addizionale"} prezzo={"200"}
                                              descrizione={"adsdsdsadsda"} isquantity={true}
                                              onchange={function (): void {
                                                  throw new Error("Function not implemented.");
                                              }}/>

                            <ExtraDisponibili codice={"1"} titolo={"Guidatore Addizionale"} prezzo={"200"}
                                              descrizione={"adsdsdsadsda"} isquantity={false}
                                              onchange={function (): void {
                                                  throw new Error("Function not implemented.");
                                              }}/>
                        </div>

                </div>

            </div>
        );
    }

    // fallback
    return <SceltaVeicolo/>;
}
