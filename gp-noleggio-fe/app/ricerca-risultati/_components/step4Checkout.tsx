"use client";

import Step4Header from "@/app/ricerca-risultati/_components/step4Header";
import Step4DriverForm from "@/app/ricerca-risultati/_components/step4DriverForm";
import Step4SidebarSummary from "@/app/ricerca-risultati/_components/step4SidebarSummary";

export default function Step4Checkout() {
    return (
        <div className="w-full">
            {/* ✅ HEADER fuori dal layout */}
            <Step4Header />

            {/* ✅ CONTENUTO */}
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-6 py-6">
                    <div className="col-span-12 lg:col-span-8">
                        <Step4DriverForm />
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
