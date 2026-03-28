import { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroBanner from "@/components/hero-banner";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getFaqBySlug } from "@/lib/fetchPayload";

type Props = {
    params: Promise<{
        categorySlug: string;
        subcategorySlug: string;
        faqSlug: string;
    }>;
};

// Generazione dinamica dei meta tag per la SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const faq = await getFaqBySlug(resolvedParams.faqSlug);

    if (!faq) {
        return {
            title: "FAQ non trovata | GP Noleggio",
        };
    }

    return {
        title: `${faq.question} | GP Noleggio`,
        description: typeof faq.answer === 'string' 
            ? faq.answer.substring(0, 160) + (faq.answer.length > 160 ? "..." : "") 
            : "Scopri la risposta a questa domanda frequente su GP Noleggio.",
        openGraph: {
            title: faq.question,
            description: typeof faq.answer === 'string' 
                ? faq.answer.substring(0, 160) 
                : "Scopri la risposta a questa domanda frequente su GP Noleggio.",
            type: "website",
        }
    };
}

export default async function SingleFaqPage({ params }: Props) {
    const resolvedParams = await params;
    const faq = await getFaqBySlug(resolvedParams.faqSlug);

    if (!faq) {
        notFound();
    }

    // Risolviamo i titoli per il breadcrumb usando la relazione se possibile
    // Se la relazione subcategory - category c'è, prendiamola da lì, altrimenti usiamo lo slug.
    const subcategory = typeof faq.subcategory === 'object' ? faq.subcategory : null;
    let categoryTitle = resolvedParams.categorySlug;
    let subcategoryTitle = resolvedParams.subcategorySlug;

    if (subcategory) {
        subcategoryTitle = subcategory.title || subcategoryTitle;
        const category = typeof subcategory.category === 'object' ? subcategory.category : null;
        if (category) {
            categoryTitle = category.title || categoryTitle;
        }
    }

    return (
        <main className="min-h-screen bg-white">
            <HeroBanner imageUrl="/faq-bg.png" showSearch={false} />

            {/* BREADCRUMB */}
            <div className="bg-white py-4 md:py-6 border-b border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 md:max-w-5xl">
                    <nav className="flex flex-wrap items-center text-xs md:text-sm font-semibold text-gray-800 gap-y-2">
                        <Link href="/" className="hover:underline hover:text-[#0700DE] whitespace-nowrap">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />
                        <Link href="/aiuto" className="hover:underline hover:text-[#0700DE] whitespace-nowrap">
                            FAQ
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />
                        <span className="text-gray-500 whitespace-nowrap">{categoryTitle}</span>
                        <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />
                        <span className="text-gray-500 whitespace-nowrap">{subcategoryTitle}</span>
                        <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />
                        <span className="text-gray-500 truncate max-w-[150px] md:max-w-xs">{faq.question}</span>
                    </nav>
                </div>
            </div>

            {/* CONTENUTO FAQ */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 md:max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                        {faq.question}
                    </h1>
                    
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {typeof faq.answer === 'string' ? faq.answer : 'Risposta non disponibile.'}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <Link 
                            href="/aiuto"
                            className="inline-flex items-center text-[#0700DE] font-semibold hover:underline"
                        >
                            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                            Torna a tutte le FAQ
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
