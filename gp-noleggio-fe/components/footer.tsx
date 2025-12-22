import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Footer() {

    return (
        <footer className="bg-[#F7F7F7] ">

            <div className="flex container mx-auto px-4 py-12 ">

                <div className="flex justify-start flex-col w-1/2 gap-y-2">
                    <div className="bg-white rounded-br-3xl rounded-tl-3xl p-2 max-w-max">
                        <Image src={'/car-key.png'} alt={'chiavi'} width={76} height={76}/>
                    </div>
                    <p className="text-3xl font-bold">Scopri dove noleggiare auto e furgoni Piccirillo Rent</p>
                    <p><span className={"text-[#0700DE]"}>74</span> sedi in Italia</p>
                </div>

                <div className="w-1/2">
                    <div className="grid grid-cols-4 gap-x-3 ">
                        <div className={"flex flex-col gap-y-2 "}>
                            <Link href={""} className={"text-base "}>
                                Torino
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Aosta
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Milano
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Bergamo

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Brescia

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Como

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Cremona

                            </Link>

                        </div>
                        <div className={"flex flex-col gap-y-2 "}>
                            <Link href={""} className={"text-base "}>
                                Torino
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Aosta
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Milano
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Bergamo

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Brescia

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Como

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Cremona

                            </Link>

                        </div>
                        <div className={"flex flex-col gap-y-2 "}>

                            <Link href={""} className={"text-base "}>
                                Torino
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Aosta
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Milano
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Bergamo

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Brescia

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Como

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Cremona

                            </Link>

                        </div>
                        <div className={"flex flex-col gap-y-2 "}>
                            <Link href={""} className={"text-base "}>
                                Torino
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Aosta
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Milano
                            </Link>
                            <Link href={""} className={"text-base "}>
                                Bergamo

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Brescia

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Como

                            </Link>
                            <Link href={""} className={"text-base "}>
                                Cremona

                            </Link>

                        </div>


                    </div>
                    <div className="pt-4">
                        <Button variant={'link'} className={"text-[#0700DE] px-0 font-bold"}>
                            Tutte le città
                        </Button>
                    </div>
                </div>

            </div>

        </footer>
    )

}