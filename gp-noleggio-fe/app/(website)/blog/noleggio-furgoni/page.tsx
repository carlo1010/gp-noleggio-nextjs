import type { Metadata } from "next";
import Header from "@/components/header";
import OfferBar from "@/components/offer-banner";
import ContentSection from "@/components/content-section";
import VantaggiIcone from "@/components/vantaggi-icone";
import HeroBanner from "@/components/hero-banner";

export const metadata: Metadata = {
    title: "Noleggio Furgoni – Con Te in Ogni Situazione",
    description:
        "Noleggia furgoni per traslochi, lavoro e trasporti con Piccirillo Rent. Flotta vasta, fino al 10% di sconto. Prenota online.",
    openGraph: {
        title: "Noleggio Furgoni | Piccirillo Rent",
        description: "Furgoni a noleggio per ogni esigenza. Fino al 10% di sconto.",
        url: "/blog/noleggio-furgoni",
    },
    alternates: { canonical: "/blog/noleggio-furgoni" },
};

export default function Page() {
    return (
        <>
            <Header/>
            <OfferBar/>
            <HeroBanner
                imageUrl={'/hero/sfondo-hero-furgoni.png'}
                title="Noleggio Furgoni"
                description="con te in ogni situazione"
                promo={{topText: "Fino al", bottomText: "10%"}}
            />
            <ContentSection/>
            <VantaggiIcone/>
        </>
    );
}
