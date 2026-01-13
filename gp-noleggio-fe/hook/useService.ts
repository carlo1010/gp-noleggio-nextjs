"use client";

import { useQuery } from "@tanstack/react-query";


export function listaServizi(codiceTariffa: string) {
    return useQuery<any[]>({
        queryKey: ['lista-servizi', codiceTariffa], // chiave univoca della fetch
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/servizi/${codiceTariffa}`);
            return res.json()
        }
    })
}



export function listaProtezioni(codiceTariffa: string) {
    return useQuery<any[]>({
        queryKey: ['lista-protezioni', codiceTariffa], // chiave univoca della fetch
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/protection/${codiceTariffa}`);
            return res.json()
        }
    })
}

