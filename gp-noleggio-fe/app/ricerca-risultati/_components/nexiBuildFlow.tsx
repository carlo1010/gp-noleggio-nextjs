"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type NexiField = {
  id?: string;
  type?: string;
  class?: string;
  src?: string;
};

type NexiState =
  | "PAYMENT_METHOD_SELECTION"
  | "CARD_DATA_COLLECTION"
  | "READY_FOR_PAYMENT"
  | "REDIRECTED_TO_EXTERNAL_DOMAIN"
  | "PAYMENT_COMPLETE"
  | "UNKNOWN";

type NexiBuildFlowProps = {
  amount: number;
  currency: "EUR";
  bookingReference: string;
  enabled: boolean;
};

export default function NexiBuildFlow(props: NexiBuildFlowProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [fields, setFields] = useState<NexiField[]>([]);
  const [state, setState] = useState<NexiState>("UNKNOWN");
  const [operation, setOperation] = useState<Record<string, unknown> | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finalizedRef = useRef(false);

  const actionableFields = useMemo(
    () => fields.filter((field) => typeof field.src === "string" && field.src.length > 0),
    [fields],
  );

  const clearPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const handleStatePayload = useCallback(async (payload: {
    state?: string;
    url?: string;
    fields?: NexiField[];
    operation?: Record<string, unknown>;
  }) => {
    const nextState = (payload.state ?? "UNKNOWN") as NexiState;
    setState(nextState);
    if (payload.fields) setFields(payload.fields);
    if (payload.operation) setOperation(payload.operation);

    if (nextState === "READY_FOR_PAYMENT" && sessionId && !finalizedRef.current) {
      finalizedRef.current = true;
      setIsFinalizing(true);
      const finalizeRes = await fetch("/api/payments/nexi/build/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const finalizeJson = await finalizeRes.json();
      setIsFinalizing(false);

      if (!finalizeRes.ok) {
        setError(finalizeJson?.error ?? "Errore finalize Nexi.");
        return;
      }

      await handleStatePayload(finalizeJson);
      return;
    }

    if (nextState === "REDIRECTED_TO_EXTERNAL_DOMAIN" && payload.url) {
      window.location.href = payload.url;
      return;
    }

    if (nextState === "PAYMENT_COMPLETE") {
      clearPolling();
    }
  }, [clearPolling, sessionId]);

  const fetchState = useCallback(async (sid: string) => {
    const stateRes = await fetch(
      `/api/payments/nexi/build/state?sessionId=${encodeURIComponent(sid)}`,
      { method: "GET" },
    );
    const stateJson = await stateRes.json();
    if (!stateRes.ok) {
      throw new Error(stateJson?.error ?? "Errore lettura stato Nexi.");
    }
    await handleStatePayload(stateJson);
  }, [handleStatePayload]);

  const initFlow = useCallback(async () => {
    setError(null);
    setOperation(null);
    setIsInitializing(true);
    finalizedRef.current = false;
    clearPolling();

    try {
      const initRes = await fetch("/api/payments/nexi/build/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: props.amount,
          currency: props.currency,
          bookingReference: props.bookingReference,
        }),
      });
      const initJson = await initRes.json();
      if (!initRes.ok) {
        throw new Error(initJson?.error ?? "Errore init Nexi Build.");
      }

      setSessionId(initJson.sessionId);
      setFields(Array.isArray(initJson.fields) ? initJson.fields : []);
      setState((initJson.state ?? "PAYMENT_METHOD_SELECTION") as NexiState);

      pollRef.current = setInterval(() => {
        void fetchState(initJson.sessionId);
      }, 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore imprevisto Nexi.");
    } finally {
      setIsInitializing(false);
    }
  }, [clearPolling, fetchState, props.amount, props.bookingReference, props.currency]);

  useEffect(() => {
    if (!props.enabled) {
      clearPolling();
      return;
    }
    if (!sessionId && !isInitializing) {
      void initFlow();
    }
    return () => clearPolling();
  }, [clearPolling, initFlow, isInitializing, props.enabled, sessionId]);

  if (!props.enabled) return null;

  return (
    <div className="border-2 border-[#0700DE] rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-bold text-base text-gray-900">Nexi Build v3</h3>
        <Button
          type="button"
          variant="outline"
          className="h-9"
          onClick={initFlow}
          disabled={isInitializing || isFinalizing}
        >
          {isInitializing ? "Inizializzo..." : "Ricarica sessione"}
        </Button>
      </div>

      <p className="text-xs text-gray-600 mb-4">
        Stato pagamento: <span className="font-semibold">{state}</span>
      </p>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {actionableFields.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {actionableFields.map((field, idx) => (
            <iframe
              key={`${field.id ?? "field"}-${idx}`}
              title={`Nexi-${field.id ?? idx}`}
              src={field.src}
              className="w-full h-16 border rounded-md bg-white"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {isFinalizing && (
        <p className="text-sm text-gray-700 mt-4">Finalizzazione pagamento in corso...</p>
      )}

      {state === "PAYMENT_COMPLETE" && (
        <p className="text-sm text-green-700 mt-4">
          Pagamento completato con successo.
          {operation ? " Operazione registrata." : ""}
        </p>
      )}
    </div>
  );
}
