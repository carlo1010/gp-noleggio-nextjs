import HeroBanner from "@/components/hero-banner";

import { getPageConfig } from "@/lib/fetchPayload";

// Import dei componenti originali per il fallback di default
import DoveSiamo from "@/components/dove-siamo";
import DiscoverSection from "@/components/discover-section";
import WhyRent from "@/components/why-rent";


const bannerImageUrl = "/hero/sfondo-hero-scopri.jpg";
export default async function Scopri() {
    const config = await getPageConfig('scopri');

    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} config={config} />
            
            <DoveSiamo config={config} />
            <DiscoverSection config={config} />
            <WhyRent config={config} />
        </>
    );
}