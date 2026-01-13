import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import CambioIcon from "@/components/svg/cambioIcon";
import PostiIcon from "@/components/svg/postiIcon";
import { PatenteIcon } from "@/components/svg/patenteicon";
import PorteIcon from "@/components/svg/porteicon";
import AriaIcon from "@/components/svg/ariaicon";
import { listaAgenzia } from "@/hook/useAgenzia";
import { listaVeicoli } from "@/hook/useVeicoli";

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
        <div className={"grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-x-4 border-b border-gray-200 py-6 md:py-0"}>
            <div className='md:col-span-2 flex items-center justify-center'>
                <Image className="w-full max-w-[300px] h-auto object-contain" src={props.imageUrl} alt={props.nome} width={300} height={219} />
            </div>

            <div className={"flex flex-col gap-y-3 md:col-span-3"}>
                <div className={"font-bold uppercase text-lg md:text-base"}>
                    {props.nome}
                </div>
                <div className={"w-max px-3 py-1 rounded-tl-sm rounded-br-sm bg-[#999999] text-white text-xs uppercase"}>
                    O MINI SIMILARE
                </div>

                <div className={"flex flex-row flex-wrap gap-4 font-semibold text-sm"}>
                    <div className={"flex flex-row gap-x-2 items-center"}>
                        <CambioIcon /><span className="whitespace-nowrap">{props.cambio}</span>
                    </div>
                    <div className={"flex flex-row gap-x-2 items-center"}>
                        <PostiIcon />{props.posti}
                    </div>
                    <div className={"flex flex-row gap-x-2 items-center"}>
                        <AriaIcon />{props.ariaCondizionata == true ? 'A/C' : 'NO A/C'}
                    </div>
                    <div className={"flex flex-row gap-x-2 items-center"}>
                        <PatenteIcon />{props.eta}
                    </div>
                    <div className={"flex flex-row gap-x-2 items-center"}>
                        <PorteIcon />{props.porte}
                    </div>
                </div>

                <div className={"flex flex-col gap-y-2 mt-2 text-sm md:text-xs"}>
                    <div className={"flex flex-row gap-x-2 items-start"}>
                        <Check strokeWidth={3} className={"w-5 h-5 md:w-4 md:h-4 text-primary shrink-0"} />
                        <span>Chilometraggio Illimitato</span>
                    </div>
                    <div className={"flex flex-row gap-x-2 items-start"}>
                        <Check strokeWidth={3} className={"w-5 h-5 md:w-4 md:h-4 text-primary shrink-0"} />
                        <span>Pacchetto Protection Basic Incluso</span>
                    </div>
                    <div className={"flex flex-row gap-x-2 items-start"}>
                        <Check strokeWidth={3} className={"w-5 h-5 md:w-4 md:h-4 text-primary shrink-0"} />
                        <span>Cancellazione inclusa fino a 48h prima del ritiro</span>
                    </div>
                </div>
            </div>

            <div className={"flex flex-col md:col-span-2 items-center md:items-end justify-center gap-y-2"}>
                <div className={"text-xs text-gray-500 uppercase font-semibold"}>
                    A partire da
                </div>
                <div className={"text-2xl md:text-xl font-bold md:font-semibold"}>
                    {formatPrice(props.prezzoGiornaliero)} <span className="text-xs md:text-sm font-medium"> / al giorno</span>
                </div>
                <div className={"text-sm text-gray-400 uppercase"}>
                    Totale {formatPrice(props.prezzoTotale)}
                </div>
                <Button onClick={() => props.openDialog(true, props.codiceClasse)} className="w-full md:w-auto md:px-10 cursor-pointer text-lg h-12 md:h-10 mt-2">
                    Seleziona
                </Button>
            </div>
        </div>


    )

}