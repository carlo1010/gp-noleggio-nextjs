import {Flag, Info, LogIn} from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

interface HeaderProps {
    dark: boolean;
}

export default function Header({dark = false}: HeaderProps) {
    return (
        <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
            <div className="container mx-auto h-20 flex items-center justify-between">
                <div className="flex flex-col">
                    <Link href={"/"}>
                    <Image
                        src={dark ? "/logo-rent-colori.png" : "/logo-rent.png"}
                        width={266}
                        height={44}
                        alt="logo gruppo piccirillo rent"
                    />
                    </Link>
                </div>


                <div className={`flex items-center gap-8 ${dark ? "text-black" : "text-white"} `}>
                    <Link href={""} className="flex items-center gap-2 text-sm">
                        <Info width={20} height={20}/>
                        <span className={"font-bold"}>Aiuto</span>
                    </Link>
                    <div className="flex items-center gap-2 text-sm cursor-pointer">
                        <Flag width={20} height={20}/>
                        <span className={"font-bold"}>IT</span>
                    </div>
                    <Link href={""} className="flex items-center gap-2 text-sm">
                        <LogIn width={20} height={20}/>
                        <span className={"font-bold"}>Login</span>
                    </Link>
                </div>
            </div>
        </header>

    )

}