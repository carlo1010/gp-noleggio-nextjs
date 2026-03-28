"use client";

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
        const category = typeof subcategory === 'object' && typeof subcategory.category === 'object' 
            ? subcategory.category 
            : { title: "Generale", id: "generale" };
            
        const categoryTitle = category.title;

        if (!acc[categoryTitle]) {
            acc[categoryTitle] = {
                title: categoryTitle,
                subcategories: {}
            };
        }

        if (!acc[categoryTitle].subcategories[subcategoryTitle]) {
            acc[categoryTitle].subcategories[subcategoryTitle] = {
                title: subcategoryTitle,
                faqs: []
            };
        }

        acc[categoryTitle].subcategories[subcategoryTitle].faqs.push(faq);
        return acc;
    }, {});

    const categories = Object.values(groupedFaqs);

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 md:max-w-4xl">
                {/* Titolo e Descrizione */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase text-black">FAQ - Aiuto</h1>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        In questa sezione trovi le risposte alle domande più frequenti organizzate per categoria. 
                        Esplora le sezioni qui sotto per trovare rapidamente l'informazione che cerchi.
                    </p>
                </div>

                {/* FAQ STRUCTURE */}
                <div className="w-full space-y-16">
                    {categories.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nessuna FAQ disponibile al momento.</p>
                    ) : (
                        categories.map((category: any, catIndex: number) => (
                            <div key={catIndex} className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#0700DE] border-b-2 border-gray-100 pb-2">
                                    {category.title}
                                </h2>
                                
                                <div className="space-y-10 pl-2 md:pl-4">
                                    {Object.values(category.subcategories).map((sub: any, subIndex: number) => (
                                        <div key={subIndex} className="space-y-4">
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
                                                <span className="w-1.5 h-6 bg-gray-200 rounded-full"></span>
                                                {sub.title}
                                            </h3>
                                            
                                            <Accordion type="single" collapsible className="w-full space-y-3">
                                                {sub.faqs.map((faq: any, faqIndex: number) => (
                                                    <AccordionItem
                                                        key={faq.id}
                                                        value={`item-${catIndex}-${subIndex}-${faqIndex}`}
                                                        className="border rounded-lg px-4 md:px-6 bg-gray-50/50 hover:bg-white transition-all duration-300"
                                                    >
                                                        <AccordionTrigger className="text-sm md:text-base font-medium hover:no-underline hover:text-[#0700DE] transition-colors text-left py-4">
                                                            {faq.question}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-6 border-t border-gray-100 pt-4 mt-2">
                                                            {typeof faq.answer === "string" ? (
                                                                <div className="whitespace-pre-line">{faq.answer}</div>
                                                            ) : (
                                                                "Risposta non disponibile"
                                                            )}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
