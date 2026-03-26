import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Admin panel — gestito interamente da Payload CMS
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Args = {
    params: Promise<{
        segments: string[]
    }>
}

export default function Page({ params }: Args) {
    return RootPage({ config, params })
}

export async function generateMetadata({ params }: Args) {
    return generatePageMetadata({ config, params })
}
