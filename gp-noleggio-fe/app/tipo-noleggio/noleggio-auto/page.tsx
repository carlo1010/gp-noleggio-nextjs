import HeroBanner from "@/components/hero-banner";
import BlockRenderer from "@/components/block-renderer";
import { getPageConfig } from "@/lib/fetchPayload";

// Import dei componenti originali per il fallback di default
import RentalFeatures from "@/components/rental-features";
import ComeFunziona from "@/components/come-funziona";
import InfoNoleggio from "@/components/info-noleggio";
import OfferBar from "@/components/offer-banner";

export default async function Page() {
    const config = await getPageConfig('noleggio-auto');

    return (
        <>
            <OfferBar />
            <HeroBanner imageUrl={'/hero/sfondo-hero-auto.png'} config={config} />
            
            {config?.layout && config.layout.length > 0 ? (
                <BlockRenderer blocks={config.layout} />
            ) : (
                <>
                    <RentalFeatures />
                    <ComeFunziona />
                    <InfoNoleggio />
                </>
            )}
        </>
    );
}
