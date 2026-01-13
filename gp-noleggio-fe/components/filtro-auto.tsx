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

    const [showFilters, setShowFilters] = React.useState(false);

    return (
        <section className="w-full">
            <div className="container mx-auto px-4 py-6 md:py-10 max-w-[1240px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Scegli il tuo veicolo</h1>
                        <div className="text-sm text-muted-foreground">15 disponibili</div>
                    </div>

                    <div className="md:hidden">
                        <Button
                            variant="outline"
                            className="w-full justify-between h-12 border-primary text-primary font-bold"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal"><path d="M21 4h-7" /><path d="M10 4H3" /><path d="M21 12H11" /><path d="M7 12H3" /><path d="M21 20H15" /><path d="M11 20H3" /><path d="M10 7V1" /><path d="M7 15v-6" /><path d="M15 23v-6" /></svg>
                                FILTRA
                            </span>
                            <RotateCw className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </Button>
                    </div>
                </div>

                <div className={`${showFilters ? 'flex' : 'hidden md:flex'} mt-6 md:mt-8 flex-wrap items-center gap-4 md:gap-6 animate-in slide-in-from-top-2 duration-200`}>
                    {/* Cambio */}
                    <Select value={filters.cambio} onValueChange={update("cambio")}>
                        <SelectTrigger className="h-10 w-full md:w-[140px] border-b border-t-0 border-x-0 rounded-none bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
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
                        <SelectTrigger className="h-10 w-full md:w-[120px] border-b border-t-0 border-x-0 rounded-none bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
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
                        <SelectTrigger className="h-10 w-full md:w-[200px] border-b border-t-0 border-x-0 rounded-none bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
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
                        <SelectTrigger className="h-10 w-full md:w-[190px] border-b border-t-0 border-x-0 rounded-none bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
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
                        <SelectTrigger className="h-10 w-full md:w-[190px] border-b border-t-0 border-x-0 rounded-none bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
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
                        className="h-10 w-10 rounded-full md:ml-auto"
                        aria-label="Reset filtri"
                        title="Reset filtri"
                    >
                        <RotateCw className="h-5 w-5" />
                    </Button>
                </div>

                <div className="mt-8 h-px w-full bg-gray-200" />
            </div>
        </section>
    );
}
