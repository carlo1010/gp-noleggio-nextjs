"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import SceltaVeicolo from "@/app/ricerca-risultati/_components/sceltaVeicolo";

import { TuteleDisponibili, TutelaKey, TutelePrezzi } from "./_components/tuteleDisponibili";
import PacchettiProtection from "@/app/ricerca-risultati/_components/extra";
import ExtraDisponibili from "@/app/ricerca-risultati/_components/extraDisponibili";
import CheckoutTopBar from "@/app/ricerca-risultati/_components/topBarExtra";
import { useCheckoutStore } from "@/store/checkout.store";
import Step4Checkout from "@/app/ricerca-risultati/_components/step4Checkout";

export default function RicercsRisultati() {
    const sp = useSearchParams();
    const step = sp.get("step");

    // ===== STORE =====
    const checkout = useCheckoutStore((s) => s);
    const totale = useCheckoutStore((s) => s.getTotale());
    const clearStep3 = useCheckoutStore((s) => s.clearStep3);
    const setPacchettoConPrezzo = useCheckoutStore((s) => s.setPacchettoConPrezzo);

    console.log("CHECKOUT STATE:", checkout);

    // ===== STATE LOCALE =====
    const [tuteleSelezionate, setTuteleSelezionate] = useState<TutelaKey[]>([]);

    const prezzi: TutelePrezzi = useMemo(
        () => ({
            danni: 32.2,
            furto: 32.2,
            assistenza: 32.2,
        }),
        []
    );

    // 🔁 quando torno allo STEP 2 pulisco SEMPRE protezioni + extra
    useEffect(() => {
        if (step === "2") {
            clearStep3();
        }
    }, [step, clearStep3]);

    function handleToggle(key: TutelaKey) {
        setTuteleSelezionate((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    }

    function handleInfo(key: TutelaKey) {
        console.log("Scopri di più:", key);
    }

    // 🔁 RENDER IN BASE ALLO STEP
    if (step === "2") {
        return <SceltaVeicolo />;
    }

    if (step === "3") {
        return (
            <div className="container mx-auto">
                {/* Top bar con totale calcolato da Zustand */}
                <CheckoutTopBar totale={totale} />

                {/* Pacchetti protezione */}
                <PacchettiProtection
                    medium={{ day: 23.85, total: 47.7 }}
                    premium={{ day: 27.62, total: 75.25 }}
                    onChange={(key) => {
                        console.log("Selezionato:", key);

                        if (key === "basic") setPacchettoConPrezzo("basic", 0, 0);
                        if (key === "medium") setPacchettoConPrezzo("medium", 23.85, 47.7);
                        if (key === "premium") setPacchettoConPrezzo("premium", 27.62, 75.25);

                        console.log("DOPO", useCheckoutStore.getState().protezioni);
                    }}
                />

                {/* Tutele singole */}
                <TuteleDisponibili
                    prezzi={prezzi}
                    title="Formule di Tutela disponibili"
                />

                {/* Extra */}
                <div className="font-semibold text-xl text-black py-4">
                    Extra Disponibili
                    <div className="grid grid-cols-2 gap-x-4 py-6">
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

    if (step === "4") {
        return (
            <div className="container mx-auto">
                <Step4Checkout />
            </div>
        );
    }

    // fallback: se non c'è step, vado alla scelta veicolo
    return <SceltaVeicolo />;
}

