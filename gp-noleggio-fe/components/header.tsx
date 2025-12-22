"use client";

import { Flag, Info, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LoginDrawer from "@/components/login-drawer";

interface HeaderProps {
    dark: boolean;
}

export default function Header({ dark = false }: HeaderProps) {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
                <div className="container mx-auto h-20 flex items-center justify-between">
                    {/* LOGO */}
                    <div className="flex flex-col">
                        <Link href="/">
                            <Image
                                src={dark ? "/logo-rent-colori.png" : "/logo-rent.png"}
                                width={266}
                                height={44}
                                alt="logo gruppo piccirillo rent"
                            />
                        </Link>
                    </div>

                    {/* DESTRA */}
                    <div
                        className={`flex items-center gap-8 ${
                            dark ? "text-black" : "text-white"
                        }`}
                    >
                        <Link href="#" className="flex items-center gap-2 text-sm">
                            <Info width={20} height={20} />
                            <span className="font-bold">Aiuto</span>
                        </Link>

                        <div className="flex items-center gap-2 text-sm cursor-pointer">
                            <Flag width={20} height={20} />
                            <span className="font-bold">IT</span>
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="button"
                            onClick={() => setLoginOpen(true)}
                            className="flex items-center gap-2 text-sm font-bold cursor-pointer"
                            aria-label="Apri login"
                        >
                            <LogIn width={20} height={20} />
                            Login
                        </button>
                    </div>
                </div>
            </header>

            {/* LOGIN DRAWER */}
            <LoginDrawer
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
            />
        </>
    );
}
