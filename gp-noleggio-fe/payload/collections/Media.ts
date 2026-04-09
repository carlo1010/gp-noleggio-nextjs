import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
    },
    access: {
        read: () => true,
        create: () => true, // Assicuriamoci che l'accesso sia aperto per i test
        update: () => true,
        delete: () => true,
    },
    upload: {
        staticDir: path.resolve(dirname, '../../public/media'),
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
            label: 'Testo alternativo (SEO)',
        },
    ],
}
