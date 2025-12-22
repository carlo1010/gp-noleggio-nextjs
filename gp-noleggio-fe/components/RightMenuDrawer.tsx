"use client";

import {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {X} from "lucide-react";

type RightMenuDrawerProps = {
    open: boolean;
    onClose: () => void;
};

export default function RightMenuDrawer({open, onClose}: RightMenuDrawerProps) {
    // Chiudi con ESC
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    // Blocca scroll body quando aperto
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-200 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                } bg-black/50 backdrop-blur-sm`}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={`fixed top-0 right-0 z-50 h-dvh w-[420px] max-w-[90vw] bg-white
        shadow-2xl transition-transform duration-200 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!open}
            >
                <div className="flex items-start justify-between p-6">
                    {/* Logo (metti il tuo) */}
                    <div className="relative h-10 w-44">
                        <Image
                            src="/logo-rent-nero.png"
                            alt="Piccirillo Rent"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <button
                        onClick={onClose}
                        className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
                        aria-label="Chiudi menu"
                    >
                        <X size={18}/>
                    </button>
                </div>

                <nav className="px-6 pb-10">
                    <ul className="space-y-6 text-sm">
                        <li>
                            <Link href="#" onClick={onClose} className="font-semibold hover:underline">
                                Le nostre sedi
                            </Link>
                        </li>

                        <li>
                            <div className="font-semibold">La nostra flotta</div>
                            <ul className="mt-3 space-y-2 pl-4 text-gray-700">
                                <li><Link href="/tipo-noleggio/noleggio-auto" onClick={onClose} className="hover:underline">Auto</Link></li>
                                <li><Link href="/tipo-noleggio/noleggio-premium" onClick={onClose} className="hover:underline">Premium</Link></li>
                                <li><Link href="/tipo-noleggio/noleggio-elettriche" onClick={onClose} className="hover:underline">Elettriche</Link></li>
                                <li><Link href="/tipo-noleggio/noleggio-furgoni" onClick={onClose} className="hover:underline">Furgoni</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="/blog" onClick={onClose} className="font-semibold hover:underline">
                                Il blog
                            </Link>
                        </li>

                        <li>
                            <Link href="#" onClick={onClose} className="font-semibold hover:underline">
                                Piccirillo Rent Business
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}
