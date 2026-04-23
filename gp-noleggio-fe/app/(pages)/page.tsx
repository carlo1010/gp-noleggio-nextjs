import HeroBanner from "@/components/hero-banner";

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
            
            <OffersSection config={config} />
            <FleetSection config={config} />
            <BenefitsSection config={config} />
            <DiscoverSection config={config} />
        </main>
    );
}
