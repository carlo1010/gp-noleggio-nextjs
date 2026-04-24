import HeroBanner from "@/components/hero-banner";

import { getPageConfig } from "@/lib/fetchPayload";

// Import dei componenti originali per il fallback di default
import GammaElettricaInfo from "@/components/gamma-elettricainfo";
import FlottaGriglia from "@/components/flotta-griglia";
import BannerElettriche from "@/components/banner-elettriche";
import InfoElettrico from "@/components/info-elettrico";
import ElettricoKeyPoints from "@/components/elettrico-key-points";
import OfferBar from "@/components/offer-banner";

const cars = [
    {image: "/fleet/fiat-500.png", name: "Fiat 500", autonomia: "Autonomia 190/320"},
    {image: "/fleet/citroen-c4.png", name: "Citroen C4", autonomia: "Autonomia 300"},
    {image: "/fleet/mercedes-eqa.png", name: "Mercedes EQA", autonomia: "Autonomia 460 km"},
    {image: "/fleet/mg-4.png", name: "MG 4", autonomia: "Autonomia 350"},
    {image: "/fleet/opel-mokka.png", name: "Opel Mokka", autonomia: "Autonomia 338 km"},
    {image: "/fleet/tesla-model-y.png", name: "Tesla Model Y", autonomia: "Autonomia 450 km"},
    {image: "/fleet/jeep-avenger.png", name: "Jeep Avenger", autonomia: "Autonomia 400 km"},
    {image: "/fleet/tesla-model-3.png", name: "Tesla Model 3", autonomia: "Autonomia 540 km"},
    {image: "/fleet/mercedes-eqb.png", name: "Mercedes EQB", autonomia: "Autonomia 474 km"},
    {image: "/fleet/peugeot-e-2008.png", name: "Peugeot E-2008", autonomia: "Autonomia 328 km"},
    {image: "/fleet/peugeot-e-208.png", name: "Peugeot E-208", autonomia: "Autonomia 340 km"},
    {image: "/fleet/fiat-600.png", name: "Fiat 600", autonomia: "Autonomia 400 km"},
];



export default async function Page() {
    const config = await getPageConfig('noleggio-elettriche');

    return (
        <>
            <OfferBar />
            <HeroBanner imageUrl={'/hero/sfondo-hero-elettriche.png'} config={config} />
            
            <GammaElettricaInfo config={config} />
            <FlottaGriglia title="La nostra flotta" cars={cars} config={config} />
            <BannerElettriche config={config} />
            <InfoElettrico config={config} />
            <ElettricoKeyPoints config={config} />
        </>
    );
}