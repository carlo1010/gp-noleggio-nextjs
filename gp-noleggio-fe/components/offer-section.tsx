import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import BadgePromo from "./badge-promo";

interface OffersSectionProps {
    config?: any;
    title?: string;
    offers?: {
        title: string;
        image: string | any;
        link: string;
        badgeTop?: string;
        badgeBottom: string;
    }[];
}

export default function OffersSection({ config, title, offers }: OffersSectionProps) {
    const cmsTitle = config?.homeConfig?.offersSection?.title || title || "Le offerte del momento";
    const cmsImageVantaggi = config?.homeConfig?.offersSection?.imageVantaggi?.url || "/vacanza.jpg";
    const cmsVantaggiTitle = config?.homeConfig?.offersSection?.vantaggiTitle || "Viaggia in tranquillità, scegli il meglio";
    const cmsVantaggiSubtitle = config?.homeConfig?.offersSection?.vantaggiSubtitle || "IL MEGLIO";
    const cmsVantaggiBody = config?.homeConfig?.offersSection?.vantaggiBody || "Prenota il tuo noleggio direttamente dal nostro sito: scegli l'auto che fa per te,\naggiungi gli extra che desideri e approfitta delle tariffe vantaggiose.";
    const cmsVantaggiList = config?.homeConfig?.offersSection?.vantaggiList;
    
    // Default hardcoded offers if none provided
    const displayOffers = offers || [
        {
            title: "Noleggio Vacanza",
            image: "/vacanza.jpg",
            link: "/tipo-noleggio/noleggio-auto",
            badgeTop: "Fino al",
            badgeBottom: "30%",
            isLarge: true
        },
        {
            title: "Noleggio Furgoni",
            image: "/furgoni.jpg",
            link: "/tipo-noleggio/noleggio-furgoni",
            badgeTop: "Fino al",
            badgeBottom: "10%"
        },
        {
            title: "Noleggio Premium",
            image: "/business.jpg",
            link: "/tipo-noleggio/noleggio-premium",
            badgeTop: "Fino al",
            badgeBottom: "20%"
        }
    ];

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 py-6 max-w-[1240px]">
                <h2 className="text-2xl font-bold mb-6">{cmsTitle}</h2>

                {/* GRID OFFERTA */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {displayOffers.map((offer, index) => {
                        const isLarge = index === 0 && displayOffers.length === 3; // Mantieni layout originale se sono 3
                        const imageUrl = typeof offer.image === 'object' ? offer.image?.url : offer.image;

                        return (
                            <Link 
                                key={index}
                                href={offer.link} 
                                className={`relative ${isLarge ? "md:col-span-2" : ""} aspect-4/3 md:aspect-auto min-h-[250px] md:min-h-[300px] overflow-hidden rounded-tl-3xl rounded-br-3xl shadow-md cursor-pointer hover:scale-[1.01] transition block`}
                            >
                                <Image
                                    src={imageUrl}
                                    alt={offer.title}
                                    fill
                                    className="object-cover"
                                />
                                <BadgePromo topText={offer.badgeTop || "Fino al"} bottomText={offer.badgeBottom} />
                                <div className="absolute bottom-5 left-5 z-10 bg-black/60 rounded-tl-xl rounded-br-xl px-4 py-2">
                                    <div className="text-white text-left leading-tight">
                                        <div className="text-2xl font-medium">{offer.title}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* SECONDA RIGA: TESTO + IMMAGINE VANTAGGI */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
                    <div className="md:col-span-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase">{cmsVantaggiSubtitle}</span>
                        <h3 className="text-2xl font-bold mt-2 mb-4">{cmsVantaggiTitle}</h3>
                        <p className="text-gray-600 mb-6 whitespace-pre-wrap">
                            {cmsVantaggiBody}
                        </p>
                        <button className="bg-[#0700DE] text-white px-6 py-2 rounded-md hover:bg-[#0500b0] transition">
                            Scopri i vantaggi
                        </button>
                    </div>

                    <div className="md:col-span-2 relative rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg min-h-[350px]">
                        <Image
                            src={cmsImageVantaggi}
                            alt="Vantaggi"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>

                        <div className="absolute inset-0 flex flex-col justify-center pl-10 space-y-4">
                            {cmsVantaggiList && cmsVantaggiList.length > 0 ? (
                                cmsVantaggiList.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <Check className='w-6 h-6 text-green-500 stroke-[3px]' />
                                        <span className="text-xl md:text-2xl text-white font-medium">{item.testo}</span>
                                    </div>
                                ))
                            ) : (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <Check className='w-6 h-6 text-green-500 stroke-[3px]' />
                                        <span className="text-xl md:text-2xl text-white font-medium">Vantaggio {i}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}