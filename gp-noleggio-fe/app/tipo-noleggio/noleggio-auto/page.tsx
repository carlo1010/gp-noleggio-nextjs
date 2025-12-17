import OfferBar from "@/components/offer-banner";
import RentalFeatures from "@/components/rental-features";
import HeroBanner from "@/components/hero-banner";
import Footer from "@/components/footer";
import ComeFunziona from "@/components/come-funziona";
import InfoNoleggio from "@/components/info-noleggio";

export default function Page() {
    return (
        <>

            <OfferBar/>
            <HeroBanner imageUrl={'/hero/sfondo-hero-auto.png'}/>
            <RentalFeatures/>
            <Footer/>
            <ComeFunziona/>
            <InfoNoleggio/>

        </>
    );
}
