"use client";


import Image from "next/image";
import OfferBanner from "@/components/offer-banner";
import SearchCard from "@/components/search-card";

interface HeroBannerProps {
    imageUrl: string;
}

export default function HeroBanner(props: HeroBannerProps) {

    return (
        <section className="relative min-h-[450px] md:min-h-[600px] lg:min-h-[750px] flex items-end">
            <OfferBanner/>
            <Image src={props.imageUrl} alt={"logo hero banner"} fill className="object-cover" priority/>

            <div className="relative w-full flex justify-center pb-16 px-4">
                <SearchCard/>
            </div>
        </section>
    )
}