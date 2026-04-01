export type PaymentProvider = "stripe" | "nexi_hpp";

export type CreatePaymentSessionInput = {
  provider: PaymentProvider;
  amount: number;
  currency: "EUR";
  bookingReference: string;
  returnUrl?: string;
  pickupDateTime?: string;
  dropoffDateTime?: string;
  customerInfo?: {
    cardHolderName?: string;
    cardHolderEmail?: string;
    mobilePhone?: string;
    taxCode?: string;
  };
};

export type CreatePaymentSessionResult =
  | {
      checkoutUrl: string;
    }
  | {
      error: string;
    };
