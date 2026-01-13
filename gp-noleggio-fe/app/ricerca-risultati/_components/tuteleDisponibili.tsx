"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import MartelloIcon from "@/components/svg/martello";
import FuocoIcon from "@/components/svg/fuoco"; // <-- se è FuocoIcon ok, lascia il tuo import
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
        icon: <MartelloIcon />,
    },
    {
        key: "furto",
        title: "Esclusione di responsabilità per furto e incendio",
        icon: <FuocoIcon />,
    },
    {
        key: "assistenza",
        title: "Assistenza stradale estesa",
        icon: <CamioncinoRifiuti />,
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
        <div className="w-full space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-black border-b border-gray-100 pb-4">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutele.map((t) => {
                    const codice = t.key;
                    const nome = t.title;
                    const prezzo = prezzi[codice] ?? 0;
                    const qty = extra[codice]?.quantita ?? 0;
                    const isSelected = qty > 0;

                    return (
                        <div
                            key={codice}
                            className={`rounded-2xl bg-gray-50/50 p-6 flex flex-col min-h-[220px] transition-all duration-300 border-2 ${isSelected ? "border-primary bg-white shadow-lg" : "border-transparent"
                                }`}
                        >
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 shrink-0">
                                    {t.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-black leading-tight">
                                        {nome}
                                    </h3>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="text-xs font-bold text-gray-400 underline hover:text-primary transition-colors">
                                                Scopri di più
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[520px]">
                                            <DialogHeader>
                                                <DialogTitle>{nome}</DialogTitle>
                                                <DialogDescription>
                                                    Informazioni dettagliate sulla tutela selezionata.
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 flex items-end justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xl font-extrabold text-black">
                                        {formatPrice(prezzo)}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">/ totali</span>
                                </div>

                                <Button
                                    type="button"
                                    className={`h-11 px-8 font-bold text-sm transition-all ${isSelected
                                            ? "bg-gray-200 text-gray-500 hover:bg-gray-200"
                                            : "bg-primary text-white shadow-md hover:shadow-lg"
                                        }`}
                                    onClick={() => toggleExtra(codice, nome, prezzo)}
                                >
                                    {isSelected ? "Aggiunto" : "Aggiungi"}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
