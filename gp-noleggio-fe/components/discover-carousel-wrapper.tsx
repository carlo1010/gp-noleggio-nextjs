"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DiscoverItem {
    id: string;
    kicker: string;
    title: string;
    desc: string;
    href: string;
    cta: string;
    img: string;
    imgAlt: string;
}

export default function DiscoverCarouselWrapper({ items }: { items: DiscoverItem[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Gestione reattività per numero di elementi visibili
    useEffect(() => {
        const updateVisibleItems = () => {
            if (window.innerWidth >= 1024) {
                setVisibleItems(3);
            } else if (window.innerWidth >= 768) {
                setVisibleItems(2);
            } else {
                setVisibleItems(1);
            }
        };

        updateVisibleItems();
        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    const maxIndex = Math.max(0, items.length - visibleItems);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <div className="relative group">
            {/* Pulsanti di Navigazione (visibili su Desktop) */}
            <div className="hidden md:flex absolute -left-4 -right-4 top-1/2 -translate-y-1/2 justify-between z-10 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white shadow-xl pointer-events-auto hover:bg-gray-50 transition-all border border-gray-100 -translate-x-1/2 group-hover:translate-x-0"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 text-[#0700DE]" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white shadow-xl pointer-events-auto hover:bg-gray-50 transition-all border border-gray-100 translate-x-1/2 group-hover:translate-x-0"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-[#0700DE]" />
                </button>
            </div>

            {/* Container dello Slider */}
            <div className="overflow-hidden">
                <div
                    ref={containerRef}
                    className="flex transition-transform duration-500 ease-out gap-6"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                    }}
                >
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className={`flex flex-col flex-shrink-0 group/card`}
                            style={{ width: `calc((100% - ${(visibleItems - 1) * 24}px) / ${visibleItems})` }}
                        >
                            {/* Immagine con Hover Effect */}
                            <div className="relative w-full aspect-video overflow-hidden rounded-tl-2xl rounded-br-2xl">
                                <Image
                                    src={item.img}
                                    alt={item.imgAlt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>

                            {/* Testi */}
                            <div className="mt-6">
                                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                                    {item.kicker}
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-black group-hover/card:text-[#0700DE] transition-colors">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-gray-600 leading-relaxed line-clamp-2 text-sm">
                                    {item.desc}
                                </p>

                                <Link
                                    href={item.href}
                                    className="mt-6 inline-flex items-center gap-2 text-[#0700DE] font-semibold group/link"
                                >
                                    {item.cta}
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Indicatori (Puntini) */}
            <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: items.length - visibleItems + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full h-2 ${
                            currentIndex === index ? "w-8 bg-[#0700DE]" : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}