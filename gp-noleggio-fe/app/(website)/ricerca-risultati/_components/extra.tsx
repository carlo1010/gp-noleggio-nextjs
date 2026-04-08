import React, { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { useCheckoutStore } from "@/store/checkout.store";
import { calcDays } from "@/lib/date";


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ProtectionKey = string;

export type ProtectionOption = {
    key: ProtectionKey;
    nome: string;
    descrizione?: string;
    note?: string;
    importo: number;
    franchigiaFurto?: string;
    franchigiaDanno?: string;
};

type PacchettiProtectionProps = {
    options: ProtectionOption[];
    onChange?: (option: ProtectionOption) => void;
};

function Card({
    title,
    isSelected,
    onSelect,
    header,
    features,
    onMoreDetails,
}: {
    title: string;
    isSelected: boolean;
    onSelect: () => void;
    header: React.ReactNode;
    features: string[];
    onMoreDetails: () => void;
}) {
    return (
        <div
            className={[
                "rounded-br-xl rounded-tl-xl border bg-white shadow-sm overflow-hidden flex flex-col h-full",
                isSelected ? "border-blue-600 ring-1 ring-blue-600" : "border-gray-200",
            ].join(" ")}
        >
            {/* Header */}
            <div className="bg-[#F6F6FF] px-6 py-5">
                <div className="text-lg font-semibold">{title}</div>
                {header}
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col flex-1">
                <ul className="space-y-3 flex-1">
                    {features.map((f, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-800">
                            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                                ✓
                            </span>
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="mt-8 flex items-center justify-between">
                    <Button
                        variant="link"
                        className="text-sm font-semibold  hover:underline"
                        onClick={onMoreDetails}
                    >
                        Maggiori Dettagli
                    </Button>

                    {isSelected ? (
                        <Button
                            disabled
                            variant={"secondary"}
                        >
                            Selezionato
                        </Button>
                    ) : (
                        <Button
                            onClick={onSelect}
                            variant={"default"}
                            className=""
                        >
                            Seleziona
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PacchettiProtection({
    options,
    onChange,
}: PacchettiProtectionProps) {
    // ✅ Basic selezionato di default
    const selected = useCheckoutStore(s => s.protezioni.pacchetto);
    const setPacchettoConPrezzo = useCheckoutStore(s => s.setPacchettoConPrezzo);
    const ritiro = useCheckoutStore((s) => s.search.ritiro);
    const riconsegna = useCheckoutStore((s) => s.search.riconsegna);

    const giorni = useMemo(
        () => calcDays(ritiro?.data, ritiro?.ora, riconsegna?.data, riconsegna?.ora),
        [ritiro?.data, ritiro?.ora, riconsegna?.data, riconsegna?.ora]
    );


    // ✅ Dialog state
    const [open, setOpen] = useState(false);
    const [detailsKey, setDetailsKey] = useState<ProtectionKey>("");

    const activeDetailsKey = detailsKey || (options.length > 0 ? options[0].key : "");

    const select = (key: ProtectionKey) => {
        const option = options.find((o) => o.key === key);
        const prezzoGiorno = option?.importo ?? 0;

        const selezionata = option ? toSelezionata(option) : undefined;

        setPacchettoConPrezzo(key, prezzoGiorno, selezionata);
        if (option) onChange?.(option);

        console.log("[PacchettiProtection] selected:", key);
        console.log("[PacchettiProtection] store:", useCheckoutStore.getState().protezioni);
    };


    const openDetails = (key: ProtectionKey) => {
        setDetailsKey(key);
        setOpen(true);
    };

    // contenuti fissi del dialog (puoi riscriverli come vuoi)
    const details = useMemo(() => {
        const option = options.find((o) => o.key === activeDetailsKey);
        const items = parseItems(option?.note);

        if (option) {
            return {
                title: option.nome,
                desc: option.descrizione ?? "Dettagli pacchetto disponibili.",
                items,
                price: option.importo,
            };
        }

        return {
            title: "Dettagli pacchetto",
            desc: "Dettagli pacchetto disponibili.",
            items: [],
            price: 0,
        };
    }, [activeDetailsKey, options]);

    useEffect(() => {
        if (!options.length) return;
        if (selected) return;
        const first = options[0];
        setPacchettoConPrezzo(first.key, first.importo ?? 0, toSelezionata(first));
    }, [options, selected, setPacchettoConPrezzo]);

    return (
        <>
            <section className={"py-6 md:py-10"}>
                <div className="mb-10  text-xl font-semibold ">
                    Pacchetti Protection
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {options.map((option) => {
                        const features = parseItems(option.note);
                        const prezzoTotale = option.importo * giorni;
                        const franchigia = option.franchigiaDanno || option.franchigiaFurto;
                        const header = (
                            <>
                                <div className="mt-2 text-sm text-gray-600">
                                    Importo massimo addebitabile per danni o furto:{" "}
                                    {franchigia ? formatPrice(franchigia) : "—"}
                                </div>
                                <div className="mt-4">
                                    {option.importo === 0 ? (
                                        <div className="text-sm font-semibold">Incluso</div>
                                    ) : (
                                        <>
                                            <div className="text-sm">
                                                <span className="font-semibold">{formatPrice(option.importo)}</span>{" "}
                                                / giorno
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                TOTALI {formatPrice(prezzoTotale)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        );

                        return (
                            <Card
                                key={option.key}
                                title={option.nome}
                                isSelected={selected === option.key}
                                onSelect={() => select(option.key)}
                                onMoreDetails={() => openDetails(option.key)}
                                header={header}
                                features={features.length > 0 ? features : fallbackFeatures()}
                            />
                        );
                    })}
                </div>
            </section>

            {/* ✅ DIALOG */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[560px]">
                    <DialogHeader>
                        <DialogTitle>{details.title}</DialogTitle>
                        <DialogDescription>{details.desc}</DialogDescription>
                    </DialogHeader>

                    <div className="mt-3 space-y-2">
                        {details.price > 0 && (
                            <div className="text-sm text-gray-700">
                                Prezzo: <b>{formatPrice(details.price)}</b> / giorno — Totale:{" "}
                                <b>{formatPrice(details.price * giorni)}</b>
                            </div>
                        )}

                        <ul className="mt-3 space-y-2 text-sm">
                            {details.items.map((x, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="mt-0.5">•</span>
                                    <span>{x}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

function parseItems(note?: string) {
    if (!note) return [];
    return note
        .split(/[;\n]/)
        .map((x) => x.trim())
        .filter(Boolean);
}

function fallbackFeatures() {
    return ["Protezione danni al veicolo", "Protezione furto e incendio"];
}

function toSelezionata(option: ProtectionOption) {
    return {
        nome: option.nome,
        descrizione: option.descrizione ?? "",
        importo: option.importo,
        franchigiaFurto: option.franchigiaFurto ?? "",
        franchigiaDanno: option.franchigiaDanno ?? "",
        note: option.note ?? "",
    };
}
