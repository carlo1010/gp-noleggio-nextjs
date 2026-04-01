import { Suspense } from "react";

import Header from "@/components/header";
import StepStatus from "@/components/checkout/stepstatus";
import { QueryProvider } from "@/provider/ReactQueryProvider";

export default function SiteLayout({children}: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <Header dark={true}/>
            <section className="bg-[#f7f7f7] pt-[80px]">
                <div className="max-w-7xl mx-auto py-4">
                    <Suspense fallback={null}>
                        <StepStatus/>
                    </Suspense>
                </div>
            </section>
            {children}
        </QueryProvider>
    );
}
