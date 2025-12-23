"use client";

import StepStatus from "@/components/checkout/stepstatus";
import CardNoleggio from "@/components/card-noleggio";
import FiltroAuto from "@/components/filtro-auto";
import {SceltaTariffa} from "@/components/scelta-tariffa";
import {useState} from "react";
import {listaVeicoli} from "@/hook/useVeicoli";
import {useSearchParams} from "next/navigation";


export default function RicercsRisultati() {

    const [open, setOpen] = useState(false);

    const sp = useSearchParams();

    const pickupDate = sp.get("pickupDate");       // string | null
    const dropoffDate = sp.get("dropoffDate");     // string | null
    const customerType = sp.get("customerType");
    const vehicleType = sp.get("vehicleType");
    const pickupOfficeId = sp.get("pickupOfficeId");
    const dropoffOfficeId = sp.get("dropoffOfficeId");
    const codePromo = sp.get("codePromo");


    const {isPending: isLoadingVeicoli, data: veicoli} = listaVeicoli(pickupDate, dropoffDate)

    console.log("veicoli", veicoli)


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
                           open={open} onOpenChange={() => setOpen(false)}/>


            <div className="container mx-auto py-4 space-y-10">
                <FiltroAuto/>

                {veicoli && veicoli.map(veicoli => (
                    <CardNoleggio imageUrl={veicoli.urlImmagine} nome={veicoli.descrizioneClasse} cambio={"Automatico"} posti={4}
                                  ariaCondizionata={true}
                                  eta={"26+"} porte={3}
                                  openDialog={() => setOpen(true)}
                                  alimentazione={"diesel"} prezzoTotale={veicoli.totalTariffaWeb} prezzoGiornaliero={veicoli.tariffaWeb}/>
                ))}

            </div>
        </>

    )

}