import OfferBar from "@/components/offer-banner";
import HeroBanner from "@/components/hero-banner";
import Footer from "@/components/footer";
import ComeFunziona from "@/components/come-funziona";
import ModelChoice from "@/components/model-choice";
import PremiumIntro from "@/components/premium-intro";

export default function Page() {
    return (
        <>

            <OfferBar/>
            <HeroBanner imageUrl={'/hero/sfondo-hero-premium.png'}/>
            <PremiumIntro/>
            <Footer/>
            <ComeFunziona/>
            <ModelChoice/>

        </>
    );
}
