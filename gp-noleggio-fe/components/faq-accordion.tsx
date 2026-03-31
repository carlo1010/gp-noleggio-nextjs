"use client";

import Link from "next/link";
// Rimosso import di Accordion in quanto ora tutto è sempre visibile

interface FaqAccordionProps {
    faqs: any[]; // Usiamo any temporaneamente per gestire i nuovi tipi espansi
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
    // Raggruppamento delle FAQ per Categoria
    const groupedFaqs = faqs.reduce((acc: any, faq: any) => {
        const category = typeof faq.category === 'object' && faq.category !== null
            ? faq.category 
            : { title: "Generale", id: "generale", slug: "generale" };
            
        const categoryTitle = category.title;
        const categorySlug = category.slug;

        if (!acc[categoryTitle]) {
            acc[categoryTitle] = {
                title: categoryTitle,
                slug: categorySlug,
                faqs: []
            };
        }

        acc[categoryTitle].faqs.push(faq);
        return acc;
    }, {});

    const categories = Object.values(groupedFaqs);

    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6 md:max-w-4xl">
                {/* Titolo e Descrizione */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 uppercase text-black">FAQ - Aiuto</h1>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        In questa sezione trovi le risposte alle domande più frequenti organizzate per categoria. 
                        Esplora le sezioni qui sotto per trovare rapidamente l'informazione che cerchi.
                    </p>
                </div>

                {/* FAQ STRUCTURE */}
                <div className="w-full space-y-8">
                    {categories.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nessuna FAQ disponibile al momento.</p>
                    ) : (
                        <div className="w-full space-y-6">
                            {categories.map((category: any, catIndex: number) => (
                                <div
                                    key={catIndex}
                                    className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                                >
                                    <div className="bg-gray-50/80 border-b border-gray-200 px-5 py-4">
                                        <h2 className="text-xl md:text-2xl font-bold text-[#0700DE]">
                                            {category.title}
                                        </h2>
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <div className="w-full flex flex-col space-y-3">
                                            {category.faqs.map((faq: any) => {
                                                const faqSlug = faq.slug || faq.id;
                                                const faqUrl = `/aiuto/${category.slug}/${faqSlug}`;

                                                return (
                                                    <Link 
                                                        href={faqUrl}
                                                        key={faq.id}
                                                        className="group flex justify-between items-center border border-gray-100 rounded-lg px-5 py-4 bg-white hover:border-[#0700DE]/30 hover:shadow-md transition-all duration-300 text-sm md:text-base font-semibold text-gray-800 hover:text-[#0700DE] w-full"
                                                    >
                                                        <span>{faq.question}</span>
                                                        <span className="text-[#0700DE] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                                                            →
                                                        </span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

