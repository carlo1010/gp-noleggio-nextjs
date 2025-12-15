import Header from "@/components/header";
import OfferBar from "@/components/offer-banner";
import HeroVacanzaSection from "@/components/hero-vacanza";
import ContentSection from "@/components/content-section";
import VantaggiIcone from "@/components/vantaggi-icone";

export default function Page() {
    return (
        <>
            <OfferBar/>
            <HeroVacanzaSection/>
            <ContentSection/>
            <VantaggiIcone/>
        </>
    );
}
