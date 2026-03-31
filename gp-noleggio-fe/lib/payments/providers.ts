import type {
  CreatePaymentSessionInput,
  CreatePaymentSessionResult,
} from "@/lib/payments/types";

const NEXI_SANDBOX_ORDERS_BUILD_ENDPOINT =
  "https://xpaysandbox.nexigroup.com/api/phoenix-0.0/psp/api/v1/orders/build";

const buildCheckoutUrl = (
  baseUrl: string,
  input: CreatePaymentSessionInput,
): string => {
  const url = new URL(baseUrl);
  url.searchParams.set("amount", String(input.amount));
  url.searchParams.set("currency", input.currency);
  url.searchParams.set("bookingReference", input.bookingReference);
  return url.toString();
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

  const nexiOrdersEndpoint =
    process.env.NEXI_BUILD_V3_ORDERS_ENDPOINT ||
    process.env.NEXI_BUILD_V3_CHECKOUT_BASE_URL ||
    NEXI_SANDBOX_ORDERS_BUILD_ENDPOINT;
  const nexiApiKey = process.env.NEXI_BUILD_V3_API_KEY;
  const nexiMerchantUrl = process.env.NEXI_BUILD_V3_MERCHANT_URL;
  const nexiResultUrl = process.env.NEXI_BUILD_V3_RESULT_URL;
  const nexiCancelUrl = process.env.NEXI_BUILD_V3_CANCEL_URL;
  const nexiNotificationUrl = process.env.NEXI_BUILD_V3_NOTIFICATION_URL;
  const nexiLanguage = process.env.NEXI_BUILD_V3_LANGUAGE || "ita";

  if (!nexiApiKey) {
    return { error: "Missing NEXI_BUILD_V3_API_KEY configuration." };
  }
  if (!nexiMerchantUrl) {
    return { error: "Missing NEXI_BUILD_V3_MERCHANT_URL configuration." };
  }
  if (!nexiResultUrl) {
    return { error: "Missing NEXI_BUILD_V3_RESULT_URL configuration." };
  }
  if (!nexiCancelUrl) {
    return { error: "Missing NEXI_BUILD_V3_CANCEL_URL configuration." };
  }

  const correlationId = crypto.randomUUID();
  const amountInCents = Math.round(input.amount * 100);
  const orderId = input.bookingReference.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 18);

  const nexiRes = await fetch(nexiOrdersEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": nexiApiKey,
      "Correlation-Id": correlationId,
    },
    body: JSON.stringify({
      version: "3",
      merchantUrl: nexiMerchantUrl,
      order: {
        orderId,
        amount: String(amountInCents),
        currency: input.currency,
        description: `Prenotazione ${orderId}`,
      },
      paymentSession: {
        actionType: "PAY",
        amount: String(amountInCents),
      },
      language: nexiLanguage,
      resultUrl: nexiResultUrl.includes("{orderId}")
        ? nexiResultUrl.replace("{orderId}", orderId)
        : nexiResultUrl,
      cancelUrl: nexiCancelUrl,
      ...(nexiNotificationUrl ? { notificationUrl: nexiNotificationUrl } : {}),
    }),
    cache: "no-store",
  });

  const nexiJson = (await nexiRes.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  if (!nexiRes.ok) {
    const providerError =
      (nexiJson?.message as string | undefined) ??
      (nexiJson?.error as string | undefined) ??
      "Nexi Build v3 order creation failed.";
    return { error: `${providerError} (Correlation-Id: ${correlationId})` };
  }

  const checkoutUrl =
    (nexiJson?.checkoutUrl as string | undefined) ??
    (nexiJson?.paymentUrl as string | undefined) ??
    (nexiJson?.redirectUrl as string | undefined) ??
    (nexiJson?.url as string | undefined) ??
    ((Array.isArray(nexiJson?.fields)
      ? (nexiJson?.fields as Array<{ src?: string }>).find((f) => typeof f?.src === "string")?.src
      : undefined) as string | undefined);

  if (!checkoutUrl) {
    return {
      error: `Nexi response missing checkout URL. (Correlation-Id: ${correlationId})`,
    };
  }

  return { checkoutUrl };
};
