"use client";

import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";

export default function Step4Header() {
    const totale = useCheckoutStore((s) => s.getTotale());

    return (
        <div className="w-full bg-white border-b">
            <div className="container mx-auto py-10">
                <div className="flex items-start justify-between">
                    <h1 className="text-2xl font-bold">Conferma la tua prenotazione</h1>

                    <div className="text-right leading-tight">
                        <p className="text-[10px] uppercase text-gray-500 tracking-wide">
                            Totale
                        </p>
                        <p className="text-lg font-bold">{formatPrice(totale)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
