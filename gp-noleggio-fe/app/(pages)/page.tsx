import Image from "next/image";
import {Button} from "@/components/ui/button";
import HeroBanner from "@/components/hero-banner";
import {makeGetServerInsertedHTML} from "next/dist/server/app-render/make-get-server-inserted-html";
import OffersSection from "@/components/offer-section";
import FleetSection from "@/components/fleet-section";
import BenefitsSection from "@/components/benefits-section";
import DiscoverSection from "@/components/discover-section";


export default function Home() {
    return (
        <main className="min-h-screen bg-black w-full">


            <HeroBanner imageUrl={'/logo-banner.png'}/>
            <OffersSection/>
            <FleetSection/>
            <BenefitsSection/>
            <DiscoverSection/>


            <section className="flex items-center justify-center ">

            </section>


        </main>
    );
}
