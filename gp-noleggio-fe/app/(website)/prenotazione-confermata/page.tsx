"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
    Calendar,
    Car,
    CheckCircle,
    CircleX,
    Clock3,
    CreditCard,
    MapPin,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    clearCheckoutConfirmationSnapshot,
    loadCheckoutConfirmationSnapshot,
    type CheckoutConfirmationSnapshot,
} from "@/lib/checkout-confirmation";
import { calcDays } from "@/lib/date";
import { formatPrice } from "@/lib/formatPrice";
import { useCheckoutStore } from "@/store/checkout.store";
import HeroBanner from "@/components/hero-banner";

export default function PrenotazioneConfermataPage() {
    return (
        <Suspense fallback={<ConfirmationPageSkeleton />}>
            <PrenotazioneConfermataContent />
        </Suspense>
    );
}

function PrenotazioneConfermataContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [snapshot, setSnapshot] = useState<CheckoutConfirmationSnapshot | null>(null);

    const storeSearch = useCheckoutStore((s) => s.search);
    const storeVeicolo = useCheckoutStore((s) => s.veicolo);
    const storeTariffa = useCheckoutStore((s) => s.tariffa);
    const storeConducente = useCheckoutStore((s) => s.conducente);
    const storeProtezioni = useCheckoutStore((s) => s.protezioni);
    const storeServizi = useCheckoutStore((s) => s.servizi);
    const storeTotal = useCheckoutStore((s) => s.getTotale());
    const resetCheckout = useCheckoutStore((s) => s.resetCheckout);

    const status = (searchParams.get("status") || "result").toLowerCase();
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentid");
    const isCancel = status === "cancel";
    const isResult = status === "result";
    const hasStoreContext = Boolean(storeVeicolo);

    useEffect(() => {
        if (hasStoreContext) return;
        setSnapshot(loadCheckoutConfirmationSnapshot());
    }, [hasStoreContext]);

    const reservation = useMemo(() => {
        if (storeVeicolo) {
            return {
                search: storeSearch,
                veicolo: storeVeicolo,
                tariffa: storeTariffa,
                conducente: storeConducente,
                protezioni: storeProtezioni,
                servizi: storeServizi,
                totale: storeTotal,
            };
        }

        if (!snapshot?.veicolo) return null;

        return {
            search: snapshot.search,
            veicolo: snapshot.veicolo,
            tariffa: snapshot.tariffa,
            conducente: snapshot.conducente,
            protezioni: snapshot.protezioni,
            servizi: snapshot.servizi,
            totale: snapshot.totale,
        };
    }, [
        snapshot,
        storeSearch,
        storeVeicolo,
        storeTariffa,
        storeConducente,
        storeProtezioni,
        storeServizi,
        storeTotal,
    ]);

    const giorniNoleggio = calcDays(
        reservation?.search.ritiro.data,
        reservation?.search.ritiro.ora,
        reservation?.search.riconsegna.data,
        reservation?.search.riconsegna.ora,
    );
    const activeExtras = Object.values(reservation?.servizi ?? {}).filter(
        (item) => item.quantita > 0,
    );
    const customerAddress = [
        reservation?.conducente.indirizzo,
        reservation?.conducente.cap,
        reservation?.conducente.localita,
        reservation?.conducente.provincia,
        reservation?.conducente.nazione,
    ]
        .filter(Boolean)
        .join(", ");

    const handleNuovaRicerca = () => {
        clearCheckoutConfirmationSnapshot();
        resetCheckout();
        router.push("/");
    };

    const heroTitle = isCancel ? "Pagamento annullato" : "Prenotazione confermata";
    const heroDescription = isCancel
        ? "L'operazione e stata annullata. Puoi riprovare dal checkout o iniziare una nuova ricerca."
        : reservation
            ? `Riceverai una email di conferma all'indirizzo ${reservation.conducente.email}.`
            : "Il pagamento e stato elaborato. Conserva i riferimenti della prenotazione.";

    return (
        <>
            <HeroBanner
                imageUrl="/hero/sfondo-hero-auto.png"
                title={heroTitle}
                description={heroDescription}
                showSearch={false}
                compact
            />

            <div className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="mx-auto w-full max-w-xl">
                    <div className="flex flex-col items-center text-center mb-8">
                        {isCancel ? (
                            <CircleX className="w-16 h-16 text-red-500 mb-4" strokeWidth={1.5} />
                        ) : isResult ? (
                            <CheckCircle className="w-16 h-16 text-green-500 mb-4" strokeWidth={1.5} />
                        ) : reservation ? (
                            <Clock3 className="w-16 h-16 text-amber-500 mb-4" strokeWidth={1.5} />
                        ) : (
                            <Clock3 className="w-16 h-16 text-amber-500 mb-4" strokeWidth={1.5} />
                        )}

                        <h2 className="text-2xl font-bold text-gray-900">
                            {heroTitle}
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            {isCancel ? (
                                "L'operazione e stata annullata. Puoi riprovare dal checkout o iniziare una nuova ricerca."
                            ) : reservation ? (
                                <>
                                    Riceverai una email di conferma all'indirizzo{" "}
                                    <span className="font-semibold text-gray-700">
                                        {reservation.conducente.email}
                                    </span>
                                </>
                            ) : (
                                "Il pagamento e stato elaborato. Conserva i riferimenti della prenotazione."
                            )}
                        </p>
                    </div>

                    {(orderId || paymentId) && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="divide-y divide-gray-100">
                                {orderId ? (
                                    <Row
                                        icon={<CreditCard className="w-4 h-4 text-[#0700DE]" />}
                                        label="Order ID"
                                        value={orderId}
                                    />
                                ) : null}
                                {paymentId ? (
                                    <Row
                                        icon={<CreditCard className="w-4 h-4 text-[#0700DE]" />}
                                        label="Payment ID"
                                        value={paymentId}
                                    />
                                ) : null}
                            </div>
                        </div>
                    )}

                    {reservation ? (
                        <>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                                <div className="px-6 py-4 border-b bg-gray-50">
                                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700">
                                        Dati Cliente
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    <Row
                                        icon={<User className="w-4 h-4 text-[#0700DE]" />}
                                        label="Conducente"
                                        value={`${reservation.conducente.nome} ${reservation.conducente.cognome}`.trim()}
                                    />
                                    {reservation.conducente.email ? (
                                        <Row
                                            icon={<User className="w-4 h-4 text-[#0700DE]" />}
                                            label="Email"
                                            value={reservation.conducente.email}
                                        />
                                    ) : null}
                                    {reservation.conducente.telefono ? (
                                        <Row
                                            icon={<User className="w-4 h-4 text-[#0700DE]" />}
                                            label="Telefono"
                                            value={reservation.conducente.telefono}
                                        />
                                    ) : null}
                                    {reservation.conducente.codiceFiscale ? (
                                        <Row
                                            icon={<User className="w-4 h-4 text-[#0700DE]" />}
                                            label="Codice fiscale"
                                            value={reservation.conducente.codiceFiscale}
                                        />
                                    ) : null}
                                    {reservation.conducente.dataNascita ? (
                                        <Row
                                            icon={<User className="w-4 h-4 text-[#0700DE]" />}
                                            label="Data di nascita"
                                            value={reservation.conducente.dataNascita}
                                        />
                                    ) : null}
                                    {customerAddress ? (
                                        <Row
                                            icon={<MapPin className="w-4 h-4 text-[#0700DE]" />}
                                            label="Indirizzo"
                                            value={customerAddress}
                                        />
                                    ) : null}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="bg-[#0700DE] px-6 py-4 flex items-center gap-3">
                                <Car className="w-5 h-5 text-white shrink-0" />
                                <div>
                                    <p className="text-white font-bold text-base">
                                        {reservation.veicolo.descrizioneClasse}
                                    </p>
                                    <p className="text-blue-200 text-xs">
                                        {reservation.veicolo.descrizioneTariffa}
                                    </p>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                <Row
                                    icon={<MapPin className="w-4 h-4 text-[#0700DE]" />}
                                    label="Ritiro"
                                    value={
                                        <>
                                            <span className="font-semibold">
                                                {reservation.search.ritiro.luogoLabel ||
                                                    reservation.search.ritiro.luogo}
                                            </span>
                                            <span className="text-gray-400 ml-2 text-xs">
                                                {reservation.search.ritiro.data} · {reservation.search.ritiro.ora}
                                            </span>
                                        </>
                                    }
                                />

                                <Row
                                    icon={<MapPin className="w-4 h-4 text-gray-400" />}
                                    label="Riconsegna"
                                    value={
                                        <>
                                            <span className="font-semibold">
                                                {reservation.search.riconsegna.stessoUfficio
                                                    ? reservation.search.ritiro.luogoLabel ||
                                                      reservation.search.ritiro.luogo
                                                    : reservation.search.riconsegna.luogoLabel ||
                                                      reservation.search.riconsegna.luogo}
                                            </span>
                                            <span className="text-gray-400 ml-2 text-xs">
                                                {reservation.search.riconsegna.data} · {reservation.search.riconsegna.ora}
                                            </span>
                                        </>
                                    }
                                />

                                <Row
                                    icon={<Calendar className="w-4 h-4 text-[#0700DE]" />}
                                    label="Durata"
                                    value={`${giorniNoleggio} giorn${giorniNoleggio === 1 ? "o" : "i"}`}
                                />

                                <Row
                                    icon={<CreditCard className="w-4 h-4 text-[#0700DE]" />}
                                    label="Pagamento"
                                    value={
                                        reservation.tariffa.tipo === "web"
                                            ? "Online (carta di credito)"
                                            : "Al ritiro del veicolo"
                                    }
                                />

                                <Row
                                    icon={<CreditCard className="w-4 h-4 text-[#0700DE]" />}
                                    label="Pacchetto protezione"
                                    value={
                                        reservation.protezioni.selezionata?.nome ||
                                        reservation.protezioni.pacchetto ||
                                        "Base"
                                    }
                                />

                                <Row
                                    icon={<CreditCard className="w-4 h-4 text-[#0700DE]" />}
                                    label="Extra selezionati"
                                    value={
                                        activeExtras.length > 0
                                            ? activeExtras
                                                  .map((item) => `${item.titolo} x${item.quantita}`)
                                                  .join(", ")
                                            : "Nessun extra selezionato"
                                    }
                                />
                            </div>

                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                                    Totale
                                </span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatPrice(reservation.totale)}
                                </span>
                            </div>
                            </div>
                        </>
                    ) : null}

                    <div className="flex flex-col gap-3">
                        {reservation && !isCancel ? (
                            <Button
                                onClick={handleNuovaRicerca}
                                className="bg-[#0700DE] hover:bg-[#0600b3] text-white font-bold h-12 rounded-none rounded-tl-sm rounded-br-sm"
                            >
                                Torna alla home
                            </Button>
                        ) : (
                            <Button
                                asChild
                                className="bg-[#0700DE] hover:bg-[#0600b3] text-white font-bold h-12 rounded-none rounded-tl-sm rounded-br-sm"
                            >
                                <Link href="/">Torna alla home</Link>
                            </Button>
                        )}

                        <Button
                            asChild
                            variant="outline"
                            className="h-12 rounded-none rounded-tl-sm rounded-br-sm"
                        >
                            <Link href="/">Nuova ricerca</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

function ConfirmationPageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
            <div className="w-full max-w-xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-64 animate-pulse" />
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
