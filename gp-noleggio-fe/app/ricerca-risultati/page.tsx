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
            <FiltroAuto/>

            <div className="container mx-auto py-4 space-y-10">
                <CardNoleggio/>
                <CardNoleggio/>
                <CardNoleggio/>
                <CardNoleggio/>
                <CardNoleggio/>
                <CardNoleggio/>
                <CardNoleggio/>
            </div>
        </>

    )

}