import { Suspense } from "react";

import RicercaRisultatiClient from "@/app/ricerca-risultati/_components/ricercaRisultatiClient";

export default function RicercaRisultatiPage() {
    return (
        <Suspense fallback={null}>
            <RicercaRisultatiClient />
        </Suspense>
    );
}
