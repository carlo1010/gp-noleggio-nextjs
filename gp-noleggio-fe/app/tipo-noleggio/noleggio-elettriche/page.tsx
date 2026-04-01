import type { Metadata } from "next";
import OfferBar from "@/components/offer-banner";
import HeroBanner from "@/components/hero-banner";
import FlottaGriglia from "@/components/flotta-griglia";
import GammaElettricaInfo from "@/components/gamma-elettricainfo";
import BannerElettriche from "@/components/banner-elettriche";
import InfoElettrico from "@/components/info-elettrico";
import ElettricoKeyPoints from "@/components/elettrico-key-points";

export const metadata: Metadata = {
    title: "Noleggio Auto Elettriche – Mobilità Green in Campania",
    description:
        "Noleggia auto elettriche: Tesla Model Y, Tesla Model 3, Mercedes EQA, Fiat 500e, Jeep Avenger e altro. Zero emissioni, massima tecnologia con Piccirillo Rent.",
    openGraph: {
        title: "Noleggio Auto Elettriche | Piccirillo Rent",
        description:
            "Flotta elettrica completa: Tesla, Mercedes, Fiat e altri. Noleggio green in Campania.",
        url: "/tipo-noleggio/noleggio-elettriche",
    },
    alternates: { canonical: "/tipo-noleggio/noleggio-elettriche" },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Noleggio Auto Elettriche",
    provider: {
        "@type": "Organization",
        name: "Piccirillo Rent",
        url: "https://www.piccirillorent.it",
    },
    description:
        "Noleggio auto elettriche con flotta Tesla, Mercedes EQA, Fiat 500e, Jeep Avenger e altri in Campania",
    areaServed: { "@type": "State", name: "Campania" },
};

const cars = [
    {imageUrl: "/fleet/fiat-500.png", nome: "Fiat 500", autonomia: "Autonomia 190/320"},
    {imageUrl: "/fleet/citroen-c4.png", nome: "Citroen C4", autonomia: "Autonomia 300"},
    {imageUrl: "/fleet/mercedes-eqa.png", nome: "Mercedes EQA", autonomia: "Autonomia 460 km"},
    {imageUrl: "/fleet/mg-4.png", nome: "MG 4", autonomia: "Autonomia 350"},
    {imageUrl: "/fleet/opel-mokka.png", nome: "Opel Mokka", autonomia: "Autonomia 338 km"},
    {imageUrl: "/fleet/tesla-model-y.png", nome: "Tesla Model Y", autonomia: "Autonomia 450 km"},
    {imageUrl: "/fleet/jeep-avenger.png", nome: "Jeep Avenger", autonomia: "Autonomia 400 km"},
    {imageUrl: "/fleet/tesla-model-3.png", nome: "Tesla Model 3", autonomia: "Autonomia 540 km"},
    {imageUrl: "/fleet/mercedes-eqb.png", nome: "Mercedes EQB", autonomia: "Autonomia 474 km"},
    {imageUrl: "/fleet/peugeot-e-2008.png", nome: "Peugeot E-2008", autonomia: "Autonomia 328 km"},
    {imageUrl: "/fleet/peugeot-e-208.png", nome: "Peugeot E-208", autonomia: "Autonomia 340 km"},
    {imageUrl: "/fleet/fiat-600.png", nome: "Fiat 600", autonomia: "Autonomia 400 km"},
];


export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <OfferBar />
            <HeroBanner imageUrl={"/hero/sfondo-hero-elettriche.png"} />
            <GammaElettricaInfo />
            <FlottaGriglia title="La nostra flotta" cars={cars} />
            <BannerElettriche />
            <InfoElettrico />
            <ElettricoKeyPoints />
        </>
    );
}
