import {Check, X} from "lucide-react";
import {formatPrice} from "@/lib/formatPrice";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React from "react";


interface PacchettiProtectionProps {

}


export default function PacchettiProtection() {
    return(
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
                <Dialog>

                    <DialogTrigger asChild>
                        <Button variant="ghost" className={"underline text-[#0700DE]"}>Maggiori Informazioni</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>


                    </DialogContent>

                </Dialog>

                <Button  className=" text-sm">
                    Seleziona
                </Button >




            </div>

    )

}