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

const CARD_INPUT_IDS = new Set([
  "CARD_NUMBER",
  "EXPIRATION_DATE",
  "SECURITY_CODE",
  "CARDHOLDER_NAME",
  "CARDHOLDER_SURNAME",
  "CARDHOLDER_EMAIL",
]);

type NexiBuildFlowProps = {
  amount: number;
  currency: "EUR";
  bookingReference: string;
  cardholderEmail?: string;
  cardholderName?: string;
  enabled: boolean;
};

type NexiSdk = {
  confirmData: (loader?: () => void) => void;
};

type NexiBuildCtor = new (config: {
  onBuildSuccess?: (evtData: unknown) => void;
  onBuildError?: (evtData: unknown) => void;
  onConfirmError?: (evtData: unknown) => void;
  onBuildFlowStateChange?: (evtData: unknown, state: string) => void;
  cssLink?: string;
}) => NexiSdk;

const resolveGlobalBuildCtor = (): NexiBuildCtor | undefined => {
  const win = window as Window & { Build?: NexiBuildCtor; XPayBuild?: NexiBuildCtor; build?: NexiBuildCtor };
  if (win.Build) return win.Build;
  if (win.XPayBuild) return win.XPayBuild;
  if (win.build) return win.build;

  // In some Nexi hfsdk builds, `class Build` is a global lexical binding
  // and is not attached to `window`. Probe it safely via Function().
  try {
    const ctor = Function("return (typeof Build !== 'undefined') ? Build : undefined;")() as NexiBuildCtor | undefined;
    return ctor;
  } catch {
    return undefined;
  }
};

declare global {
  interface Window {
    Build?: NexiBuildCtor;
    XPayBuild?: NexiBuildCtor;
    build?: NexiBuildCtor;
  }
}

export default function NexiBuildFlow(props: NexiBuildFlowProps) {
  const normalizedCardholderEmail = props.cardholderEmail?.trim().toLowerCase() ?? "";
  const normalizedCardholderName = props.cardholderName?.trim() ?? "";
  const hasValidCardholderEmail =
    normalizedCardholderEmail.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedCardholderEmail);
  const hasValidCardholderName = normalizedCardholderName.length >= 2;

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [fields, setFields] = useState<NexiField[]>([]);
  const [state, setState] = useState<NexiState>("UNKNOWN");
  const [operation, setOperation] = useState<Record<string, unknown> | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [nexiPrivacyAccepted, setNexiPrivacyAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugLines, setDebugLines] = useState<string[]>([]);
  const [lastBuildError, setLastBuildError] = useState<{
    id?: string;
    errorCode?: string;
    errorMessage?: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sdkIntegrity, setSdkIntegrity] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [buildReady, setBuildReady] = useState(false);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finalizedRef = useRef(false);
  const sdkRef = useRef<NexiSdk | null>(null);
  const sdkScriptRef = useRef<string | null>(null);
  const confirmWatchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const actionableFields = useMemo(
    () => fields.filter((field) => typeof field.src === "string" && field.src.length > 0),
    [fields],
  );

  const hasNexiPrivacyField = useMemo(
    () => fields.some((field) => field.id === "PRIVACY_CONDITIONS"),
    [fields],
  );

  const hasCardInputFields = useMemo(
    () => fields.some((field) => (field.id ? CARD_INPUT_IDS.has(field.id) : false)),
    [fields],
  );

  const shouldPreloadSdk = useMemo(
    () =>
      props.enabled &&
      actionableFields.length > 0 &&
      (state === "PAYMENT_METHOD_SELECTION" || state === "CARD_DATA_COLLECTION"),
    [actionableFields.length, props.enabled, state],
  );

  const clearPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const sameFieldStructure = useCallback((a: NexiField[], b: NexiField[]) => {
    if (a.length !== b.length) return false;
    const aIds = a.map((f) => f.id ?? "").sort();
    const bIds = b.map((f) => f.id ?? "").sort();
    return aIds.every((id, idx) => id === bIds[idx]);
  }, []);

  const clearConfirmWatch = useCallback(() => {
    if (confirmWatchRef.current) {
      clearTimeout(confirmWatchRef.current);
      confirmWatchRef.current = null;
    }
  }, []);

  const pushDebug = useCallback((message: string, payload?: unknown) => {
    const line = `[${new Date().toISOString()}] ${message}${
      payload !== undefined ? ` | ${JSON.stringify(payload)}` : ""
    }`;
    setDebugLines((prev) => [...prev.slice(-39), line]);
    console.log("[NEXI_DEBUG]", message, payload);
  }, []);

  const mapBuildErrorMessage = useCallback((raw?: {
    id?: string;
    errorCode?: string;
    errorMessage?: string;
  }) => {
    if (!raw) return "Errore compilazione campi Nexi.";
    if (raw.errorCode === "HF0006" || raw.id === "EXPIRATION_DATE") {
      return "Data di scadenza non valida o già trascorsa.";
    }
    if (raw.errorCode === "HF0004" || raw.id === "SECURITY_CODE" || raw.id === "CARD_NUMBER") {
      return "Numero carta o CVC non validi.";
    }
    if (raw.errorCode === "HF0007" || raw.id === "CARDHOLDER_EMAIL") {
      return "Email non valida nel campo Nexi CARDHOLDER_EMAIL.";
    }
    return raw.errorMessage || "Errore compilazione campi Nexi.";
  }, []);

  const formatFieldLabel = useCallback((id: string) => {
    switch (id) {
      case "CARD_NUMBER":
        return "Numero carta";
      case "EXPIRATION_DATE":
        return "Scadenza";
      case "SECURITY_CODE":
        return "CVC";
      case "CARDHOLDER_NAME":
        return "Nome intestatario";
      case "CARDHOLDER_EMAIL":
        return "Email intestatario";
      default:
        return id;
    }
  }, []);

  const finalizeSession = useCallback(async (sid: string) => {
    pushDebug("finalize:start", { sessionId: sid });
    setIsFinalizing(true);
    const finalizeRes = await fetch("/api/payments/nexi/build/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sid }),
    });
    const finalizeJson = await finalizeRes.json();
    setIsFinalizing(false);

    if (!finalizeRes.ok) {
      pushDebug("finalize:error", finalizeJson);
      throw new Error(finalizeJson?.error ?? "Errore finalize Nexi.");
    }
    pushDebug("finalize:ok", finalizeJson);

    return finalizeJson as {
      state?: string;
      url?: string;
      fields?: NexiField[];
      operation?: Record<string, unknown>;
    };
  }, [pushDebug]);

  const getIntegrityMetadata = useCallback(async () => {
    if (sdkIntegrity) {
      return { integrity: sdkIntegrity, crossOrigin: "anonymous" as const };
    }
    const res = await fetch("/api/payments/nexi/build/integrity", { method: "GET" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      pushDebug("integrity:error", json);
      return null;
    }
    pushDebug("integrity:ok", json);
    return {
      integrity: typeof json?.integrity === "string" ? json.integrity : undefined,
      crossOrigin: "anonymous" as const,
    };
  }, [pushDebug, sdkIntegrity]);

  const fetchCardDataDiagnostic = useCallback(async (sid: string) => {
    const res = await fetch(
      `/api/payments/nexi/build/card-data?sessionId=${encodeURIComponent(sid)}`,
      { method: "GET" },
    );
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      pushDebug("cardData:error", json);
      return { error: json?.error as string | undefined };
    }
    pushDebug("cardData:ok", json);
    return { ok: true, raw: json };
  }, [pushDebug]);

  const handleStatePayload = useCallback(async (payload: {
    state?: string;
    url?: string;
    fields?: NexiField[];
    operation?: Record<string, unknown>;
  }) => {
    const rawNextState = (payload.state ?? "UNKNOWN") as NexiState;
    const payloadFields = payload.fields ?? [];
    const payloadHasCardFields = payloadFields.some((field) =>
      field.id ? CARD_INPUT_IDS.has(field.id) : false,
    );
    const nextState =
      rawNextState === "PAYMENT_METHOD_SELECTION" && payloadHasCardFields
        ? "CARD_DATA_COLLECTION"
        : rawNextState;
    pushDebug("state:payload", {
      from: state,
      to: nextState,
      rawTo: rawNextState,
      fields: payload.fields?.length ?? 0,
      hasUrl: Boolean(payload.url),
      hasOperation: Boolean(payload.operation),
    });
    const isRegressiveToMethodSelection =
      state === "CARD_DATA_COLLECTION" && nextState === "PAYMENT_METHOD_SELECTION";

    // Prevent UI reset while the user is filling card fields.
    if (isRegressiveToMethodSelection) {
      pushDebug("state:ignored-regressive");
      return;
    }

    setState(nextState);
    if (payload.fields) {
      const incoming = payload.fields;
      const keepExistingCardFields =
        state === "CARD_DATA_COLLECTION" &&
        nextState === "CARD_DATA_COLLECTION" &&
        fields.length > 0 &&
        sameFieldStructure(fields, incoming);

      // Keep iframe src stable while user is typing card data:
      // /build/state may return the same fields with refreshed correlation IDs in src.
      if (!keepExistingCardFields) {
        setFields(incoming);
      } else {
        pushDebug("state:fields-preserved", { count: fields.length });
      }
    }
    if (payload.operation) setOperation(payload.operation);

    if (nextState === "READY_FOR_PAYMENT" && sessionId && !finalizedRef.current) {
      clearConfirmWatch();
      setIsConfirming(false);
      finalizedRef.current = true;
      try {
        const finalizeJson = await finalizeSession(sessionId);
        await handleStatePayload(finalizeJson);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Errore finalize Nexi.");
        return;
      }
      return;
    }

    if (nextState === "REDIRECTED_TO_EXTERNAL_DOMAIN" && payload.url) {
      clearConfirmWatch();
      setIsConfirming(false);
      window.location.href = payload.url;
      return;
    }

    if (nextState === "PAYMENT_COMPLETE") {
      clearConfirmWatch();
      setIsConfirming(false);
      clearPolling();
    }

    // If confirmData does not pass validation, Nexi may keep the same state.
    // Ensure the CTA is re-enabled.
    if (nextState === "CARD_DATA_COLLECTION") {
      setIsConfirming(false);
    }
  }, [clearConfirmWatch, clearPolling, fields, finalizeSession, pushDebug, sameFieldStructure, sessionId, state]);

  const ensureNexiSdk = useCallback(async () => {
    if (sdkRef.current) return;
    const firstFieldSrc = actionableFields.find((field) => field.src)?.src;
    if (!firstFieldSrc) {
      throw new Error("Campi Nexi non pronti.");
    }

    const fieldOrigin = new URL(firstFieldSrc).origin;
    const candidates = Array.from(new Set([
      `${fieldOrigin}/monetaweb/resources/hfsdk.js`,
      "https://xpaysandbox.nexigroup.com/monetaweb/resources/hfsdk.js",
      "https://xpay.nexigroup.com/monetaweb/resources/hfsdk.js",
    ]));

    const resolveCtor = () => resolveGlobalBuildCtor();

    const loadSdkScript = async (sdkSrc: string) => {
      const integrityMeta = await getIntegrityMetadata();

      const once = async (withIntegrity: boolean) => {
        await new Promise<void>((resolve, reject) => {
          const existing = document.querySelector(
            `script[data-nexi-sdk="${sdkSrc}"]`,
          ) as HTMLScriptElement | null;
          if (existing) {
            existing.remove();
          }

          const timeout = window.setTimeout(() => {
            reject(new Error("Timeout caricamento SDK Nexi."));
          }, 5000);

          const done = (cb: () => void) => {
            window.clearTimeout(timeout);
            cb();
          };

          const script = document.createElement("script");
          script.src = withIntegrity ? sdkSrc : `${sdkSrc}?v=${Date.now()}`;
          script.async = true;
          script.dataset.nexiSdk = sdkSrc;

          if (withIntegrity && integrityMeta?.integrity) {
            script.integrity = integrityMeta.integrity;
            script.crossOrigin = integrityMeta?.crossOrigin ?? "anonymous";
          }

          script.onload = () => {
            script.dataset.nexiSdkLoaded = "true";
            done(resolve);
          };
          script.onerror = () => done(() => reject(new Error("Impossibile caricare SDK Nexi.")));
          document.body.appendChild(script);
        });
      };

      try {
        pushDebug("sdk:load-mode", { sdkSrc, mode: "integrity" });
        await once(true);
      } catch (e) {
        pushDebug("sdk:load-retry-no-integrity", {
          sdkSrc,
          error: e instanceof Error ? e.message : String(e),
        });
        await once(false);
      }
    };

    for (const sdkSrc of candidates) {
      pushDebug("sdk:try-src", { sdkSrc });
      if (sdkScriptRef.current !== sdkSrc) {
        await loadSdkScript(sdkSrc).catch((e: unknown) => {
          pushDebug("sdk:script-load-failed", {
            sdkSrc,
            error: e instanceof Error ? e.message : String(e),
          });
        });
        sdkScriptRef.current = sdkSrc;
      }

      let Ctor = resolveCtor();
      if (!Ctor) {
        // Bridge lexical global Build -> window.Build when SDK doesn't expose a window property.
        try {
          const bridge = document.createElement("script");
          bridge.text =
            "try{if(typeof Build!=='undefined'&&!window.Build){window.Build=Build;}}catch(e){}";
          document.head.appendChild(bridge);
          bridge.remove();
          pushDebug("sdk:bridge-applied", { sdkSrc });
        } catch (e) {
          pushDebug("sdk:bridge-error", e);
        }
        Ctor = resolveCtor();
      }
      if (!Ctor) {
        pushDebug("sdk:ctor-missing", { sdkSrc });
        continue;
      }

      const host = window.location.hostname.toLowerCase();
      const isLocalHost =
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "::1";
      const nexiCssLink = isLocalHost
        ? undefined
        : `${window.location.origin}/nexi-build.css`;

      sdkRef.current = new Ctor({
        ...(nexiCssLink ? { cssLink: nexiCssLink } : {}),
        onBuildFlowStateChange: (evtData: unknown, nextState: string) => {
          pushDebug("sdk:flow-change", { nextState, evtData });
          const eventType =
            evtData && typeof evtData === "object"
              ? (evtData as { event?: string }).event
              : undefined;
          if (eventType === "BUILD_SUCCESS") {
            setLastBuildError(null);
            setFieldErrors({});
            setError(null);
            setBuildReady(true);
            pushDebug("sdk:build-success");
          }
          const eventPayload =
            evtData && typeof evtData === "object"
              ? (evtData as {
                  url?: string;
                  operation?: Record<string, unknown>;
                  fields?: NexiField[];
                  fieldSet?: { fields?: NexiField[] };
                })
              : undefined;

          void handleStatePayload({
            state: nextState,
            url: eventPayload?.url,
            operation: eventPayload?.operation,
            fields: eventPayload?.fieldSet?.fields ?? eventPayload?.fields,
          });
        },
        onConfirmError: (evtData: unknown) => {
          setIsConfirming(false);
          pushDebug("sdk:confirm-error", evtData);
          const msg =
            evtData && typeof evtData === "object"
              ? JSON.stringify(evtData)
              : "Conferma dati Nexi non riuscita.";
          setError(msg);
        },
        onBuildError: (evtData: unknown) => {
          setIsConfirming(false);
          setBuildReady(false);
          pushDebug("sdk:build-error", evtData);
          const raw = evtData && typeof evtData === "object"
            ? (evtData as { id?: string; errorCode?: string; errorMessage?: string })
            : undefined;
          if (raw) {
            setLastBuildError({
              id: raw.id,
              errorCode: raw.errorCode,
              errorMessage: raw.errorMessage,
            });
            if (raw.id) {
              setFieldErrors((prev) => ({
                ...prev,
                [raw.id as string]: mapBuildErrorMessage(raw),
              }));
            }
          }
          setError(mapBuildErrorMessage(raw));
        },
      });

      pushDebug("sdk:initialized", { sdkSrc });
      setSdkReady(true);

      return;
    }

    if (!sdkRef.current) {
      pushDebug("sdk:unavailable");
      setSdkReady(false);
      throw new Error("SDK Nexi non disponibile.");
    }
  }, [actionableFields, getIntegrityMetadata, handleStatePayload, mapBuildErrorMessage, pushDebug]);

  const fetchState = useCallback(async (sid: string) => {
    const stateRes = await fetch(
      `/api/payments/nexi/build/state?sessionId=${encodeURIComponent(sid)}`,
      { method: "GET" },
    );
    const stateJson = await stateRes.json();
    if (!stateRes.ok) {
      pushDebug("state:fetch-error", stateJson);
      throw new Error(stateJson?.error ?? "Errore lettura stato Nexi.");
    }
    pushDebug("state:fetch-ok", stateJson);
    await handleStatePayload(stateJson);
    return stateJson as {
      state?: string;
      url?: string;
      fields?: NexiField[];
      operation?: Record<string, unknown>;
    };
  }, [handleStatePayload, pushDebug]);

  const initFlow = useCallback(async () => {
    setError(null);
    setOperation(null);
    setNexiPrivacyAccepted(false);
    sdkRef.current = null;
    setSdkReady(false);
    setBuildReady(false);
    pushDebug("init:reset-sdk");
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
          cardholderEmail: hasValidCardholderEmail ? normalizedCardholderEmail : undefined,
          cardholderName: hasValidCardholderName ? normalizedCardholderName : undefined,
        }),
      });
      const initJson = await initRes.json();
      if (!initRes.ok) {
        pushDebug("init:error", initJson);
        throw new Error(initJson?.error ?? "Errore init Nexi Build.");
      }
      pushDebug("init:ok", initJson);
      const rawSriHash =
        initJson?.raw && typeof initJson.raw === "object"
          ? (initJson.raw as { sriHash?: string }).sriHash
          : undefined;
      setSdkIntegrity(typeof rawSriHash === "string" ? rawSriHash : null);

      setSessionId(initJson.sessionId);
      setFields(Array.isArray(initJson.fields) ? initJson.fields : []);
      const initState = (initJson.state ?? "PAYMENT_METHOD_SELECTION") as NexiState;
      const initFields = (Array.isArray(initJson.fields) ? initJson.fields : []) as NexiField[];
      const initHasCardFields = initFields.some((field) =>
        field.id ? CARD_INPUT_IDS.has(field.id) : false,
      );
      const normalizedInitState =
        initState === "PAYMENT_METHOD_SELECTION" && initHasCardFields
          ? "CARD_DATA_COLLECTION"
          : initState;
      setState(normalizedInitState);
      pushDebug("init:normalized-state", {
        original: initState,
        normalized: normalizedInitState,
        initHasCardFields,
      });

      pollRef.current = setInterval(() => {
        void fetchState(initJson.sessionId).catch((e: unknown) => {
          setError(
            e instanceof Error ? e.message : "Errore lettura stato Nexi.",
          );
        });
      }, 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore imprevisto Nexi.");
    } finally {
      setIsInitializing(false);
    }
  }, [
    clearPolling,
    fetchState,
    props.amount,
    props.bookingReference,
    props.currency,
    normalizedCardholderEmail,
    normalizedCardholderName,
    hasValidCardholderEmail,
    hasValidCardholderName,
    pushDebug,
  ]);

  useEffect(() => {
    if (!shouldPreloadSdk) return;
    if (sdkRef.current) return;

    // Preload silently to receive BUILD_FLOW_STATE_CHANGE as soon as user clicks PAY_WITH_CARD.
    void ensureNexiSdk().catch(() => undefined);
  }, [ensureNexiSdk, shouldPreloadSdk]);

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

  const handleManualConfirm = useCallback(async () => {
    if (!sessionId || isFinalizing) return;

    setError(null);
    setLastBuildError(null);
    if (Object.keys(fieldErrors).length > 0) {
      const blocks = Object.entries(fieldErrors).map(([id, msg]) => ({
        field: id,
        message: msg,
      }));
      pushDebug("confirm:blocked-field-errors", blocks);
      setError("Correggi i campi evidenziati da Nexi prima di confermare.");
      return;
    }
    pushDebug("confirm:click", { sessionId, state });
    try {
      if (!nexiPrivacyAccepted && !hasNexiPrivacyField) {
        pushDebug("confirm:blocked-privacy");
        setError("Accetta l'informativa privacy Nexi prima di confermare.");
        return;
      }

      const latestState = state;

      if (latestState === "PAYMENT_METHOD_SELECTION" && !hasCardInputFields) {
        pushDebug("confirm:blocked-method-selection");
        setError(
          "Seleziona prima il metodo carta (PAY_WITH_CARD) nel riquadro Nexi.",
        );
        return;
      }

      if (latestState === "UNKNOWN") {
        pushDebug("confirm:unknown-refresh");
        const latest = await fetchState(sessionId);
        const refreshedState = (latest?.state ?? "UNKNOWN") as NexiState;
        if (refreshedState === "UNKNOWN") {
          pushDebug("confirm:still-unknown");
          setError("Stato Nexi non disponibile. Ricarica sessione e riprova.");
          return;
        }
        if (refreshedState === "PAYMENT_METHOD_SELECTION") {
          if (hasCardInputFields) {
            pushDebug("confirm:method-selection-with-card-fields");
            await ensureNexiSdk();
            if (!sdkRef.current) {
              throw new Error("SDK Nexi non inizializzato.");
            }
            setIsConfirming(true);
            sdkRef.current.confirmData(() => {
              setIsConfirming(true);
            });
            return;
          }
          pushDebug("confirm:still-method-selection");
          setError("Seleziona prima il metodo carta (PAY_WITH_CARD) nel riquadro Nexi.");
          return;
        }
        if (refreshedState === "READY_FOR_PAYMENT") {
          finalizedRef.current = true;
          const finalizePayload = await finalizeSession(sessionId);
          await handleStatePayload(finalizePayload);
          return;
        }
        if (refreshedState === "CARD_DATA_COLLECTION") {
          pushDebug("confirm:confirmData-after-refresh");
          await ensureNexiSdk();
          if (!sdkRef.current) {
            throw new Error("SDK Nexi non inizializzato.");
          }
          setIsConfirming(true);
          sdkRef.current.confirmData(() => {
            setIsConfirming(true);
          });
          return;
        }
        return;
      }

      if (latestState === "READY_FOR_PAYMENT") {
        pushDebug("confirm:finalize-direct");
        finalizedRef.current = true;
        const finalizePayload = await finalizeSession(sessionId);
        await handleStatePayload(finalizePayload);
        return;
      }

      if (latestState === "CARD_DATA_COLLECTION") {
        pushDebug("confirm:confirmData-direct");
        try {
          await ensureNexiSdk();
          if (!sdkRef.current) {
            throw new Error("SDK Nexi non inizializzato.");
          }
          setIsConfirming(true);
          clearConfirmWatch();
          sdkRef.current.confirmData(() => {
            setIsConfirming(true);
          });
          confirmWatchRef.current = setTimeout(() => {
            void (async () => {
              try {
                const latest = await fetchState(sessionId);
                const still = (latest?.state ?? "UNKNOWN") as NexiState;
                if (still === "CARD_DATA_COLLECTION") {
                  pushDebug("confirm:watch-still-card-data-collection");
                  setIsConfirming(false);
                  const diagnostic = await fetchCardDataDiagnostic(sessionId);
                  if (diagnostic?.error) {
                    setError(`Diagnostica Nexi: ${diagnostic.error}`);
                    return;
                  }
                  if (lastBuildError) {
                    setError(mapBuildErrorMessage(lastBuildError));
                    return;
                  }
                  setError(
                    "Nexi non ha accettato ancora i dati carta. Verifica tutti i campi iframe e riprova.",
                  );
                }
              } catch {
                setIsConfirming(false);
              }
            })();
          }, 1800);
        } catch (sdkError) {
          pushDebug("confirm:sdk-unavailable-fallback-server", sdkError);
          setIsConfirming(false);
          setError(
            "SDK Nexi non disponibile nel browser corrente. Disattiva eventuali blocchi script/estensioni e ricarica sessione.",
          );
        }
        return;
      }

      setError(
        "Pagamento non pronto: completa tutti i campi Nexi (inclusa eventuale privacy) e riprova.",
      );
    } catch (e) {
      pushDebug("confirm:exception", e);
      setIsConfirming(false);
      finalizedRef.current = false;
      setError(e instanceof Error ? e.message : "Errore finalize Nexi.");
    }
  }, [
    ensureNexiSdk,
    clearConfirmWatch,
    fetchCardDataDiagnostic,
    fetchState,
    finalizeSession,
    hasCardInputFields,
    handleStatePayload,
    hasNexiPrivacyField,
    isFinalizing,
    nexiPrivacyAccepted,
    pushDebug,
    state,
    sessionId,
    lastBuildError,
    mapBuildErrorMessage,
    fieldErrors,
  ]);

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

      <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 p-3">
        <p className="text-xs font-semibold text-blue-900 mb-1">Controlli Nexi</p>
        <ul className="text-xs text-blue-900 list-disc pl-4">
          <li>
            SDK Nexi: {sdkReady ? "OK" : "Non pronto"}
          </li>
          <li>
            Validazione campi Nexi: {buildReady ? "OK (BUILD_SUCCESS ricevuto)" : "In attesa / con errori"}
          </li>
          <li>
            Errori attivi: {Object.keys(fieldErrors).length}
          </li>
          <li>
            Email precompilata: {hasValidCardholderEmail ? "Formato valido" : "Formato non valido o assente"}
          </li>
          <li>
            Intestatario precompilato: {hasValidCardholderName ? "Valido" : "Assente o troppo corto"}
          </li>
        </ul>
        <p className="text-[11px] text-blue-800 mt-2">
          Usa una carta test Nexi sandbox valida, scadenza futura (MM/YY) e CVC coerente con il circuito.
        </p>
      </div>

      {Object.keys(fieldErrors).length > 0 && (
        <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-900 mb-1">
            Campi da correggere prima della conferma:
          </p>
          <ul className="text-xs text-amber-900 list-disc pl-4">
            {Object.entries(fieldErrors).map(([id, msg]) => (
              <li key={id}>
                {formatFieldLabel(id)}: {msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      <details className="mb-4 border rounded-md bg-gray-50 p-2">
        <summary className="text-xs font-semibold text-gray-700 cursor-pointer">
          Debug Nexi
        </summary>
        <div className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-4 text-gray-700">
          {debugLines.length === 0 ? "No debug lines yet." : debugLines.join("\n")}
        </div>
      </details>

      {actionableFields.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {actionableFields.map((field, idx) => (
            <iframe
              key={`${field.id ?? "field"}-${idx}`}
              title={`Nexi-${field.id ?? idx}`}
              src={field.src}
              className={
                `w-full border rounded-md bg-white ${
                  state === "PAYMENT_METHOD_SELECTION"
                    ? "h-24"
                    : field.type === "ACTION" || field.id === "PRIVACY_CONDITIONS"
                    ? "h-24"
                    : "h-16"
                }`
              }
              loading="eager"
            />
          ))}
        </div>
      )}

      {!hasNexiPrivacyField && (
        <label className="mt-4 flex items-start gap-2 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={nexiPrivacyAccepted}
            onChange={(e) => setNexiPrivacyAccepted(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            Dichiaro di aver letto l&apos;informativa privacy Nexi:{" "}
            <a
              href="https://www.nexi.it/privacy/xpay.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              www.nexi.it/privacy/xpay.html
            </a>
          </span>
        </label>
      )}

      {hasValidCardholderEmail && (
        <p className="mt-3 text-xs text-gray-600">
          Email carta precompilata lato Nexi:{" "}
          <span className="font-semibold">{normalizedCardholderEmail}</span>
        </p>
      )}

      {hasValidCardholderName && (
        <p className="mt-1 text-xs text-gray-600">
          Intestatario carta precompilato lato Nexi:{" "}
          <span className="font-semibold">{normalizedCardholderName}</span>
        </p>
      )}

      {sessionId && state !== "PAYMENT_COMPLETE" && (
        <div className="mt-4">
          <Button
            type="button"
            onClick={handleManualConfirm}
            disabled={
              isFinalizing ||
              isInitializing ||
              isConfirming ||
              !sdkReady ||
              !buildReady ||
              Boolean(lastBuildError) ||
              Object.keys(fieldErrors).length > 0
            }
            className="bg-[#0700DE] hover:bg-[#0600b3] text-white"
          >
            {isFinalizing
              ? "Invio pagamento..."
              : isConfirming
                ? "Confermo dati..."
                : "Conferma e paga"}
          </Button>
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
