"use client";

import { useQuery } from "@tanstack/react-query";
import { Servizi } from "@/types/servizi";
import { Protezioni } from "@/types/protezioni";

export function useListaServizi(codiceTariffa?: string) {
    return useQuery<Servizi[]>({
        queryKey: ['lista-servizi', codiceTariffa],
        queryFn: async () => {
            if (!codiceTariffa) return [];
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/servizi/${codiceTariffa}`);

            // 🛑 IMPORTANT: Fetch only throws on network failure, not 404s
            if (!res.ok) {
                // You can return [] here if you prefer a silent fail,
                // but throwing is better for debugging.
                throw new Error(`Errore API: ${res.status}`);
            }

            return res.json();
        },
        enabled: Boolean(codiceTariffa),
        // Optional: prevent retrying 404 errors multiple times
        retry: (failureCount, error: Error) => {
            if (error.message.includes('404')) return false;
            return failureCount < 3;
        }
    });
}

export function useListaProtezioni(codiceTariffa?: string) {
    return useQuery<Protezioni[]>({
        queryKey: ['lista-protezioni', codiceTariffa],
        queryFn: async () => {
            if (!codiceTariffa) return [];
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/protection/${codiceTariffa}`);

            if (!res.ok) {
                throw new Error(`Errore API: ${res.status}`);
            }

            return res.json();
        },
        enabled: Boolean(codiceTariffa),
    });
}