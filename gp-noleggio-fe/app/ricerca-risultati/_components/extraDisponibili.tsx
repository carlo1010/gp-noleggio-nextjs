"use client";

import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Info} from "lucide-react";
import {formatPrice} from "@/lib/formatPrice";
import {useCheckoutStore} from "@/store/checkout.store";

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
        <div className="flex items-center bg-[#F7F7F7] p-4 rounded-br-lg rounded-tl-lg gap-x-4 justify-between">
            {/* Titolo */}
            <div className="font-bold">{props.titolo}</div>

            {/* Tooltip */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Info/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{props.descrizione}</p>
                </TooltipContent>
            </Tooltip>

            {/* Prezzo */}
            <div className="font-bold">{formatPrice(prezzoNumber)}</div>


            {/* CTA */}
            <div>
                {props.isquantity ? (
                    <div className="flex items-center gap-x-3">
                        <Button variant="outline" onClick={decrement} disabled={qty === 0}>
                            -
                        </Button>

                        <div className="min-w-[20px] text-center font-semibold">{qty}</div>

                        <Button onClick={increment}>+</Button>
                    </div>
                ) : (
                    <Button variant={isAdded ? "secondary" : "default"} onClick={toggleAdd}>
                        {isAdded ? "Rimuovi" : "Aggiungi"}
                    </Button>
                )}
            </div>
        </div>
    );
}
