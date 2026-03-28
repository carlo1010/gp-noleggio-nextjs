import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
    slug: 'faqs',
    admin: {
        useAsTitle: 'question',
        defaultColumns: ['question', 'subcategory', 'order', 'isActive'],
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
            name: 'slug',
            type: 'text',
            unique: true,
            admin: {
                position: 'sidebar',
                description: 'Identificativo univoco per la URL (generato automaticamente)',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (value) return value
                        return data?.question
                            ?.toLowerCase()
                            .replace(/ /g, '-')
                            .replace(/[^\w-]+/g, '')
                    },
                ],
            },
        },
        {
            name: 'answer',
            type: 'textarea',
            required: true,
            label: 'Risposta',
        },
        {
            name: 'subcategory',
            type: 'relationship',
            relationTo: 'faqsubcategories',
            label: 'Sottocategoria',
            required: false,
            admin: {
                description: 'Associa questa FAQ a una sottocategoria (Struttura: Categoria > Sottocategoria > FAQ)',
            },
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
