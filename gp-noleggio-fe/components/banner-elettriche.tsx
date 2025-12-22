
import Image from "next/image";
import Link from "next/link";

export default function BannerElettriche() {
    return (
        <section className="w-full py-16">
            <div className="mx-auto w-full max-w-[1124px] px-4">
                <div className="flex flex-col gap-16">

                    {/* BLOCCO 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                        {/* immagine */}
                        <div className="relative aspect-[4/3] rounded-br-2xl rounded-tl-2xl overflow-hidden">
                            <Image
                                src="/frame-elettriche.png"
                                alt="Auto elettrica"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* testo */}
                        <div className="max-w-[420px]">
                            <h3 className="text-lg font-semibold">
                                Noleggia un auto elettrica con Piccirillo Rent
                            </h3>

                            <p className="mt-3 text-sm text-gray-600 leading-6">
                                Sei incuriosito dalle auto elettriche ma non sei ancora riuscito a provarne una?
                            </p>

                            <Link
                                href="/elettriche"
                                className="mt-6 inline-flex h-10 px-8 items-center justify-center
                rounded-br-sm rounded-tl-sm bg-[#0700DE] text-white text-sm font-semibold"
                            >
                                Scopri di più
                            </Link>
                        </div>
                    </div>

                    {/* BLOCCO 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                        {/* testo */}
                        <div className="max-w-[420px] md:order-1 order-2">
                            <h3 className="text-lg font-semibold">
                                In che modo il noleggio di veicoli elettrici supporta il tuo business?
                            </h3>

                            <p className="mt-3 text-sm text-gray-600 leading-6">
                                Grazie al noleggio di elettrico avrai la possibilità di guidare nelle ZTL
                                e ridurre i costi di gestione.
                            </p>

                            <Link
                                href="/business"
                                className="mt-6 inline-flex h-10 px-8 items-center justify-center
                rounded-br-sm rounded-tl-sm bg-[#0700DE] text-white text-sm font-semibold"
                            >
                                Scopri di più
                            </Link>
                        </div>

                        {/* immagine */}
                        <div className="relative aspect-[4/3] rounded-br-2xl rounded-tl-2xl overflow-hidden md:order-2 order-1">
                            <Image
                                src="/business2.png"
                                alt="Business elettrico"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
