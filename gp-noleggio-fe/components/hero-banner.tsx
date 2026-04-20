"use client";


import Image from "next/image";
import OfferBanner from "@/components/offer-banner";
import SearchCard from "@/components/search-card";
import BadgePromo from "@/components/badge-promo";

interface HeroBannerProps {
    imageUrl: string;
    title?: string;
    description?: string;
    promo?: {
        topText: string;
        bottomText: string;
    };
    showSearch?: boolean;
    compact?: boolean;
    config?: any; // Configurazione dal CMS
}

export default function HeroBanner({ imageUrl, title, description, promo, showSearch = true, compact = false, config }: HeroBannerProps) {
    // Override con valori dal CMS se presenti
    const displayTitle = config?.hero?.title || title;
    const displayDescription = config?.hero?.description || description;
    
    // Gestione immagine di sfondo: priorità al CMS
    let finalImageUrl = imageUrl;
    if (config?.hero?.bgImage?.url) {
        finalImageUrl = config.hero.bgImage.url;
    }

    const hasContent = displayTitle || promo;

    const heightClass = compact
        ? "min-h-[160px] md:min-h-[200px]"
        : hasContent
            ? "min-h-dvh md:min-h-[600px] lg:min-h-[750px]"
            : "min-h-[700px] md:min-h-[600px] lg:min-h-[750px]";

    return (
        <section className={`relative flex flex-col justify-end pt-32 md:pt-0 ${heightClass}`}>
            <div className="absolute top-0 left-0 w-full z-40">
                <OfferBanner />
            </div>
            <Image src={finalImageUrl} alt={"logo hero banner"} fill className="object-cover" priority />

            {/* OVERLAY CONTENT */}
            {hasContent && (
                <div className="absolute top-24 md:top-44 left-0 w-full z-10 pointer-events-none">
                    <div className="container mx-auto px-4 max-w-[1240px]">
                        <div className="flex flex-row md:flex-col justify-between md:justify-start items-start gap-2 md:gap-4">

                            {/* LEFT (MOBILE) / BOTTOM (DESKTOP): TITLE & DESCRIPTION */}
                            <div className="flex-1 md:order-2">
                                {(title || description) && (
                                    <div className="pt-2 md:pt-4 pointer-events-auto">
                                        {displayTitle && (
                                            <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight drop-shadow-md">
                                                {displayTitle}
                                            </h1>
                                        )}
                                        {displayDescription && (
                                            <p className="text-white/90 text-sm md:text-lg mt-1 md:mt-2 leading-relaxed drop-shadow-md">
                                                {displayDescription}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT (MOBILE) / TOP (DESKTOP): PROMO BADGE */}
                            <div className="shrink-0 md:order-1 pointer-events-auto">
                                {promo && (
                                    <BadgePromo
                                        topText={promo.topText}
                                        bottomText={promo.bottomText}
                                        positionClasses="relative"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SEARCH CARD CONTAINER */}
            {showSearch && (
                <div className={`relative w-full z-30 pb-8 md:pb-16 ${hasContent ? "mt-auto" : ""}`}>
                    <div className="container mx-auto px-4 max-w-[1240px]">
                        <SearchCard />
                    </div>
                </div>
            )}
        </section>
    );
}