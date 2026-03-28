import { Faq } from '@/payload-types';

interface FAQSchemaProps {
    faqs: Faq[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    if (!faqs || faqs.length === 0) return null;

    // Filtriamo solo le FAQ attive
    const activeFaqs = faqs.filter((faq) => faq.isActive);

    if (activeFaqs.length === 0) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: activeFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
