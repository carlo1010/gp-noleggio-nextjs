"use client";

import {Flag, Info, LogIn, Menu} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import LoginDrawer from "@/components/login-drawer";
import RightMenuDrawer from "@/components/RightMenuDrawer";

interface HeaderProps {
    dark?: boolean;
}

export default function Header({dark = false}: HeaderProps) {

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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-md py-2"
                        : "bg-transparent py-4"
                }`}
            >
                <div className={`container mx-auto flex items-center justify-between transition-all duration-300 ${
                    isScrolled ? "h-14" : "h-20"
                }`}>
                    {/* LOGO */}
                    <div className="flex flex-col">
                        <Link href="/">
                            <Image
                                src={(dark || isScrolled) ? "/logo-rent-colori.png" : "/logo-rent.png"}
                                width={isScrolled ? 200 : 266}
                                height={isScrolled ? 33 : 44}
                                alt="logo gruppo piccirillo rent"
                                className="transition-all duration-300"
                            />
                        </Link>
                    </div>

                    {/* DESTRA */}
                    <div
                        className={`flex items-center gap-8 transition-colors duration-300 ${
                            (dark || isScrolled) ? "text-black" : "text-white"
                        }`}
                    >
                        <Link href="#" className="flex items-center gap-2 text-sm">
                            <Info width={20} height={20}/>
                            <span className="font-bold">Aiuto</span>
                        </Link>

                        <div className="flex items-center gap-2 text-sm cursor-pointer">
                            <Flag width={20} height={20}/>
                            <span className="font-bold">IT</span>
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
                            <LogIn width={20} height={20}/>
                            Login
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
                            className="flex items-center gap-2 text-sm font-bold cursor-pointer group"
                        >

                            <Menu width={20} height={20}/>

                            <span>Menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* LOGIN DRAWER */}
            <LoginDrawer
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
            />
            {/* MENU DRAWER */}
            <RightMenuDrawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </>
    );
}
