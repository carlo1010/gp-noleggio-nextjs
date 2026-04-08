import path from 'node:path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Faqs } from './collections/Faqs'
import { FaqCategories } from './collections/FaqCategories'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '— GP Noleggio CMS',
        },
    },
    editor: lexicalEditor({}),
    collections: [Users, Media, FaqCategories, Faqs, Posts],
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, '../payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
    upload: {
        limits: {
            fileSize: 5000000, // 5MB
        },
    },
})

