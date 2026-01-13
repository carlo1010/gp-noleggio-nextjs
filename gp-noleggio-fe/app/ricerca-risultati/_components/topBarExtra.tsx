"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";

type CheckoutTopBarProps = {
    totale: number | string;
};

export default function CheckoutTopBar({ totale }: CheckoutTopBarProps) {
    const router = useRouter();
    const sp = useSearchParams();

    const goToStep4 = () => {
        const params = new URLSearchParams(sp.toString());
        params.set("step", "4");
        router.push(`/ricerca-risultati?${params.toString()}`);
    };

    return (
        <div className="w-full bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-6 md:py-10 max-w-[1240px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Titolo */}
                    <h1 className="text-2xl md:text-3xl font-bold text-black max-w-md leading-tight">
                        Seleziona Formule di Tutela &amp; Extra
                    </h1>

                    {/* Right side */}
                    <div className="flex items-center justify-between md:justify-end gap-6 md:gap-10 border-t md:border-t-0 pt-4 md:pt-0">
                        <div className="flex flex-col">
                            <span className="text-[10px] md:text-xs tracking-widest text-gray-400 font-bold uppercase">
                                TOTALE
                            </span>
                            <span className="text-xl md:text-2xl font-extrabold text-black">
                                {formatPrice(totale)}
                            </span>
                        </div>

                        <Button
                            type="button"
                            onClick={goToStep4}
                            className="h-12 px-10 rounded-br-sm rounded-tl-sm text-white"
                        >
                            Verifica e paga
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
