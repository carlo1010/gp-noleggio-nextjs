import HeroBanner from "@/components/hero-banner";
import BlockRenderer from "@/components/block-renderer";
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
            
            {config?.layout && config.layout.length > 0 ? (
                <BlockRenderer blocks={config.layout} />
            ) : (
                <>
                    <DoveSiamo />
                    <DiscoverSection />
                    <WhyRent />
                </>
            )}
        </>
    );
}