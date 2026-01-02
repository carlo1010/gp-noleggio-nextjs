import React, {useMemo, useState} from "react";
import {formatPrice} from "@/lib/formatPrice";
import {useCheckoutStore} from "@/store/checkout.store";


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
            <div className="bg-gray-50 px-6 py-5">
                <div className="text-lg font-semibold">{title}</div>
                {header}
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col flex-1">
                <ul className="space-y-3 flex-1">
                    {features.map((f, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-800">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-white">
                ✓
              </span>
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="mt-8 flex items-center justify-between">
                    <button
                        type="button"
                        className="text-sm font-semibold text-blue-700 hover:underline"
                        onClick={onMoreDetails}
                    >
                        Maggiori Dettagli
                    </button>

                    {isSelected ? (
                        <button
                            disabled
                            className="rounded-br-sm rounded-tl-sm bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 cursor-not-allowed"
                        >
                            Selezionato
                        </button>
                    ) : (
                        <button
                            onClick={onSelect}
                            className=" rounded-br-sm rounded-tl-sm bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                        >
                            Seleziona
                        </button>
                    )}
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
    const setPacchetto = useCheckoutStore(s => s.setPacchetto);


    // ✅ Dialog state
    const [open, setOpen] = useState(false);
    const [detailsKey, setDetailsKey] = useState<ProtectionKey>("basic");

    const select = (key: ProtectionKey) => {
        setPacchetto(key);
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
            <section className={"py-10"}>
                <div className="mb-10  text-xl font-semibold ">
                    Pacchetti Protection
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
                    {/* BASIC */}
                    <Card
                        title="Basic"
                        isSelected={selected === "basic"}
                        onSelect={() => select("basic")}
                        onMoreDetails={() => openDetails("basic")}
                        header={
                            <>
                                <div className="mt-2 text-sm text-gray-600">
                                    Importo massimo addebitabile per danni o furto: 1.800,00 €
                                </div>
                                <div className="mt-4 text-sm font-semibold">Incluso</div>
                            </>
                        }
                        features={["Protezione danni al veicolo", "Protezione furto e incendio"]}
                    />

                    {/* MEDIUM */}
                    <Card
                        title="Medium"
                        isSelected={selected === "medium"}
                        onSelect={() => select("medium")}
                        onMoreDetails={() => openDetails("medium")}
                        header={
                            <>
                                <div className="mt-2 text-sm text-gray-600">
                                    Importo massimo addebitabile per danni o furto: 600,00 €
                                </div>
                                <div className="mt-4">
                                    <div className="text-sm">
                                        <span className="font-semibold">{formatPrice(medium.day)}</span>{" "}
                                        / giorno
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        TOTALI {formatPrice(medium.total)}
                                    </div>
                                </div>
                            </>
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
                        header={
                            <>
                                <div className="mt-2 text-sm text-gray-600">
                                    Importo massimo addebitabile per danni o furto: 600,00 €
                                </div>
                                <div className="mt-4">
                                    <div className="text-sm">
                                        <span className="font-semibold">{formatPrice(premium.day)}</span>{" "}
                                        / giorno
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        TOTALI {formatPrice(premium.total)}
                                    </div>
                                </div>
                            </>
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
