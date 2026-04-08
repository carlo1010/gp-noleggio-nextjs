"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";

import MartelloIcon from "@/components/svg/martello";
import FuocoIcon from "@/components/svg/fuoco";
import CamioncinoRifiuti from "@/components/svg/camioncinoRifiuti";

import { formatPrice } from "@/lib/formatPrice";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useCheckoutStore } from "@/store/checkout.store";
import type { Servizi } from "@/types/servizi";
import { calcDays } from "@/lib/date";
import { parsePrice } from "@/lib/price";

export function TuteleDisponibili({
    servizi,
    title = "Formule di Tutela disponibili",
}: Readonly<{
    servizi: Servizi[];
    title?: string;
}>) {
    const serviziSelezionati = useCheckoutStore((s) => s.servizi);
    const toggleServizio = useCheckoutStore((s) => s.toggleServizio);
    const ritiro = useCheckoutStore((s) => s.search.ritiro);
    const riconsegna = useCheckoutStore((s) => s.search.riconsegna);

    const giorni = useMemo(
        () => calcDays(ritiro?.data, ritiro?.ora, riconsegna?.data, riconsegna?.ora),
        [ritiro?.data, ritiro?.ora, riconsegna?.data, riconsegna?.ora]
    );
    const icons = [<MartelloIcon key="martello" />, <FuocoIcon key="fuoco" />, <CamioncinoRifiuti key="camion" />];

    return (
        <div className="w-full">
            <div className="text-lg font-semibold mb-6 text-left">{title}</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servizi.map((servizio, index) => {
                    const codice = servizio.codiceServizio;
                    const nome = servizio.descrizioneServizio;
                    const prezzo = parsePrice(servizio.importoServizio);

                    const qty = serviziSelezionati[codice]?.quantita ?? 0;
                    const isSelected = qty > 0;
                    const prezzoTotale = prezzo * giorni;

                    return (
                        <div
                            key={codice}
                            className={[
                                "rounded-br-xl rounded-tl-xl bg-[#F7F7F7] shadow-sm",
                                "p-7 min-h-[230px]",
                                "flex flex-col",
                                isSelected ? "border-2 border-primary bg-white" : "border border-gray-200",
                            ].join(" ")}
                        >
                            {/* Titolo (solo nome, non id) */}
                            <div
                                className="flex gap-x-3 items-start text-left text-gray-900 text-lg font-bold leading-snug">
                                <div className="shrink-0">{icons[index % icons.length]}</div>
                                <div>{nome}</div>
                            </div>

                            {/* Dialog */}
                            <div className="mt-3">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="px-0 underline">
                                            Scopri di più
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[520px]">
                                        <DialogHeader>
                                            <DialogTitle>{nome}</DialogTitle>
                                            <DialogDescription>
                                                {servizio.noteServizio || "Dettaglio tutela disponibile."}
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Prezzo */}
                            <div className="mt-4 text-sm font-semibold text-gray-900">
                                {formatPrice(prezzoTotale)}{" "}
                                <span className="text-gray-600 font-normal">/ totali</span>
                            </div>

                            {/* CTA */}
                            <div className="mt-auto pt-6 flex justify-center">
                                <Button
                                    type="button"
                                    className="h-10 w-[130px]"
                                    variant={isSelected ? "secondary" : "default"}
                                    onClick={() => {
                                        toggleServizio(
                                            codice,
                                            nome,
                                            prezzo,
                                            servizio.flagQtaServizio as 0 | 1,
                                            servizio.noteServizio
                                        );

                                        console.log("[TUTELA][TOGGLE]", {
                                            id: codice,
                                            nome,
                                            prezzo,
                                            nextQty: isSelected ? 0 : 1,
                                        });
                                    }}
                                >
                                    {isSelected ? "Rimuovi" : "Aggiungi"}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
