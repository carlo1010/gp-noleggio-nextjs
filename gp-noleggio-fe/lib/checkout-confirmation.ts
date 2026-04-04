import type { CheckoutState } from "@/store/checkout.store";

const CHECKOUT_CONFIRMATION_KEY = "checkout-confirmation";

export type CheckoutConfirmationSnapshot = {
    search: CheckoutState["search"];
    veicolo?: CheckoutState["veicolo"];
    tariffa: CheckoutState["tariffa"];
    protezioni: CheckoutState["protezioni"];
    servizi: CheckoutState["servizi"];
    conducente: CheckoutState["conducente"];
    totale: number;
    bookingReference?: string;
    savedAt: string;
};

export function saveCheckoutConfirmationSnapshot(
    snapshot: CheckoutConfirmationSnapshot,
) {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(
        CHECKOUT_CONFIRMATION_KEY,
        JSON.stringify(snapshot),
    );
}

export function loadCheckoutConfirmationSnapshot() {
    if (typeof window === "undefined") return null;

    const raw = window.sessionStorage.getItem(CHECKOUT_CONFIRMATION_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as CheckoutConfirmationSnapshot;
    } catch {
        return null;
    }
}

export function clearCheckoutConfirmationSnapshot() {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(CHECKOUT_CONFIRMATION_KEY);
}
