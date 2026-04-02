import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import CambioIcon from "@/components/svg/cambioIcon";
import PostiIcon from "@/components/svg/postiIcon";
import { PatenteIcon } from "@/components/svg/patenteicon";
import PorteIcon from "@/components/svg/porteicon";
import AriaIcon from "@/components/svg/ariaicon";

interface CardNoleggioProps {
    imageUrl: string;
    nome: string;
    cambio: string;
    codiceClasse: string
    posti: number;
    ariaCondizionata: boolean;
    eta: string;
    porte: number;
    alimentazione: string;
    prezzoTotale: string;
    prezzoGiornaliero: string;
    openDialog: (event: boolean, codiceClasse: string) => void;
}


export default function CardNoleggio(props: CardNoleggioProps,) {
    return (
        <div className={"flex flex-col md:grid md:grid-cols-7 gap-x-4 border-b border-gray-200 pb-6 md:pb-0"}>


            <div className='w-full md:col-span-2 flex items-center justify-center p-4 md:p-0'>
                <Image
                    className=""
                    src={props.imageUrl || "/fiat-500.png"}
                    alt={props.nome || "Veicolo"}
                    width={300}
                    height={219}
                    style={{ height: "auto" }}
                />
            </div>

            <div className={"flex flex-col gap-y-2 w-full md:col-span-3 px-4 md:px-0"}>
                <div className={" font-bold uppercase"}>
                    {props.nome}
                </div>
                <div className={"w-max p-2 rounded-tl-sm rounded-br-sm bg-[#999999] text-white uppercase"}>
                    O MINI SIMILARE
                </div>

                <div className={"flex flex-row flex-wrap gap-x-4 font-bold"}>
                    <div className={"flex flew-row gap-x-2 items-center"}>
                        <CambioIcon />{props.cambio}
                    </div>
                    <div className={"flex flew-row gap-x-2 items-center"}>
                        <PostiIcon />{props.posti}
                    </div>
                    <div className={"flex flew-row gap-x-2 items-center"}>
                        <AriaIcon />{props.ariaCondizionata == true ? 'A/C' : 'NO A/C'}
                    </div>
                    <div className={"flex flew-row gap-x-2 items-center"}>
                        <PatenteIcon />{props.eta}
                    </div>
                    <div className={"flex flew-row gap-x-2 items-center"}>
                        <PorteIcon />{props.porte}
                    </div>
                </div>
                <div className={" flex flex-col gap-y-2 "}>
                    <div className={" flex flex-row gap-x-2"}>
                        <Check strokeWidth={4} className={" w-6 h-6 text-primary"} />
                        Chilometraggio Illimitato
                    </div>
                    <div className={" flex flex-row gap-x-2"}>
                        <Check strokeWidth={4} className={" w-6 h-6 text-primary"} />
                        Pacchetto Protection Basic Incluso
                    </div>
                    <div className={" flex flex-row gap-x-2"}>
                        <Check strokeWidth={4} className={" w-6 h-6 text-primary"} />
                        Cancellazzione inclusa fino a 48h prima del ritiro
                    </div>

                </div>


            </div>

            <div className={"flex flex-col w-full md:col-span-2 items-center md:items-end justify-center gap-y-2 px-4 md:px-0 mt-4 md:mt-0"}>
                <div className={"flex flex-row gap-x-2"}>
                    A partire da
                </div>
                <div className={" text-xl font-semibold "}>
                    {formatPrice(props.prezzoGiornaliero)} <span className="text-sm font-medium"> / al giorno</span>
                </div>
                <div className={""}>
                    Totale {formatPrice(props.prezzoTotale)}
                </div>
                <Button onClick={() => props.openDialog(true, props.codiceClasse)} className="w-full md:w-auto px-10 cursor-pointer text-lg bg-[#0700DE] hover:bg-[#0500b0] font-bold">
                    Seleziona
                </Button>

            </div>


        </div>


    )

}
