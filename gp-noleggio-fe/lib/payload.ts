import config from '@payload-config'
import { getPayload as _getPayload } from 'payload'
import { cache } from 'react'

/**
 * Client server-side Payload.
 * Usa `cache()` di React per evitare istanze multiple per request.
 * Usabile SOLO nei Server Components.
 */
export const getPayload = cache(async () => {
    return _getPayload({ config })
})
