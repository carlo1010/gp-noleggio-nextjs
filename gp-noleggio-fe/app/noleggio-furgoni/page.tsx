import Header from "@/components/header";
import OfferBar from "@/components/offer-banner";
import HeroFurgoni from "@/components/hero-furgoni";
import ContentSection from "@/components/content-section";
import VantaggiIcone from "@/components/vantaggi-icone";
import TerminiCondizioni from "@/components/termini-condizioni";

export default function Page() {
    return (
        <>
            <Header/>
            <OfferBar/>
            <HeroFurgoni/>
            <ContentSection/>
            <VantaggiIcone/>
            <TerminiCondizioni/>
        </>
    );
}
