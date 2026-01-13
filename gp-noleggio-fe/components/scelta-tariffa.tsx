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
import {Check, X} from "lucide-react";
import {formatPrice} from "@/lib/formatPrice";
import {useRouter, useSearchParams} from "next/navigation";
import {useCheckoutStore} from "@/store/checkout.store";
import type {ListaVeicolo} from "@/types/veicolo";
import {parsePrice} from "@/lib/price";

interface SceltaTariffaProps {
    veicolo: ListaVeicolo;
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

    const setVeicolo = useCheckoutStore((s) => s.setVeicolo);
    const setTariffa = useCheckoutStore((s) => s.setTariffa);
    const setStep = useCheckoutStore((s) => s.setStep);

    // Se i prezzi arrivano con virgola, questo evita NaN
    function NextStep(
        tipopagamento: "web" | "ritiro",
        prezzogiornaliero: string,
        prezzototale: string,
        codiceTariffa: string
    ) {
        // 1) salvo veicolo nello store
        setVeicolo(props.veicolo);

        // 2) salvo tariffa nello store
        setTariffa({
            tipo: tipopagamento,
            prezzoGiorno: parsePrice(prezzogiornaliero),
            prezzoTotale: parsePrice(prezzototale),

        });

        // ✅ debug
        console.log("CHECKOUT STATE (after tariffa):", useCheckoutStore.getState());

        // 3) passo allo step 3 (step + info minime per ripristino)
        const params = new URLSearchParams(sp.toString());
        params.set("step", "3");
        params.set("classe", props.veicolo.codiceClasse);
        params.set("pay", tipopagamento);
        setStep(3);
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

                            <Image
                                className=""
                                src={props.imageUrl || "/fiat-500.png"}
                                alt={props.nome || "Veicolo"}
                                width={335}
                                height={272}
                            />

                            <div className={"flex flex-row flex-wrap gap-x-4 font-bold"}>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <CambioIcon/>
                                    {props.cambio}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <PostiIcon/>
                                    {props.posti}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <AriaIcon/>
                                    {props.ariaCondizionata === true ? "A/C" : "NO A/C"}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <PatenteIcon/>
                                    {props.eta}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <PorteIcon/>
                                    {props.porte}
                                </div>
                            </div>
                        </div>

                    {/* Pagamento al ritiro */}
                    <div
                        className="flex flex-col w-1/3 gap-x-2 gap-y-4 border border-gray rounded-br-2xl rounded-tl-2xl justify-between">
                        <div className={"bg-[#F6F6FF] items-center rounded-tl-2xl p-4"}>
                            <p className={"text-black font-bold "}>Pagamento al ritiro</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
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

                    {/* Pagamento online */}
                    <div
                        className="flex flex-col w-1/3 gap-x-2 gap-y-4 noleggioCard-active border border-gray rounded-br-2xl rounded-tl-2xl justify-between">
                        <div className={"bg-[#F6F6FF] items-center rounded-tl-2xl p-4"}>
                            <p className={"text-black font-bold "}>Pagamento Online</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>

                        <div className={" flex flex-col gap-y-2  p-4"}>
                            <div className={" flex flex-row gap-x-2"}>
                                <Check strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Vantaggio 1
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 2
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
