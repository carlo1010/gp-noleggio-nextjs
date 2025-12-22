import Image from "next/image";
import { Check } from "lucide-react";
import BadgePromo from "@/components/badge-promo";

export default function OffersSection() {
    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-6">Le offerte del momento</h2>

                {/* GRID OFFERTA - Added h-full and items-stretch logic */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

                {/* CARD GRANDE (OCCUPA 2 COLONNE) */}
                <div className="relative md:col-span-2 min-h-[300px] overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-md cursor-pointer hover:scale-[1.01] transition">
                    <Image
                        src="/vacanza.jpg"
                        alt="Noleggio Vacanza"
                        fill
                        className="object-cover"
                    />
                    <BadgePromo topText="Fino al" bottomText="30%" />
                    <div className="absolute bottom-5 left-5 z-10 bg-black/60 rounded-tl-xl rounded-br-xl px-4 py-2">
                        <div className="text-white text-left leading-tight">
                            <div className="text-2xl font-medium">Noleggio Vacanza</div>
                        </div>
                    </div>
                </div>

                {/* CARD PICCOLA 1 */}
                <div className="relative aspect-4/3 md:aspect-auto md:h-full min-h-[300px] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/furgoni.jpg"
                        alt="Noleggio Furgoni"
                        fill
                        className="object-cover"
                    />
                    <BadgePromo topText="Fino al" bottomText="10%" />
                    <div className="absolute bottom-5 left-5 z-10 bg-black/40 rounded-tl-sm rounded-br-sm px-3 py-2">
                        <div className="text-white text-left leading-tight">
                            <div className="text-2xl font-medium">Noleggio Furgoni</div>
                        </div>
                    </div>
                </div>

                {/* CARD PICCOLA 2 */}
                <div className="relative aspect-4/3 md:aspect-auto md:h-full min-h-[300px] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/business.jpg"
                        alt="Noleggio Business"
                        fill
                        className="object-cover"
                    />
                    <BadgePromo topText="Fino al" bottomText="20%" />
                    <div className="absolute bottom-5 left-5 z-10 bg-black/40 rounded-tl-sm rounded-br-sm px-3 py-2">
                        <div className="text-white text-left leading-tight">
                            <div className="text-2xl font-medium">Noleggio Business</div>
                        </div>
                    </div>
                </div>
                </div>

                {/* SECONDA RIGA: TESTO + IMMAGINE VANTAGGI */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
                <div className="md:col-span-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">IL MEGLIO</span>
                    <h3 className="text-2xl font-bold mt-2 mb-4">Viaggia in tranquillità, scegli il meglio</h3>
                    <p className="text-gray-600 mb-6">
                        Prenota il tuo noleggio direttamente dal nostro sito: scegli l'auto che fa per te,
                        aggiungi gli extra che desideri e approfitta delle tariffe vantaggiose.
                    </p>
                    <button className="bg-[#0700DE] text-white px-6 py-2 rounded-md hover:bg-[#0500b0] transition">
                        Scopri i vantaggi
                    </button>
                </div>

                <div className="md:col-span-2 relative rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg min-h-[350px]">
                    <Image
                        src="/vacanza.jpg"
                        alt="Vantaggi"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="absolute inset-0 flex flex-col justify-center pl-10 space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                {/* Green Tick applied here */}
                                <Check className='w-6 h-6 text-green-500 stroke-[3px]' />
                                <span className="text-xl md:text-2xl text-white font-medium">Vantaggio {i}</span>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}