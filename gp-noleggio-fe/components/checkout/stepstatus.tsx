import {PencilLine} from "lucide-react";

export default function StepStatus() {
    return (
        <div className="grid grid-cols-6 gap-x-4 ">

            <div
                className="col-span-2 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl rounded-br-3xl bg-white p-4 space-y-2">
                <div className={"flex items-center w-full justify-between"}>
                    <div className={"flex items-center w-full gap-x-2 "}>
                        <div
                            className={" flex item-center justify-center rounded-full bg-[#D9D9D9] text-white  w-6 h-6"}>
                            1
                        </div>
                        <p className={" font-bold text-[#686868] uppercase text-sm "}>
                            PUNTO DI NOLEGGIO
                        </p>

                    </div>

                    <PencilLine className={"text-primary w-4 h-4"}/>

                </div>
                <div className={"grid grid-cols-2 gap-x-2 "}>
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className={"font-bold"}>Ritiro</p>
                        <p className={"font-bold"}>Napoli Aereoporto</p>
                        <p className={"text-[#696969] mt-2"}>24-09-2025</p>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className={"font-bold"}>Ritiro</p>
                        <p className={"font-bold"}>Napoli Aereoporto</p>
                        <p className={"text-[#696969] mt-2"}>24-09-2025</p>
                    </div>
                </div>


            </div>

            <div
                className="col-span-1 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl bg-white p-4 space-y-2">
                <div className={"flex items-center w-full justify-between"}>
                    <div className={"flex items-center w-full gap-x-2 "}>
                        <div
                            className={" flex item-center justify-center rounded-full bg-[#D9D9D9] text-white  w-6 h-6"}>
                            2
                        </div>
                        <p className={" font-bold text-[#686868] uppercase text-sm "}>
                            SCELTA VEICOLO
                        </p>

                    </div>

                    <PencilLine className={"text-primary w-4 h-4"}/>

                </div>
                <div className="flex flex-col items-start justify-end w-full">
                    <p className={"font-bold"}>Fiat 500</p>
                    <p className={"text-[#696969] mt-2"}>500 €</p>
                </div>


            </div>

            <div
                className="col-span-2 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl rounded-br-3xl bg-white p-4 space-y-2">
                <div className={"flex items-center w-full justify-between"}>
                    <div className={"flex items-center w-full gap-x-2 "}>
                        <div
                            className={" flex item-center justify-center rounded-full bg-[#D9D9D9] text-white  w-6 h-6"}>
                            3
                        </div>
                        <p className={" font-bold text-[#686868] uppercase text-sm "}>
                            EXTRA
                        </p>

                    </div>

                    <PencilLine className={"text-primary w-4 h-4"}/>

                </div>
                <div className={"grid grid-cols-2 gap-x-2 "}>
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className={"font-bold"}>Basic</p>
                        <p className={"text-[#696969] mt-2"}>Incluso</p>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className={"font-bold"}>0 Extra</p>
                        <p className={"text-[#696969] mt-2"}>0,00 €</p>
                    </div>
                </div>


            </div>

            <div
                className="col-span-1 rounded-tl-3xl flex flex-col justify-between rounded-br-3xl rounded-br-3xl bg-white p-4 space-y-2">
                <div className={"flex items-center w-full justify-between"}>
                    <div className={"flex items-center w-full gap-x-2 "}>
                        <div
                            className={" flex item-center justify-center rounded-full bg-[#D9D9D9] text-white  w-6 h-6"}>
                            4
                        </div>
                        <p className={" font-bold text-[#686868] uppercase  text-sm "}>
                            RIEPILOGO
                        </p>

                    </div>

                    <PencilLine className={"text-primary w-4 h-4"}/>

                </div>
                <div className="flex flex-col items-start justify-start w-full">
                    <p className={"font-bold"}>Prezzo Totale</p>
                    <p className={"text-[#696969] mt-2"}>500 €</p>
                </div>


            </div>


        </div>
    )

}