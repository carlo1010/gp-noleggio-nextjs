"use client";

import Image from "next/image";
import { Info, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";

import CambioIcon from "@/components/svg/cambioIcon";
import PostiIcon from "@/components/svg/postiIcon";
import { PatenteIcon } from "@/components/svg/patenteicon";
import PorteIcon from "@/components/svg/porteicon";
import AriaIcon from "@/components/svg/ariaicon";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

//Wrapper principale che include la card bianca + gli accordion sotto
export default function Step4SidebarSummary() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <SummaryCard />
            <div className="flex flex-col gap-2">
                <SimpleAccordion title="Deposito" />
                <SimpleDivider />
                <SimpleAccordion title="Politica carburante" />
                <SimpleDivider />
                <SimpleAccordion title="Politica di Modifica, Cancellazione e Rimborso" />
            </div>
        </div>
    );
}

function SimpleDivider() {
    return <div className="" />;
}


function SummaryCard() {
    const totale = useCheckoutStore((s) => s.getTotale());

    const veicolo = useCheckoutStore((s) => s.veicolo);
    const tariffa = useCheckoutStore((s) => s.tariffa);

    const protezioni = useCheckoutStore((s) => s.protezioni);
    const extra = useCheckoutStore((s) => s.extra);

    const ritiro = useCheckoutStore((s) => s.search.ritiro);
    const riconsegna = useCheckoutStore((s) => s.search.riconsegna);

    const extraTotale = Object.values(extra ?? {}).reduce((acc, item) => {
        const prezzo = Number(item.prezzo) || 0;
        const qta = Number(item.quantita) || 0;
        return acc + prezzo * qta;
    }, 0);

    // ===== FALLBACK SAFE (poi li mappiamo 1:1 quando mi dici com'è fatto veicolo)
    const brand = veicolo?.marca ?? veicolo?.brand ?? "—";
    const nome = veicolo?.nome ?? "—";
    const img = veicolo?.imageUrl ?? veicolo?.img ?? "/fiat-500.png";

    const cambio = veicolo?.cambio ?? "Manuale";
    const posti = veicolo?.posti ?? 4;
    const porte = veicolo?.porte ?? 3;
    const aria = veicolo?.ariaCondizionata ?? true;
    const etaMin = veicolo?.etaMin ?? 18;

    const giorni = calcGiorni(ritiro?.data, riconsegna?.data);

    const prezzoVeicolo = Number(tariffa?.prezzoTotale ?? 0);

    const pacchettoLabel = protezioni?.pacchetto ?? "basic";
    const pacchettoPrezzo = protezioni?.prezzoTotale
        ? formatPrice(protezioni.prezzoTotale)
        : "Incluso";

    return (
        <div className="bg-white border rounded-br-2xl rounded-tl-2xl  p-4 shadow-sm">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Veicolo</p>
                <p className="font-semibold text-sm">{formatPrice(prezzoVeicolo)}</p>
            </div>

            {/* NOME + IMMAGINE */}
            <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase text-gray-700">
                        {brand}
                    </p>
                    <p className="font-bold text-sm truncate">{nome}</p>

                    <span className="inline-flex items-center mt-2 text-[10px] uppercase bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        O SIMILE
                    </span>
                </div>

                <div className="relative w-20 h-14 shrink-0">
                    <Image
                        src={img}
                        alt={nome}
                        fill
                        sizes="80px"
                        className="object-contain"
                    />
                </div>
            </div>

            {/* ICONE SPECIFICHE */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-700">
                <SpecItem icon={<CambioIcon />} text={cambio} />
                <SpecItem icon={<PostiIcon />} text={String(posti)} />
                <SpecItem icon={<PorteIcon />} text={String(porte)} />
                <SpecItem icon={<AriaIcon />} text={aria ? "A/C" : "No A/C"} />
                <SpecItem icon={<PatenteIcon />} text={String(etaMin)} />
            </div>

            {/* Tariffa base */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-gray-700">
                <p>Tariffa base per {giorni} giorni</p>

                <div className="text-right">
                    <p className="text-[10px] text-gray-500">Incluso</p>
                    <p className="font-semibold text-gray-900">{formatPrice(prezzoVeicolo)}</p>
                </div>
            </div>

            <div className="my-4 h-px w-full bg-gray-200" />

            {/* COSA E' INCLUSO */}
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <p className="text-xs font-bold text-primary uppercase underline decoration-dotted underline-offset-2">
                            COSA È INCLUSO?
                        </p>
                        <Info className="w-4 h-4 text-primary" />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cosa è incluso?</DialogTitle>
                        <DialogDescription>
                            Dettaglio dei servizi inclusi nel noleggio.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Placeholder content */}
                    <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700 mt-2">
                        <li>Ritiro e consegna fuori orario (se applicabile)</li>
                        <li>Chilometraggio illimitato</li>
                        <li>Assicurazione base (RCA)</li>
                        <li>Assistenza stradale 24/7</li>
                    </ul>
                </DialogContent>
            </Dialog>

            <div className="mt-3 space-y-3 text-[11px]">
                <div>
                    <p className="font-semibold">Ritiro</p>
                    <p className="text-gray-700">{ritiro?.luogoLabel ?? "—"}</p>
                    <p className="text-gray-500">{ritiro?.data ?? "—"}</p>
                </div>

                <div>
                    <p className="font-semibold">Riconsegna</p>
                    <p className="text-gray-700">{riconsegna?.luogoLabel ?? "—"}</p>
                    <p className="text-gray-500">{riconsegna?.data ?? "—"}</p>
                </div>
            </div>

            <div className="my-4 h-px w-full bg-gray-200" />

            {/* EXTRA */}
            <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Extra</p>
                <p className="font-semibold text-sm">{formatPrice(extraTotale)}</p>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-gray-700">
                <div className="flex items-center gap-2">
                    <p className="font-semibold capitalize">{pacchettoLabel}</p>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-600">{pacchettoPrezzo}</p>
            </div>

            <p className="mt-2 text-[10px] text-gray-500">Per {giorni} giorni</p>

            <div className="my-4 h-px w-full bg-gray-200" />

            {/* TOTALE */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="font-bold text-sm">Totale</p>
                    <p className="text-[10px] text-gray-500">Da pagare al ritiro</p>
                </div>
                <p className="font-bold text-lg">{formatPrice(totale)}</p>
            </div>
        </div>
    );
}

function SimpleAccordion({ title }: { title: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-start justify-between w-full py-2 text-xs font-bold text-gray-900 hover:text-[#0700DE] transition-colors text-left group"
            >
                <span className="flex-1 pr-2 break-words">{title}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""} mt-0.5 text-gray-500 group-hover:text-[#0700DE]`} />
            </button>
            {open && (
                <div className="text-[11px] text-gray-600 pb-2 break-words">
                    <p>Contenuto di esempio per {title}...</p>
                </div>
            )}
        </div>
    );
}

/** mini componente per allineare icona + testo come in Figma */
function SpecItem({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center text-gray-600">
                {icon}
            </span>
            <span>{text}</span>
        </div>
    );
}

/** calcolo giorni (robusto per YYYY-MM-DD e DD/MM/YYYY) */
function calcGiorni(dataInizio?: string, dataFine?: string) {
    if (!dataInizio || !dataFine) return 1;

    const start = parseDate(dataInizio);
    const end = parseDate(dataFine);
    if (!start || !end) return 1;

    const ms = end.getTime() - start.getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
}

function parseDate(s: string) {
    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [y, m, d] = s.split("-").map(Number);
        return new Date(y, m - 1, d);
    }

    // DD/MM/YYYY o DD-MM-YYYY
    if (/^\d{2}[\/-]\d{2}[\/-]\d{4}$/.test(s)) {
        const [d, m, y] = s.split(/[\/-]/).map(Number);
        return new Date(y, m - 1, d);
    }

    return null;
}
