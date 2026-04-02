import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Faqs } from './collections/Faqs'
import { FaqCategories } from './collections/FaqCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '— GP Noleggio CMS',
        },
    },
    collections: [Users, Media, FaqCategories, Faqs],
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

