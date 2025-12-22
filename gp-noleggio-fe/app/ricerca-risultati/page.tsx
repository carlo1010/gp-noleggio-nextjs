"use client";

import StepStatus from "@/components/checkout/stepstatus";
import CardNoleggio from "@/components/card-noleggio";
import FiltroAuto from "@/components/filtro-auto";
import {SceltaTariffa} from "@/components/scelta-tariffa";
import {useState} from "react";

export default function RicercsRisultati() {

    const [open, setOpen] = useState(false);


    return (
        <>
            <section className=" bg-[#f7f7f7] pt-[80px]">
                <div className="container mx-auto py-4">
                    <StepStatus/>
                </div>

            </section>

            <SceltaTariffa imageUrl={"/fiat-500.png"} nome={"Fiat - 500"} cambio={"Manuale"} posti={0}
                           ariaCondizionata={false} eta={"26"} porte={0}
                           alimentazione={"Diesel"} prezzoGiornalieroRitiro={"30"} prezzoGiornalieroOnline={"15"}
                           open={open} onOpenChange={() => setOpen(false)} />


            <div className="container mx-auto py-4 space-y-10">
                <FiltroAuto/>
                <CardNoleggio imageUrl={"/fiat-500.png"} nome={"Fiat-500"} cambio={"Automatico"} posti={4} ariaCondizionata={true}
                              eta={"26+"} porte={3}
                              openDialog={() => setOpen(true)}
                              alimentazione={"diesel"} prezzoTotale={"372"} prezzoGiornaliero={"25  "}/>

            </div>
        </>

    )

}