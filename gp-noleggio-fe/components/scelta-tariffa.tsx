"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import CambioIcon from "@/components/svg/cambioIcon";
import PostiIcon from "@/components/svg/postiIcon";
import AriaIcon from "@/components/svg/ariaicon";
import { PatenteIcon } from "@/components/svg/patenteicon";
import PorteIcon from "@/components/svg/porteicon";
import { Check, X } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout.store";

interface SceltaTariffaProps {
    imageUrl: string;
    nome: string;
    cambio: string;
    posti: number;
    ariaCondizionata: boolean;
    eta: string;
    porte: number;
    alimentazione: string;

    prezzoGiornalieroRitiro: string;
    prezzoGiornalieroOnline: string;
    prezzoTotaleOnline: string;
    prezzoTotaleRitiro: string;
    codiceTariffa: string;


    open: boolean;
    onOpenChange: (event: boolean) => void;
}

export function SceltaTariffa(props: SceltaTariffaProps) {
    const sp = useSearchParams();
    const router = useRouter();

    // ✅ azioni Zustand: DEVONO stare qui, fuori dalla funzione
    const setVeicolo = useCheckoutStore((s) => s.setVeicolo);
    const setTariffa = useCheckoutStore((s) => s.setTariffa);

    // Se i prezzi arrivano con virgola, questo evita NaN
    const toNumber = (v: string) => Number(String(v).replace(",", "."));

    function NextStep(
        tipopagamento: "web" | "ritiro",
        prezzogiornaliero: string,
        prezzototale: string,
        codiceTariffa: string
    ) {
        // 1) salvo veicolo nello store
        setVeicolo({
            nome: props.nome,
            imageUrl: props.imageUrl,
            cambio: props.cambio,
            posti: props.posti,
            ariaCondizionata: props.ariaCondizionata,
            eta: props.eta,
            porte: props.porte,
            alimentazione: props.alimentazione,
        });

        // 2) salvo tariffa nello store
        setTariffa({
            tipo: tipopagamento,
            prezzoGiorno: toNumber(prezzogiornaliero),
            prezzoTotale: toNumber(prezzototale),
            codiceTariffa: codiceTariffa,
        });

        // ✅ debug
        console.log("CHECKOUT STATE (after tariffa):", useCheckoutStore.getState());

        // 3) passo allo step 3 (tengo solo step nei params)
        const params = new URLSearchParams(sp.toString());
        params.set("step", "3");
        router.push(`/ricerca-risultati?${params.toString()}`);
    }

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogContent showCloseButton={false} className="w-[95vw] md:min-w-[70vw] lg:min-w-[60vw] p-4 md:p-8 rounded-2xl md:rounded-3xl overflow-y-auto max-h-[90vh]">
                <DialogTitle className="sr-only">Scelta Tariffa</DialogTitle>

                {/* CLOSE BUTTON */}
                <button
                    onClick={() => props.onOpenChange(false)}
                    className="absolute right-4 top-4 z-50 p-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                    aria-label="Chiudi"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="flex flex-col md:flex-row gap-6 md:gap-x-10">
                    {/* LEFT SIDE: VEHICLE INFO */}
                    <div className="flex flex-col w-full md:w-1/3 lg:w-1/2 justify-between space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-xl md:text-2xl font-bold text-primary">Scelta tariffa</h2>
                            <h3 className="text-lg md:text-xl font-bold uppercase text-black">{props.nome}</h3>
                            <div className="w-max px-2 py-1 rounded-tl-sm rounded-br-sm bg-gray-400 text-white uppercase text-[10px] font-bold">
                                O MINI SIMILARE
                            </div>
                        </div>

                        <div className="relative w-full aspect-[4/3] max-w-[300px] mx-auto md:mx-0">
                            <Image
                                src={props.imageUrl}
                                alt={props.nome}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-row flex-wrap gap-4 font-bold text-sm">
                            <div className="flex flex-row gap-x-1 items-center">
                                <CambioIcon /> {props.cambio}
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <PostiIcon /> {props.posti}
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <AriaIcon /> {props.ariaCondizionata === true ? "A/C" : "NO A/C"}
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <PatenteIcon /> {props.eta}
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <PorteIcon /> {props.porte}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: RATE CARDS */}
                    <div className="flex flex-col lg:flex-row flex-1 gap-6">
                        {/* Pagamento al ritiro */}
                        <div className="flex flex-col flex-1 border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden justify-between">
                            <div className="p-4 bg-[#F6F6FF]">
                                <h4 className="text-black font-bold text-base">Paga al ritiro</h4>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Paga comodamente quando ritiri il veicolo presso la nostra agenzia.
                                </p>
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-y-2">
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        <span>Vantaggio 1</span>
                                    </div>
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm">
                                        <X className="w-4 h-4 text-blue-300 shrink-0" />
                                        <span className="text-gray-400">Svantaggio 2</span>
                                    </div>
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm">
                                        <X className="w-4 h-4 text-blue-300 shrink-0" />
                                        <span className="text-gray-400">Svantaggio 3</span>
                                    </div>
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm">
                                        <X className="w-4 h-4 text-blue-300 shrink-0" />
                                        <span className="text-gray-400">Svantaggio 4</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 flex items-center justify-between border-t border-gray-50 mt-auto bg-gray-50/30">
                                <div>
                                    <p className="text-xl font-bold leading-tight">{formatPrice(props.prezzoGiornalieroRitiro)}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">al giorno</p>
                                </div>

                                <Button
                                    onClick={() =>
                                        NextStep("ritiro", props.prezzoGiornalieroRitiro, props.prezzoTotaleRitiro, props.codiceTariffa)
                                    }
                                    className="px-6 h-10 text-sm font-bold"
                                >
                                    Seleziona
                                </Button>
                            </div>
                        </div>

                        {/* Pagamento online */}
                        <div className="flex flex-col flex-1 border border-primary/20 rounded-2xl bg-white shadow-md overflow-hidden justify-between relative ring-1 ring-primary/5">
                            <div className="p-4 bg-[#F6F6FF]">
                                <h4 className="text-black font-bold text-base">Paga online</h4>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Risparmia pagando ora in totale sicurezza sul nostro sito.
                                </p>
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-y-2">
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm font-semibold">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        <span>Vantaggio 1</span>
                                    </div>
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm font-semibold">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        <span>Vantaggio 2</span>
                                    </div>
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm font-semibold">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        <span>Vantaggio 3</span>
                                    </div>
                                    <div className="flex flex-row gap-x-2 items-center text-xs md:text-sm font-semibold">
                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                        <span>Vantaggio 4</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 flex items-center justify-between border-t border-gray-50 mt-auto bg-[#F6F6FF]/30">
                                <div>
                                    <p className="text-xl font-bold leading-tight">{formatPrice(props.prezzoGiornalieroOnline)}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">al giorno</p>
                                </div>

                                <Button
                                    onClick={() =>
                                        NextStep("web", props.prezzoGiornalieroOnline, props.prezzoTotaleOnline, props.codiceTariffa)
                                    }
                                    className="px-6 h-10 text-sm font-bold shadow-lg"
                                >
                                    Seleziona
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
