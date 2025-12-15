import Image from "next/image";
import {Check} from "lucide-react";
import BadgePromo from "@/components/badge-promo";

export default function OffersSection() {
    return (
        <section className="w-full py-6 px-35 bg-white">

            <h2 className="text-2xl font-bold mb-6">Le offerte del momento</h2>
            {/* GRID OFFERTA 1 + 2 + 3 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

                {/* CARD GRANDE (OCCUPA 2 COLONNE) */}
                
                <div className="relative md:col-span-2 aspect-[16/9] overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/vacanza.jpg"
                        alt="Noleggio Vacanza"
                        fill
                        className="object-cover"
                    />
                    {/* OFFER BADGE DA FARE BACKGROUND IN ROSSO */}
                    <BadgePromo
                        topText="Fino al"
                        bottomText="30%"
                    />
                    {/* LABEL FONDO SCHEDA */}
                    <div className="absolute mb-3 ml-5 z-10 bg-black/60 rounded-tl-xl rounded-br-xl px-3 py-2" style={{ bottom: '20px' }}>
                        <div className="text-white text-left leading-tight">
                            <div className="text-2xl font-medium">Noleggio Vacanza</div>
                        </div>
                    </div>
                </div>
                {/* CARD PICCOLA 1 */}
                <div
                    className="relative aspect-[4/3] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/furgoni.jpg"
                        alt="Noleggio Furgoni"
                        fill
                        className="object-cover w-full h-56 md:h-64 lg:h-72"
                    />
                     <BadgePromo
                        topText="Fino al"
                        bottomText="10%"
                    />
                    {/* LABEL FONDO SCHEDA */}
                    <div className="absolute bottom-3 left-3 z-10 bg-black/40 rounded-tl-sm rounded-br-sm px-3 py-2" style={{ bottom: '20px' }}>
                        <div className="text-white text-left leading-tight">
                            <div className="text-2xl font-medium">Noleggio Furgoni</div>
                        </div>
                    </div>
                </div>
                {/* CARD PICCOLA 2 */}
                <div
                    className="relative aspect-[4/3] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition">
                    <Image
                        src="/business.jpg"
                        alt="Noleggio Business"
                        fill
                        className="object-cover w-full h-56 md:h-64 lg:h-72"
                    />
                    <BadgePromo
                        topText="Fino al"
                        bottomText="20%"
                    />
                    {/* LABEL FONDO SCHEDA */}
                    <div className="absolute bottom-3 left-3 z-10 bg-black/40 rounded-tl-sm rounded-br-sm px-3 py-2" style={{ bottom: '20px' }}>
                        <div className="text-white text-left leading-tight">
                            <div className="text-2xl font-medium">Noleggio Business</div>
                        </div>
                    </div>
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
                <div className="md:col-span-2 relative rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg">
                    <Image
                        src="/vacanza.jpg"
                        alt="Vantaggi"
                        width={700}
                        height={400}
                        className="object-cover w-full h-64 md:h-full"
                    />
                    {/* overlay per contrasto testo, da regolare trasparenza*/}
                    <div className="absolute inset-0 bg-black/40"></div>               
                    {/* LISTA - da risolvere colore "check" */}
                    <div className="absolute top-0 h-full flex flex-col justify-center ml-12 space-y-3" style={{ left: '40px' }} >
                        {/* VANTAGGIO 1 */}
                        <div className="flex items-center gap-3">
                            <Check className='w-5 h-5' />
                            <span className="text-2xl text-white font-medium">Vantaggio 1</span>
                        </div>

                        {/* VANTAGGIO 2 */}
                        <div className="flex items-center gap-3">
                            <Check className='w-5 h-5' />
                            <span className="text-2xl text-white font-medium">Vantaggio 2</span>
                        </div>

                        {/* VANTAGGIO 3 */}
                        <div className="flex items-center gap-3">
                            <Check className='w-5 h-5' />
                            <span className="text-2xl text-white font-medium">Vantaggio 3</span>
                        </div>
                        {/* VANTAGGIO 3 */}
                        <div className="flex items-center gap-3">
                            <Check className='w-5 h-5' />
                            <span className="text-2xl text-white font-medium">Vantaggio 4</span>
                        </div>
                        {/* VANTAGGIO 3 */}
                        <div className="flex items-center gap-3">
                            <Check className='w-5 h-5'/>
                            <span className="text-2xl text-white font-medium">Vantaggio 5</span>
                        </div>
                    </div>

                    
                    
                </div>

            </div>


        </section>
    );
}

