"use client";

import * as React from "react";
import {RotateCw} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type FiltersState = {
    cambio: string; // "all" | "manuale" | "automatico" ...
    posti: string; // "all" | "2" | "5" ...
    tipologia: string; // "all" | "citycar" | ...
    prezzo: string; // "all" | "0-50" | ...
    sort: string; // "price_desc" | "price_asc" | ...
};

const defaultState: FiltersState = {
    cambio: "all",
    posti: "all",
    tipologia: "all",
    prezzo: "all",
    sort: "price_desc",
};

export default function FiltroAuto() {
    const [filters, setFilters] = React.useState<FiltersState>(defaultState);

    // Frontend-only: qui puoi poi agganciare useEffect per chiamare API quando vorrai
    // React.useEffect(() => { console.log(filters); }, [filters]);

    const reset = () => setFilters(defaultState);

    return (
        <section className="w-full">
            <div className="mx-auto max-w-6xl px-6 py-10">
                {/* Titolo */}
                <h1 className="text-4xl font-bold tracking-tight">Scegli il tuo veicolo</h1>

                {/* Riga filtri */}
                <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">15 disponibili</div>

                    <div className="flex flex-wrap items-center gap-6">
                        {/* Cambio */}
                        <Select
                            value={filters.cambio}
                            onValueChange={(v) => setFilters((s) => ({...s, cambio: v}))}
                        >
                            <SelectTrigger
                                className="h-10 w-[140px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Cambio"/>
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
                        <Select
                            value={filters.posti}
                            onValueChange={(v) => setFilters((s) => ({...s, posti: v}))}
                        >
                            <SelectTrigger
                                className="h-10 w-[120px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Posti"/>
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
                        <Select
                            value={filters.tipologia}
                            onValueChange={(v) => setFilters((s) => ({...s, tipologia: v}))}
                        >
                            <SelectTrigger
                                className="h-10 w-[200px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Tipologia veicolo"/>
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
                        <Select
                            value={filters.prezzo}
                            onValueChange={(v) => setFilters((s) => ({...s, prezzo: v}))}
                        >
                            <SelectTrigger
                                className="h-10 w-[190px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue placeholder="Fascia di prezzo"/>
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
                        <Select
                            value={filters.sort}
                            onValueChange={(v) => setFilters((s) => ({...s, sort: v}))}
                        >
                            <SelectTrigger
                                className="h-10 w-[190px] border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus:ring-0">
                                <SelectValue/>
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

                        {/* Reset (icona refresh) */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={reset}
                            className="h-10 w-10 rounded-full"
                            aria-label="Reset filtri"
                            title="Reset filtri"
                        >
                            <RotateCw className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>

                {/* Divider sottile come nello screenshot */}
                <div className="mt-6 h-px w-full bg-border"/>
            </div>
        </section>
    );
}
