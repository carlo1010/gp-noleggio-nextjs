import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image";
import CambioIcon from "@/components/svg/cambioIcon";
import PostiIcon from "@/components/svg/postiIcon";
import AriaIcon from "@/components/svg/ariaicon";
import {PatenteIcon} from "@/components/svg/patenteicon";
import PorteIcon from "@/components/svg/porteicon";
import {Check, X} from "lucide-react";
import {formatPrice} from "@/lib/formatPrice";
import {useRouter, useSearchParams} from "next/navigation";

interface SceltaTariffaProps {
    imageUrl: string;
    nome: string;
    cambio: string;
    posti: number;
    ariaCondizionata: boolean;
    eta: string;
    porte: number;
    alimentazione: string;
    prezzoGiornalieroRitiro: string;
    prezzoGiornalieroOnline: string;
    prezzoTotaleOnline: string;
    prezzoTotaleRitiro: string;


    open: boolean;
    onOpenChange: (event: boolean) => void;
}

export function SceltaTariffa(props: SceltaTariffaProps) {

    const sp = useSearchParams();
    const router = useRouter();
    function  NextStep(tipopagamento:string, prezzogiornaliero:string, prezzototale:string ) {
        const params = new URLSearchParams(sp.toString());

        params.set("step", "3");
        params.set("tipopagamento", tipopagamento);
        params.set("prezzogiornaliero", prezzogiornaliero);
        params.set("prezzototale", prezzototale);

        router.push(`/ricerca-risultati?${params.toString()}`)


    }

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogContent showCloseButton={false} className="min-w-[60vw] p-8">
                <DialogTitle></DialogTitle>
                <div className="flex flex-row gap-x-10 ">
                    <div className="flex flex-col w-1/2 justify-between">
                        <div className={"flex items-center text-primary font-bold "}>
                            SCELTA TARIFFA
                        </div>

                        <div className="flex flex-col gap-x-2 gap-y-4 ">
                            <div className={" font-bold uppercase"}>
                                {props.nome}
                            </div>
                            <div
                                className={"w-max p-2 rounded-tl-sm rounded-br-sm bg-[#999999] text-white uppercase text-sm"}>
                                O MINI SIMILARE
                            </div>
                            <Image className="" src={props.imageUrl} alt={''} width={335} height={272}/>

                            <div className={"flex flex-row flex-wrap gap-x-4 font-bold"}>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <CambioIcon/>{props.cambio}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <PostiIcon/>{props.posti}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <AriaIcon/>{props.ariaCondizionata == true ? 'A/C' : 'NO A/C'}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <PatenteIcon/>{props.eta}
                                </div>
                                <div className={"flex flew-row gap-x-2 items-center"}>
                                    <PorteIcon/>{props.porte}
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="flex flex-col w-1/4 gap-x-2 gap-y-4 noleggioCard border border-gray rounded-br-2xl rounded-tl-2xl justify-between">
                        <div className={"bg-[#F6F6FF] items-center rounded-tl-2xl p-4"}>
                            <p className={"text-black font-bold "}>Pagamento al ritiro</p>
                            <p className={""}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel purus
                                gravida dui suscipit lacinia eu ut massa.</p>


                        </div>
                        <div className={" flex flex-col gap-y-2  p-4"}>
                            <div className={" flex flex-row gap-x-2"}>
                                <Check strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Vamtaggio 1
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 2
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 3
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 4
                            </div>

                        </div>

                        <div className={"flex flex-row justify-between  p-4"}>
                            <div>
                                <p className={"font-bold"}>{formatPrice(props.prezzoGiornalieroRitiro)}</p>
                                <p className={"font-bold text-sm "}>al giorno</p>
                            </div>
                            <Button onClick={() => NextStep('ritiro', props.prezzoGiornalieroRitiro, props.prezzoTotaleRitiro)} className=" text-sm">
                                Seleziona
                            </Button>




                        </div>


                    </div>
                    <div className="flex flex-col  w-1/4 gap-x-2 gap-y-4 noleggioCard border border-gray rounded-br-2xl rounded-tl-2xl justify-between">
                        <div className={"bg-[#F6F6FF] items-center rounded-tl-2xl p-4"}>
                            <p className={"text-black font-bold "}>Pagamento Online</p>
                            <p className={""}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel purus
                                gravida dui suscipit lacinia eu ut massa.</p>


                        </div>
                        <div className={" flex flex-col gap-y-2  p-4"}>
                            <div className={" flex flex-row gap-x-2"}>
                                <Check strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Vamtaggio 1
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 2
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 3
                            </div>
                            <div className={" flex flex-row gap-x-2"}>
                                <X strokeWidth={4} className={" w-6 h-6 text-primary"}/>
                                Svantaggio 4
                            </div>

                        </div>

                        <div className={"flex flex-row justify-between  p-4"}>
                            <div>
                                <p className={"font-bold"}> {formatPrice(props.prezzoGiornalieroOnline)}</p>
                                <p className={"font-bold text-sm "}>al giorno</p>
                            </div>
                            <Button
                                onClick={() => NextStep('web', props.prezzoGiornalieroOnline, props.prezzoTotaleOnline)}
                                className="text-sm"
                            >

                                Seleziona
                            </Button>

                        </div>


                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}