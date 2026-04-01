import HeroBanner from "@/components/hero-banner";
import FaqAccordion from "@/components/faq-accordion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getFAQs } from "@/lib/fetchPayload";

export default async function AiutoPage() {
    const faqs = await getFAQs();
    return (
        <main className="min-h-screen bg-white">
            <HeroBanner imageUrl="/faq-bg.png" showSearch={false} />

            {/* BREADCRUMB */}
            <div className="bg-white py-4 md:py-6 border-b border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 md:max-w-5xl">
                    <nav className="flex items-center text-xs md:text-sm font-semibold text-gray-800">
                        <Link href="/" className="hover:underline hover:text-[#0700DE]">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <span className="text-gray-500">Aiuto</span>
                    </nav>
                </div>
            </div>

            <FaqAccordion faqs={faqs} />
        </main>
    );
}
