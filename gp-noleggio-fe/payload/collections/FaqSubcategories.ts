import type { CollectionConfig } from 'payload'

export const FaqSubcategories: CollectionConfig = {
    slug: 'faqsubcategories',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'order'],
        description: 'Gestisci le sottocategorie delle FAQ.',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titolo Sottocategoria',
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            admin: {
                position: 'sidebar',
                description: 'Identificativo univoco (es. assicurazione)',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }: any) => {
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
            name: 'category',
            type: 'relationship',
            relationTo: 'faqcategories',
            required: true,
            label: 'Categoria Principale',
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
