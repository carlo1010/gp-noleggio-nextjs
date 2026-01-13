"use client";

import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";

export default function Step4Header() {
    const totale = useCheckoutStore((s) => s.getTotale());

    return (
        <div className="w-full bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-8 md:py-12 max-w-[1240px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-black">
                        Conferma la tua prenotazione
                    </h1>

                    <div className="flex flex-col md:items-end">
                        <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                            TOTALE
                        </span>
                        <span className="text-xl md:text-2xl font-black text-black">
                            {formatPrice(totale)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
