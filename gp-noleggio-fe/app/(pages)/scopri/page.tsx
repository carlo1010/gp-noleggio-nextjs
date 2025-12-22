
import HeroBanner from "@/components/hero-banner";
import DiscoverSection from "@/components/discover-section";
import WhyRent from "@/components/why-rent";
import DoveSiamo from "@/components/dove-siamo";


const bannerImageUrl = "/hero/sfondo-hero-scopri.jpg";
export default function Scopri() {
    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} />
            <DoveSiamo/>
            <DiscoverSection />
            <WhyRent />
        </>
    );
}