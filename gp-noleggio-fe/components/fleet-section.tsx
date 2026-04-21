"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface FleetSectionProps {
    title?: string;
    items?: {
        title: string;
        description: string;
        image: string | any;
        link: string;
    }[];
}

export default function FleetSection({ title = "La flotta", items }: FleetSectionProps) {
    const defaultItems = [
        {
            title: "Auto",
            description: "La nostra ampia flotta offre auto di piccole e grandi dimensioni, incluse soluzioni eco-friendly.",
            link: "/tipo-noleggio/noleggio-auto",
            image: "/auto.png",
        },
        {
            title: "Elettriche",
            description: "Scegli l’auto elettrica perfetta per te nella nostra esclusiva gamma di modelli",
            link: "/tipo-noleggio/noleggio-elettriche",
            image: "/elettriche.png",
        },
        {
            title: "Premium",
            description: "Prenota un’auto firmata da uno dei brand automobilistici più rinomati al mondo",
            link: "/tipo-noleggio/noleggio-premium",
            image: "/premium.png",
        },
        {
            title: "Furgoni",
            description: "Scopri la nostra ampia selezione di veicoli commerciali, dai più compatti agli “extra carico”",
            link: "/flotta/furgoni",
            image: "/furgoni2.png",
        },
    ];

    const displayItems = items || defaultItems;

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
                setCurrentIndex((prev) => (prev + 1) % displayItems.length);
            } else {
                setCurrentIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
            }
        }
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % displayItems.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, displayItems.length]);

    const getImageUrl = (img: any) => {
        if (typeof img === 'string') return img;
        return img?.url;
    };

    return (
        <section className="w-full relative bg-white pb-8 md:pb-0">
            {/* ===== FASCIA GRIGIA ===== */}
            <div className="bg-gray-50 h-auto md:h-[422px]">
                <div className="container mx-auto px-4 pt-14 pb-10 md:pb-0 max-w-[1240px]">
                    <h2 className="text-3xl font-bold mb-10 text-center md:text-left">{title}</h2>

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
                            <h3 className="text-xl font-semibold">{displayItems[currentIndex].title}</h3>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                {displayItems[currentIndex].description}
                            </p>
                            <Link
                                href={displayItems[currentIndex].link}
                                className="mt-4 inline-block text-sm font-semibold text-[#0700DE]"
                            >
                                Scopri di più
                            </Link>
                            <div className="mt-8 h-40 flex items-center justify-center">
                                <Image
                                    src={getImageUrl(displayItems[currentIndex].image)}
                                    alt={displayItems[currentIndex].title}
                                    width={300}
                                    height={200}
                                    className="object-contain cursor-pointer"
                                    onClick={() => setIsAutoPlaying(false)}
                                />
                            </div>
                        </div>


                        {/* CUSTOM INDICATORS */}
                        <div className="flex items-center gap-2 mt-6">
                            {displayItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setIsAutoPlaying(false);
                                    }}
                                    className={`h-2 transition-all duration-300 rounded-full ${currentIndex === index
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
                        {displayItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center text-center pb-8 md:pb-0"
                            >
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed md:min-h-[60px]">
                                    {item.description}
                                </p>
                                <Link
                                    href={item.link}
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
            <div className="hidden md:block container mx-auto px-4 -mt-24 max-w-[1240px]">
                <div className="grid grid-cols-4 gap-10">
                    {displayItems.map((item, idx) => (
                        <div key={idx} className="flex justify-center">
                            <Image
                                src={getImageUrl(item.image)}
                                alt={item.title}
                                width={300}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
