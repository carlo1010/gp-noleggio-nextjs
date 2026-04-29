"use client";

import { Flag, Info, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginDrawer from "@/components/login-drawer";
import RightMenuDrawer from "@/components/RightMenuDrawer";

interface HeaderProps {
    dark?: boolean;
}

export default function Header({ dark = false }: HeaderProps) {

    const [loginOpen, setLoginOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                style={{ paddingRight: "var(--removed-body-scroll-bar-size, 0)" }}
                className={`fixed top-0 left-0 w-full z-50 transition-[padding-top,padding-bottom,background-color,box-shadow,backdrop-filter] duration-300 ${isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-md py-3 md:py-2"
                        : "bg-transparent py-4"
                    }`}
            >
                <div className={`mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16 md:h-14" : "h-20"
                    }`}>
                    {/* LOGO */}
                    <div className={`flex flex-col relative z-50 transition-all duration-300 ${isScrolled ? "mt-[5px] md:mt-0" : "mt-0"
                        }`}>
                        <Link href="/">
                            <Image
                                src={(dark || isScrolled) ? "/logo-rent-colori.png" : "/logo-rent.png"}
                                width={isScrolled ? 160 : 200}
                                height={isScrolled ? 26 : 33}
                                alt="logo gruppo piccirillo rent"
                                priority
                                loading="eager"
                                className="transition-all duration-300 md:w-[266px] md:h-auto"
                            />
                        </Link>
                    </div>

                    {/* DESTRA */}
                    <div
                        className={`flex items-center gap-4 md:gap-8 transition-colors duration-300 ${(dark || isScrolled) ? "text-black" : "text-white"
                            }`}
                    >
                        <Link href="/aiuto" className="flex items-center gap-2 text-sm">
                            <Info width={20} height={20} />
                            <span className="font-bold hidden md:inline">Aiuto</span>
                        </Link>

                        <div className="flex items-center gap-2 text-sm cursor-pointer">
                            <Flag width={20} height={20} />
                            <span className="font-bold hidden md:inline">IT</span>
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="button"
                            onClick={() =>
                                setLoginOpen((prev) => {
                                    const next = !prev;
                                    if (next) setMenuOpen(false); // ensure Menu drawer is closed
                                    return next;
                                })
                            }
                            className="flex items-center gap-2 text-sm font-bold cursor-pointer"
                            aria-label="Apri login"
                            aria-expanded={loginOpen}
                        >
                            <LogIn width={20} height={20} />
                            <span className="hidden md:inline">Login</span>
                        </button>
                        {/* MENU BUTTON (aligned with OfferBanner behavior + label) */}
                        <button
                            type="button"
                            onClick={() =>
                                setMenuOpen((prev) => {
                                    const next = !prev;
                                    if (next) setLoginOpen(false); // ensure Login drawer is closed
                                    return next;
                                })
                            }
                            aria-label="Apri menu"
                            aria-expanded={menuOpen}
                            className="flex items-center gap-2 text-sm font-bold cursor-pointer group pr-1 md:pr-0"
                        >

                            <Menu width={20} height={20} />

                            <span className="hidden md:inline">Menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* LOGIN DRAWER */}
            <LoginDrawer
                open={loginOpen}
                onCloseAction={() => setLoginOpen(false)}
            />
            {/* MENU DRAWER */}
            <RightMenuDrawer
                open={menuOpen}
                onCloseAction={() => setMenuOpen(false)}
            />
        </>
    );
}
