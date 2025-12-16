'use client'

import {useIntersection} from "next/dist/client/use-intersection";
import Image from "next/image";
import OfferBanner from "@/components/offer-banner";
import SearchCard from "@/components/search-card";
import { usePathname } from "next/navigation";

export default function HeroBanner() {
    const pathname = usePathname();

    // Decide background image
    const heroImage =
        pathname === "/scopri"
            ? "/hero-scopri.jpg"
            : "/logo-banner.png";
    return (
        <section className="relative min-h-[450px] md:min-h-[600px] lg:min-h-[750px] flex items-end overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <Image
                src={heroImage}
                alt="Hero banner"
                fill
                className="object-cover
                          object-top
                          md:object-center
                          lg:object-[50%_20%]"
                priority
            />

            {/* OPTIONAL OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* TOP CONTENT */}
            <OfferBanner />

            <div className="relative w-full flex justify-center pb-16 px-4">
                <SearchCard />
            </div>
        </section>
    )
}