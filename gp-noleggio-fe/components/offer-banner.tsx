import {Menu} from "lucide-react";
import Link from "next/link";

export default function OfferBanner() {
    return (
        <div className="absolute left-1/2 top-20 -translate-x-1/2 z-40">
            <div className="flex items-center justify-between gap-6 bg-black/40 backdrop-blur-md rounded-tl-sm rounded-br-sm px-[15px] py-[10px]
            w-[1124px] max-w-[calc(100vw-32px)]text-white text-sm">

                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-white flex justify-center items-center">

                        <Menu className="w-3 h-3 text-white"/>

                    </div>

                </div>

                <p>
                    <span className="font-bold text-white">Offerta:</span> <span className={" text-white"}>Titolo dell’offerta! 40% di Sconto</span>
                </p>


                <Link href="/offerta" className="flex items-center gap-1 text-white">
                    Vai all’offerta →
                </Link>

            </div>

        </div>
    )
}