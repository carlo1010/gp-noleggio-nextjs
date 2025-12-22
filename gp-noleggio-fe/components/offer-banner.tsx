"use client";

import {Menu} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import RightMenuDrawer from "@/components/RightMenuDrawer";

export default function OfferBanner() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="absolute left-1/2 top-20 -translate-x-1/2 z-40">
                <div
                    className="flex items-center justify-between gap-6 bg-black/40 backdrop-blur-md
          rounded-tl-sm rounded-br-sm px-[15px] py-[10px]
          w-[1124px] max-w-[calc(100vw-32px)] text-white text-sm"
                >
                    {/* MENU BUTTON */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Apri menu"
                        className="w-6 h-6 rounded-full border border-white
            flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
                    >
                        <Menu className="w-3 h-3 text-white"/>
                    </button>

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

            {/* DRAWER */}
            <RightMenuDrawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </>
    );
}
