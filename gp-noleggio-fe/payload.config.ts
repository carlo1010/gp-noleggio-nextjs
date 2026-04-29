import path from 'node:path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import {
    lexicalEditor,
    BoldFeature,
    ItalicFeature,
    LinkFeature,
} from '@payloadcms/richtext-lexical'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Faqs } from './payload/collections/Faqs'
import { FaqCategories } from './payload/collections/FaqCategories'
import { BlogPosts } from './payload/collections/BlogPosts'
import { PageConfigs } from './payload/collections/PageConfigs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '— GP Noleggio CMS',
        },
    },
    collections: [Users, Media, FaqCategories, Faqs, BlogPosts, PageConfigs],
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, '../payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            BoldFeature(),
            ItalicFeature(),
            LinkFeature({}),
        ],
    }),
    sharp,
    upload: {
        limits: {
            fileSize: 5000000, // 5MB
        },
    },
})

