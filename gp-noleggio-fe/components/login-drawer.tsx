"use client";

import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type LoginDrawerProps = {
    open: boolean;
    onClose: () => void;
};

export default function LoginDrawer({ open, onClose }: LoginDrawerProps) {
    const [showPwd, setShowPwd] = useState(false);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    // lock body scroll
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
                className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={`fixed top-0 right-0 z-50 h-dvh w-[520px] max-w-[92vw] bg-white shadow-2xl
        transition-transform duration-200 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!open}
            >
                <div className="flex items-start justify-between p-8">
                    <div>
                        <p className="text-xs text-gray-500">Hai un account aziendale?</p>
                        <Link href="#" className="mt-2 inline-flex text-sm font-semibold text-[#0700DE] hover:underline">
                            Collegati a Piccirillo Rent
                        </Link>

                        <h2 className="mt-6 text-lg font-semibold text-black">
                            Accedi al tuo profilo personale
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#0700DE] text-[#0700DE] hover:bg-blue-50"
                        aria-label="Chiudi"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-8 pb-10">
                    <form className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Inserisci il tuo indirizzo email
                            </label>
                            <input
                                type="email"
                                placeholder="nome@email.com"
                                className="mt-2 h-11 w-full rounded-md border border-gray-200 px-4 text-sm outline-none
                focus:border-[#0700DE]"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Password
                            </label>

                            <div className="relative mt-2">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    placeholder="********"
                                    className="h-11 w-full rounded-md border border-gray-200 px-4 pr-12 text-sm outline-none
                  focus:border-[#0700DE]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPwd ? "Nascondi password" : "Mostra password"}
                                >
                                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <Link
                                href="/password-dimenticata"
                                className="mt-2 inline-flex text-xs text-[#0700DE] hover:underline"
                            >
                                Hai dimenticato la password?
                            </Link>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex items-center gap-4">
                            <button
                                type="button"
                                className="h-11 flex-1 rounded-br-sm rounded-tl-sm bg-gray-100 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                            >
                                Accedi
                            </button>

                            <Link
                                href="/registrazione"
                                className="h-11 flex-1 rounded-br-sm rounded-tl-sm border border-[#0700DE] bg-white
                text-sm font-semibold text-[#0700DE] hover:bg-blue-50
                inline-flex items-center justify-center"
                                onClick={onClose}
                            >
                                Crea un account
                            </Link>
                        </div>
                    </form>
                </div>
            </aside>
        </>
    );
}
