import HeroBanner from "@/components/hero-banner";
import BlockRenderer from "@/components/block-renderer";
import { getPageConfig } from "@/lib/fetchPayload";

// Import dei componenti originali per il fallback di default
import OffersSection from "@/components/offer-section";
import FleetSection from "@/components/fleet-section";
import BenefitsSection from "@/components/benefits-section";
import DiscoverSection from "@/components/discover-section";


export default async function Home() {
    const config = await getPageConfig('home');

    return (
        <main className="min-h-dvh bg-black w-full">
            <HeroBanner imageUrl={'/logo-banner.png'} config={config} />
            
            {config?.layout && config.layout.length > 0 ? (
                <BlockRenderer blocks={config.layout} />
            ) : (
                <>
                    <OffersSection />
                    <FleetSection />
                    <BenefitsSection />
                    <DiscoverSection />
                </>
            )}
        </main>
    );
}
