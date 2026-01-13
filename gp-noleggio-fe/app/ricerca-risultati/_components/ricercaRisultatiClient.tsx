"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";

import SceltaVeicolo from "@/app/ricerca-risultati/_components/sceltaVeicolo";

import { TuteleDisponibili } from "./tuteleDisponibili";
import PacchettiProtection from "@/app/ricerca-risultati/_components/extra";
import ExtraDisponibili from "@/app/ricerca-risultati/_components/extraDisponibili";
import CheckoutTopBar from "@/app/ricerca-risultati/_components/topBarExtra";
import { useCheckoutStore } from "@/store/checkout.store";
import Step4Checkout from "@/app/ricerca-risultati/_components/step4Checkout";
import { listaProtezioni, listaServizi } from "@/hook/useService";
import { listaVeicoli } from "@/hook/useVeicoli";
import { parsePrice } from "@/lib/price";

export default function RicercaRisultatiClient() {
    const sp = useSearchParams();
    const step = sp.get("step") ?? "2";
    const classe = sp.get("classe");
    const pay = sp.get("pay");

    // ===== STORE =====
    const checkout = useCheckoutStore((s) => s);
    const totale = useCheckoutStore((s) => s.getTotale());
    const clearStep3 = useCheckoutStore((s) => s.clearStep3);
    const setStep = useCheckoutStore((s) => s.setStep);
    const setVeicolo = useCheckoutStore((s) => s.setVeicolo);
    const setTariffa = useCheckoutStore((s) => s.setTariffa);
    const setRitiro = useCheckoutStore((s) => s.setRitiro);
    const setRiconsegna = useCheckoutStore((s) => s.setRiconsegna);

    const pickupDate = sp.get("pickupDate");
    const dropoffDate = sp.get("dropoffDate");
    const cambio = sp.get("cambio") ?? "all";
    const posti = sp.get("posti") ?? "all";
    const tipologia = sp.get("tipologia") ?? "all";
    const prezzo = sp.get("prezzo") ?? "all";
    const sort = sp.get("sort") ?? "price_desc";

    const needRehydrate =
        (step === "3" || step === "4") && !checkout.veicolo && Boolean(classe);

    const { data: veicoliRehydrate } = listaVeicoli({
        datainizio: needRehydrate ? pickupDate : null,
        datafine: needRehydrate ? dropoffDate : null,
        cambio,
        posti,
        tipologia,
        prezzo,
        sort,
    });

    const codiceTariffa = checkout.veicolo?.codiceTariffa;
    const { data: servizi } = listaServizi(codiceTariffa);
    const { data: protezioni } = listaProtezioni(codiceTariffa);

    // 🔁 quando torno allo STEP 2 pulisco SEMPRE protezioni + extra
    useEffect(() => {
        setStep(Number(step));

        if (pickupDate) setRitiro({ data: pickupDate });
        if (dropoffDate) setRiconsegna({ data: dropoffDate });

        if (step === "2") {
            clearStep3();
        }
    }, [step, clearStep3, setStep, pickupDate, dropoffDate, setRitiro, setRiconsegna]);

    useEffect(() => {
        if (!needRehydrate || !veicoliRehydrate?.length || !classe) return;

        const veicolo = veicoliRehydrate.find((item) => item.codiceClasse === classe);
        if (!veicolo) return;

        setVeicolo(veicolo);
        if (pay === "web") {
            setTariffa({
                tipo: "web",
                prezzoGiorno: parsePrice(veicolo.tariffaWeb),
                prezzoTotale: parsePrice(veicolo.totalTariffaWeb),
            });
        }
        if (pay === "ritiro") {
            setTariffa({
                tipo: "ritiro",
                prezzoGiorno: parsePrice(veicolo.tariffaBanco),
                prezzoTotale: parsePrice(veicolo.totalTariffaBanco),
            });
        }
    }, [needRehydrate, veicoliRehydrate, classe, pay, setVeicolo, setTariffa]);

    const { tutele, extra } = useMemo(() => {
        const tuteleList = (servizi ?? []).filter((s) => s.flagQtaServizio === 0);
        const extraList = (servizi ?? []).filter((s) => s.flagQtaServizio === 1);
        return { tutele: tuteleList, extra: extraList };
    }, [servizi]);

    const pacchetti = useMemo(() => {
        return (protezioni ?? [])
            .filter((p) => Boolean(p.nomeTariffa))
            .map((p) => ({
                key: p.nomeTariffa,
                nome: p.nomeTariffa,
                descrizione: p.descrizioneTariffa,
                note: p.note,
                importo: parsePrice(p.importo),
                franchigiaFurto: p.franchigiaFurto,
                franchigiaDanno: p.franchigiaDanno,
            }));
    }, [protezioni]);

    // 🔁 RENDER IN BASE ALLO STEP
    if (step === "2") {
        return (
            <div className="max-w-7xl mx-auto">
                <SceltaVeicolo />;)
            </div>
        );
    }

    if (step === "3") {
        return (
            <div className="max-w-7xl mx-auto">
                {/* Top bar con totale calcolato da Zustand */}
                <CheckoutTopBar totale={totale} />

                {/* Pacchetti protezione */}
                <PacchettiProtection options={pacchetti} />

                {/* Tutele singole */}
                <TuteleDisponibili
                    servizi={tutele}
                    title="Formule di Tutela disponibili"
                />

                {/* Extra */}
                <div className="font-semibold text-xl text-black py-4">
                    Extra Disponibili
                    <div className="grid grid-cols-2 gap-4 py-6">
                        {extra.map((item) => (
                            <ExtraDisponibili
                                key={item.codiceServizio}
                                codice={item.codiceServizio}
                                titolo={item.descrizioneServizio}
                                prezzo={item.importoServizio}
                                descrizione={item.noteServizio}
                                isquantity={item.flagQtaServizio === 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (step === "4") {
        return (
            <div className="max-w-7xl mx-auto">
                <Step4Checkout />
            </div>
        );
    }

    // fallback: se non c'è step, vado alla scelta veicolo
    return <SceltaVeicolo />;
}
