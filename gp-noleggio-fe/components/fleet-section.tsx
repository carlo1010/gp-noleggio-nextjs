"use client"
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect} from "react";

const fleetItems = [
    {
        title: "Auto",
        desc: "La nostra ampia flotta offre auto di piccole e grandi dimensioni, incluse soluzioni eco-friendly.",
        href: "/tipo-noleggio/noleggio-auto",
        img: "/auto.png",
        imgAlt: "Auto",
        width: 301,
        height: 150,

    },
    {
        title: "Elettriche",
        desc: "Scegli l’auto elettrica perfetta per te nella nostra esclusiva gamma di modelli",
        href: "/tipo-noleggio/noleggio-elettriche",
        img: "/elettriche.png",
        imgAlt: "Elettriche",
        width: 236,
        height: 157,
    },
    {
        title: "Premium",
        desc: "Prenota un’auto firmata da uno dei brand automobilistici più rinomati al mondo",
        href: "/tipo-noleggio/noleggio-premium",
        img: "/premium.png",
        imgAlt: "Premium",
        width: 306,
        height: 159,

    },
    {
        title: "Furgoni",
        desc: "Scopri la nostra ampia selezione di veicoli commerciali, dai più compatti agli “extra carico”",
        href: "/flotta/furgoni",
        img: "/furgoni2.png",
        imgAlt: "Furgoni",
        width: 237,
        height: 215,
    },
];

export default function FleetSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum distance for a swipe to be registered
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe || isRightSwipe) {
            setIsAutoPlaying(false);
            if (isLeftSwipe) {
                setCurrentIndex((prev) => (prev + 1) % fleetItems.length);
            } else {
                setCurrentIndex((prev) => (prev - 1 + fleetItems.length) % fleetItems.length);
            }
        }
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % fleetItems.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section className="w-full relative bg-white px-3 pb-8 md:pb-0">
            {/* ===== FASCIA GRIGIA ===== */}
            <div className="bg-gray-50 h-auto md:h-[422px]">
                <div className="container mx-auto px-4 pt-14 pb-10 md:pb-0">
                    <h2 className="text-3xl font-bold mb-10 text-center md:text-left">La flotta</h2>

                    {/* MOBILE CAROUSEL */}
                    <div
                        className="md:hidden flex flex-col items-center overflow-hidden"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            key={currentIndex}
                            className="w-full min-h-[350px] flex flex-col items-center text-center animate-in fade-in slide-in-from-right-5 duration-700"
                        >
                            <h3 className="text-xl font-semibold">{fleetItems[currentIndex].title}</h3>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                {fleetItems[currentIndex].desc}
                            </p>
                            <Link
                                href={fleetItems[currentIndex].href}
                                className="mt-4 inline-block text-sm font-semibold text-[#0700DE]"
                            >
                                Scopri di più
                            </Link>
                            <div className="mt-8 h-40 flex items-center justify-center">
                                <Image
                                    src={fleetItems[currentIndex].img}
                                    alt={fleetItems[currentIndex].imgAlt}
                                    width={fleetItems[currentIndex].width}
                                    height={fleetItems[currentIndex].height}
                                    className="object-contain cursor-pointer"
                                    onClick={() => setIsAutoPlaying(false)}
                                />
                            </div>
                        </div>


                        {/* CUSTOM INDICATORS */}
                        <div className="flex items-center gap-2 mt-6">
                            {fleetItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setIsAutoPlaying(false);
                                    }}
                                    className={`h-2 transition-all duration-300 rounded-full ${
                                        currentIndex === index
                                            ? "w-8 bg-[#0700DE]"
                                            : "w-2 bg-gray-300"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* GRID PRINCIPALE (Desktop Only) */}
                    <div className="hidden md:grid md:grid-cols-4 gap-10">
                        {fleetItems.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center text-center pb-8 md:pb-0"
                            >
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed md:min-h-[60px]">
                                    {item.desc}
                                </p>
                                <Link
                                    href={item.href}
                                    className="mt-4 inline-block text-sm font-semibold text-[#0700DE]"
                                >
                                    Scopri di più
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== IMMAGINI DESKTOP (FUORI FASCIA) - Visibile solo da MD in su ===== */}
            <div className="hidden md:block container mx-auto px-4 -mt-24">
                <div className="grid grid-cols-4 gap-10">
                    {fleetItems.map((item) => (
                        <div key={item.title} className="flex justify-center">
                            <Image
                                src={item.img}
                                alt={item.imgAlt}
                                width={item.width}
                                height={item.height}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
