export type PaymentProvider = "stripe" | "nexi_build_v3";

export type CreatePaymentSessionInput = {
  provider: PaymentProvider;
  amount: number;
  currency: "EUR";
  bookingReference: string;
};

export type CreatePaymentSessionResult =
  | {
      checkoutUrl: string;
    }
  | {
      error: string;
    };
