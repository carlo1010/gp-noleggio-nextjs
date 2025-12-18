"use client";

import {useQuery} from "@tanstack/react-query";
import {Agenzia} from "@/types/agenzia";


export function listaAgenzia() {
    return useQuery<Agenzia[]>({
        queryKey: ['lista-agenzia'], // chiave univoca della fetch
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/agenzie`)
            return res.json()
        }
    })
}
