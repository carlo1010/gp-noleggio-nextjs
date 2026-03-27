/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  const p = await params
  const s = await searchParams
  return generatePageMetadata({ config, params: p, searchParams: s })
}

const Page = async ({ params, searchParams }: Args) => {
  const p = await params
  const s = await searchParams
  return RootPage({ config, params: p, searchParams: s, importMap })
}

export default Page
