"use client";

import { PencilLine } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";

export default function StepStatus() {
    const router = useRouter();
    const sp = useSearchParams();

    const clearStep3 = useCheckoutStore((s) => s.clearStep3);

    // ===== STEP ATTIVO (default 1 se non c'è ?step= )
    const stepParam = sp.get("step");
    const activeStep = stepParam ? Number(stepParam) : 1;

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
        return Object.values(extra ?? {}).filter((x) => (x?.quantita ?? 0) > 0).length;
    }, [extra]);

    const pacchettoLabel = useMemo(() => {
        return protezioni?.pacchetto ? protezioni.pacchetto : "—";
    }, [protezioni?.pacchetto]);

    // ---- Navigazione matite
    const goToStep = (step: 1 | 2 | 3 | 4) => {
        const params = new URLSearchParams(sp.toString());

        // ✅ se torno allo STEP 2, resetto SEMPRE pacchetti + tutele + extra
        if (step === 2) {
            clearStep3();
        }

        if (step === 1) {
            // torno alla home con gli stessi query params (se vuoi)
            params.delete("step");
            const qs = params.toString();
            router.push(qs ? `/?${qs}` : "/");
            return;
        }

        // ✅ STEP 4: pagina diversa (metti la tua route)


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

    // ===== CLASSI UI
    const boxBase =
        "rounded-tl-3xl rounded-br-3xl bg-white p-4 space-y-2 flex flex-col justify-between border-2 transition-all";

    const boxClass = (n: number) =>
        `${boxBase} ${activeStep === n ? "border-primary" : "border-transparent"}`;

    const badgeClass = (n: number) =>
        `flex items-center justify-center rounded-full text-white w-6 h-6 ${activeStep === n ? "bg-primary" : "bg-[#D9D9D9]"
        }`;

    const titleClass = (n: number) =>
        `font-bold uppercase text-sm ${activeStep === n ? "text-primary" : "text-[#686868]"}`;

    return (
        <div className="flex justify-center xl:grid xl:grid-cols-6 gap-3 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
            {/* STEP 1 */}
            <div className={`min-w-[180px] xl:min-w-0 xl:col-span-2 ${boxClass(1)}`}>
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className={badgeClass(1)}>1</div>
                        <p className={titleClass(1)}>PUNTO DI NOLEGGIO</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="cursor-pointer"
                        aria-label="Modifica punto di noleggio"
                    >
                        <PencilLine className="text-primary w-4 h-4" />
                    </button>
                </div>

                <div className="hidden md:grid grid-cols-2 gap-x-2">
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="text-[10px] xl:text-xs">Ritiro</p>
                        <p className="font-bold text-[10px] xl:text-xs truncate w-full">{luogoRitiro}</p>
                        <p className="text-[#696969] text-[10px] xl:text-xs">{dataRitiro}</p>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="text-[10px] xl:text-xs">Riconsegna</p>
                        <p className="font-bold text-[10px] xl:text-xs truncate w-full">{luogoRiconsegna}</p>
                        <p className="text-[#696969] text-[10px] xl:text-xs">{dataRiconsegna}</p>
                    </div>
                </div>
            </div>

            {/* STEP 2 */}
            <div className={`min-w-[140px] xl:min-w-0 xl:col-span-1 ${boxClass(2)}`}>
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className={badgeClass(2)}>2</div>
                        <p className={titleClass(2)}>VEICOLO</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="cursor-pointer"
                        aria-label="Modifica veicolo"
                    >
                        <PencilLine className="text-primary w-4 h-4" />
                    </button>
                </div>

                <div className="hidden md:flex flex-col items-start justify-end w-full">
                    <p className="font-bold text-[10px] xl:text-xs truncate w-full">{nomeVeicolo}</p>
                    <p className="text-[#696969] text-[10px] xl:text-xs">{prezzoVeicolo}</p>
                </div>
            </div>

            {/* STEP 3 */}
            <div className={`min-w-[140px] xl:min-w-0 xl:col-span-2 ${boxClass(3)}`}>
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className={badgeClass(3)}>3</div>
                        <p className={titleClass(3)}>EXTRA</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => goToStep(3)}
                        className="cursor-pointer"
                        aria-label="Modifica extra"
                    >
                        <PencilLine className="text-primary w-4 h-4" />
                    </button>
                </div>

                <div className="hidden md:grid grid-cols-2 gap-x-2">
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="font-bold text-[10px] xl:text-xs">{pacchettoLabel}</p>
                        <p className="text-[#696969] text-[10px] xl:text-xs">{protezioniPrezzo}</p>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="font-bold text-[10px] xl:text-xs">{extraCount} Extra</p>
                        <p className="text-[#696969] text-[10px] xl:text-xs">{formatPrice(extraTotale)}</p>
                    </div>
                </div>
            </div>

            {/* STEP 4 (riepilogo) */}
            <div className={`min-w-[140px] xl:min-w-0 xl:col-span-1 ${boxClass(4)}`}>
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center w-full gap-x-2">
                        <div className={badgeClass(4)}>4</div>
                        <p className={titleClass(4)}>RIEPILOGO</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => goToStep(4)}
                        className="cursor-pointer"
                        aria-label="Vai al riepilogo"
                    >
                        <PencilLine className="text-primary w-4 h-4" />
                    </button>
                </div>

                <div className="hidden md:flex flex-col items-start justify-start w-full">
                    <p className="font-bold text-[10px] xl:text-xs">Totale</p>
                    <p className="text-[#696969] text-[10px] xl:text-xs">{formatPrice(totale)}</p>
                </div>
            </div>
        </div>
    );
}
