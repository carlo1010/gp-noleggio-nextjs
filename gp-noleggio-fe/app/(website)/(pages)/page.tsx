import type { Metadata } from "next";
import HeroBanner from "@/components/hero-banner";
import OffersSection from "@/components/offer-section";
import FleetSection from "@/components/fleet-section";
import BenefitsSection from "@/components/benefits-section";
import DiscoverSection from "@/components/discover-section";

export const metadata: Metadata = {
    title: "Noleggio Auto, Furgoni ed Elettriche in Campania",
    description:
        "Noleggia auto, furgoni, elettriche e veicoli premium in Campania. Prenota online e risparmia fino al 30%. Flotta rinnovata, massima flessibilità.",
    openGraph: {
        title: "Piccirillo Rent – Noleggio Auto in Campania",
        description:
            "Noleggia auto, furgoni, elettriche e veicoli premium. Prenota online con tariffa scontata.",
        url: "/",
    },
    alternates: { canonical: "/" },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.piccirillorent.it/#organization",
            name: "Gruppo Piccirillo Rent",
            url: "https://www.piccirillorent.it",
            logo: {
                "@type": "ImageObject",
                url: "https://www.piccirillorent.it/logo-rent-colori.png",
            },
            description:
                "Noleggio auto, furgoni, elettriche e premium in Campania.",
            address: {
                "@type": "PostalAddress",
                addressRegion: "Campania",
                addressCountry: "IT",
            },
        },
        {
            "@type": "WebSite",
            "@id": "https://www.piccirillorent.it/#website",
            url: "https://www.piccirillorent.it",
            name: "Piccirillo Rent",
            publisher: { "@id": "https://www.piccirillorent.it/#organization" },
            inLanguage: "it-IT",
        },
        {
            "@type": "WebPage",
            "@id": "https://www.piccirillorent.it/#webpage",
            url: "https://www.piccirillorent.it",
            name: "Piccirillo Rent – Noleggio Auto, Furgoni ed Elettriche in Campania",
            isPartOf: { "@id": "https://www.piccirillorent.it/#website" },
            about: { "@id": "https://www.piccirillorent.it/#organization" },
        },
    ],
};

export default async function Home() {
    const { getPageConfig } = await import("@/lib/fetchPayload");
    const config = await getPageConfig("home");
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-dvh bg-black w-full">
                <HeroBanner imageUrl={"/logo-banner.png"} config={config} />
                <OffersSection config={config} />
                <FleetSection config={config} />
                <BenefitsSection config={config} />
                <DiscoverSection config={config} />
            </main>
        </>
    );
}
