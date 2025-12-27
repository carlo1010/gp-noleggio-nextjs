"use client";

import * as React from "react";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FiltersState = {
    cambio: string;
    posti: string;
    tipologia: string;
    prezzo: string;
    sort: string;
};

const defaultState: FiltersState = {
    cambio: "all",
    posti: "all",
    tipologia: "all",
    prezzo: "all",
    sort: "price_desc",
};

function coerceParam(value: string | null, fallback: string) {
    return value && value.length ? value : fallback;
}

export default function FiltroAuto() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ✅ inizializza lo stato leggendo dall'URL
    const [filters, setFilters] = React.useState<FiltersState>(() => ({
        cambio: coerceParam(searchParams.get("cambio"), defaultState.cambio),
        posti: coerceParam(searchParams.get("posti"), defaultState.posti),
        tipologia: coerceParam(searchParams.get("tipologia"), defaultState.tipologia),
        prezzo: coerceParam(searchParams.get("prezzo"), defaultState.prezzo),
        sort: coerceParam(searchParams.get("sort"), defaultState.sort),
    }));

    // ✅ quando cambia lo state -> aggiorna l'URL (ma solo se la query cambia davvero)
    React.useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        const setOrDelete = (key: keyof FiltersState, value: string) => {
            const isDefault = value === defaultState[key];
            if (isDefault) params.delete(key);
            else params.set(key, value);
        };

        setOrDelete("cambio", filters.cambio);
        setOrDelete("posti", filters.posti);
        setOrDelete("tipologia", filters.tipologia);
        setOrDelete("prezzo", filters.prezzo);
        setOrDelete("sort", filters.sort);

        const nextQs = params.toString();
        const currentQs = searchParams.toString();

        // 🛑 guard anti-loop
        if (nextQs === currentQs) return;

        router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, pathname, router]);

    // ✅ se l'URL cambia da fuori (back/forward o link) -> riallinea lo state (solo se diverso)
    React.useEffect(() => {
        const nextState: FiltersState = {
            cambio: coerceParam(searchParams.get("cambio"), defaultState.cambio),
            posti: coerceParam(searchParams.get("posti"), defaultState.posti),
            tipologia: coerceParam(searchParams.get("tipologia"), defaultState.tipologia),
            prezzo: coerceParam(searchParams.get("prezzo"), defaultState.prezzo),
            sort: coerceParam(searchParams.get("sort"), defaultState.sort),
        };

        setFilters((prev) => {
            const same =
                prev.cambio === nextState.cambio &&
                prev.posti === nextState.posti &&
                prev.tipologia === nextState.tipologia &&
                prev.prezzo === nextState.prezzo &&
                prev.sort === nextState.sort;

            return same ? prev : nextState;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // ✅ helper per aggiornare 1 filtro
    const update = (key: keyof FiltersState) => (v: string) =>
        setFilters((s) => ({ ...s, [key]: v }));

    const reset = () => setFilters(defaultState);

    return (
        <section className="w-full">
            <div className="mx-auto px-6 py-10">
                <h1 className="text-4xl font-bold tracking-tight">Scegli il tuo veicolo</h1>

                <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">15 disponibili</div>

                    <div className="flex flex-wrap items-center gap-6">
                        {/* Cambio */}
                        <Select value={filters.cambio} onValueChange={update("cambio")}>
                            <SelectTrigger className="h-10 w-[140px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Cambio" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">Cambio</SelectItem>
                                    <SelectItem value="manuale">Manuale</SelectItem>
                                    <SelectItem value="automatico">Automatico</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Posti */}
                        <Select value={filters.posti} onValueChange={update("posti")}>
                            <SelectTrigger className="h-10 w-[120px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Posti" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">Posti</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="7">7+</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Tipologia veicolo */}
                        <Select value={filters.tipologia} onValueChange={update("tipologia")}>
                            <SelectTrigger className="h-10 w-[200px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Tipologia veicolo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">Tipologia veicolo</SelectItem>
                                    <SelectItem value="citycar">Citycar</SelectItem>
                                    <SelectItem value="suv">SUV</SelectItem>
                                    <SelectItem value="berlina">Berlina</SelectItem>
                                    <SelectItem value="van">Van</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Fascia di prezzo */}
                        <Select value={filters.prezzo} onValueChange={update("prezzo")}>
                            <SelectTrigger className="h-10 w-[190px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Fascia di prezzo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">Fascia di prezzo</SelectItem>
                                    <SelectItem value="0-50">0€ - 50€</SelectItem>
                                    <SelectItem value="50-80">50€ - 80€</SelectItem>
                                    <SelectItem value="80-120">80€ - 120€</SelectItem>
                                    <SelectItem value="120+">120€+</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Sort */}
                        <Select value={filters.sort} onValueChange={update("sort")}>
                            <SelectTrigger className="h-10 w-[190px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="price_desc">Dal prezzo più alto</SelectItem>
                                    <SelectItem value="price_asc">Dal prezzo più basso</SelectItem>
                                    <SelectItem value="name_asc">Nome A → Z</SelectItem>
                                    <SelectItem value="name_desc">Nome Z → A</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Reset */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={reset}
                            className="h-10 w-10 rounded-full"
                            aria-label="Reset filtri"
                            title="Reset filtri"
                        >
                            <RotateCw className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="mt-6 h-px w-full bg-border" />
            </div>
        </section>
    );
}
