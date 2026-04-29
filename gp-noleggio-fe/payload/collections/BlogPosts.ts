import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
    slug: 'blog-posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
        description: "Gestisci gli articoli del blog. Scrivi il testo qui sotto e configura l'anteprima in fondo.",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titolo Articolo',
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            required: true,
            admin: {
                position: 'sidebar',
                description: 'Identificativo univoco per la URL (es. noleggio-business).',
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
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Bozza', value: 'draft' },
                { label: 'Pubblicato', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
            label: 'Data di Pubblicazione',
        },
        // CAMPO CONTENUTO IN PRIMO PIANO - FUORI DAI TABS
        {
            name: 'content',
            type: 'textarea', // textarea (non richText) per garantire la visibilità
            label: "TESTO DELL'ARTICOLO (Contenuto Completo)",
            required: true,
            admin: {
                description: 'Scrivi qui il corpo del tuo articolo.',
            },
        },
        // SEZIONE ANTEPRIMA (CARD)
        {
            type: 'collapsible',
            label: 'Configurazione Anteprima (Card della Lista)',
            fields: [
                {
                    name: 'cardImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Immagine Anteprima',
                    required: true,
                },
                {
                    name: 'kicker',
                    type: 'text',
                    label: 'Etichetta (sopra il titolo)',
                    admin: {
                        placeholder: 'es. GUIDA AL NOLEGGIO',
                    },
                },
                {
                    name: 'excerpt',
                    type: 'textarea',
                    label: 'Estratto (descrizione breve)',
                },
                {
                    name: 'ctaLabel',
                    type: 'text',
                    label: 'Testo Pulsante',
                    defaultValue: 'Leggi di più',
                    required: true,
                },
            ],
        },
    ],
}
