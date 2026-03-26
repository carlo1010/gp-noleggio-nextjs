"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/payload-types";

interface FaqAccordionProps {
    faqs: Faq[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 md:max-w-4xl">
                {/* Titolo e Descrizione */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 uppercase text-black">FAQ</h1>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        In questa sezione trovi le risposte alle domande più frequenti su prenotazioni, pagamenti, ritiro e riconsegna dei veicoli. Se hai bisogno di ulteriori informazioni, il nostro team è sempre a tua disposizione.
                    </p>
                </div>

                {/* FAQ ACCORDION */}
                <div className="w-full">
                    {faqs.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nessuna FAQ disponibile al momento.</p>
                    ) : (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={faq.id}
                                    value={`item-${index}`}
                                    className="border rounded-sm px-4 md:px-6 py-2 bg-white"
                                >
                                    <AccordionTrigger className="text-sm md:text-base font-bold hover:no-underline hover:text-[#0700DE] transition-colors text-left py-4">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-6">
                                        {/* richText Lexical — il testo viene estratto dal nodo root */}
                                        {typeof faq.answer === "string"
                                            ? faq.answer
                                            : null}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>
            </div>
        </section>
    );
}
