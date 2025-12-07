import {useIntersection} from "next/dist/client/use-intersection";
import Image from "next/image";
import OfferBanner from "@/components/offer-banner";

export default function HeroBanner() {

    return (
        <section className="relative min-h-[450px] md:min-h-[600px] lg:min-h-[750px] flex items-end">
            <OfferBanner />
            <Image src={"/logo-banner.png"}  alt={"logo hero banner"} fill className="object-cover" priority />

            <div className="relative w-full flex justify-center pb-16 px-4">
                <div className="bg-white rounded-br-3xl  rounded-tl-3xl shadow-xl w-full max-w-4xl p-6">
                    <p className="text-gray-600">Qui dentro mettiamo il form…</p>
                </div>
            </div>
        </section>
    )
}