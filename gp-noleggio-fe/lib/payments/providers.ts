import type {
  CreatePaymentSessionInput,
  CreatePaymentSessionResult,
} from "@/lib/payments/types";

const NEXI_SANDBOX_ORDERS_HPP_ENDPOINT =
  "https://xpaysandbox.nexigroup.com/api/phoenix-0.0/psp/api/v1/orders/hpp";

const resolveNexiHppEndpoint = (raw?: string): string => {
  const candidate = raw?.trim();
  if (!candidate) return NEXI_SANDBOX_ORDERS_HPP_ENDPOINT;
  if (candidate.includes("/orders/hpp")) return candidate;
  if (candidate.includes("/orders/build")) {
    return candidate.replace("/orders/build", "/orders/hpp");
  }
  return candidate;
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

const isLikelyGatewayApiUrl = (url: string): boolean =>
  /nexigroup\.com\/api\//i.test(url);

const buildCheckoutUrl = (
  baseUrl: string,
  input: CreatePaymentSessionInput,
): string => {
  const url = new URL(baseUrl);
  url.searchParams.set("amount", String(input.amount));
  url.searchParams.set("currency", input.currency);
  url.searchParams.set("bookingReference", input.bookingReference);
  if (input.returnUrl) {
    url.searchParams.set("returnUrl", input.returnUrl);
  }
  return url.toString();
};

const buildNexiUrls = (
  input: CreatePaymentSessionInput,
  orderId: string,
): {
  resultUrl: string;
  cancelUrl: string;
  notificationUrl?: string;
} => {
  const siteBaseUrl = normalizeBaseUrl(
    process.env.NEXI_HPP_SITE_URL ||
      process.env.NEXI_BUILD_V3_SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL,
  );
  const usableSiteBaseUrl =
    siteBaseUrl && !isLikelyGatewayApiUrl(siteBaseUrl) ? siteBaseUrl : undefined;

  const explicitResultUrl =
    process.env.NEXI_HPP_RESULT_URL || process.env.NEXI_BUILD_V3_RESULT_URL;
  const explicitCancelUrl =
    process.env.NEXI_HPP_CANCEL_URL || process.env.NEXI_BUILD_V3_CANCEL_URL;
  const explicitNotificationUrl =
    process.env.NEXI_HPP_NOTIFICATION_URL ||
    process.env.NEXI_BUILD_V3_NOTIFICATION_URL;

  const fallbackBaseUrl =
    input.returnUrl ||
    (usableSiteBaseUrl ? `${usableSiteBaseUrl}/ricerca-risultati?step=4` : undefined);

  const resultUrlTemplate =
    fallbackBaseUrl || explicitResultUrl || "http://localhost:3000/paymentOK";
  const cancelUrlTemplate = fallbackBaseUrl || explicitCancelUrl || resultUrlTemplate;

  const resultUrl = new URL(resultUrlTemplate);
  resultUrl.searchParams.set("payment", "nexi");
  resultUrl.searchParams.set("status", "result");
  resultUrl.searchParams.set("orderId", orderId);

  const cancelUrl = new URL(cancelUrlTemplate);
  cancelUrl.searchParams.set("payment", "nexi");
  cancelUrl.searchParams.set("status", "cancel");
  cancelUrl.searchParams.set("orderId", orderId);

  const notificationUrl =
    explicitNotificationUrl ||
    (usableSiteBaseUrl
      ? `${usableSiteBaseUrl}/api/payments/nexi/notification`
      : undefined);

  return {
    resultUrl: resultUrl.toString(),
    cancelUrl: cancelUrl.toString(),
    ...(notificationUrl ? { notificationUrl } : {}),
  };
};

export const createPaymentSession = async (
  input: CreatePaymentSessionInput,
): Promise<CreatePaymentSessionResult> => {
  if (input.provider === "stripe") {
    const stripeCheckoutBaseUrl = process.env.STRIPE_CHECKOUT_BASE_URL;
    if (!stripeCheckoutBaseUrl) {
      return { error: "Missing STRIPE_CHECKOUT_BASE_URL configuration." };
    }

    return { checkoutUrl: buildCheckoutUrl(stripeCheckoutBaseUrl, input) };
  }

  const nexiOrdersEndpoint = resolveNexiHppEndpoint(
    process.env.NEXI_HPP_ORDERS_ENDPOINT || process.env.NEXI_BUILD_V3_ORDERS_ENDPOINT,
  );
  const nexiApiKey = process.env.NEXI_HPP_API_KEY || process.env.NEXI_BUILD_V3_API_KEY;

  if (!nexiApiKey) {
    return { error: "Missing NEXI_HPP_API_KEY configuration." };
  }

  const correlationId = crypto.randomUUID();
  const amountInCents = Math.round(input.amount * 100);
  const orderId = input.bookingReference.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 18);
  const nexiUrls = buildNexiUrls(input, orderId);

  const customerId = input.customerInfo?.taxCode || "Test";
  
  const descriptionParts = ["Prenotazione noleggio con GP Rental"];
  const pickupDt = input.pickupDateTime?.trim();
  const dropoffDt = input.dropoffDateTime?.trim();
  
  if (pickupDt) {
    descriptionParts.push(pickupDt);
  }
  if (dropoffDt) {
    if (pickupDt) {
      descriptionParts.push("-");
    }
    descriptionParts.push(dropoffDt);
  }
  
  const description = descriptionParts.join(" ");

  console.log("Payment description details:", {
    pickupDateTime: input.pickupDateTime,
    dropoffDateTime: input.dropoffDateTime,
    description,
    allParts: descriptionParts,
  });

  const nexiRes = await fetch(nexiOrdersEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": nexiApiKey,
      "Correlation-Id": correlationId,
    },
    body: JSON.stringify({
      order: {
        orderId,
        customerId,
        description,
        amount: amountInCents,
        currency: input.currency,
        ...(input.customerInfo
          ? {
              customerInfo: {
                ...(input.customerInfo.cardHolderName
                  ? { cardHolderName: input.customerInfo.cardHolderName }
                  : {}),
                ...(input.customerInfo.cardHolderEmail
                  ? { cardHolderEmail: input.customerInfo.cardHolderEmail }
                  : {}),
                ...(input.customerInfo.mobilePhone
                  ? { mobilePhone: input.customerInfo.mobilePhone }
                  : {}),
                ...(input.customerInfo.taxCode
                  ? { taxCode: input.customerInfo.taxCode }
                  : {}),
              },
            }
          : {}),
      },
      paymentSession: {
        actionType: "PAY",
        paymentService: "CARDS",
        amount: amountInCents,
        resultUrl: nexiUrls.resultUrl,
        cancelUrl: nexiUrls.cancelUrl,
        ...(nexiUrls.notificationUrl
          ? { notificationUrl: nexiUrls.notificationUrl }
          : {}),
      },
    }),
    cache: "no-store",
  });

  const rawBody = await nexiRes.text();
  const nexiJson = (() => {
    if (!rawBody) return null;
    try {
      return JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return null;
    }
  })();

  if (!nexiRes.ok) {
    const providerError =
      (nexiJson?.message as string | undefined) ??
      (nexiJson?.description as string | undefined) ??
      (nexiJson?.error as string | undefined) ??
      "Nexi HPP order creation failed.";
    const diagnostic =
      rawBody && !nexiJson ? ` Raw: ${rawBody.slice(0, 300)}` : "";
    return {
      error: `${providerError} (HTTP ${nexiRes.status}, Endpoint: ${nexiOrdersEndpoint}, Correlation-Id: ${correlationId})${diagnostic}`,
    };
  }

  const paymentSession =
    (nexiJson?.paymentSession as Record<string, unknown> | undefined) ?? undefined;

  const checkoutUrl =
    (nexiJson?.hostedPage as string | undefined) ??
    (nexiJson?.checkoutUrl as string | undefined) ??
    (nexiJson?.paymentUrl as string | undefined) ??
    (nexiJson?.redirectUrl as string | undefined) ??
    (nexiJson?.url as string | undefined) ??
    (paymentSession?.url as string | undefined) ??
    (paymentSession?.redirectUrl as string | undefined);

  if (!checkoutUrl) {
    return {
      error: `Nexi response missing checkout URL. (Correlation-Id: ${correlationId})`,
    };
  }

  return { checkoutUrl };
};
