"use client";

import {useQuery} from "@tanstack/react-query";
import {ListaVeicolo} from "@/types/veicolo";


interface ListaVeicoliProps {
    datainizio: string;
    datafine: string;
}

export function listaVeicoli(datainizio: string | null, datafine: string | null) {
    return (
        useQuery<ListaVeicolo[]>({
            queryKey: ['lista-veicolo'],
            queryFn: async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nbt/veicoli/?dataInizio=${datainizio}&dataFine=${datafine}`)
                return res.json()
            },
            enabled: Boolean(datainizio) && Boolean(datafine)

        })
    )
}