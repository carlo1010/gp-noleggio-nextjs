import type { Metadata } from "next";
import { QueryProvider } from "@/provider/ReactQueryProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "GP Noleggio",
    description: "Il tuo partner di noleggio",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-dvh overflow-x-hidden">
            <QueryProvider>
                <Header />
                {children}
                <Footer />
            </QueryProvider>
        </div>
    );
}
