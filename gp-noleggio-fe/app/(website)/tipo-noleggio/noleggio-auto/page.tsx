import type { Metadata } from "next";
import OfferBar from "@/components/offer-banner";
import RentalFeatures from "@/components/rental-features";
import HeroBanner from "@/components/hero-banner";
import ComeFunziona from "@/components/come-funziona";
import InfoNoleggio from "@/components/info-noleggio";

export const metadata: Metadata = {
    title: "Noleggio Auto – Scopri la Flotta di Piccirillo Rent",
    description:
        "Noleggia un'auto tra una vasta gamma di modelli. City car, berlina, SUV: trova il veicolo perfetto per ogni esigenza con Piccirillo Rent in Campania.",
    openGraph: {
        title: "Noleggio Auto | Piccirillo Rent",
        description: "Ampia flotta auto a noleggio. Prenota online e risparmia.",
        url: "/tipo-noleggio/noleggio-auto",
    },
    alternates: { canonical: "/tipo-noleggio/noleggio-auto" },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Noleggio Auto",
    provider: {
        "@type": "Organization",
        name: "Piccirillo Rent",
        url: "https://www.piccirillorent.it",
    },
    description: "Noleggio auto breve e medio termine in Campania",
    areaServed: { "@type": "State", name: "Campania" },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <OfferBar />
            <HeroBanner imageUrl={"/hero/sfondo-hero-auto.png"} />
            <RentalFeatures />
            <ComeFunziona />
            <InfoNoleggio />
        </>
    );
}
