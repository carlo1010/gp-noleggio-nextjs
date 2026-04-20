import HeroBanner from "@/components/hero-banner";
import BlockRenderer from "@/components/block-renderer";
import { getPageConfig } from "@/lib/fetchPayload";

// Import dei componenti originali per il fallback di default
import PremiumIntro from "@/components/premium-intro";
import ComeFunziona from "@/components/come-funziona";
import ModelChoice from "@/components/model-choice";
import OfferBar from "@/components/offer-banner";

export default async function Page() {
    const config = await getPageConfig('noleggio-premium');

    return (
        <>
            <OfferBar />
            <HeroBanner imageUrl={'/hero/sfondo-hero-premium.png'} config={config} />
            
            {config?.layout && config.layout.length > 0 ? (
                <BlockRenderer blocks={config.layout} />
            ) : (
                <>
                    <PremiumIntro />
                    <ComeFunziona />
                    <ModelChoice />
                </>
            )}
        </>
    );
}
