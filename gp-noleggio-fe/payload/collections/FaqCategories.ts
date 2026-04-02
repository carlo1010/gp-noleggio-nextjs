import type { CollectionConfig } from 'payload'

export const FaqCategories: CollectionConfig = {
    slug: 'faqcategories',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'order'],
        description: 'Gestisci le categorie principali delle FAQ.',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titolo Categoria',
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            admin: {
                position: 'sidebar',
                description: 'Identificativo univoco (es. prenotazioni)',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (value) return value
                        return data?.title
                            ?.toLowerCase()
                            .replace(/ /g, '-')
                            .replace(/[^\w-]+/g, '')
                    },
                ],
            },
        },
        {
            name: 'order',
            type: 'number',
            label: 'Ordine',
            admin: {
                step: 1,
            },
        },
    ],
}
