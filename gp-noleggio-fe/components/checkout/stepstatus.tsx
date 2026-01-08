"use client";

import {PencilLine} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {useMemo} from "react";

import {useCheckoutStore} from "@/store/checkout.store";
import {formatPrice} from "@/lib/formatPrice";

export default function StepStatus() {
    const router = useRouter();
    const sp = useSearchParams();

    const clearStep3 = useCheckoutStore((s) => s.clearStep3);


    // ---- Stato da Zustand
    const ritiro = useCheckoutStore((s) => s.search.ritiro);
    const riconsegna = useCheckoutStore((s) => s.search.riconsegna);

    const veicolo = useCheckoutStore((s) => s.veicolo);
    const tariffa = useCheckoutStore((s) => s.tariffa);

    const protezioni = useCheckoutStore((s) => s.protezioni);
    const extra = useCheckoutStore((s) => s.extra);

    const totale = useCheckoutStore((s) => s.getTotale());

    // ---- Calcoli UI
    const extraTotale = useMemo(() => {
        return Object.values(extra ?? {}).reduce((acc, item) => {
            const prezzo = Number(item.prezzo) || 0;
            const qta = Number(item.quantita) || 0;
            return acc + prezzo * qta;
        }, 0);
    }, [extra]);

    const extraCount = useMemo(() => {
        // conta quanti extra diversi sono attivi (quantita > 0)
        return Object.values(extra ?? {}).filter((x) => (x?.quantita ?? 0) > 0).length;
    }, [extra]);

    const pacchettoLabel = useMemo(() => {
        // basic/medium/premium -> label (se vuoi puoi mettere mapping più carino)
        return protezioni?.pacchetto ? protezioni.pacchetto : "—";
    }, [protezioni?.pacchetto]);

    // ---- Navigazione matite
    const goToStep = (step: 1 | 2 | 3) => {
        const params = new URLSearchParams(sp.toString());

        // ✅ se torno allo STEP 2, resetto SEMPRE pacchetti + tutele + extra
        if (step === 2) {
            clearStep3();
        }

        if (step === 1) {
            // torno alla home
            params.delete("step");
            const qs = params.toString();
            router.push(qs ? `/?${qs}` : "/");
            return;
        }

        params.set("step", String(step));
        router.push(`/ricerca-risultati?${params.toString()}`);
    };


    // ---- Helpers per testo (fallback se non c’è dato)
    const luogoRitiro = ritiro?.luogoLabel || "—";
    const luogoRiconsegna = riconsegna?.luogoLabel || "—";

    const dataRitiro = ritiro?.data || "—";
    const dataRiconsegna = riconsegna?.data || "—";

    const nomeVeicolo = veicolo?.nome || "—";
    const prezzoVeicolo = tariffa?.prezzoTotale ? formatPrice(tariffa.prezzoTotale) : "—";

    const protezioniPrezzo = protezioni?.prezzoTotale ? formatPrice(protezioni.prezzoTotale) : "Incluso";

    return (
        <div className="grid grid-cols-6 gap-x-4">
            {/* STEP 1 */}
            <div
                className="col-span-2 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl bg-white p-4 space-y-2">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className="flex item-center justify-center rounded-full bg-[#D9D9D9] text-white w-6 h-6">
                            1
                        </div>
                        <p className="font-bold text-[#686868] uppercase text-sm">PUNTO DI NOLEGGIO</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="cursor-pointer"
                        aria-label="Modifica punto di noleggio"
                    >
                        <PencilLine className="text-primary w-4 h-4"/>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-x-2">
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="font-bold">Ritiro</p>
                        <p className="font-bold">{luogoRitiro}</p>
                        <p className="text-[#696969] mt-2">{dataRitiro}</p>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="font-bold">Riconsegna</p>
                        <p className="font-bold">{luogoRiconsegna}</p>
                        <p className="text-[#696969] mt-2">{dataRiconsegna}</p>
                    </div>
                </div>
            </div>

            {/* STEP 2 */}
            <div
                className="col-span-1 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl bg-white p-4 space-y-2">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className="flex item-center justify-center rounded-full bg-[#D9D9D9] text-white w-6 h-6">
                            2
                        </div>
                        <p className="font-bold text-[#686868] uppercase text-sm">SCELTA VEICOLO</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="cursor-pointer"
                        aria-label="Modifica veicolo"
                    >
                        <PencilLine className="text-primary w-4 h-4"/>
                    </button>
                </div>

                <div className="flex flex-col items-start justify-end w-full">
                    <p className="font-bold">{nomeVeicolo}</p>
                    <p className="text-[#696969] mt-2">{prezzoVeicolo}</p>
                </div>
            </div>

            {/* STEP 3 */}
            <div
                className="col-span-2 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl bg-white p-4 space-y-2">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className="flex item-center justify-center rounded-full bg-[#D9D9D9] text-white w-6 h-6">
                            3
                        </div>
                        <p className="font-bold text-[#686868] uppercase text-sm">EXTRA</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => goToStep(3)}
                        className="cursor-pointer"
                        aria-label="Modifica extra"
                    >
                        <PencilLine className="text-primary w-4 h-4"/>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-x-2">
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="font-bold">{pacchettoLabel}</p>
                        <p className="text-[#696969] mt-2">{protezioniPrezzo}</p>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="font-bold">{extraCount} Extra</p>
                        <p className="text-[#696969] mt-2">{formatPrice(extraTotale)}</p>
                    </div>
                </div>
            </div>

            {/* STEP 4 (riepilogo) */}
            <div
                className="col-span-1 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl bg-white p-4 space-y-2">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className="flex item-center justify-center rounded-full bg-[#D9D9D9] text-white w-6 h-6">
                            4
                        </div>
                        <p className="font-bold text-[#686868] uppercase text-sm">RIEPILOGO</p>
                    </div>

                    {/* se vuoi anche qui cliccare -> step 4 in futuro */}
                    <PencilLine className="text-primary w-4 h-4 opacity-40"/>
                </div>

                <div className="flex flex-col items-start justify-start w-full">
                    <p className="font-bold">Prezzo Totale</p>
                    <p className="text-[#696969] mt-2">{formatPrice(totale)}</p>
                </div>
            </div>
        </div>
    );
}
