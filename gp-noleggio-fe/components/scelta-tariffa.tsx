"use client";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import CambioIcon from "@/components/svg/cambioIcon";
import PostiIcon from "@/components/svg/postiIcon";
import AriaIcon from "@/components/svg/ariaicon";
import {PatenteIcon} from "@/components/svg/patenteicon";
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
            <DialogContent showCloseButton={false} className="min-w-[60vw] p-8">
                <DialogTitle></DialogTitle>

                <div className="flex flex-row gap-x-10 ">
                    <div className="flex flex-col w-1/2 justify-between">
                        <div className={"flex items-center text-primary font-bold "}>
                            SCELTA TARIFFA
                        </div>

                        <div className="flex flex-col gap-x-2 gap-y-4 ">
                            <div className={" font-bold uppercase"}>{props.nome}</div>
                            <div
                                className={"w-max p-2 rounded-tl-sm rounded-br-sm bg-[#999999] text-white uppercase text-sm"}>
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
                    </div>

                    {/* Pagamento al ritiro */}
                    <div
                        className="flex flex-col w-1/3 gap-x-2 gap-y-4 border border-gray rounded-br-2xl rounded-tl-2xl justify-between">
                        <div className={"bg-[#F6F6FF] items-center rounded-tl-2xl p-4"}>
                            <p className={"text-black font-bold "}>Pagamento al ritiro</p>
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
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 3
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
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
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 3
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
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
