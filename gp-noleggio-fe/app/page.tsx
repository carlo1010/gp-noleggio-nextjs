import Image from "next/image";
import {Button} from "@/components/ui/button";
import HeroBanner from "@/components/hero-banner";
import {makeGetServerInsertedHTML} from "next/dist/server/app-render/make-get-server-inserted-html";
import OffersSection from "@/components/offer-section";


export default function Home() {
  return (
      <main className="min-h-screen bg-black w-full">

          <HeroBanner />
          <OffersSection />

          <section className="flex items-center justify-center ">

          </section>


      </main>
  );
}
