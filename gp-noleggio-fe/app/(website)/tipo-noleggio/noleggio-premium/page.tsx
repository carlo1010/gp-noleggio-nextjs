import type { Metadata } from "next";
import OfferBar from "@/components/offer-banner";
import HeroBanner from "@/components/hero-banner";
import ComeFunziona from "@/components/come-funziona";
import ModelChoice from "@/components/model-choice";
import PremiumIntro from "@/components/premium-intro";

export const metadata: Metadata = {
    title: "Noleggio Auto Premium – Eleganza e Lusso con Piccirillo Rent",
    description:
        "Noleggia auto premium e di alta gamma con Piccirillo Rent. Scegli il modello di lusso che preferisci tra la nostra gamma di veicoli selezionati in Campania.",
    openGraph: {
        title: "Noleggio Auto Premium | Piccirillo Rent",
        description: "Auto di lusso e premium a noleggio. Scegli il meglio con Piccirillo Rent.",
        url: "/tipo-noleggio/noleggio-premium",
    },
    alternates: { canonical: "/tipo-noleggio/noleggio-premium" },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Noleggio Auto Premium",
    provider: {
        "@type": "Organization",
        name: "Piccirillo Rent",
        url: "https://www.piccirillorent.it",
    },
    description: "Noleggio auto premium e di lusso in Campania",
    areaServed: { "@type": "State", name: "Campania" },
};

export default async function Page() {
    const { getPageConfig } = await import("@/lib/fetchPayload");
    const config = await getPageConfig("noleggio-premium");
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <OfferBar />
            <HeroBanner imageUrl={"/hero/sfondo-hero-premium.png"} config={config} />
            <PremiumIntro config={config} />
            <ComeFunziona config={config} />
            <ModelChoice config={config} />
        </>
    );
}
