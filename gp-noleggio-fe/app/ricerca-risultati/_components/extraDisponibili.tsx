"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { useCheckoutStore } from "@/store/checkout.store";

interface ExtraDisponibiliProps {
    codice: string;
    titolo: string;
    prezzo: string;
    descrizione: string;
    isquantity: boolean;

    // la lasciamo opzionale: se vuoi loggare in page ok, altrimenti puoi toglierla dopo
    onchange?: (value: number | boolean) => void;
}

export default function ExtraDisponibili(props: ExtraDisponibiliProps) {
    // ✅ qty nello store (per toggle sarà 0 o 1)
    const qty = useCheckoutStore((s) => s.extra[props.codice]?.quantita ?? 0);


    // ✅ azioni Zustand
    const inc = useCheckoutStore((s) => s.incExtra);
    const dec = useCheckoutStore((s) => s.decExtra);
    const toggle = useCheckoutStore((s) => s.toggleExtra);
    const prezzoNumber = Number(props.prezzo);

    // toggle = "aggiunto" se qty > 0
    const isAdded = qty > 0;

    const decrement = () => {
        dec(props.codice); // già non va sotto 0 nello store
        props.onchange?.(Math.max(0, qty - 1));
        console.log("[EXTRA][DEC]", props.codice, "->", Math.max(0, qty - 1));
    };

    const increment = () => {
        inc(props.codice, props.titolo, prezzoNumber);
        props.onchange?.(qty + 1);
        console.log("[EXTRA][INC]", props.codice, "->", qty + 1);
    };

    const toggleAdd = () => {
        toggle(props.codice, props.titolo, prezzoNumber); // 0 <-> 1
        const next = !isAdded;
        props.onchange?.(next);
        console.log("[EXTRA][TOGGLE]", props.codice, "->", next ? 1 : 0);
    };

    return (
        <div className={`p-5 rounded-2xl transition-all duration-300 border-2 ${isAdded ? "border-primary bg-white shadow-md" : "border-transparent bg-gray-50/50"
            }`}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-black text-sm md:text-base">{props.titolo}</span>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="text-gray-400 hover:text-primary transition-colors">
                                    <Info className="w-4 h-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">{props.descrizione}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col">
                        <span className="text-lg font-extrabold text-black">
                            {formatPrice(prezzoNumber)}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                            / totale
                        </span>
                    </div>

                    <div className="flex items-center">
                        {props.isquantity ? (
                            <div className="flex items-center bg-white rounded-lg border border-gray-100 shadow-sm p-1">
                                <button
                                    onClick={decrement}
                                    disabled={qty === 0}
                                    className="w-8 h-8 flex items-center justify-center text-primary disabled:text-gray-300 font-bold transition-colors hover:bg-gray-50 rounded-md"
                                >
                                    -
                                </button>
                                <div className="min-w-[32px] text-center font-extrabold text-sm text-black">{qty}</div>
                                <button
                                    onClick={increment}
                                    className="w-8 h-8 flex items-center justify-center text-primary font-bold transition-colors hover:bg-gray-50 rounded-md"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <Button
                                onClick={toggleAdd}
                                className={`h-10 px-6 font-bold text-sm transition-all ${isAdded
                                        ? "bg-gray-200 text-gray-500 hover:bg-gray-200"
                                        : "bg-primary text-white shadow-md hover:shadow-lg"
                                    }`}
                            >
                                {isAdded ? "Aggiunto" : "Aggiungi"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
