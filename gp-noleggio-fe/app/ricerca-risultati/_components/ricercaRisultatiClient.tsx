"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import SceltaVeicolo from "@/app/ricerca-risultati/_components/sceltaVeicolo";

import { TuteleDisponibili, TutelaKey, TutelePrezzi } from "./tuteleDisponibili";
import PacchettiProtection from "@/app/ricerca-risultati/_components/extra";
import ExtraDisponibili from "@/app/ricerca-risultati/_components/extraDisponibili";
import CheckoutTopBar from "@/app/ricerca-risultati/_components/topBarExtra";
import { useCheckoutStore } from "@/store/checkout.store";
import Step4Checkout from "@/app/ricerca-risultati/_components/step4Checkout";
import { useHasHydrated } from "@/hook/useHasHydrated";

export default function RicercaRisultatiClient() {
    const hasHydrated = useHasHydrated();
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

    if (!hasHydrated) return null;

    // 🔁 RENDER IN BASE ALLO STEP
    if (step === "2") {
        return <SceltaVeicolo />;
    }

    if (step === "3") {
        return (
            <div className="w-full">
                {/* Top bar con totale calcolato da Zustand */}
                <CheckoutTopBar totale={totale} />

                <div className="container mx-auto px-4 py-8 space-y-12 max-w-[1240px]">
                    {/* Pacchetti protezione */}
                    <PacchettiProtection
                        medium={{ day: 23.85, total: 47.7 }}
                        premium={{ day: 27.62, total: 75.25 }}
                        onChange={(key) => {
                            console.log("Selezionato:", key);
                            if (key === "basic") setPacchettoConPrezzo("basic", 0, 0);
                            if (key === "medium") setPacchettoConPrezzo("medium", 23.85, 47.7);
                            if (key === "premium") setPacchettoConPrezzo("premium", 27.62, 75.25);
                        }}
                    />

                    {/* Tutele singole */}
                    <TuteleDisponibili
                        prezzi={prezzi}
                        title="Formule di Tutela disponibili"
                    />

                    {/* Extra */}
                    <div className="space-y-6">
                        <h2 className="text-xl md:text-2xl font-bold text-black border-b border-gray-100 pb-4">
                            Extra Disponibili
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ExtraDisponibili
                                codice="driver_add"
                                titolo="Guidatore Addizionale"
                                prezzo="95.20"
                                descrizione="Permette a un'altra persona di guidare il veicolo."
                                isquantity={true}
                            />

                            <ExtraDisponibili
                                codice="child_seat_0_13"
                                titolo="Seggiolino per bambini 0-13kg con dispositivo antiabbandono"
                                prezzo="32.20"
                                descrizione="Seggiolino di sicurezza per neonati."
                                isquantity={true}
                            />

                            <ExtraDisponibili
                                codice="child_seat_9_18"
                                titolo="Seggiolino per bambini 9-18kg"
                                prezzo="18.20"
                                descrizione="Seggiolino di sicurezza per bambini."
                                isquantity={true}
                            />

                            <ExtraDisponibili
                                codice="anti_abandon"
                                titolo="Dispositivo antiabbandono (obbligatorio sotto i 4 anni)"
                                prezzo="312.20"
                                descrizione="Dispositivo di sicurezza obbligatorio per legge."
                                isquantity={true}
                            />

                            <ExtraDisponibili
                                codice="gps"
                                titolo="Navigatore satellitare"
                                prezzo="132.20"
                                descrizione="Navigatore GPS per non perdere mai la strada."
                                isquantity={false}
                            />

                            <ExtraDisponibili
                                codice="young_driver"
                                titolo="Supplemento Young Driver"
                                prezzo="232.20"
                                descrizione="Supplemento per guidatori sotto i 25 anni."
                                isquantity={true}
                            />

                            <ExtraDisponibili
                                codice="booster"
                                titolo="Rialzo per bambini con schienale (obbligatorio sotto i 150 cm di altezza)"
                                prezzo="22.90"
                                descrizione="Rialzo di sicurezza per bambini più grandi."
                                isquantity={true}
                            />

                            <ExtraDisponibili
                                codice="chains"
                                titolo="Catene da neve"
                                prezzo="32.20"
                                descrizione="Catene da neve omologate."
                                isquantity={true}
                            />
                        </div>
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
