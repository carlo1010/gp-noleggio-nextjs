import type { Metadata } from "next";
import OfferBar from "@/components/offer-banner";
import ContentSection from "@/components/content-section";
import VantaggiIcone from "@/components/vantaggi-icone";
import HeroBanner from "@/components/hero-banner";

export const metadata: Metadata = {
    title: "Noleggio Business – Viaggia per Lavoro in Sicurezza",
    description:
        "Soluzioni di noleggio auto per professionisti e aziende. Risparmia fino al 30% con le tariffe business di Piccirillo Rent.",
    openGraph: {
        title: "Noleggio Business | Piccirillo Rent",
        description: "Auto a noleggio per aziende e professionisti. Fino al 30% di sconto.",
        url: "/blog/noleggio-business",
    },
    alternates: { canonical: "/blog/noleggio-business" },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Noleggio Auto Business",
    provider: {
        "@type": "Organization",
        name: "Piccirillo Rent",
        url: "https://www.piccirillorent.it",
    },
    description: "Soluzioni di noleggio auto per professionisti e aziende in Campania",
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
            <HeroBanner
                imageUrl={"/hero/sfondo-hero-business.png"}
                title="Noleggio Business"
                description="viaggia per affari in sicurezza"
                promo={{ topText: "Fino al", bottomText: "30%" }}
            />
            <ContentSection />
            <VantaggiIcone />
        </>
    );
}
