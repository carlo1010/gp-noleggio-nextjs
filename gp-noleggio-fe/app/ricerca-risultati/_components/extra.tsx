import React, { useMemo, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { useCheckoutStore } from "@/store/checkout.store";
import { Button } from "@/components/ui/button";


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

type ProtectionKey = "basic" | "medium" | "premium";

type Price = {
    day: number;
    total: number;
};

type PacchettiProtectionProps = {
    medium: Price;
    premium: Price;
    onChange?: (key: ProtectionKey) => void;
};

function Card({
    title,
    isSelected,
    onSelect,
    subtitle,
    pricing,
    features,
    onMoreDetails,
}: {
    title: string;
    isSelected: boolean;
    onSelect: () => void;
    subtitle: string;
    pricing: React.ReactNode;
    features: string[];
    onMoreDetails: () => void;
}) {
    return (
        <div
            className={`rounded-2xl border-2 transition-all duration-300 flex flex-col h-full bg-white overflow-hidden ${isSelected
                ? "border-primary shadow-xl scale-[1.02] z-10"
                : "border-gray-100 hover:border-gray-200 shadow-sm"
                }`}
        >
            {/* Header */}
            <div className={`px-6 py-6 space-y-3 ${isSelected ? 'bg-primary/5' : ''}`}>
                <h3 className="text-2xl font-bold text-black">{title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-tight">
                    {subtitle}
                </p>
                <div className="pt-2">
                    {pricing}
                </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6 flex flex-col flex-1 space-y-6">
                <ul className="space-y-4 flex-1">
                    {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 mt-0.5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                                </svg>
                            </span>
                            <span className="text-sm font-semibold text-gray-700 leading-snug">{f}</span>
                        </li>
                    ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        className="text-sm font-bold text-primary hover:underline"
                        onClick={onMoreDetails}
                    >
                        Maggiori Dettagli
                    </button>

                    <Button
                        onClick={onSelect}
                        disabled={isSelected}
                        className={`h-10 px-6 font-bold text-sm transition-all ${isSelected
                            ? "bg-gray-200 text-gray-500 cursor-default hover:bg-gray-200"
                            : "bg-primary text-white shadow-md hover:shadow-lg"
                            }`}
                    >
                        {isSelected ? "Selezionato" : "Seleziona"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function PacchettiProtection({
    medium,
    premium,
    onChange,
}: PacchettiProtectionProps) {
    // ✅ Basic selezionato di default
    const selected = useCheckoutStore(s => s.protezioni.pacchetto);
    const setPacchettoConPrezzo = useCheckoutStore(s => s.setPacchettoConPrezzo);


    // ✅ Dialog state
    const [open, setOpen] = useState(false);
    const [detailsKey, setDetailsKey] = useState<ProtectionKey>("basic");

    const select = (key: ProtectionKey) => {
        if (key === "basic") {
            setPacchettoConPrezzo("basic", 0, 0);
        }

        if (key === "medium") {
            setPacchettoConPrezzo("medium", medium.day, medium.total);
        }

        if (key === "premium") {
            setPacchettoConPrezzo("premium", premium.day, premium.total);
        }

        onChange?.(key);

        console.log("[PacchettiProtection] selected:", key);
        console.log("[PacchettiProtection] store:", useCheckoutStore.getState().protezioni);
    };


    const openDetails = (key: ProtectionKey) => {
        setDetailsKey(key);
        setOpen(true);
    };

    // contenuti fissi del dialog (puoi riscriverli come vuoi)
    const details = useMemo(() => {
        const base = {
            basic: {
                title: "Dettagli Basic",
                desc: "Copertura essenziale inclusa nel noleggio.",
                items: [
                    "Danni al veicolo",
                    "Furto e incendio",
                    "Massimale addebitabile: 1.800,00 €",
                ],
            },
            medium: {
                title: "Dettagli Medium",
                desc: "Copertura intermedia con più protezioni.",
                items: [
                    "Danni al veicolo",
                    "Furto e incendio",
                    "Parabrezza, fari e pneumatici",
                    "Infortuni conducente e trasportati",
                    "Massimale addebitabile: 600,00 €",
                ],
            },
            premium: {
                title: "Dettagli Premium",
                desc: "Copertura completa con bagaglio ed effetti personali.",
                items: [
                    "Danni al veicolo",
                    "Furto e incendio",
                    "Parabrezza, fari e pneumatici",
                    "Infortuni conducente e trasportati",
                    "Bagaglio ed effetti personali",
                    "Massimale addebitabile: 600,00 €",
                ],
            },
        } as const;

        return base[detailsKey];
    }, [detailsKey]);

    return (
        <>
            <section className={"py-6 md:py-10"}>
                <h2 className="mb-8 text-xl md:text-2xl font-bold text-black border-b border-gray-100 pb-4">
                    Pacchetti Protection
                </h2>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
                    {/* BASIC */}
                    <Card
                        title="Basic"
                        isSelected={selected === "basic"}
                        onSelect={() => select("basic")}
                        onMoreDetails={() => openDetails("basic")}
                        subtitle="Importo massimo addebitabile per danni o furto: 1.800,00 €"
                        pricing={
                            <div className="text-sm font-bold text-gray-900 bg-gray-100 w-max px-3 py-1 rounded-full">
                                Incluso
                            </div>
                        }
                        features={["Protezione danni al veicolo", "Protezione furto e incendio"]}
                    />

                    {/* MEDIUM */}
                    <Card
                        title="Medium"
                        isSelected={selected === "medium"}
                        onSelect={() => select("medium")}
                        onMoreDetails={() => openDetails("medium")}
                        subtitle="Importo massimo addebitabile per danni o furto: 600,00 €"
                        pricing={
                            <div className="space-y-0.5">
                                <div className="text-sm text-black">
                                    <span className="font-extrabold text-lg">{formatPrice(medium.day)}</span>{" "}
                                    / giorno
                                </div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                    TOTALI {formatPrice(medium.total)}
                                </div>
                            </div>
                        }
                        features={[
                            "Protezione danni al veicolo",
                            "Protezione furto e incendio",
                            "Protezione parabrezza, fari e pneumatici",
                            "Assicurazione infortuni conducente e trasportati",
                        ]}
                    />

                    {/* PREMIUM */}
                    <Card
                        title="Premium"
                        isSelected={selected === "premium"}
                        onSelect={() => select("premium")}
                        onMoreDetails={() => openDetails("premium")}
                        subtitle="Importo massimo addebitabile per danni o furto: 600,00 €"
                        pricing={
                            <div className="space-y-0.5">
                                <div className="text-sm text-black">
                                    <span className="font-extrabold text-lg">{formatPrice(premium.day)}</span>{" "}
                                    / giorno
                                </div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                    TOTALI {formatPrice(premium.total)}
                                </div>
                            </div>
                        }
                        features={[
                            "Protezione danni al veicolo",
                            "Protezione furto e incendio",
                            "Protezione parabrezza, fari e pneumatici",
                            "Assicurazione infortuni conducente e trasportati",
                            "Assicurazione bagaglio ed effetti personali",
                        ]}
                    />
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
                        {detailsKey === "medium" && (
                            <div className="text-sm text-gray-700">
                                Prezzo: <b>{formatPrice(medium.day)}</b> / giorno — Totale:{" "}
                                <b>{formatPrice(medium.total)}</b>
                            </div>
                        )}
                        {detailsKey === "premium" && (
                            <div className="text-sm text-gray-700">
                                Prezzo: <b>{formatPrice(premium.day)}</b> / giorno — Totale:{" "}
                                <b>{formatPrice(premium.total)}</b>
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
