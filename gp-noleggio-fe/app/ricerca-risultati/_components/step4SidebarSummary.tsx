"use client";

import Image from "next/image";
import { Info, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";
import { calcDays } from "@/lib/date";

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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

//Wrapper principale che include la card bianca + gli accordion sotto
export default function Step4SidebarSummary() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-3">
                Riepilogo
            </h2>

            <div className="space-y-4">
                <VeicoloAccordion />
                <ExtraAccordion />
            </div>

            <div className="bg-white border-2 border-primary/20 rounded-2xl p-6 shadow-xl shadow-primary/5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-black">Totale</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Da pagare al ritiro</p>
                    </div>
                    <p className="text-2xl font-black text-black">
                        {formatPrice(useCheckoutStore.getState().getTotale())}
                    </p>
                </div>
            </div>

            <div className="pt-4 space-y-2">
                <SimpleAccordion title="Deposito" />
                <SimpleAccordion title="Politica carburante" />
                <SimpleAccordion title="Politica di Modifica, Cancellazione e Rimborso" />
            </div>
        </div>
    );
}

function VeicoloAccordion() {
    const [open, setOpen] = useState(true);
    const veicolo = useCheckoutStore((s) => s.veicolo);
    const tariffa = useCheckoutStore((s) => s.tariffa);

    const protezioni = useCheckoutStore((s) => s.protezioni);
    const servizi = useCheckoutStore((s) => s.servizi);

    const ritiro = useCheckoutStore((s) => s.search.ritiro);
    const riconsegna = useCheckoutStore((s) => s.search.riconsegna);

    const giorni = calcDays(ritiro?.data, riconsegna?.data);
    const extraTotale = Object.values(servizi ?? {}).reduce((acc, item) => {
        const prezzo = Number(item.prezzo) || 0;
        const qta = Number(item.quantita) || 0;
        return acc + prezzo * qta * giorni;
    }, 0);

    // ===== FALLBACK SAFE (poi li mappiamo 1:1 quando mi dici com'è fatto veicolo)
    const brand = veicolo?.descrizioneAgenzia ?? "—";
    const nome = veicolo?.descrizioneClasse ?? "—";
    const img = veicolo?.urlImmagine ?? "/fiat-500.png";

    const cambio = "Manuale";
    const posti = 4;
    const porte = 3;
    const aria = true;
    const etaMin = 18;

    const prezzoVeicolo = Number(tariffa?.prezzoTotale ?? 0);

    const pacchettoLabel = protezioni?.selezionata?.nome ?? protezioni?.pacchetto ?? "—";
    const pacchettoPrezzo = protezioni?.prezzoTotale
        ? formatPrice(protezioni.prezzoTotale)
        : "Incluso";

    return (
        <div className={`overflow-hidden transition-all duration-300 border-2 rounded-2xl ${open ? "border-primary shadow-lg" : "border-gray-100"
            }`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 bg-white"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg transition-colors ${open ? "bg-primary text-white" : "bg-gray-50 text-gray-400"}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
                    </div>
                    <span className="font-bold text-black">Veicolo</span>
                </div>
                <span className="font-extrabold text-black">{formatPrice(prezzoVeicolo)}</span>
            </button>

            {open && (
                <div className="p-5 pt-0 bg-white border-t border-gray-50 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <h4 className="text-xl font-black text-black leading-tight">
                                {brand} - {nome}
                            </h4>
                            <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold text-gray-500 rounded-full uppercase tracking-wider">
                                O SIMILE
                            </span>
                        </div>
                        <div className="relative w-24 h-16">
                            <Image src={img} alt={nome} fill className="object-contain" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[11px] font-bold text-gray-400">
                        <SpecItem icon={<CambioIcon />} text={veicolo?.cambio ?? "Manuale"} />
                        <SpecItem icon={<PostiIcon />} text={`${veicolo?.posti ?? 4}`} />
                        <SpecItem icon={<AriaIcon />} text={veicolo?.ariaCondizionata ? "A/C" : "NO A/C"} />
                        <SpecItem icon={<PorteIcon />} text={`${veicolo?.porte ?? 5}`} />
                        <SpecItem icon={<PatenteIcon />} text={`${veicolo?.etaMin ?? 18}`} />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-50">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="text-xs font-black text-primary uppercase underline decoration-2 underline-offset-4 hover:text-blue-800 transition-colors">
                                    COSA È INCLUSO?
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Cosa è incluso?</DialogTitle>
                                    <DialogDescription>Dettaglio servizi compresi nel prezzo.</DialogDescription>
                                </DialogHeader>
                                <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-gray-600">
                                    <li>Chilometraggio illimitato</li>
                                    <li>Assicurazione RCA (Responsabilità Civile Auto)</li>
                                    <li>Assistenza stradale 24/7</li>
                                    <li>Oneri aeroportuali/ferroviari</li>
                                </ul>
                            </DialogContent>
                        </Dialog>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ritiro</p>
                                <p className="text-sm font-bold text-black leading-tight">{ritiro?.luogoLabel}</p>
                                <p className="text-xs font-medium text-gray-500">{ritiro?.data}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Riconsegna</p>
                                <p className="text-sm font-bold text-black leading-tight">{riconsegna?.luogoLabel}</p>
                                <p className="text-xs font-medium text-gray-500">{riconsegna?.data}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ExtraAccordion() {
    const [open, setOpen] = useState(false);
    const extra = useCheckoutStore((s) => s.extra);
    const protezioni = useCheckoutStore((s) => s.protezioni);

            {/* EXTRA */}
            <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Servizi Aggiunti</p>
                <p className="font-semibold text-sm">{formatPrice(extraTotale)}</p>
            </div>

            <div className="mt-3 space-y-2 text-[11px] text-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold capitalize">{pacchettoLabel}</p>
                        <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-gray-600">{pacchettoPrezzo}</p>
                </div>

                {Object.values(servizi ?? {})
                    .filter((item) => (item?.quantita ?? 0) > 0)
                    .map((item) => (
                        <div key={item.codice} className="flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                                <p className="font-semibold truncate">{item.titolo}</p>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span className="inline-flex">
                                            <Info className="w-4 h-4 text-gray-400" />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.descrizione || "Dettaglio servizio non disponibile."}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <p className="text-gray-600">
                                {formatPrice(item.prezzo * item.quantita * giorni)}
                            </p>
                        </div>
                    ))}
            </div>

            <p className="mt-2 text-[10px] text-gray-500">Per {giorni} giorni</p>

            <div className="my-4 h-px w-full bg-gray-200" />

            {open && (
                <div className="p-5 pt-0 bg-white border-t border-gray-50 space-y-4">
                    {protezioni.pacchetto && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-gray-600 capitalize">{protezioni.pacchetto}</span>
                            <span className="font-extrabold text-black">{protezioni.prezzoTotale ? formatPrice(protezioni.prezzoTotale) : "Incluso"}</span>
                        </div>
                    )}
                    {Object.values(extra).filter(e => e.quantita > 0).map((e, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <span className="font-bold text-gray-600">{e.titolo} x{e.quantita}</span>
                            <span className="font-extrabold text-black">{formatPrice(e.prezzo * e.quantita)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function SimpleAccordion({ title }: { title: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-gray-100">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full py-4 text-sm font-bold text-black hover:text-primary transition-colors text-left"
            >
                <span>{title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""} text-gray-400`} />
            </button>
            {open && (
                <div className="text-xs text-gray-500 pb-4 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
