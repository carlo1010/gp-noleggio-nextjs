import Image from "next/image";
import {Check} from "lucide-react";

export default function OffersSection() {
    return (
        <section className="w-full py-6 px-35 bg-white">

            <h2 className="text-2xl font-bold mb-6">Le offerte del momento</h2>
            {/* GRID OFFERTA 1 + 2 + 3 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

                {/* CARD GRANDE (OCCUPA 2 COLONNE) */}
                <div
                    className="md:col-span-2 relative rounded-tl-sm rounded-br-sm overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/vacanza.png"
                        alt="Noleggio Vacanza"
                        width={900}
                        height={400}
                        className="object-cover w-full h-56 md:h-64 lg:h-72"
                    />
                </div>

                {/* CARD PICCOLA 1 */}
                <div
                    className="relative rounded-tl-sm rounded-br-sm overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/furgoni.png"
                        alt="Noleggio Furgoni"
                        width={450}
                        height={300}
                        className="object-cover w-full h-56 md:h-64 lg:h-72"
                    />
                </div>

                {/* CARD PICCOLA 2 */}
                <div
                    className="relative rounded-tl-sm rounded-br-sm overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/business.png"
                        alt="Noleggio Business"
                        width={450}
                        height={300}
                        className="object-cover w-full h-56 md:h-64 lg:h-72"
                    />
                </div>
            </div>
            {/* SECONDA RIGA: TESTO + IMMAGINE VANTAGGI */}
            {/* SECONDA RIGA: 4 COLONNE (2 + 2) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">

                {/* SINISTRA — 2 COLONNE */}
                <div className="md:col-span-2">
    <span className="text-xs font-semibold text-gray-500 uppercase">
      IL MEGLIO
    </span>

                    <h3 className="text-2xl font-bold mt-2 mb-4">
                        Viaggia in tranquillità, scegli il meglio
                    </h3>

                    <p className="text-gray-600 mb-6">
                        Prenota il tuo noleggio direttamente dal nostro sito: scegli l'auto che fa per te,
                        aggiungi gli extra che desideri e approfitta delle tariffe vantaggiose.
                        E se hai bisogno, il nostro contact center è sempre a tua disposizione!
                    </p>

                    <button className="bg-[#0700DE] text-white px-6 py-2 rounded-md hover:bg-[#0500b0] transition">
                        Scopri i vantaggi
                    </button>
                </div>

                {/* DESTRA — 2 COLONNE */}
                <div className="md:col-span-2 relative rounded-tl-sm rounded-br-sm overflow-hidden shadow-lg">
                    <Image
                        src="/vantaggi.png"
                        alt="Vantaggi"
                        width={700}
                        height={400}
                        className="object-cover w-full h-64 md:h-full"
                    />

                    {/* overlay per contrasto testo */}

                </div>

            </div>


        </section>
    );
}

