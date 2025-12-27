"use client";

import { useQuery } from "@tanstack/react-query";
import { ListaVeicolo } from "@/types/veicolo";

export type VeicoliFilters = {
    datainizio: string | null;
    datafine: string | null;

    cambio?: string | null;
    posti?: string | null;
    tipologia?: string | null;
    prezzo?: string | null;
    sort?: string | null;
};

export function listaVeicoli(filters: VeicoliFilters) {
    const {
        datainizio,
        datafine,
        cambio,
        posti,
        tipologia,
        prezzo,
        sort,
    } = filters;

    return useQuery<ListaVeicolo[]>({

        queryKey: [
            "lista-veicolo",
            datainizio,
            datafine,
            cambio ?? "all",
            posti ?? "all",
            tipologia ?? "all",
            prezzo ?? "all",
            sort ?? "price_desc",
        ],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (datainizio) params.set("dataInizio", datainizio);
            if (datafine) params.set("dataFine", datafine);

            // manda i filtri solo se non "all"
            if (cambio && cambio !== "all") params.set("cambio", cambio);
            if (posti && posti !== "all") params.set("posti", posti);
            if (tipologia && tipologia !== "all") params.set("tipologia", tipologia);
            if (prezzo && prezzo !== "all") params.set("prezzo", prezzo);
            if (sort && sort !== "price_desc") params.set("sort", sort);

            const url = `${process.env.NEXT_PUBLIC_API_URL}/nbt/veicoli/?${params.toString()}`;
            const res = await fetch(url);

            if (!res.ok) throw new Error("Errore fetch veicoli");
            return res.json();
        },
        enabled: Boolean(datainizio) && Boolean(datafine),
    });
}
