import { NotFoundPage } from '@payloadcms/next/views'
import config from '@payload-config'

import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export default async function NotFound(props: Args) {
  const params = await props.params
  const searchParams = await props.searchParams
  return NotFoundPage({ config, params, searchParams, importMap })
}
