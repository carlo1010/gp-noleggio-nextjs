"use client";

import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";

export default function Step4Header() {
    const totale = useCheckoutStore((s) => s.getTotale());

    return (
        <div className="w-full bg-white border-b">
            <div className="container mx-auto py-10 px-4 md:px-8 lg:px-0">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Conferma la tua prenotazione</h1>
                </div>
            </div>
        </div>
    );
}
