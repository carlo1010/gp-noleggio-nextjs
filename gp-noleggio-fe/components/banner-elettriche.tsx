import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function BannerElettriche() {


    return (

        
        <div className={"flex flex-row gap-4 justify-between"}>
            <Image className=" rounded-tl-lg rounded-br-lg" src={"/frame-elettriche.png"} alt={''} width={531}
                   height={429}/>
            <div className={"flex flex-col py-2 items-center justify-center"}>
                <h2 className={"font-bold"}>Noleggia un veicolo elettrico con Piccirillo Rent</h2>
                <p>Sei incuriosito dalle auto elettriche ma non sei ancora riuscito a
                    provarne una? Scopri subito tutti i vantaggi di noleggiarne una.</p>
                <Button>
                    Scopri di più
                </Button>


            </div>

        </div>
    )
}