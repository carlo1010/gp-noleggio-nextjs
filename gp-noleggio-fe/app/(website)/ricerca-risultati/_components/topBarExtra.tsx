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
        <div className="w-full bg-white">
            <div className="container mx-auto py-4 md:py-6 px-4 md:px-8 lg:px-0">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-0">
                    {/* Titolo */}
                    <div className="text-xl md:text-2xl font-semibold">
                        Seleziona Formule di Tutela &amp; Extra
                    </div>

                    {/* Right side */}
                    <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4 md:gap-8">
                        <div className="flex flex-col leading-tight">
                            <div className="text-[10px] md:text-xs tracking-wide text-gray-500 uppercase">
                                TOTALE
                            </div>
                            <div className="text-lg md:text-xl font-semibold">{formatPrice(totale)}</div>
                        </div>

                        <Button
                            type="button"
                            onClick={goToStep4}
                            className="h-10 md:h-12 px-6 md:px-10 rounded-br-sm rounded-tl-sm text-white"
                        >
                            Verifica e paga
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
