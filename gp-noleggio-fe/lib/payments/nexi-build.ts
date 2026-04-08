const NEXI_SANDBOX_ORDERS_BUILD_ENDPOINT =
  "https://xpaysandbox.nexigroup.com/api/phoenix-0.0/psp/api/v1/orders/build";

type NexiField = {
  id?: string;
  type?: string;
  class?: string;
  src?: string;
};

type NexiBuildResponse = {
  sessionId?: string;
  securityToken?: string;
  fields?: NexiField[];
  fieldSet?: {
    sessionId?: string;
    securityToken?: string;
    fields?: NexiField[];
  };
  state?: string;
  url?: string;
  operation?: Record<string, unknown>;
  [key: string]: unknown;
};

type InitNexiBuildInput = {
  amount: number;
  currency: "EUR";
  bookingReference: string;
  cardholderEmail?: string;
  cardholderName?: string;
};

const normalizeBaseUrl = (raw?: string | null): string | undefined => {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.replace(/\/+$/, "");
  }
  return `https://${trimmed}`.replace(/\/+$/, "");
};

const getNexiConfig = () => {
  const ordersEndpoint =
    process.env.NEXI_BUILD_V3_ORDERS_ENDPOINT ||
    process.env.NEXI_BUILD_V3_CHECKOUT_BASE_URL ||
    NEXI_SANDBOX_ORDERS_BUILD_ENDPOINT;
  const apiKey = process.env.NEXI_BUILD_V3_API_KEY;
  const explicitMerchantUrl = process.env.NEXI_BUILD_V3_MERCHANT_URL;
  const explicitResultUrl = process.env.NEXI_BUILD_V3_RESULT_URL;
  const explicitCancelUrl = process.env.NEXI_BUILD_V3_CANCEL_URL;
  const explicitNotificationUrl = process.env.NEXI_BUILD_V3_NOTIFICATION_URL;
  const siteBaseUrl = normalizeBaseUrl(
    process.env.NEXI_BUILD_V3_SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL,
  );
  const language = process.env.NEXI_BUILD_V3_LANGUAGE || "ita";
  const merchantUrl = explicitMerchantUrl || siteBaseUrl;
  const resultUrl =
    explicitResultUrl ||
    (siteBaseUrl
      ? `${siteBaseUrl}/prenotazione-confermata?payment=nexi&status=result&orderId={orderId}`
      : undefined);
  const cancelUrl =
    explicitCancelUrl ||
    (siteBaseUrl
      ? `${siteBaseUrl}/prenotazione-confermata?payment=nexi&status=cancel`
      : undefined);
  const notificationUrl =
    explicitNotificationUrl ||
    (siteBaseUrl ? `${siteBaseUrl}/api/payments/nexi/notification` : undefined);

  return {
    ordersEndpoint,
    apiKey,
    merchantUrl,
    resultUrl,
    cancelUrl,
    notificationUrl,
    language,
    baseBuildEndpoint: ordersEndpoint.replace(/\/orders\/build\/?$/, "/build"),
  };
};

const nexiHeaders = (apiKey: string, correlationId: string) => ({
  "Content-Type": "application/json",
  "X-Api-Key": apiKey,
  "Correlation-Id": correlationId,
});

const safeOrderId = (bookingReference: string) =>
  bookingReference.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 18);

const resolveCheckoutFields = (payload: NexiBuildResponse) =>
  payload.fieldSet?.fields ?? payload.fields ?? [];

export async function initNexiBuildSession(input: InitNexiBuildInput) {
  const cfg = getNexiConfig();
  if (!cfg.apiKey) return { error: "Missing NEXI_BUILD_V3_API_KEY configuration." };
  if (!cfg.merchantUrl) return { error: "Missing NEXI_BUILD_V3_MERCHANT_URL configuration." };
  if (!cfg.resultUrl) return { error: "Missing NEXI_BUILD_V3_RESULT_URL configuration." };
  if (!cfg.cancelUrl) return { error: "Missing NEXI_BUILD_V3_CANCEL_URL configuration." };

  const correlationId = crypto.randomUUID();
  const amountInCents = Math.round(input.amount * 100);
  const orderId = safeOrderId(input.bookingReference);

  const res = await fetch(cfg.ordersEndpoint, {
    method: "POST",
    headers: nexiHeaders(cfg.apiKey, correlationId),
    body: JSON.stringify({
      version: "3",
      merchantUrl: cfg.merchantUrl,
      order: {
        orderId,
        amount: String(amountInCents),
        currency: input.currency,
        ...(input.cardholderEmail || input.cardholderName
          ? {
              customerInfo: {
                ...(input.cardholderEmail
                  ? { cardHolderEmail: input.cardholderEmail }
                  : {}),
                ...(input.cardholderName
                  ? { cardHolderName: input.cardholderName }
                  : {}),
              },
            }
          : {}),
      },
      paymentSession: {
        actionType: "PAY",
        amount: String(amountInCents),
        captureType: "IMPLICIT",
        paymentService: "CARDS",
        language: cfg.language,
        resultUrl: cfg.resultUrl.includes("{orderId}")
          ? cfg.resultUrl.replace("{orderId}", orderId)
          : cfg.resultUrl,
        cancelUrl: cfg.cancelUrl,
        ...(cfg.notificationUrl ? { notificationUrl: cfg.notificationUrl } : {}),
      },
    }),
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as NexiBuildResponse | null;
  if (!res.ok || !json) {
    const providerError =
      (json?.message as string | undefined) ??
      (json?.error as string | undefined) ??
      "Nexi /orders/build failed.";
    return { error: `${providerError} (Correlation-Id: ${correlationId})` };
  }

  const sessionId = json.sessionId ?? json.fieldSet?.sessionId;
  if (!sessionId) {
    return {
      error: `Nexi response missing sessionId. (Correlation-Id: ${correlationId})`,
    };
  }

  return {
    correlationId,
    orderId,
    sessionId,
    securityToken: json.securityToken ?? json.fieldSet?.securityToken,
    fields: resolveCheckoutFields(json),
    state: json.state ?? "PAYMENT_METHOD_SELECTION",
    raw: json,
  };
}

export async function getNexiBuildState(sessionId: string) {
  const cfg = getNexiConfig();
  if (!cfg.apiKey) return { error: "Missing NEXI_BUILD_V3_API_KEY configuration." };

  const correlationId = crypto.randomUUID();
  const url = new URL(`${cfg.baseBuildEndpoint}/state`);
  url.searchParams.set("sessionId", sessionId);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-Api-Key": cfg.apiKey,
      "Correlation-Id": correlationId,
    },
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as NexiBuildResponse | null;
  if (!res.ok || !json) {
    const providerError =
      (json?.message as string | undefined) ??
      (json?.error as string | undefined) ??
      "Nexi /build/state failed.";
    return { error: `${providerError} (Correlation-Id: ${correlationId})` };
  }

  return {
    correlationId,
    sessionId,
    state: json.state ?? "UNKNOWN",
    url: json.url,
    fields: resolveCheckoutFields(json),
    operation: json.operation,
    raw: json,
  };
}

const extractNexiError = (json: NexiBuildResponse | null, fallback: string) => {
  if (!json) return fallback;

  const directMessage =
    (json.message as string | undefined) ??
    (json.error as string | undefined) ??
    (json.detail as string | undefined) ??
    (json.title as string | undefined);

  if (directMessage) return directMessage;

  const errors = json.errors as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(errors) && errors.length > 0) {
    return JSON.stringify(errors[0]);
  }

  return fallback;
};

export async function finalizeNexiBuildPayment(sessionId: string) {
  const cfg = getNexiConfig();
  if (!cfg.apiKey) return { error: "Missing NEXI_BUILD_V3_API_KEY configuration." };

  const correlationId = crypto.randomUUID();
  const res = await fetch(`${cfg.baseBuildEndpoint}/finalize_payment`, {
    method: "POST",
    headers: nexiHeaders(cfg.apiKey, correlationId),
    body: JSON.stringify({ sessionId }),
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as NexiBuildResponse | null;
  if (!res.ok || !json) {
    const providerError = extractNexiError(json, "Nexi /build/finalize_payment failed.");
    return {
      error: `${providerError} (HTTP ${res.status}, Correlation-Id: ${correlationId})`,
    };
  }

  return {
    correlationId,
    sessionId,
    state: json.state ?? "UNKNOWN",
    url: json.url,
    fields: resolveCheckoutFields(json),
    operation: json.operation,
    raw: json,
  };
}

export async function confirmNexiBuildPayment(sessionId: string) {
  const cfg = getNexiConfig();
  if (!cfg.apiKey) return { error: "Missing NEXI_BUILD_V3_API_KEY configuration." };

  const correlationId = crypto.randomUUID();
  const res = await fetch(`${cfg.baseBuildEndpoint}/confirm_payment`, {
    method: "POST",
    headers: nexiHeaders(cfg.apiKey, correlationId),
    body: JSON.stringify({ sessionId }),
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as NexiBuildResponse | null;
  if (!res.ok || !json) {
    const providerError = extractNexiError(json, "Nexi /build/confirm_payment failed.");
    return {
      error: `${providerError} (HTTP ${res.status}, Correlation-Id: ${correlationId})`,
    };
  }

  return {
    correlationId,
    sessionId,
    state: json.state ?? "UNKNOWN",
    url: json.url,
    fields: resolveCheckoutFields(json),
    operation: json.operation,
    raw: json,
  };
}

export async function getNexiBuildIntegrity() {
  const cfg = getNexiConfig();
  if (!cfg.apiKey) return { error: "Missing NEXI_BUILD_V3_API_KEY configuration." };

  const correlationId = crypto.randomUUID();
  const res = await fetch(`${cfg.baseBuildEndpoint}/integrity`, {
    method: "GET",
    headers: {
      "X-Api-Key": cfg.apiKey,
      "Correlation-Id": correlationId,
    },
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as
    | { integrity?: string; crossOrigin?: string; [key: string]: unknown }
    | null;

  if (!res.ok || !json) {
    const providerError = extractNexiError(
      json as NexiBuildResponse | null,
      "Nexi /build/integrity failed.",
    );
    return {
      error: `${providerError} (HTTP ${res.status}, Correlation-Id: ${correlationId})`,
    };
  }

  return {
    correlationId,
    integrity: json.integrity,
    crossOrigin: json.crossOrigin,
    raw: json,
  };
}

export async function getNexiBuildCardData(sessionId: string) {
  const cfg = getNexiConfig();
  if (!cfg.apiKey) return { error: "Missing NEXI_BUILD_V3_API_KEY configuration." };

  const correlationId = crypto.randomUUID();
  const url = new URL(`${cfg.baseBuildEndpoint}/cardData`);
  url.searchParams.set("sessionId", sessionId);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-Api-Key": cfg.apiKey,
      "Correlation-Id": correlationId,
    },
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  if (!res.ok || !json) {
    const providerError = extractNexiError(
      json as NexiBuildResponse | null,
      "Nexi /build/cardData failed.",
    );
    return {
      error: `${providerError} (HTTP ${res.status}, Correlation-Id: ${correlationId})`,
    };
  }

  return {
    correlationId,
    sessionId,
    raw: json,
  };
}
