"use client";

import Link from "next/link";
 

export default function OfferBanner() {
    

    return (
        <>
            <div className="absolute left-1/2 top-20 -translate-x-1/2 z-40">
                <div
                    className="flex items-center justify-between gap-6 bg-black/40 backdrop-blur-md
          rounded-tl-sm rounded-br-sm px-[15px] py-[10px]
          w-[1124px] max-w-[calc(100vw-32px)] text-white text-sm"
                >
                    

                    {/* TESTO OFFERTA */}
                    <p className="text-center">
                        <span className="font-bold">Offerta:</span>{" "}
                        Titolo dell’offerta! 40% di Sconto
                    </p>

                    {/* LINK */}
                    <Link href="/offerta" className="flex items-center gap-1 text-white">
                        Vai all’offerta →
                    </Link>
                </div>
            </div>
        </>
    );
}
