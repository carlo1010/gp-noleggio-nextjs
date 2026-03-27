import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
    slug: 'faqs',
    admin: {
        useAsTitle: 'question',
        defaultColumns: ['question', 'category', 'order', 'isActive'],
        description: 'Gestisci le domande frequenti del sito.',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'question',
            type: 'text',
            required: true,
            label: 'Domanda',
        },
        {
            name: 'answer',
            type: 'textarea',
            required: true,
            label: 'Risposta',
        },
        {
            name: 'category',
            type: 'select',
            label: 'Categoria',
            options: [
                { label: 'Prenotazione', value: 'prenotazione' },
                { label: 'Pagamento', value: 'pagamento' },
                { label: 'Veicoli', value: 'veicoli' },
                { label: 'Ritiro e Riconsegna', value: 'ritiro-riconsegna' },
                { label: 'Altro', value: 'altro' },
            ],
        },
        {
            name: 'order',
            type: 'number',
            label: 'Ordine',
            admin: {
                description: 'Numero per ordinare le FAQ (1 = prima). Lascia vuoto per non ordinare.',
                step: 1,
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            label: 'Attiva',
            defaultValue: true,
            admin: {
                description: 'Deseleziona per nascondere questa FAQ dal sito.',
                position: 'sidebar',
            },
        },
    ],
}
