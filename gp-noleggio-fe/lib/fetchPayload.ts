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
        limit: 200, // Aumentato il limite per sicurezza
        depth: 1, // Per includere Categoria
    })

    return result.docs
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
        return faq
    } catch {
        return null
    }
}

/**
 * Recupera una singola FAQ per slug o per ID (fallback per FAQ senza slug generato).
 */
export async function getFaqBySlug(slug: string): Promise<Faq | null> {
    const payload = await getPayload()

    try {
        // Prima prova a cercare per slug
        const result = await payload.find({
            collection: 'faqs',
            where: {
                slug: {
                    equals: slug,
                },
                isActive: {
                    equals: true,
                },
            },
            depth: 1,
            limit: 1,
        })

        if (result.docs.length > 0) return result.docs[0]

        // Fallback: cerca per ID (per FAQ create prima della generazione automatica dello slug)
        try {
            const faq = await payload.findByID({
                collection: 'faqs',
                id: slug,
                depth: 1,
            })
            // Verifica che la FAQ sia attiva
            if (faq && faq.isActive) return faq
        } catch {
            // ID non valido o non trovato, ignora
        }

        return null
    } catch {
        return null
    }
}
