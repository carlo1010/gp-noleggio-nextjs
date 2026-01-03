import OfferBar from "@/components/offer-banner";
import ContentSection from "@/components/content-section";
import VantaggiIcone from "@/components/vantaggi-icone";
import HeroBanner from "@/components/hero-banner";

export default function Page() {
    return (
        <>
            <OfferBar/>
            <HeroBanner
                imageUrl={'/hero/sfondo-hero-business.png'}
                title="Noleggio Business"
                description="viaggia per affari in sicurezza"
                promo={{topText: "Fino al", bottomText: "30%"}}
            />

            <ContentSection/>
            <VantaggiIcone/>
        </>
    );
}
