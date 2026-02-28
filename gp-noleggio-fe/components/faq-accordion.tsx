"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqAccordion() {
    const faqData = [
        {
            question: "Lorem ipsum?",
            answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
        },
        {
            question: "Consectetur adipiscing elit?",
            answer:
                "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            question: "Integer nec odio?",
            answer:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        },
        {
            question: "Sed nisi?",
            answer:
                "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
            question: "Nulla quis sem at nibh elementum imperdiet?",
            answer:
                "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        },
    ];

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
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqData.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border rounded-sm px-4 md:px-6 py-2 bg-white"
                            >
                                <AccordionTrigger className="text-sm md:text-base font-bold hover:no-underline hover:text-[#0700DE] transition-colors text-left py-4">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-6">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
