import Link from "next/link";
import { CheckCircle2, CircleX, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";

type PaymentOkPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const getParam = (
  value: string | string[] | undefined,
): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export default async function PaymentOkPage({ searchParams }: PaymentOkPageProps) {
  const params = (await searchParams) || {};
  const status = (getParam(params.status) || "result").toLowerCase();
  const orderId = getParam(params.orderId);

  const isCancel = status === "cancel";
  const isResult = status === "result";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          {isCancel ? (
            <CircleX className="h-8 w-8 text-red-500" />
          ) : isResult ? (
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          ) : (
            <Clock3 className="h-8 w-8 text-amber-500" />
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            {isCancel ? "Pagamento annullato" : "Pagamento ricevuto"}
          </h1>
        </div>

        <p className="mb-4 text-sm text-gray-700">
          {isCancel
            ? "L'operazione e stata annullata. Puoi riprovare dal checkout."
            : "Il pagamento e stato inviato a Nexi. Verifica l'esito finale nella tua conferma ordine."}
        </p>

        {orderId ? (
          <p className="mb-6 rounded-md bg-gray-100 px-3 py-2 text-xs text-gray-700">
            Order ID: <span className="font-semibold">{orderId}</span>
          </p>
        ) : null}

        <div className="flex gap-3">
          <Button asChild className="bg-[#0700DE] hover:bg-[#0600b3] text-white">
            <Link href="/ricerca-risultati?step=4">Torna al checkout</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
