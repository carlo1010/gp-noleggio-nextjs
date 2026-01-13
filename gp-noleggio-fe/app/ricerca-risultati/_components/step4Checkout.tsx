"use client";

import Step4Header from "@/app/ricerca-risultati/_components/step4Header";
import Step4DriverForm from "@/app/ricerca-risultati/_components/step4DriverForm";
import Step4Payment from "@/app/ricerca-risultati/_components/step4Payment";
import Step4SidebarSummary from "@/app/ricerca-risultati/_components/step4SidebarSummary";

export default function Step4Checkout() {
    return (
        <div className="w-full bg-white">
            {/* ✅ HEADER */}
            <Step4Header />

            {/* ✅ CONTENUTO */}
            <div className="container mx-auto px-4 py-8 max-w-[1240px]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 transition-all duration-300">

                    {/* RIASSUNTO (Sopra su mobile, a lato su tablet/desktop) */}
                    <div className="md:col-span-4 md:order-2">
                        <div className="md:sticky md:top-24">
                            <Step4SidebarSummary />
                        </div>
                    </div>

                    {/* FORM + PAGAMENTO */}
                    <div className="md:col-span-8 md:order-1 space-y-12">
                        <Step4DriverForm />
                        <Step4Payment />
                    </div>
                </div>
            </div>
        </div>
    );
}
