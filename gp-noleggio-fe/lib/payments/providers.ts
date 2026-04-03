import { buildBackendApiUrl } from "@/lib/backend-api";
import type {
  CreatePaymentSessionInput,
  CreatePaymentSessionResult,
} from "@/lib/payments/types";

const NBT_NEXI_SESSION_PATHS = ["/api/nbt/nexi/session", "/nbt/nexi/session"] as const;

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

  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  const baseEndsWithApi = rawBaseUrl
    ? rawBaseUrl.replace(/\/+$/, "").endsWith("/api")
    : false;
  const nexiSessionPaths = baseEndsWithApi
    ? ["/nbt/nexi/session"]
    : [...NBT_NEXI_SESSION_PATHS];

  let backendSessionUrls: string[];
  try {
    backendSessionUrls = nexiSessionPaths.map((path) => buildBackendApiUrl(path));
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Missing NEXT_PUBLIC_API_URL configuration.",
    };
  }

  const backendPayload = {
    amount: input.amount,
    currency: input.currency,
    bookingReference: input.bookingReference,
    ...(input.customerInfo ? { customerInfo: input.customerInfo } : {}),
    ...(input.prenotaPayload ? { prenotaPayload: input.prenotaPayload } : {}),
  };

  let sessionRes: Response | null = null;
  let usedPath: string | null = null;
  for (let i = 0; i < backendSessionUrls.length; i += 1) {
    const candidateUrl = backendSessionUrls[i];
    const candidatePath = nexiSessionPaths[i];
    const res = await fetch(candidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendPayload),
      cache: "no-store",
    });

    sessionRes = res;
    usedPath = candidatePath;
    if (res.status !== 404 || i === backendSessionUrls.length - 1) {
      break;
    }
  }

  if (!sessionRes || !usedPath) {
    return { error: "Nexi session request failed before receiving a response." };
  }

  const rawBody = await sessionRes.text();
  const sessionJson = (() => {
    if (!rawBody) return null;
    try {
      return JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return null;
    }
  })();

  if (!sessionRes.ok) {
    const providerError =
      (sessionJson?.error as string | undefined) ??
      (sessionJson?.message as string | undefined) ??
      (sessionJson?.description as string | undefined) ??
      "Nexi session creation failed.";
    const diagnostic = rawBody && !sessionJson ? ` Raw: ${rawBody.slice(0, 300)}` : "";
    return {
      error: `${providerError} (HTTP ${sessionRes.status}, Endpoint: ${usedPath})${diagnostic}`,
    };
  }

  const checkoutUrl =
    (sessionJson?.checkoutUrl as string | undefined) ??
    (sessionJson?.redirectUrl as string | undefined) ??
    (sessionJson?.hostedPage as string | undefined) ??
    (sessionJson?.url as string | undefined);

  if (!checkoutUrl) {
    return {
      error: "Nexi session response missing checkout URL.",
    };
  }

  return { checkoutUrl };
};
