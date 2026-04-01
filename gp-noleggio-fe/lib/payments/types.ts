export type PaymentProvider = "stripe" | "nexi_hpp";

export type CreatePaymentSessionInput = {
  provider: PaymentProvider;
  amount: number;
  currency: "EUR";
  bookingReference: string;
  returnUrl?: string;
};

export type CreatePaymentSessionResult =
  | {
      checkoutUrl: string;
    }
  | {
      error: string;
    };
