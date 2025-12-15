import Image from "next/image";
import {Button} from "@/components/ui/button";
import HeroBanner from "@/components/hero-banner";
import {makeGetServerInsertedHTML} from "next/dist/server/app-render/make-get-server-inserted-html";
import OffersSection from "@/components/offer-section";
import FleetSection from "@/components/fleet-section";
import BenefitsSection from "@/components/benefits-section";
import DiscoverSection from "@/components/discover-section";
import Link from "next/link";
import MapClient from '@/components/mappa-cliente';
import WhyRent from "@/components/why-rent";

export default function Scopri() {
    return (
        <main className="min-h-screen bg-black w-full">

            <HeroBanner/>

            <section className="w-full bg-white">
                <div className="container mx-auto px-4 py-14">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10">
                        Piccirillo Rent In Italia
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
                        <div className="h-[400px]">
                            <MapClient />
                        </div>

                        <div className="content-center">
                            <span className="text-xs font-semibold text-gray-500 uppercase">
      DOVE SIAMO IN ITALIA
    </span>

                            <h3 className="text-2xl font-bold mt-2 mb-4">
                                Punti di ritiro e riconsegna in tutto il Paese
                            </h3>

                            <p className="text-gray-600 mb-6">
                                Trova la sede Piccirillo Rent più vicina a te! Grazie alla nostra rete capillare di punti di ritiro e riconsegna su tutto il territorio nazionale, puoi noleggiare l’auto dove preferisci e restituirla nella località che ti è più comoda. Scopri tutte le sedi disponibili sulla mappa e prenota direttamente online in pochi clic.
                            </p>

                        </div>
                    </div>
                </div>

            </section>
            <DiscoverSection />
            <section className="flex items-center justify-center">
<WhyRent />
            </section>


        </main>
    );
}
