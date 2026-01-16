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
import type { ListaVeicolo } from "@/types/veicolo";
import { parsePrice } from "@/lib/price";

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

    open: boolean;
    onOpenChange: (event: boolean) => void;
}

export function SceltaTariffa(props: SceltaTariffaProps) {
    const sp = useSearchParams();
    const router = useRouter();

    // ✅ azioni Zustand: DEVONO stare qui, fuori dalla funzione
    const setVeicolo = useCheckoutStore((s) => s.setVeicolo);
    const setTariffa = useCheckoutStore((s) => s.setTariffa);
    const setStep = useCheckoutStore((s) => s.setStep);

    // Se i prezzi arrivano con virgola, questo evita NaN
    function NextStep(
        tipopagamento: "web" | "ritiro",
        prezzogiornaliero: string,
        prezzototale: string
    ) {
        const etaMin = Number.parseInt(props.eta, 10);
        // 1) salvo veicolo nello store
        setVeicolo({
            ...props.veicolo,
            cambio: props.cambio,
            posti: props.posti,
            porte: props.porte,
            ariaCondizionata: props.ariaCondizionata,
            etaMin: Number.isNaN(etaMin) ? undefined : etaMin,
        });

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
            <DialogContent showCloseButton={true} className="w-[95vw] mobile:max-w-[95vw] md:max-w-[85vw] lg:max-w-5xl p-4 md:p-8 max-h-[90vh] overflow-y-auto rounded-none rounded-tl-xl rounded-br-xl lg:rounded-tl-3xl lg:rounded-br-3xl">
                <DialogTitle className="sr-only">Scelta Tariffa</DialogTitle>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-x-10">
                    <div className="flex flex-col w-full lg:w-1/3 gap-y-4">
                        <div className="flex items-center text-primary font-bold text-xl lg:text-lg">
                            SCELTA TARIFFA
                        </div>

                        <div className="flex flex-row justify-between items-start lg:flex-col lg:items-start gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-bold uppercase text-2xl lg:text-xl">{props.nome}</div>
                                <div className="w-max p-1.5 rounded-sm bg-[#999999] text-white uppercase text-xs font-bold">
                                    O MINI SIMILARE
                                </div>
                            </div>

                            <div className="relative w-32 h-20 lg:w-full lg:h-48 lg:mt-4">
                                <Image
                                    className="object-contain"
                                    src={props.imageUrl || "/fiat-500.png"}
                                    alt={props.nome || "Veicolo"}
                                    fill
                                    sizes="(max-width: 768px) 128px, 300px"
                                />
                            </div>
                        </div>

                        {/* Car Features Grid */}
                        <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-row lg:flex-wrap lg:gap-x-4 font-bold text-sm lg:text-base mt-2 lg:mt-0">
                            <div className="flex flex-row gap-x-1 items-center">
                                <CambioIcon />
                                <span className="truncate">{props.cambio}</span>
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <PostiIcon />
                                <span>{props.posti}</span>
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <AriaIcon />
                                <span className="truncate">{props.ariaCondizionata === true ? "A/C" : "NO A/C"}</span>
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <PatenteIcon />
                                <span>{props.eta}</span>
                            </div>
                            <div className="flex flex-row gap-x-1 items-center">
                                <PorteIcon />
                                <span>{props.porte}</span>
                            </div>
                        </div>
                    </div>

                    {/* Pagamento al ritiro */}
                    <div
                        className="flex flex-col w-full lg:w-1/3 gap-y-4 border border-gray-200 rounded-none rounded-tl-xl rounded-br-xl lg:rounded-tl-2xl lg:rounded-br-2xl overflow-hidden justify-between shadow-sm">
                        <div className="bg-[#F6F6FF] p-4">
                            <p className={"text-black font-bold "}>Pagamento al ritiro</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>

                        <div className={" flex flex-col gap-y-2  p-4"}>
                            <div className={" flex flex-row gap-x-2"}>
                                <Check strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Vantaggio 1
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Svantaggio 2
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Svantaggio 3
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Svantaggio 4
                            </div>
                        </div>

                        <div className={"flex flex-row justify-between  p-4"}>
                            <div>
                                <p className={"font-bold"}>{formatPrice(props.prezzoGiornalieroRitiro)}</p>
                                <p className={"font-bold text-sm "}>al giorno</p>
                            </div>

                            <Button
                                onClick={() =>
                                    NextStep("ritiro", props.prezzoGiornalieroRitiro, props.prezzoTotaleRitiro)
                                }
                                className="text-sm"
                            >
                                Seleziona
                            </Button>
                        </div>
                    </div>

                    {/* Pagamento online */}
                    <div
                        className="flex flex-col w-full lg:w-1/3 gap-y-4 noleggioCard-active border border-[#0700DE] rounded-none rounded-tl-xl rounded-br-xl lg:rounded-tl-2xl lg:rounded-br-2xl overflow-hidden justify-between shadow-lg relative">
                        <div className="bg-[#F6F6FF] p-4">
                            <p className={"text-black font-bold "}>Pagamento Online</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        </div>

                        <div className={" flex flex-col gap-y-2  p-4"}>
                            <div className={" flex flex-row gap-x-2"}>
                                <Check strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Vantaggio 1
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Svantaggio 2
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Svantaggio 3
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"} />
                                Svantaggio 4
                            </div>
                        </div>

                        <div className={"flex flex-row justify-between  p-4"}>
                            <div>
                                <p className={"font-bold"}>{formatPrice(props.prezzoGiornalieroOnline)}</p>
                                <p className={"font-bold text-sm "}>al giorno</p>
                            </div>

                            <Button
                                onClick={() =>
                                    NextStep("web", props.prezzoGiornalieroOnline, props.prezzoTotaleOnline)
                                }
                                className="text-sm"
                            >
                                Seleziona
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
