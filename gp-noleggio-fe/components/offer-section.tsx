import Image from "next/image";
import { Check } from "lucide-react";

export default function OffersSection() {
    return (
        <section className="w-full py-12">

            <h2 className="text-2xl font-bold mb-6">Le offerte del momento</h2>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                <div className="relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/offers/vacanza.jpg"
                        alt="Noleggio Vacanza"
                        width={500}
                        height={300}
                        className="object-cover w-full h-48"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                        Fino al 20%
                    </div>
                    <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow">
                        Noleggio vacanza
                    </div>
                </div>


                <div className="relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/offers/furgoni.jpg"
                        alt="Noleggio Furgoni"
                        width={500}
                        height={300}
                        className="object-cover w-full h-48"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                        Fino al 10%
                    </div>
                    <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow">
                        Noleggio Furgoni
                    </div>
                </div>


                <div className="relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/offers/business.jpg"
                        alt="Noleggio Business"
                        width={500}
                        height={300}
                        className="object-cover w-full h-48"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                        Fino al 30%
                    </div>
                    <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow">
                        Noleggio Business
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                
                <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                        IL MEGLIO
                    </span>

                    <h3 className="text-2xl font-bold mt-2 mb-4">
                        Viaggia in tranquillità, scegli il meglio
                    </h3>

                    <p className="text-gray-600 mb-6">
                        Prenota il tuo noleggio direttamente dal nostro sito: scegli l'auto che fa per te, aggiungi gli extra che desideri e
                        approfitta delle tariffe vantaggiose. E se hai bisogno, il nostro contact center è sempre a tua disposizione!
                    </p>

                    <button className="bg-[#0700DE] text-white px-5 py-2 rounded-md hover:bg-[#0500b0] transition">
                        Scopri i vantaggi
                    </button>
                </div>

                {/* IMMAGINE + LISTA VANTAGGI */}
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="/offers/vantaggi.jpg"
                        alt="Vantaggi"
                        width={700}
                        height={400}
                        className="object-cover w-full h-64 md:h-full"
                    />

                    {/* LISTA VANTAGGI */}
                    <ul className="absolute top-6 left-6 text-white space-y-2 text-lg drop-shadow-md">
                        {["Vantaggio 1", "Vantaggio 2", "Vantaggio 3", "Vantaggio 4", "Vantaggio 5"].map(
                            (v, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Check className="text-green-400 w-5 h-5" />
                                    {v}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}

