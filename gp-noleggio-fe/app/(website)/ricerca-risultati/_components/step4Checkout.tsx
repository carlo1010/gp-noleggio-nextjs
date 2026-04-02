"use client";

import Step4Header from "@/app/(website)/ricerca-risultati/_components/step4Header";
import Step4DriverForm from "@/app/(website)/ricerca-risultati/_components/step4DriverForm";
import Step4Payment from "@/app/(website)/ricerca-risultati/_components/step4Payment";
import Step4SidebarSummary from "@/app/(website)/ricerca-risultati/_components/step4SidebarSummary";

export default function Step4Checkout() {
    return (
        <div className="w-full">
            {/* ✅ HEADER fuori dal layout */}
            <Step4Header />

            {/* ✅ CONTENUTO */}
            <div className="container mx-auto px-4 md:px-8 lg:px-0">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 py-6">
                    <div className="col-span-12 lg:col-span-8">
                        <Step4DriverForm />
                        <Step4Payment />
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <div className="lg:sticky lg:top-24 flex justify-end">
                            <Step4SidebarSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
