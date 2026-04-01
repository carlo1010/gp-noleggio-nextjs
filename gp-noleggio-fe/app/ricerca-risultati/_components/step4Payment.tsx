"use client";

import { useEffect, useMemo, useState } from "react";
import { Info, Lock } from "lucide-react";

import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentProvider } from "@/lib/payments/types";
import NexiBuildFlow from "@/app/ricerca-risultati/_components/nexiBuildFlow";

export default function Step4Payment() {
  const tariffa = useCheckoutStore((s) => s.tariffa);
  const isWeb = tariffa?.tipo === "web";
  const total = useCheckoutStore((s) => s.getTotale());
  const paymentProvider = useCheckoutStore((s) => s.pagamento.provider);
  const termsAccepted = useCheckoutStore((s) => s.pagamento.terminiAccettati);
  const cardholderEmail = useCheckoutStore((s) => s.conducente.email);
  const cardholderName = useCheckoutStore((s) =>
    [s.conducente.nome, s.conducente.cognome].filter(Boolean).join(" ").trim(),
  );
  const setTermini = useCheckoutStore((s) => s.setTermini);
  const setPaymentProvider = useCheckoutStore((s) => s.setPaymentProvider);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNexiFlow, setShowNexiFlow] = useState(false);
  const bookingReference = useMemo(() => `NOLEGGIO-${Date.now()}`, []);

  useEffect(() => {
    if (paymentProvider !== "nexi_build_v3") {
      setShowNexiFlow(false);
    }
  }, [paymentProvider]);

  const handlePayment = async () => {
    if (!isWeb) return;

    if (!privacyAccepted || !termsAccepted) {
      setError("Devi accettare informativa privacy e termini per procedere.");
      return;
    }

    setError(null);

    if (paymentProvider === "nexi_build_v3") {
      setShowNexiFlow(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/payments/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: paymentProvider,
          amount: total,
          currency: "EUR",
          bookingReference,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Impossibile avviare il pagamento.");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      throw new Error("Nessun URL di checkout ricevuto.");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Errore imprevisto durante il pagamento.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-6">
      <h2 className="font-bold text-xl text-gray-900 mb-6">
        Garantisci la tua prenotazione
      </h2>

      {isWeb && (
        <>
          <div className="mb-6">
            <Label className="text-xs font-bold text-gray-700 mb-2 block">
              Metodo di pagamento online
            </Label>
            <RadioGroup
              value={paymentProvider}
              onValueChange={(value) =>
                setPaymentProvider(value as PaymentProvider)
              }
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer">
                <RadioGroupItem value="stripe" id="provider-stripe" />
                <span className="text-sm font-medium text-gray-800">
                  Stripe
                </span>
              </label>
              <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer">
                <RadioGroupItem value="nexi_build_v3" id="provider-nexi" />
                <span className="text-sm font-medium text-gray-800">
                  Nexi Build v3
                </span>
              </label>
            </RadioGroup>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 flex gap-3 text-xs text-gray-600 mb-6">
            <Info className="w-5 h-5 text-[#0700DE] shrink-0 fill-current" />
            <p>
              Inserendo ora i dati della tua carta di credito accedi al
              servizio gratuito di Prenotazione Garantita Estesa.
              <span className="font-bold">
                {" "}
                Non ti sara addebitato alcun importo ora.
              </span>{" "}
              Il pagamento del tuo noleggio sara effettuato in fase del ritiro
              del veicolo presso l&apos;ufficio di noleggio.{" "}
              <span className="underline cursor-pointer">Maggiori dettagli</span>
            </p>
          </div>

          {paymentProvider === "stripe" ? (
            <div className="border-2 border-[#0700DE] rounded-xl p-6 mb-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-gray-900">
                Carta di credito
              </h3>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold border rounded px-1">
                  MC
                </span>
                <span className="text-[10px] font-bold border rounded px-1">
                  VISA
                </span>
                <span className="text-[10px] font-bold border rounded px-1">
                  JCB
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              La carta di credito inserita deve essere a nome del conducente
              principale e{" "}
              <span className="font-bold text-gray-700">
                deve essere presentata in fase di ritiro del mezzo.
              </span>
            </p>

            <div className="space-y-4">
              <div className="relative">
                <Label className="text-xs font-bold text-gray-700 mb-1 block">
                  Numero della carta di credito
                </Label>
                <div className="relative">
                  <Input
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="pl-4 pr-10 h-11 bg-white"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">
                    Data di scadenza
                  </Label>
                  <Input placeholder="MM/AA" className="h-11 bg-white" />
                </div>
                <div className="flex-1">
                  <Label className="text-xs font-bold text-gray-700 mb-1 block">
                    CVC / CVV
                  </Label>
                  <Input placeholder="123" className="h-11 bg-white" />
                </div>
              </div>

              <div className="flex justify-end items-center gap-2 mt-2">
                <p className="text-[10px] text-gray-400 text-right leading-3">
                  Per la tua sicurezza, potrebbe essere richiesta la
                  <br />
                  verifica della tua identita. Contatta la tua banca per
                  <br />
                  maggiori informazioni.
                </p>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-blue-900">
                    Verified by VISA
                  </span>
                  <span className="text-[10px] font-bold text-gray-600">
                    MasterCard SecureCode
                  </span>
                </div>
              </div>
            </div>
            </div>
          ) : (
            <NexiBuildFlow
              enabled={showNexiFlow}
              amount={total}
              currency="EUR"
              bookingReference={bookingReference}
              cardholderEmail={cardholderEmail}
              cardholderName={cardholderName}
            />
          )}
        </>
      )}

      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy"
            className="mt-0.5 border-gray-300"
            checked={privacyAccepted}
            onCheckedChange={(value) => setPrivacyAccepted(Boolean(value))}
          />
          <label htmlFor="privacy" className="text-xs text-gray-600 leading-tight">
            Dichiaro di aver letto e compreso l&apos;
            <span className="font-bold text-gray-900 underline">
              Informativa Privacy Piocirillo Rent
            </span>
          </label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            className="mt-0.5 border-gray-300"
            checked={termsAccepted}
            onCheckedChange={(value) => setTermini(Boolean(value))}
          />
          <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
            Dichiaro di aver letto e di accettare integralmente i{" "}
            <span className="font-bold text-gray-900 underline">
              Termini e le Condizioni Piocirillo Rent
            </span>
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="flex items-center gap-6">
        <Button
          className="bg-[#0700DE] hover:bg-[#0600b3] text-white font-bold h-12 px-8 rounded-none rounded-tl-sm rounded-br-sm text-base"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading
            ? "Attendere..."
            : isWeb
              ? paymentProvider === "nexi_build_v3"
                ? "Avvia Nexi"
                : "Paga Online"
              : "Paga al ritiro"}
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

/*export default function Step4Payment() {
    return (
        <Elements stripe={stripePromise} options={{ locale: "it" }}>
            <PaymentForm />
        </Elements>
    );
}*/
