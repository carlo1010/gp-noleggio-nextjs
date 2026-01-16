"use client";

import { useSearchParams, useRouter } from "next/navigation";
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
import { listaAgenzia } from "@/hook/useAgenzia";

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

    const visitedSteps = useCheckoutStore((s) => s.visitedSteps);
    const addVisitedStep = useCheckoutStore((s) => s.addVisitedStep);
    const searchData = useCheckoutStore((s) => s.search.ritiro.data);

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


    const { data: agenzie } = listaAgenzia();

    // 🔁 DATA PERSISTENCE & SYNC
    useEffect(() => {
        setStep(Number(step));

        // Sync Search Params to Store (Rehydration)
        const pickupId = sp.get("pickupOfficeId");
        const dropoffId = sp.get("dropoffOfficeId");
        const pTime = sp.get("pickupTime");
        const dTime = sp.get("dropoffTime");
        const typeClient = sp.get("tipoCliente");
        const typeVehicle = sp.get("tipoVeicolo");
        const age = sp.get("eta");

        // Basic fields
        if (pickupDate) setRitiro({ data: pickupDate });
        if (dropoffDate) setRiconsegna({ data: dropoffDate });
        if (pTime) setRitiro({ ora: pTime });
        if (dTime) setRiconsegna({ ora: dTime });

        if (typeClient) checkout.setTipoCliente(typeClient as any);
        if (typeVehicle) checkout.setTipoVeicolo(typeVehicle as any);
        if (age) checkout.setEta(Number(age));

        // Resolve Agency Labels
        if (agenzie && agenzie.length > 0) {
            if (pickupId) {
                const agenzia = agenzie.find((a: any) => String(a.codiceAgenzia) === String(pickupId));
                if (agenzia) {
                    setRitiro({
                        luogo: pickupId,
                        luogoLabel: agenzia.descrizioneAgenzia
                    });
                }
            }
            if (dropoffId) {
                const agenzia = agenzie.find((a: any) => String(a.codiceAgenzia) === String(dropoffId));
                if (agenzia) {
                    setRiconsegna({
                        luogo: dropoffId,
                        luogoLabel: agenzia.descrizioneAgenzia
                    });
                }
            }
        }

        if (step === "2") {
            clearStep3();
        }
    }, [step, clearStep3, setStep, pickupDate, dropoffDate, sp, agenzie]);

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

    // ===== NAVIGATION GUARDS =====
    const router = useRouter();

    useEffect(() => {
        const currentStep = Number(step);

        // 1. Check Step 1 Data (search params in store)
        // If we don't have search data (e.g. ritiro.data), we shouldn't be here -> Home
        // Exception: maybe we rehydrated from URL? But for now, strict check on store.
        if (!searchData) {
            router.push("/");
            return;
        }

        // 2. Check Step 2 Data (selected vehicle)
        // If we are on step 3 or 4, we MUST have a vehicle.
        if (currentStep >= 3 && !checkout.veicolo) {
            // reconstruct params to keep search context
            const params = new URLSearchParams(sp.toString());
            params.set("step", "2");
            router.push(`/ricerca-risultati?${params.toString()}`);
            return;
        }

        // 3. Check Step 3 (must have visited step 3 to go to 4)
        // If we are on step 4, we must have visited step 3.
        if (currentStep === 4 && !visitedSteps.includes(3)) {
            const params = new URLSearchParams(sp.toString());
            params.set("step", "3");
            router.push(`/ricerca-risultati?${params.toString()}`);
            return;
        }

        // === ALL GUARDS PASSED ===
        // allow rendering and mark current step as visited
        // We use a timeout or just direct call to avoid "cannot update component while rendering" if it triggers re-render immediately?
        // useCheckoutStore is external, so it might be fine, but useEffect is safer.
        addVisitedStep(currentStep);

    }, [step, searchData, checkout.veicolo, visitedSteps, router, sp, addVisitedStep]);

    // DEBUG: Log Store
    useEffect(() => {
        console.log("🛒 CHECKOUT STORE STATE:", checkout);
    }, [checkout]);

    // We need useRouter. Let's check imports.
    // imports check: "next/navigation" has useSearchParams. It also has useRouter.



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
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
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
