import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import CambioIcon from "@/components/svg/cambioIcon";
import PostiIcon from "@/components/svg/postiIcon";
import { PatenteIcon } from "@/components/svg/patenteicon";
import PorteIcon from "@/components/svg/porteicon";
import AriaIcon from "@/components/svg/ariaicon";
import { getSimilarVehicleLabel } from "@/lib/vehicle-label";

interface CardNoleggioProps {
    imageUrl: string;
    nome: string;
    descrizioneGruppo?: string;
    cambio?: string;
    codiceClasse: string
    posti?: number;
    ariaCondizionata?: boolean;
    eta?: string;
    porte?: number;
    alimentazione?: string;
    prezzoTotale: string | number;
    prezzoGiornaliero: string | number;
    eagerImage?: boolean;
    codiceTariffa: string;
    openDialog: (event: boolean, selection: { codiceClasse: string; codiceTariffa: string }) => void;
}


export default function CardNoleggio(props: CardNoleggioProps,) {
    const specs = [
        props.cambio ? { key: "cambio", icon: <CambioIcon />, label: props.cambio } : null,
        props.posti != null ? { key: "posti", icon: <PostiIcon />, label: String(props.posti) } : null,
        props.ariaCondizionata != null
            ? { key: "aria", icon: <AriaIcon />, label: props.ariaCondizionata ? "A/C" : "NO A/C" }
            : null,
        props.eta ? { key: "eta", icon: <PatenteIcon />, label: props.eta } : null,
        props.porte != null ? { key: "porte", icon: <PorteIcon />, label: String(props.porte) } : null,
    ].filter(Boolean) as Array<{ key: string; icon: React.ReactNode; label: string }>;

    return (
        <div className={"flex flex-col md:grid md:grid-cols-7 gap-x-4 border-b border-gray-200 pb-6 md:pb-0"}>


            <div className='w-full md:col-span-2 flex items-center justify-center p-4 md:p-0'>
                <div className="relative w-full max-w-[300px] aspect-[300/219]">
                    <Image
                        src={props.imageUrl || "/fiat-500.png"}
                        alt={props.nome || "Veicolo"}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        priority={props.eagerImage}
                        loading={props.eagerImage ? "eager" : "lazy"}
                        className="object-contain"
                    />
                </div>
            </div>

            <div className={"flex flex-col gap-y-2 w-full md:col-span-3 px-4 md:px-0"}>
                <div className={" font-bold uppercase"}>
                    {props.nome}
                </div>
                <div className={"w-max p-2 rounded-tl-sm rounded-br-sm bg-[#999999] text-white uppercase"}>
                    {getSimilarVehicleLabel(props.descrizioneGruppo)}
                </div>

                {specs.length > 0 && (
                    <div className={"flex flex-row flex-wrap gap-x-4 font-bold"}>
                        {specs.map((spec) => (
                            <div key={spec.key} className={"flex flew-row gap-x-2 items-center"}>
                                {spec.icon}
                                {spec.label}
                            </div>
                        ))}
                    </div>
                )}
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
                <Button
                    onClick={() =>
                        props.openDialog(true, {
                            codiceClasse: props.codiceClasse,
                            codiceTariffa: props.codiceTariffa,
                        })
                    }
                    className="w-full md:w-auto px-10 cursor-pointer text-lg bg-[#0700DE] hover:bg-[#0500b0] font-bold"
                >
                    Seleziona
                </Button>

            </div>


        </div>


    )

}
