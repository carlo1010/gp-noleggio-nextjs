"use client";

import React from "react";
import { Button } from "@/components/ui/button";

// ✅ usa i tuoi svg (quelli verdi)
import MartelloIcon from "@/components/svg/martello";
import FuocoIcon from "@/components/svg/fuoco";
import CamioncinoRifiuti from "@/components/svg/camioncinoRifiuti";
import {formatPrice} from "@/lib/formatPrice";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export type TutelaKey = "danni" | "furto" | "assistenza";

type TutelaItem = {
    key: TutelaKey;
    title: string;
    icon: React.ReactNode;
};

export type TutelePrezzi = Record<TutelaKey, number>;

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
        icon: <CamioncinoRifiuti/>,
    },
];



export function TuteleDisponibili({
                                      selected,
                                      prezzi,
                                      onToggle,
                                      onInfo,
                                      title = "Formule di Tutela disponibili",
                                  }: {
    selected: TutelaKey | null; // una selezione; se vuoi multi, lo faccio a Set
    prezzi: TutelePrezzi; // ✅
    onToggle: (key: TutelaKey) => void;
    onInfo?: (key: TutelaKey) => void;
    title?: string;
}) {
    return (
        <div className="flex justify-center">
            <div className="w-full  ">
                <div className="text-center font-semibold mb-6">{title}</div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
                    {tutele.map((t) => {
                        const isSelected = selected === t.key;

                        return (
                            <div
                                key={t.key}
                                className={[
                                    "rounded-br-xl rounded-tl-xl bg-[#F7F7F7] shadow-sm",
                                    "p-7 min-h-[230px]",
                                    "flex flex-col items-center text-center",
                                    isSelected ? "border-2 border-primary" : "border border-gray-200",
                                ].join(" ")}
                            >
                                {/* ICON */}
                                <div className=" flex  gap-x-2 items-center justify-start text-left text-gray-900  text-lg font-bold leading-snug max-w-[400px]">
                                    {t.icon}
                                    {t.title}
                                </div>

                                {/* LINK */}
                                <Dialog>

                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className={"underline"}>Scopri di più</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save when you&apos;re
                                                    done.
                                                </DialogDescription>
                                            </DialogHeader>


                                        </DialogContent>

                                </Dialog>

                                {/* PREZZO (props) */}
                                <div className="mt-4 text-sm font-semibold text-gray-900">
                                    {formatPrice(prezzi[t.key])}{" "}
                                    <span className="text-gray-600 font-normal">/ totali</span>
                                </div>

                                {/* CTA */}
                                <div className="mt-auto pt-5 w-full flex justify-center">
                                    {isSelected ? (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            disabled
                                            className="h-10 w-[130px]"
                                        >
                                            Aggiunto
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            className="h-10 w-[130px]"
                                            onClick={() => onToggle(t.key)}
                                        >
                                            Aggiungi
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

