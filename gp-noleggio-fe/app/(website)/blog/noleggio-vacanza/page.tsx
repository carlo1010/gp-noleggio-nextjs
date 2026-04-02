import type { Metadata } from "next";
import OfferBar from "@/components/offer-banner";
import ContentSection from "@/components/content-section";
import VantaggiIcone from "@/components/vantaggi-icone";
import HeroBanner from "@/components/hero-banner";

export const metadata: Metadata = {
    title: "Noleggio Vacanza – Viaggia on the Road",
    description:
        "Noleggia un'auto per le vacanze in Campania e dintorni. Fino al 20% di sconto. Scopri la flotta di Piccirillo Rent per i tuoi viaggi.",
    openGraph: {
        title: "Noleggio Vacanza | Piccirillo Rent",
        description: "Auto a noleggio per le vacanze. Fino al 20% di sconto.",
        url: "/blog/noleggio-vacanza",
    },
    alternates: { canonical: "/blog/noleggio-vacanza" },
};


export default function Page() {
    return (
        <>
            <OfferBar/>
            <HeroBanner
                imageUrl={'/hero/sfondo-hero-vacanza.png'}
                title="Noleggio Vacanza"
                description="e viaggia on the road"
                promo={{topText: "Fino al", bottomText: "20%"}}
            />
            <ContentSection/>
            <VantaggiIcone/>
        </>
    );
}
