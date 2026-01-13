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
}

export default function HeroBanner({ imageUrl, title, description, promo }: HeroBannerProps) {
    const hasContent = title || promo;

    return (
        <section className={`relative flex flex-col justify-end pt-32 md:pt-0 overflow-hidden ${hasContent
            ? "min-h-dvh md:min-h-[600px] lg:min-h-[750px]"
            : "min-h-[700px] md:min-h-[600px] lg:min-h-[750px]"
            }`}>
            <div className="absolute top-0 left-0 w-full z-40">
                <OfferBanner />
            </div>
            <Image
                src={imageUrl}
                alt={"hero background"}
                fill
                className="object-cover animate-ken-burns"
                priority
            />

            {/* OVERLAY CONTENT */}
            {hasContent && (
                <div className="absolute top-16 md:top-44 left-0 w-full z-10 pointer-events-none">
                    <div className="container mx-auto px-4 max-w-[1240px]">
                        <div className="flex flex-col md:flex-col justify-center items-center md:items-start gap-4 md:gap-4 text-center md:text-left">
                            {/* TOP (MOBILE) / TOP (DESKTOP): PROMO BADGE */}
                            <div className="shrink-0 md:order-1 pointer-events-auto">
                                {promo && (
                                    <BadgePromo
                                        topText={promo.topText}
                                        bottomText={promo.bottomText}
                                        positionClasses="relative"
                                    />
                                )}
                            </div>

                            {/* BOTTOM (MOBILE) / BOTTOM (DESKTOP): TITLE & DESCRIPTION */}
                            <div className="flex-1 md:order-2">
                                {(title || description) && (
                                    <div className="pt-2 md:pt-4 pointer-events-auto">
                                        {title && (
                                            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-md">
                                                {title}
                                            </h1>
                                        )}
                                        {description && (
                                            <p className="text-white/90 text-sm md:text-lg mt-1 md:mt-2 leading-relaxed drop-shadow-md">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SEARCH CARD CONTAINER */}
            <div className={`relative w-full z-30 pb-8 md:pb-16 ${hasContent ? "mt-auto" : ""
                }`}>
                <div className="container mx-auto px-4 max-w-[1240px]">
                    <SearchCard />
                </div>
            </div>
        </section>
    );
}