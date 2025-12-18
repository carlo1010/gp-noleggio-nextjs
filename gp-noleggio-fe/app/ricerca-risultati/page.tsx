import StepStatus from "@/components/checkout/stepstatus";
import CardNoleggio from "@/components/card-noleggio";
import FiltroAuto from "@/components/filtro-auto";

export default function RicercsRisultati() {

    return (
        <>
            <section className=" bg-[#f7f7f7] pt-[80px]">
                <div className="container mx-auto py-4">
                    <StepStatus/>
                </div>

            </section>


            <div className="container mx-auto py-4 space-y-10">
                <FiltroAuto/>
                <CardNoleggio imageUrl={""} nome={"Fiat-500"} cambio={"Automatico"} posti={4} ariaCondizionata={true} eta={"26+"} porte={3}
                              alimentazione={"diesel"} prezzoTotale={"372"} prezzoGiornaliero={"25  "}/>

            </div>
        </>

    )

}