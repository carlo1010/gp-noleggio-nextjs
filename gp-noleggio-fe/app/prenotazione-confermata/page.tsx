"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Car, MapPin, Calendar, User, CreditCard } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";

export default function PrenotazioneConfermataPage() {
    const router = useRouter();

    const search = useCheckoutStore((s) => s.search);
    const veicolo = useCheckoutStore((s) => s.veicolo);
    const tariffa = useCheckoutStore((s) => s.tariffa);
    const conducente = useCheckoutStore((s) => s.conducente);
    const total = useCheckoutStore((s) => s.getTotale());
    const resetCheckout = useCheckoutStore((s) => s.resetCheckout);

    // Se lo store è vuoto (es. refresh diretto) rimanda alla home
    useEffect(() => {
        if (!veicolo) {
            router.replace("/");
        }
    }, [veicolo, router]);

    if (!veicolo) return null;

    const handleNuovaRicerca = () => {
        resetCheckout();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
            <div className="w-full max-w-xl">

                {/* Icona + titolo */}
                <div className="flex flex-col items-center text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" strokeWidth={1.5} />
                    <h1 className="text-2xl font-bold text-gray-900">Prenotazione confermata!</h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Riceverai una email di conferma all'indirizzo{" "}
                        <span className="font-semibold text-gray-700">{conducente.email}</span>
                    </p>
                </div>

                {/* Card riepilogo */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">

                    {/* Header veicolo */}
                    <div className="bg-[#0700DE] px-6 py-4 flex items-center gap-3">
                        <Car className="w-5 h-5 text-white shrink-0" />
                        <div>
                            <p className="text-white font-bold text-base">{veicolo.descrizioneClasse}</p>
                            <p className="text-blue-200 text-xs">{veicolo.descrizioneTariffa}</p>
                        </div>
                    </div>

                    {/* Dettagli */}
                    <div className="divide-y divide-gray-100">

                        {/* Conducente */}
                        <Row
                            icon={<User className="w-4 h-4 text-[#0700DE]" />}
                            label="Conducente"
                            value={`${conducente.nome} ${conducente.cognome}`}
                        />

                        {/* Ritiro */}
                        <Row
                            icon={<MapPin className="w-4 h-4 text-[#0700DE]" />}
                            label="Ritiro"
                            value={
                                <>
                                    <span className="font-semibold">{search.ritiro.luogoLabel || search.ritiro.luogo}</span>
                                    <span className="text-gray-400 ml-2 text-xs">
                                        {search.ritiro.data} · {search.ritiro.ora}
                                    </span>
                                </>
                            }
                        />

                        {/* Riconsegna */}
                        <Row
                            icon={<MapPin className="w-4 h-4 text-gray-400" />}
                            label="Riconsegna"
                            value={
                                <>
                                    <span className="font-semibold">
                                        {search.riconsegna.stessoUfficio
                                            ? search.ritiro.luogoLabel || search.ritiro.luogo
                                            : search.riconsegna.luogoLabel || search.riconsegna.luogo}
                                    </span>
                                    <span className="text-gray-400 ml-2 text-xs">
                                        {search.riconsegna.data} · {search.riconsegna.ora}
                                    </span>
                                </>
                            }
                        />

                        {/* Giorni noleggio */}
                        <Row
                            icon={<Calendar className="w-4 h-4 text-[#0700DE]" />}
                            label="Durata"
                            value={`${veicolo.giorniNoleggio} giorn${veicolo.giorniNoleggio === 1 ? "o" : "i"}`}
                        />

                        {/* Pagamento */}
                        <Row
                            icon={<CreditCard className="w-4 h-4 text-[#0700DE]" />}
                            label="Pagamento"
                            value={tariffa.tipo === "web" ? "Online (carta di credito)" : "Al ritiro del veicolo"}
                        />
                    </div>

                    {/* Totale */}
                    <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Totale</span>
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3">
                    <Button
                        onClick={handleNuovaRicerca}
                        className="bg-[#0700DE] hover:bg-[#0600b3] text-white font-bold h-12 rounded-none rounded-tl-sm rounded-br-sm"
                    >
                        Torna alla home
                    </Button>
                </div>

            </div>
        </div>
    );
}

function Row({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="px-6 py-4 flex items-start gap-3">
            <div className="mt-0.5 shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <div className="text-sm text-gray-900">{value}</div>
            </div>
        </div>
    );
}
