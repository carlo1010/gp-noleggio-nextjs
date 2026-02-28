"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Lock } from "lucide-react";
import {
    loadStripe,
    StripeCardCvcElementChangeEvent,
    StripeCardExpiryElementChangeEvent,
    StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js";
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ─── Mappa errori Stripe → messaggi in italiano ──────────────────────────────
// Quando code === 'card_declined' il dettaglio reale è in decline_code
const STRIPE_DECLINE_MESSAGES: Record<string, string> = {
    generic_decline:        "Pagamento rifiutato. Verifica che la carta sia attiva o usa un'altra carta.",
    insufficient_funds:     "Pagamento rifiutato: fondi insufficienti sulla carta.",
    lost_card:              "Pagamento rifiutato: carta segnalata come smarrita. Usa un'altra carta.",
    stolen_card:            "Pagamento rifiutato: carta segnalata come rubata. Usa un'altra carta.",
    card_velocity_exceeded: "Pagamento rifiutato: limite di transazioni superato. Riprova più tardi.",
};

const STRIPE_CODE_MESSAGES: Record<string, string> = {
    expired_card:       "Pagamento rifiutato: la carta è scaduta. Inserisci una carta valida.",
    incorrect_cvc:      "Pagamento rifiutato: il codice CVC/CVV non è corretto.",
    processing_error:   "Pagamento rifiutato per errore di elaborazione. Riprova tra qualche istante.",
    incorrect_number:   "Pagamento rifiutato: il numero della carta non è corretto.",
    // fallback generico per card_declined senza decline_code noto
    card_declined:      "Pagamento rifiutato. Verifica i dati della carta o contatta la tua banca.",
};

function stripeErrorMessage(
    err?: { code?: string; decline_code?: string; message?: string } | null,
): string {
    if (!err) return "Errore nella verifica della carta. Riprova.";

    // Priorità: decline_code (specifico) > code (generico) > messaggio Stripe > fallback
    if (err.code === "card_declined" && err.decline_code) {
        return STRIPE_DECLINE_MESSAGES[err.decline_code]
            ?? STRIPE_CODE_MESSAGES.card_declined;
    }

    return STRIPE_CODE_MESSAGES[err.code ?? ""]
        ?? err.message
        ?? "Errore nella verifica della carta. Riprova.";
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: "15px",
            color: "#111827",
            fontFamily: "inherit",
            "::placeholder": { color: "#9ca3af" },
        },
        invalid: { color: "#ef4444" },
    },
};

// ─── Componente interno (ha accesso a useStripe / useElements) ───────────────

function PaymentForm() {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const tariffa = useCheckoutStore((s) => s.tariffa);
    const isWeb = tariffa?.tipo === "web";
    const total = useCheckoutStore((s) => s.getTotale());

    // ── Stato carte Stripe ───────────────────────────────────────────────────
    const [cardErrors, setCardErrors] = useState<{ number?: string; expiry?: string; cvc?: string }>({});
    const [cardComplete, setCardComplete] = useState({ number: false, expiry: false, cvc: false });

    // ── Checkbox consensi ────────────────────────────────────────────────────
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyError, setPrivacyError] = useState(false);
    const [termsError, setTermsError] = useState(false);

    // ── Stato globale ────────────────────────────────────────────────────────
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ────────────────────────────────────────────────────────────────────────
    const handlePayment = async () => {
        setError(null);
        setPrivacyError(false);
        setTermsError(false);

        let hasErrors = false;

        // ── 1. Valida form conducente (triggerDriverValidation nello store) ──
        const triggerDriverValidation = useCheckoutStore.getState().triggerDriverValidation;
        if (triggerDriverValidation) {
            let driverValid = false;
            try {
                driverValid = await triggerDriverValidation();
            } catch {
                // Compatibilità Zod/resolver: trigger può lanciare in certi ambienti
                driverValid = false;
            }
            if (!driverValid) {
                hasErrors = true;
                // Aspetta il re-render con i messaggi di errore, poi scrolla
                requestAnimationFrame(() => {
                    const firstError = document.querySelector<HTMLElement>(
                        "#driver-form-section [aria-invalid='true'], #driver-form-section .text-red-600"
                    );
                    const target = firstError ?? document.getElementById("driver-form-section");
                    target?.scrollIntoView({ behavior: "smooth", block: "center" });
                });
            }
        }

        // ── 2. Valida checkbox privacy ───────────────────────────────────────
        if (!privacyAccepted) {
            setPrivacyError(true);
            hasErrors = true;
        }

        // ── 3. Valida checkbox termini ───────────────────────────────────────
        if (!termsAccepted) {
            setTermsError(true);
            hasErrors = true;
        }

        // ── 4. Valida campi carta (solo pagamento web) ───────────────────────
        if (isWeb) {
            const newCardErrors: typeof cardErrors = {};

            if (!cardComplete.number) {
                newCardErrors.number = cardErrors.number ?? "Inserisci il numero della carta";
            }
            if (!cardComplete.expiry) {
                newCardErrors.expiry = cardErrors.expiry ?? "Inserisci la data di scadenza";
            }
            if (!cardComplete.cvc) {
                newCardErrors.cvc = cardErrors.cvc ?? "Inserisci il CVC";
            }

            if (Object.keys(newCardErrors).length > 0) {
                setCardErrors((prev) => ({ ...prev, ...newCardErrors }));
                hasErrors = true;
            }
        }

        if (hasErrors) {
            if (!privacyAccepted || !termsAccepted || (isWeb && (!cardComplete.number || !cardComplete.expiry || !cardComplete.cvc))) {
                // Se gli errori sono solo in questa sezione non serve scorrere in alto
            } else {
                // Gli errori sono nel form conducente, già scrollato sopra
            }
            return;
        }

        // ── Tutto valido: procedi con il pagamento ───────────────────────────
        setLoading(true);

        try {
            const s = useCheckoutStore.getState();
            let paymentMethodId: string | undefined;
            let customerId: string | undefined;

            if (isWeb) {
                if (!stripe || !elements) {
                    setError("Stripe non ancora caricato, riprova.");
                    return;
                }

                const cardNumber = elements.getElement(CardNumberElement);
                if (!cardNumber) {
                    setError("Elemento carta non trovato.");
                    return;
                }

                // ── Step A: tokenizza la carta ───────────────────────────────
                const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
                    type: "card",
                    card: cardNumber,
                    billing_details: {
                        name: `${s.conducente.nome} ${s.conducente.cognome}`,
                        email: s.conducente.email,
                        phone: s.conducente.telefono,
                    },
                });

                if (pmError) {
                    setError(stripeErrorMessage(pmError));
                    return;
                }
                paymentMethodId = paymentMethod!.id;

                // ── Step B: verifica carta via SetupIntent ───────────────────
                const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/verifica-carta`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        paymentMethodId,
                        email: s.conducente.email,
                        name: `${s.conducente.nome} ${s.conducente.cognome}`,
                    }),
                });

                const verifyData = await verifyRes.json();

                if (!verifyRes.ok) {
                    setError(verifyData?.message ?? "Errore nella verifica della carta.");
                    return;
                }

                // ── Step C: conferma SetupIntent sul frontend (gestisce 3DS) ─
                const { setupIntent, error: setupError } = await stripe.confirmCardSetup(
                    verifyData.clientSecret,
                );

                if (setupError) {
                    setError(stripeErrorMessage(setupError));
                    return;
                }

                if (setupIntent?.status !== "succeeded") {
                    setError("Verifica della carta non riuscita. Controlla i dati e riprova.");
                    return;
                }

                customerId = verifyData.customerId;
            }

            const payload = {
                paymentMethodId,
                customerId,
                tipoCliente: s.search.tipoCliente,
                tipoVeicolo: s.search.tipoVeicolo,
                ritiro: {
                    luogo: s.search.ritiro.luogo,
                    luogoLabel: s.search.ritiro.luogoLabel,
                    data: s.search.ritiro.data,
                    ora: s.search.ritiro.ora,
                },
                riconsegna: {
                    luogo: s.search.riconsegna.luogo,
                    luogoLabel: s.search.riconsegna.luogoLabel,
                    data: s.search.riconsegna.data,
                    ora: s.search.riconsegna.ora,
                    stessoUfficio: s.search.riconsegna.stessoUfficio,
                },
                eta: s.search.eta,
                codicePromo: s.search.codicePromo,
                veicolo: {
                    codiceAgenzia: s.veicolo!.codiceAgenzia,
                    codiceClasse: s.veicolo!.codiceClasse,
                    codiceTariffa: s.veicolo!.codiceTariffa,
                },
                tariffa: { tipo: s.tariffa.tipo },
                protezioni: {
                    pacchetto: s.protezioni.pacchetto,
                    opzioni: s.protezioni.opzioni,
                },
                servizi: Object.values(s.servizi).map((sv) => ({
                    codice: sv.codice,
                    quantita: sv.quantita,
                })),
                conducente: {
                    nome: s.conducente.nome,
                    cognome: s.conducente.cognome,
                    dataNascita: s.conducente.dataNascita,
                    email: s.conducente.email,
                    telefono: s.conducente.telefono,
                    codiceFiscale: s.conducente.codiceFiscale,
                    numeroVolo: s.conducente.numeroVolo,
                    privacyInfo: s.conducente.privacyInfo,
                    marketing: s.conducente.marketing,
                },
                totale: total,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/prenota`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            // Gestione 3DS
            if (res.status === 402 && data?.requiresAction && data?.clientSecret) {
                const { error: confirmError } = await stripe!.confirmCardPayment(data.clientSecret);
                if (confirmError) {
                    setError(confirmError.message ?? "Autenticazione 3DS fallita.");
                    return;
                }
                const retryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/prenota`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...payload, paymentIntentId: data.paymentIntentId }),
                });
                const retryData = await retryRes.json();
                if (!retryRes.ok) {
                    setError(retryData?.message ?? "Errore durante la prenotazione.");
                    return;
                }
                router.push("/prenotazione-confermata");
                return;
            }

            if (!res.ok) {
                setError(data?.message ?? "Errore durante la prenotazione.");
                return;
            }

            router.push("/prenotazione-confermata");
        } catch (err: any) {
            setError(err?.message ?? "Errore imprevisto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mt-6">
            <h2 className="font-bold text-xl text-gray-900 mb-6">
                Garantisci la tua prenotazione
            </h2>

            {/* Form carta — solo per pagamento web */}
            {isWeb && (
                <>
                    {/* Banner info */}
                    <div className="bg-gray-50 rounded-lg p-4 flex gap-3 text-xs text-gray-600 mb-6">
                        <Info className="w-5 h-5 text-[#0700DE] shrink-0 fill-current" />
                        <p>
                            Inserendo ora i dati della tua carta di credito accedi al servizio gratuito di
                            Prenotazione Garantita Estesa.{" "}
                            <span className="font-bold">Non ti sarà addebitato alcun importo ora.</span> Il
                            pagamento del tuo noleggio sarà effettuato in fase del ritiro del veicolo presso
                            l'ufficio di noleggio.{" "}
                            <span className="underline cursor-pointer">Maggiori dettagli</span>
                        </p>
                    </div>

                    {/* Card form */}
                    <div className={`border-2 rounded-xl p-6 mb-6 relative transition-colors ${
                        cardErrors.number || cardErrors.expiry || cardErrors.cvc
                            ? "border-red-400"
                            : "border-[#0700DE]"
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-base text-gray-900">Carta di credito</h3>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-bold border rounded px-1">MC</span>
                                <span className="text-[10px] font-bold border rounded px-1">VISA</span>
                                <span className="text-[10px] font-bold border rounded px-1">JCB</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 mb-6">
                            La carta di credito inserita deve essere a nome del conducente principale e{" "}
                            <span className="font-bold text-gray-700">
                                deve essere presentata in fase di ritiro del mezzo.
                            </span>
                        </p>

                        <div className="space-y-4">
                            {/* Numero carta */}
                            <div>
                                <Label className="text-xs font-bold text-gray-700 mb-1 block">
                                    Numero della carta di credito
                                </Label>
                                <div className={`relative flex items-center border rounded-md h-11 px-4 bg-white focus-within:border-[#0700DE] transition-colors ${
                                    cardErrors.number ? "border-red-400" : "border-gray-300"
                                }`}>
                                    <CardNumberElement
                                        className="w-full"
                                        options={CARD_ELEMENT_OPTIONS}
                                        onChange={(e: StripeCardNumberElementChangeEvent) => {
                                            setCardComplete((p) => ({ ...p, number: e.complete }));
                                            setCardErrors((p) => ({ ...p, number: e.error?.message }));
                                        }}
                                    />
                                    <Lock className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                                </div>
                                {cardErrors.number && (
                                    <p className="text-xs text-red-500 mt-1">{cardErrors.number}</p>
                                )}
                            </div>

                            {/* Scadenza + CVC */}
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label className="text-xs font-bold text-gray-700 mb-1 block">
                                        Data di scadenza
                                    </Label>
                                    <div className={`border rounded-md h-11 px-4 flex items-center bg-white focus-within:border-[#0700DE] transition-colors ${
                                        cardErrors.expiry ? "border-red-400" : "border-gray-300"
                                    }`}>
                                        <CardExpiryElement
                                            className="w-full"
                                            options={CARD_ELEMENT_OPTIONS}
                                            onChange={(e: StripeCardExpiryElementChangeEvent) => {
                                                setCardComplete((p) => ({ ...p, expiry: e.complete }));
                                                setCardErrors((p) => ({ ...p, expiry: e.error?.message }));
                                            }}
                                        />
                                    </div>
                                    {cardErrors.expiry && (
                                        <p className="text-xs text-red-500 mt-1">{cardErrors.expiry}</p>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Label className="text-xs font-bold text-gray-700 mb-1 block">
                                        CVC / CVV
                                    </Label>
                                    <div className={`border rounded-md h-11 px-4 flex items-center bg-white focus-within:border-[#0700DE] transition-colors ${
                                        cardErrors.cvc ? "border-red-400" : "border-gray-300"
                                    }`}>
                                        <CardCvcElement
                                            className="w-full"
                                            options={CARD_ELEMENT_OPTIONS}
                                            onChange={(e: StripeCardCvcElementChangeEvent) => {
                                                setCardComplete((p) => ({ ...p, cvc: e.complete }));
                                                setCardErrors((p) => ({ ...p, cvc: e.error?.message }));
                                            }}
                                        />
                                    </div>
                                    {cardErrors.cvc && (
                                        <p className="text-xs text-red-500 mt-1">{cardErrors.cvc}</p>
                                    )}
                                </div>
                            </div>

                            {/* Verified badges */}
                            <div className="flex justify-end items-center gap-2 mt-2">
                                <p className="text-[10px] text-gray-400 text-right leading-3">
                                    Per la tua sicurezza, potrebbe essere richiesta la
                                    <br />
                                    verifica della tua identità. Contatta la tua banca per
                                    <br />
                                    maggiori informazioni.
                                </p>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-blue-900">Verified by VISA</span>
                                    <span className="text-[10px] font-bold text-gray-600">MasterCard SecureCode</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Checkbox consensi */}
            <div className="space-y-4 mb-8">
                <div className="space-y-1">
                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="privacy"
                            checked={privacyAccepted}
                            onCheckedChange={(v) => {
                                setPrivacyAccepted(Boolean(v));
                                if (v) setPrivacyError(false);
                            }}
                            className={`mt-0.5 ${privacyError ? "border-red-500" : "border-gray-300"}`}
                        />
                        <label htmlFor="privacy" className="text-xs text-gray-600 leading-tight cursor-pointer">
                            Dichiaro di aver letto e compreso l'
                            <span className="font-bold text-gray-900 underline">
                                Informativa Privacy Piocirillo Rent
                            </span>
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                    </div>
                    {privacyError && (
                        <p className="text-xs text-red-500 ml-7">Devi accettare l'informativa privacy per procedere</p>
                    )}
                </div>

                <div className="space-y-1">
                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="terms"
                            checked={termsAccepted}
                            onCheckedChange={(v) => {
                                setTermsAccepted(Boolean(v));
                                if (v) setTermsError(false);
                            }}
                            className={`mt-0.5 ${termsError ? "border-red-500" : "border-gray-300"}`}
                        />
                        <label htmlFor="terms" className="text-xs text-gray-600 leading-tight cursor-pointer">
                            Dichiaro di aver letto e di accettare integralmente i{" "}
                            <span className="font-bold text-gray-900 underline">
                                Termini e le Condizioni Piocirillo Rent
                            </span>
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                    </div>
                    {termsError && (
                        <p className="text-xs text-red-500 ml-7">Devi accettare i termini e le condizioni per procedere</p>
                    )}
                </div>
            </div>

            {/* Errore globale (es. errore API) */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* CTA + totale */}
            <div className="flex items-center gap-6">
                <Button
                    className="bg-[#0700DE] hover:bg-[#0600b3] text-white font-bold h-12 px-8 rounded-none rounded-tl-sm rounded-br-sm text-base disabled:opacity-60"
                    onClick={handlePayment}
                    disabled={loading || (isWeb && (!stripe || !elements))}
                >
                    {loading ? "Elaborazione…" : isWeb ? "Paga Online" : "Prenota al ritiro"}
                </Button>
                <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        TOTALE
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(total)}</p>
                </div>
            </div>
        </div>
    );
}

// ─── Export: avvolge PaymentForm con il provider Elements ────────────────────

export default function Step4Payment() {
    return (
        <Elements stripe={stripePromise} options={{ locale: "it" }}>
            <PaymentForm />
        </Elements>
    );
}
