"use client";

import { useQuery } from "@tanstack/react-query";
import { ListaVeicolo } from "@/types/veicolo";

export type VeicoliFilters = {
    datainizio: string | null;
    datafine: string | null;
    oraInizio?: string | null;
    oraFine?: string | null;
    pickupOfficeId?: string | null;
    dropoffOfficeId?: string | null;

    cambio?: string | null;
    posti?: string | null;
    tipologia?: string | null;
    prezzo?: string | null;
    sort?: string | null;
    refreshKey?: string | null;
};

export function useListaVeicoli(filters: VeicoliFilters) {
    const {
        datainizio,
        datafine,
        oraInizio,
        oraFine,
        pickupOfficeId,
        dropoffOfficeId,
        cambio,
        posti,
        tipologia,
        prezzo,
        sort,
        refreshKey,
    } = filters;

    return useQuery<ListaVeicolo[]>({

        queryKey: [
            "lista-veicolo",
            datainizio,
            datafine,
            oraInizio ?? "",
            oraFine ?? "",
            pickupOfficeId ?? "",
            dropoffOfficeId ?? "",
            cambio ?? "all",
            posti ?? "all",
            tipologia ?? "all",
            prezzo ?? "all",
            sort ?? "price_asc",
            refreshKey ?? "",
        ],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (datainizio) params.set("dataInizio", datainizio);
            if (datafine) params.set("dataFine", datafine);
            if (oraInizio) params.set("oraInizio", oraInizio);
            if (oraFine) params.set("oraFine", oraFine);
            if (oraInizio) params.set("pickupTime", oraInizio);
            if (oraFine) params.set("dropoffTime", oraFine);
            if (pickupOfficeId) params.set("pickupOfficeId", pickupOfficeId);
            if (dropoffOfficeId) params.set("dropoffOfficeId", dropoffOfficeId);

            // manda i filtri solo se non "all"
            if (cambio && cambio !== "all") params.set("cambio", cambio);
            if (posti && posti !== "all") params.set("posti", posti);
            if (tipologia && tipologia !== "all") params.set("tipologia", tipologia);
            if (prezzo && prezzo !== "all") params.set("prezzo", prezzo);
            if (sort && sort !== "price_asc") params.set("sort", sort);

            const url = `/api/veicoli?${params.toString()}`;
            const res = await fetch(url);

            if (!res.ok) throw new Error("Errore fetch veicoli");
            return res.json();
        },
        enabled: Boolean(datainizio) && Boolean(datafine),
    });
}
