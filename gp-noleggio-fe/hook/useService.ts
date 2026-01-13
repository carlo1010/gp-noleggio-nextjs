"use client";

import { useQuery } from "@tanstack/react-query";
import {Servizi} from "@/types/servizi";
import {Protezioni} from "@/types/protezioni";


export function listaServizi(codiceTariffa?: string) {
    return useQuery<Servizi[]>({
        queryKey: ['lista-servizi', codiceTariffa], // chiave univoca della fetch
        queryFn: async () => {
            if (!codiceTariffa) return [];
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/servizi/${codiceTariffa}`);
            return res.json()
        },
        enabled: Boolean(codiceTariffa),
    })
}



export function listaProtezioni(codiceTariffa?: string) {
    return useQuery<Protezioni[]>({
        queryKey: ['lista-protezioni', codiceTariffa], // chiave univoca della fetch
        queryFn: async () => {
            if (!codiceTariffa) return [];
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/protection/${codiceTariffa}`);
            return res.json()
        },
        enabled: Boolean(codiceTariffa),
    })
}
