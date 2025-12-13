import {useIntersection} from "next/dist/client/use-intersection";
import Image from "next/image";
import OfferBanner from "@/components/offer-banner";
import SearchCard from "@/components/search-card";


export default function HeroBanner() {

    return (
        <section className="relative min-h-[450px] md:min-h-[600px] lg:min-h-[750px] flex items-end">
            <OfferBanner/>
            <Image src={"/sfondo-hero-vacanza.png"} alt={"logo hero banner"} fill className="object-cover" priority/>


            <div className="relative w-full flex justify-center pb-16 px-4">
                <SearchCard/>
            </div>
        </section>
    )
}

{/* AGGIUNGERE BANNER 20 % DI SCONTO  */
}