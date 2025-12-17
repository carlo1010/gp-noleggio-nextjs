import Image from "next/image";
import {Check} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function CardNoleggio() {
    return (
        <div className={"grid grid-cols-3 gap-x-4  border-b  border-gray-200 "}>
            <Image src={'/fiat-500.png'} alt={''} width={269} height={219}/>
            <div className={"flex flex-col gap-y-2"}>
                <div className={" font-bold uppercase"}>
                    Fiat - 500
                </div>
                <div className={"w-max p-2 rounded-tl-sm rounded-br-sm bg-[#999999] text-white uppercase"}>
                    O MINI SIMILARE
                </div>

                <div className={"flex flex-row flex-wrap gap-x-4 font-bold"}>
                    <div>
                        Manuale
                    </div>
                    <div>
                        4
                    </div>
                    <div>
                        A/C
                    </div>
                    <div>
                        18
                    </div>
                    <div>
                        3
                    </div>
                </div>
                <div className={" flex flex-col gap-y-2 "}>
                    <div className={" flex flex-row gap-x-2"}>
                        <Check strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                        Chilometraggio Illimitato
                    </div>
                    <div className={" flex flex-row gap-x-2"}>
                        <Check strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                        Pacchetto Protection Basic Incluso
                    </div>
                    <div className={" flex flex-row gap-x-2"}>
                        <Check strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                        Cancellazzione inclusa fino a 48h prima del ritiro
                    </div>

                </div>


            </div>
            <div className={"flex flex-col items-end justify-center gap-y-2"}>
                <div className={"flex flex-row gap-x-2"}>
                    A partire da
                </div>
                <div className={" text-xl font-semibold "}>
                    32,30€ <span className="text-sm font-medium"> / al giorno</span>
                </div>
                <div className={""}>
                    Totale 322,60€
                </div>
                <Button className="px-10 text-lg">
                    Seleziona
                </Button>

            </div>

        </div>


    )

}