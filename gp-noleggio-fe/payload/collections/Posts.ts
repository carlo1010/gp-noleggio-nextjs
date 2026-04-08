import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true, // Lettura pubblica abilitata per il blog
    },
    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },
        {
            name: 'kicker',
            type: 'text',
            required: true,
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'desc',
            type: 'textarea',
            required: true,
        },
        {
            name: 'cta',
            type: 'text',
            required: true,
        },
        {
            name: 'img',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'imgAlt',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: false, // Per futuri articoli formattati
        }
    ],
}
