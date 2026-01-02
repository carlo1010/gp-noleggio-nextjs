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
        <section className={`relative flex items-end pt-32 md:pt-0 ${
            hasContent
                ? "min-h-[920px] md:min-h-[600px] lg:min-h-[750px]"
                : "min-h-[700px] md:min-h-[600px] lg:min-h-[750px]"
        }`}>
            <OfferBanner/>
            <Image src={imageUrl} alt={"logo hero banner"} fill className="object-cover" priority/>

            {/* OVERLAY CONTENT */}
            {hasContent && (
                <div className="absolute top-44 md:top-44 left-0 w-full z-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-row md:flex-col justify-between md:justify-start items-start gap-4">

                        {/* LEFT (MOBILE) / BOTTOM (DESKTOP): TITLE & DESCRIPTION */}
                        <div className="flex-1 md:order-2">
                            {(title || description) && (
                                <div className="pt-2 md:pt-4">
                                    {title && (
                                        <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight drop-shadow-md">
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

                        {/* RIGHT (MOBILE) / TOP (DESKTOP): PROMO BADGE */}
                        <div className="flex-shrink-0 md:order-1">
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

            <div className={`relative w-full flex justify-center pb-16 px-4 z-30 ${
                hasContent ? "mt-16 md:mt-0" : "mt-8 md:mt-0"
            }`}>
                <SearchCard/>
            </div>
        </section>
    );
}