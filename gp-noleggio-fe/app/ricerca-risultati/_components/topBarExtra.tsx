import React from "react";
import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/formatPrice";

type CheckoutTopBarProps = {
    totale: number | string;
};

export default function CheckoutTopBar({totale}: CheckoutTopBarProps) {
    return (
        <div className="w-full bg-white">
            <div className="container mx-auto  py-14">
                <div className="flex items-center justify-between">
                    {/* Titolo */}
                    <div className="text-2xl font-semibold">
                        Seleziona Formule di Tutela &amp; Extra
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col leading-tight">
                            <div className="text-xs tracking-wide text-gray-500 uppercase">
                                TOTALE
                            </div>
                            <div className="text-xl font-semibold">
                                {formatPrice(totale)}
                            </div>
                        </div>

                        <Button
                            className="h-12 px-10 rounded-br-sm rounded-tl-sm bg-blue-700 hover:bg-blue-800 text-white">
                            Verifica e paga
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
