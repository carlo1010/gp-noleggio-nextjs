import type { Metadata } from "next";
import { Suspense } from "react";

import RicercaRisultatiClient from "@/app/(website)/ricerca-risultati/_components/ricercaRisultatiClient";

export const metadata: Metadata = {
    title: "Risultati Ricerca Veicoli",
    robots: { index: false, follow: false },
};

export default function RicercaRisultatiPage() {
    return (
        <Suspense fallback={null}>
            <RicercaRisultatiClient />
        </Suspense>
    );
}
