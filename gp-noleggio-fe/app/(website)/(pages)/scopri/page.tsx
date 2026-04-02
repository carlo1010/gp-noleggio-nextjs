import type { Metadata } from "next";
import HeroBanner from "@/components/hero-banner";
import DiscoverSection from "@/components/discover-section";
import WhyRent from "@/components/why-rent";
import DoveSiamo from "@/components/dove-siamo";

export const metadata: Metadata = {
    title: "Scopri Piccirillo Rent – Dove Siamo e Come Funziona",
    description:
        "Scopri dove siamo, come funziona il noleggio e perché scegliere Piccirillo Rent per il tuo prossimo viaggio in Campania.",
    openGraph: {
        title: "Scopri Piccirillo Rent",
        description: "Come funziona il noleggio e dove siamo.",
        url: "/scopri",
    },
    alternates: { canonical: "/scopri" },
};

const bannerImageUrl = "/hero/sfondo-hero-scopri.jpg";
export default function Scopri() {
    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} />
            <DoveSiamo/>
            <DiscoverSection />
            <WhyRent />
        </>
    );
}