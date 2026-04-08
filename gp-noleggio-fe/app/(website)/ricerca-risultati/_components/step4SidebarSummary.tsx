"use client";

import Image from "next/image";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
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

export default function Step4SidebarSummary() {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Header Riepilogo (visibile solo mobile? no sempre utile) */}
            <div className="font-bold text-xl text-gray-900 lg:hidden">
                Riepilogo
            </div>

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
    // STATE
    const [openVeicolo, setOpenVeicolo] = useState(true);
    const [openExtra, setOpenExtra] = useState(false);

    // STORE
    const totale = useCheckoutStore((s) => s.getTotale());
    const veicolo = useCheckoutStore((s) => s.veicolo);
    const tariffa = useCheckoutStore((s) => s.tariffa);
    const protezioni = useCheckoutStore((s) => s.protezioni);
    const servizi = useCheckoutStore((s) => s.servizi);
    const ritiro = useCheckoutStore((s) => s.search.ritiro);
    const riconsegna = useCheckoutStore((s) => s.search.riconsegna);

    // CALCULATIONS
    const giorni = calcDays(ritiro?.data, ritiro?.ora, riconsegna?.data, riconsegna?.ora);
    const extraTotale = Object.values(servizi ?? {}).reduce((acc, item) => {
        const prezzo = Number(item.prezzo) || 0;
        const qta = Number(item.quantita) || 0;
        return acc + prezzo * qta * giorni;
    }, 0);

    // Protection price
    const pacchettoPrezzo = protezioni?.prezzoTotale ?? 0;

    // Total Extras (Services + Protection)
    const totalExtraBlock = extraTotale + pacchettoPrezzo;


    // VEICOLO DATA
    const brand = veicolo?.descrizioneAgenzia ?? "—";
    const nome = veicolo?.descrizioneClasse ?? "—";
    const { src: img, unoptimized } = normalizeVehicleImageSrc(veicolo?.urlImmagine);
    const prezzoVeicolo = Number(tariffa?.prezzoTotale ?? 0);

    // SPECS
    const cambio = veicolo?.cambio ?? "—";
    const posti = veicolo?.posti;
    const porte = veicolo?.porte;
    const aria = veicolo?.ariaCondizionata;
    const etaMin = veicolo?.etaMin;

    // EXTRAS LIST
    const pacchettoLabel = protezioni?.selezionata?.nome ?? protezioni?.pacchetto ?? "Basic";

    const activeExtras = Object.values(servizi ?? {}).filter((item) => (item?.quantita ?? 0) > 0);

    return (
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">

            {/* --- SEZIONE VEICOLO --- */}
            <div className="border-b last:border-b-0">
                <button
                    onClick={() => setOpenVeicolo(!openVeicolo)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded border transition-colors ${openVeicolo ? 'border-[#0700DE] bg-white' : 'border-[#0700DE] bg-white'}`}>
                            {/* Icona custom: Blu quadrotto se aperto? Dallo screen sembra un'icona blu con freccia bianca o viceversa */}
                            {openVeicolo ? (
                                <ChevronUp className="w-5 h-5 text-[#0700DE]" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-[#0700DE]" />
                            )}
                        </div>
                        <span className="font-bold text-lg text-gray-900">Veicolo</span>
                    </div>
                    <span className="font-bold text-lg text-gray-900">{formatPrice(prezzoVeicolo)}</span>
                </button>

                {openVeicolo && (
                    <div className="px-4 pb-6 pt-0">
                        {/* NOME + IMMAGINE */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="mt-2 text-left">
                                <p className="font-bold text-base uppercase mb-2">{nome}</p>
                                <span className="inline-block bg-gray-400 text-white text-[10px] font-bold px-2 py-1 uppercase rounded-sm">
                                    O MINI SIMILARE
                                </span>
                            </div>
                            <div className="relative w-32 h-20 shrink-0">
                                <Image
                                    src={img}
                                    alt={nome}
                                    fill
                                    sizes="120px"
                                    unoptimized={unoptimized}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* ICONE */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6">
                            <SpecItem icon={<CambioIcon />} text={cambio} />
                            <SpecItem icon={<PostiIcon />} text={posti ? String(posti) : "4"} />
                            <SpecItem icon={<AriaIcon />} text={aria ? "A/C" : "No A/C"} />
                            <SpecItem icon={<PatenteIcon />} text={etaMin ? String(etaMin) : "18"} />
                            <SpecItem icon={<PorteIcon />} text={porte ? String(porte) : "3"} />
                        </div>

                        {/* DETTAGLI TARIFFA */}
                        <div className="flex justify-between items-end text-xs mb-3">
                            <span className="text-gray-900 font-semibold">Tariffa base <span className="font-normal text-gray-500">(per {giorni} giorni)</span></span>
                            <div className="text-right">
                                <div className="text-[10px] text-gray-500 font-bold uppercase">Incluso</div>
                                <div className="font-semibold">{formatPrice(prezzoVeicolo)}</div>
                            </div>
                        </div>

                        {/* COSA E' INCLUSO */}
                        <div className="mb-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-[#0700DE] font-bold uppercase text-xs flex items-center gap-1 hover:underline">
                                        COSA È INCLUSO?
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Cosa è incluso?</DialogTitle>
                                        <DialogDescription>Dettaglio servizi</DialogDescription>
                                    </DialogHeader>
                                    <ul className="list-disc pl-5 text-sm space-y-2 mt-2">
                                        <li>Chilometraggio illimitato</li>
                                        <li>RCA</li>
                                        <li>Assistenza stradale</li>
                                    </ul>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* RITIRO / RICONSEGNA */}
                        <div className="space-y-3 text-xs mb-4">
                            <div>
                                <p className="font-bold text-gray-900">Ritiro</p>
                                <p className="font-bold text-gray-900">{ritiro?.luogoLabel ?? "—"}</p>
                                <p className="text-gray-500">{ritiro?.data ?? "—"} {ritiro?.ora}</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Riconsegna</p>
                                <p className="font-bold text-gray-900">{riconsegna?.luogoLabel ?? "—"}</p>
                                <p className="text-gray-500">{riconsegna?.data ?? "—"} {riconsegna?.ora}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- SEZIONE EXTRA --- */}
            <div className="border-b last:border-b-0">
                <button
                    onClick={() => setOpenExtra(!openExtra)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded border transition-colors ${openExtra ? 'border-[#0700DE] bg-white' : 'border-[#0700DE] bg-white'}`}>
                            {openExtra ? (
                                <ChevronUp className="w-5 h-5 text-[#0700DE]" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-[#0700DE]" />
                            )}
                        </div>
                        <span className="font-bold text-lg text-gray-900">Extra</span>
                    </div>
                    <span className="font-bold text-lg text-gray-900">{formatPrice(totalExtraBlock)}</span>
                </button>

                {openExtra && (
                    <div className="px-4 pb-6 pt-0">
                        {/* Protection Package */}
                        <div className="flex justify-between items-center text-xs py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{pacchettoLabel}</span>
                                <Info className="w-3 h-3 text-gray-400" />
                            </div>
                            <div className="text-right">
                                {pacchettoPrezzo > 0 ? (
                                    <>
                                        <div className="font-semibold">{formatPrice(pacchettoPrezzo)}</div>
                                        <div className="text-[10px] text-gray-500">Per {giorni} giorno(i)</div>
                                    </>
                                ) : (
                                    <span className="text-gray-500 font-bold text-[10px] uppercase">Incluso</span>
                                )}
                            </div>
                        </div>

                        {/* Other Extras */}
                        {activeExtras.map(extra => (
                            <div key={extra.codice} className="flex justify-between items-center text-xs py-2 border-b border-gray-100 last:border-0">
                                <span className="font-bold text-gray-900">{extra.titolo}</span>
                                <span className="font-semibold">{formatPrice(Number(extra.prezzo) * Number(extra.quantita) * giorni)}</span>
                            </div>
                        ))}

                        {activeExtras.length === 0 && pacchettoPrezzo === 0 && (
                            <div className="text-xs text-gray-400 italic py-2">Nessun extra selezionato</div>
                        )}
                    </div>
                )}
            </div>

            {/* --- SEZIONE TOTALE --- */}
            <div className="p-4 border-2 border-[#0700DE] rounded-xl m-4 mt-2 bg-white">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="font-bold text-xl text-gray-900">Totale</p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Da pagare al ritiro</p>
                    </div>
                    <p className="font-bold text-xl text-gray-900">{formatPrice(totale)}</p>
                </div>
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

function SpecItem({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-1.5 text-gray-600">
            <span className="w-4 h-4 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {icon}
            </span>
            <span className="text-xs font-bold text-gray-900">{text}</span>
        </div>
    );
}

function normalizeVehicleImageSrc(url?: string | null): { src: string; unoptimized: boolean } {
    const fallback = "/fiat-500.png";
    if (!url) return { src: fallback, unoptimized: false };

    const trimmed = url.trim();
    if (!trimmed) return { src: fallback, unoptimized: false };

    if (trimmed.startsWith("/")) {
        return { src: trimmed, unoptimized: false };
    }

    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return { src: trimmed, unoptimized: true };
    }

    return { src: fallback, unoptimized: false };
}
