import Header from "@/components/header";
import OfferBar from "@/components/offer-banner";
import ContentSection from "@/components/content-section";
import VantaggiIcone from "@/components/vantaggi-icone";
import HeroBanner from "@/components/hero-banner";

export default function Page() {
    return (
        <>
            <Header/>
            <OfferBar/>
            <HeroBanner imageUrl={'/hero/sfondo-hero-furgoni.png'}/>
            <ContentSection/>
            <VantaggiIcone/>
        </>
    );
}
