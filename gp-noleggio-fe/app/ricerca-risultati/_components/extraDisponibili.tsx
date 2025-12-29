import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Info} from "lucide-react";
import {formatPrice} from "@/lib/formatPrice";
import {useState} from "react";


interface ExtraDisponibiliProps {
    codice: string;
    titolo: string;
    prezzo: string;
    descrizione: string;
    isquantity: boolean;
    onchange: () => void;
}

export default function ExtraDisponibili(props: ExtraDisponibiliProps) {

    const [contatore, setcontatore] = useState(0);


    return (
            <div className={" flex items-center bg-[#F7F7F7] p-4 rounded-br-lg rounded-tl-lg  gap-x-2 justify-between "}>

                <div className={"flex font-bold"}>
                    Guidatore Addizionale
                </div>
                <div className={"flex  "}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost"><Info/></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>informazioni</p>
                        </TooltipContent>
                    </Tooltip>

                </div>
                <div className={"flex  font-bold "}>
                    {formatPrice(props.prezzo)}{" "}


                </div>
                <div className={"flex   "}>
                    {props.isquantity ? (
                        <div className="flex items-center justify-center gap-x-3">
                            <Button className="bg-white text-primary " onClick={() => {
                                setcontatore(contatore - 1)
                            }}>-</Button>
                            <div> {contatore}</div>

                            <Button onClick={() => {
                                setcontatore(contatore + 1)
                            }}>
                                +</Button>
                        </div>
                    ) : (
                        <Button >Aggiungi</Button>
                    )}


                </div>


            </div>

    )
}