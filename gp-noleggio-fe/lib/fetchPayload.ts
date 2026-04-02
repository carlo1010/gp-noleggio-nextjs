import { getPayload } from '@/lib/payload'
import type { Faq } from '@/payload-types'

/**
 * Recupera tutte le FAQ attive, ordinate per campo `order` ascendente.
 * Usabile solo nei Server Components.
 */
export async function getFAQs(): Promise<Faq[]> {
    const payload = await getPayload()

    const result = await payload.find({
        collection: 'faqs',
        where: {
            isActive: {
                equals: true,
            },
        },
        sort: 'order',
        limit: 100,
    })

    return result.docs as Faq[]
}

/**
 * Recupera una singola FAQ per ID.
 */
export async function getFAQById(id: string): Promise<Faq | null> {
    const payload = await getPayload()

    try {
        const faq = await payload.findByID({
            collection: 'faqs',
            id,
        })
        return faq as Faq
    } catch {
        return null
    }
}
