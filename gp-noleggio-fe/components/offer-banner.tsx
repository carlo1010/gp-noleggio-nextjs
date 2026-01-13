"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function OfferBanner() {
    return (
        <>
            <div className="absolute inset-x-0 top-25 z-40">
                <div className="container mx-auto px-4">
                    <div
                        className="flex items-center justify-between gap-6 bg-black/40 backdrop-blur-md
                        rounded-tl-sm rounded-br-sm px-[15px] py-2.5
                        w-full text-white text-sm hover:bg-black/50 transition-colors"
                    >
                        {/* TESTO OFFERTA */}
                        <p className="flex-1 md:flex-none">
                            <span className="font-bold">Offerta:</span>{" "}
                            Titolo dell’offerta! 40% di Sconto
                        </p>

                        {/* DESKTOP LINK */}
                        <Link
                            href="/offerta"
                            className="hidden md:flex items-center gap-1 text-white whitespace-nowrap"
                        >
                            Vai all’offerta →
                        </Link>

                        {/* MOBILE ICON */}
                        <Link
                            href="/offerta"
                            className="flex md:hidden items-center text-white"
                            aria-label="Vai all’offerta"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
