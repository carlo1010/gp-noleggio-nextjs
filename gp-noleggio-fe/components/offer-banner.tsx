"use client";

import Link from "next/link";


export default function OfferBanner() {
    return (
        <>
            <div className="absolute left-0 w-full top-25 z-40">
                <div className="container mx-auto px-4 max-w-[1240px]">
                    <div
                        className="flex items-center justify-between gap-6 bg-black/40 backdrop-blur-md
                            rounded-tl-sm rounded-br-sm px-[15px] py-[10px]
                            w-full text-white text-sm"
                    >
                        {/* TESTO OFFERTA */}
                        <p className="flex-1 md:flex-none">
                            <span className="font-bold">Offerta:</span>{" "}
                            Titolo dell’offerta! 40% di Sconto
                        </p>

                        {/* LINK */}
                        <Link href="/offerta" className="flex items-center gap-1 text-white whitespace-nowrap">
                            Vai all’offerta →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
