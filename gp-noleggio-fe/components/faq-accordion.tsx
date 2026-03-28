"use client";

import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqAccordionProps {
    faqs: any[]; // Usiamo any temporaneamente per gestire i nuovi tipi espansi (Category > Subcategory > FAQ)
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
    // Raggruppamento delle FAQ per Categoria e Sottocategoria
    const groupedFaqs = faqs.reduce((acc: any, faq: any) => {
        const subcategory = faq.subcategory;
        
        // Se non c'è sottocategoria, la mettiamo in "Altro" o la ignoriamo (per ora Altro)
        const subcategoryTitle = typeof subcategory === 'object' ? subcategory.title : "Altro";
        const subcategorySlug = typeof subcategory === 'object' ? subcategory.slug : "altro";

        const category = typeof subcategory === 'object' && typeof subcategory.category === 'object' 
            ? subcategory.category 
            : { title: "Generale", id: "generale", slug: "generale" };
            
        const categoryTitle = category.title;
        const categorySlug = category.slug;

        if (!acc[categoryTitle]) {
            acc[categoryTitle] = {
                title: categoryTitle,
                slug: categorySlug,
                subcategories: {}
            };
        }

        if (!acc[categoryTitle].subcategories[subcategoryTitle]) {
            acc[categoryTitle].subcategories[subcategoryTitle] = {
                title: subcategoryTitle,
                slug: subcategorySlug,
                faqs: []
            };
        }

        acc[categoryTitle].subcategories[subcategoryTitle].faqs.push(faq);
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
                        categories.map((category: any, catIndex: number) => (
                            <div key={catIndex} className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#0700DE] border-b border-gray-100 pb-2">
                                    {category.title}
                                </h2>
                                
                                <div className="pl-0 md:pl-2">
                                    <Accordion type="single" collapsible className="w-full">
                                        {Object.values(category.subcategories).map((sub: any, subIndex: number) => (
                                            <AccordionItem
                                                key={subIndex}
                                                value={`sub-${catIndex}-${subIndex}`}
                                                className="border-b border-gray-200"
                                            >
                                                <AccordionTrigger className="text-lg md:text-xl font-semibold text-gray-800 hover:text-[#0700DE] transition-colors py-4">
                                                    {sub.title}
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-2 pb-6 px-1 md:px-2">
                                                    <div className="w-full space-y-2 flex flex-col pt-2 pb-2">
                                                        {sub.faqs.map((faq: any) => {
                                                            // Fallback id in case slug isn't generated yet for old records
                                                            const faqSlug = faq.slug || faq.id;
                                                            const faqUrl = `/aiuto/${category.slug}/${sub.slug}/${faqSlug}`;

                                                            return (
                                                                <Link 
                                                                    href={faqUrl}
                                                                    key={faq.id}
                                                                    className="border rounded-md px-4 py-3 bg-gray-50/50 hover:bg-white hover:border-[#0700DE]/30 hover:shadow-sm transition-all duration-300 text-sm md:text-base font-medium text-gray-800 hover:text-[#0700DE] block text-left w-full"
                                                                >
                                                                    {faq.question}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
