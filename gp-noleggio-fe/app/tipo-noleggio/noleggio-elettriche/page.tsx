import OfferBar from "@/components/offer-banner";
import HeroBanner from "@/components/hero-banner";
import FlottaGriglia from "@/components/flotta-griglia";
import GammaElettricaInfo from "@/components/gamma-elettricainfo";
import BannerElettriche from "@/components/banner-elettriche";

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

            <OfferBar/>
            <HeroBanner imageUrl={'/hero/sfondo-hero-elettriche.png'}/>
            <GammaElettricaInfo/>
            <FlottaGriglia title="La nostra flotta" cars={cars}/>
            <BannerElettriche/>


        </>
    );
}