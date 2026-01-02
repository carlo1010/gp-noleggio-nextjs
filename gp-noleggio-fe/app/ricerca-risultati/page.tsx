"use client";

import {useSearchParams} from "next/navigation";
import {useMemo, useState} from "react";

import SceltaVeicolo from "@/app/ricerca-risultati/_components/sceltaVeicolo";

import {TuteleDisponibili, TutelaKey, TutelePrezzi} from "./_components/tuteleDisponibili";
import PacchettiProtection, {ExtraTutelaCards} from "@/app/ricerca-risultati/_components/extra";
import ExtraDisponibili from "@/app/ricerca-risultati/_components/extraDisponibili";
import CheckoutTopBar from "@/app/ricerca-risultati/_components/topBarExtra";
import {useCheckoutStore} from "@/store/checkout.store";

export default function RicercsRisultati() {
    const sp = useSearchParams();
    const step = sp.get("step");
    const checkout = useCheckoutStore((s) => s);
    console.log("CHECKOUT STATE:", checkout);
    const totale = useCheckoutStore((s) => s.getTotale());


    const [openExtra, setOpenExtra] = useState(false);
    const [selectedExtra, setSelectedExtra] = useState<"basic" | "medium" | "premium">("basic");

    const [tuteleSelezionate, setTuteleSelezionate] = useState<TutelaKey []>([]);

    const prezzi: TutelePrezzi = useMemo(
        () => ({
            danni: 32.2,
            furto: 32.2,
            assistenza: 32.2,
        }),
        []
    );

    function handleToggle(key: TutelaKey) {
        setTuteleSelezionate((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
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
                <CheckoutTopBar totale={totale}/>
                <PacchettiProtection
                    medium={{day: 23.85, total: 47.7}}
                    premium={{day: 27.62, total: 75.25}}
                    onChange={(key) => {
                        console.log("Selezionato:", key);
                    }}
                />
                <TuteleDisponibili
                    selected={tuteleSelezionate}
                    prezzi={prezzi}
                    onToggle={handleToggle}
                    onInfo={handleInfo}
                    title="Formule di Tutela disponibili"
                />


                <div className="font-semibold text-xl text-black py-4">
                    Extra Disponibili
                    <div className=" grid grid-cols-2 gap-x-4 py-6">


                        <ExtraDisponibili
                            codice="driver_add"
                            titolo="Guidatore Addizionale"
                            prezzo="200"
                            descrizione="adsdsdsadsda"
                            isquantity={true}
                            onchange={(value) => console.log("quantity changed:", value)}
                        />

                        <ExtraDisponibili
                            codice="gps"
                            titolo="GPS"
                            prezzo="20"
                            descrizione="adsdsdsadsda"
                            isquantity={false}
                            onchange={(value) => console.log("toggle changed:", value)}
                        />

                    </div>

                </div>

            </div>
        );
    }

    // fallback
    return <SceltaVeicolo/>;
}
