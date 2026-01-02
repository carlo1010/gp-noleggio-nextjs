"use client";

import React from "react";
import {Button} from "@/components/ui/button";

import MartelloIcon from "@/components/svg/martello";
import FuocoIcon from "@/components/svg/fuoco"; // <-- se è FuocoIcon ok, lascia il tuo import
import CamioncinoRifiuti from "@/components/svg/camioncinoRifiuti";

import {formatPrice} from "@/lib/formatPrice";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {useCheckoutStore} from "@/store/checkout.store";

export type TutelaKey = "danni" | "furto" | "assistenza";
export type TutelePrezzi = Record<TutelaKey, number>;

type TutelaItem = {
    key: TutelaKey;         // ✅ id interno
    title: string;          // ✅ nome visibile
    icon: React.ReactNode;
};

const tutele: TutelaItem[] = [
    {
        key: "danni",
        title: "Esclusione di responsabilità per danni al veicolo",
        icon: <MartelloIcon/>,
    },
    {
        key: "furto",
        title: "Esclusione di responsabilità per furto e incendio",
        icon: <FuocoIcon/>,
    },
    {
        key: "assistenza",
        title: "Assistenza stradale estesa",
        icon: <CamioncinoRifiuti/>,
    },
];

export function TuteleDisponibili({
                                      prezzi,
                                      title = "Formule di Tutela disponibili",
                                  }: {
    prezzi: TutelePrezzi;
    title?: string;
}) {
    // ✅ selezione dallo store (stessa struttura degli extra)
    const extra = useCheckoutStore((s) => s.extra);

    // ✅ toggle nello store (come per extra)
    const toggleExtra = useCheckoutStore((s) => s.toggleExtra);

    return (
        <div className="w-full">
            <div className="text-lg font-semibold mb-6 text-left">{title}</div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {tutele.map((t) => {
                    const codice = t.key;              // ✅ id interno (non stampato)
                    const nome = t.title;              // ✅ visibile
                    const prezzo = prezzi[codice] ?? 0;

                    const qty = extra[codice]?.quantita ?? 0; // ✅ nello store: chiave = id
                    const isSelected = qty > 0;

                    return (
                        <div
                            key={codice}
                            className={[
                                "rounded-br-xl rounded-tl-xl bg-[#F7F7F7] shadow-sm",
                                "p-7 min-h-[230px]",
                                "flex flex-col",
                                isSelected ? "border-2 border-primary" : "border border-gray-200",
                            ].join(" ")}
                        >
                            {/* Titolo (solo nome, non id) */}
                            <div
                                className="flex gap-x-3 items-start text-left text-gray-900 text-lg font-bold leading-snug">
                                <div className="shrink-0">{t.icon}</div>
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
                                                Qui mettiamo la descrizione corretta della tutela.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Prezzo */}
                            <div className="mt-4 text-sm font-semibold text-gray-900">
                                {formatPrice(prezzo)}{" "}
                                <span className="text-gray-600 font-normal">/ totali</span>
                            </div>

                            {/* CTA */}
                            <div className="mt-auto pt-6 flex justify-center">
                                <Button
                                    type="button"
                                    className="h-10 w-[130px]"
                                    variant={isSelected ? "secondary" : "default"}
                                    onClick={() => {
                                        // ✅ salvi nello store: {titolo:nome, prezzo, quantita(0/1)}
                                        toggleExtra(codice, nome, prezzo);

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
