"use client"
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from "react";

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

export default function DiscoverCarouselWrapper({items}: { items: DiscoverItem[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    useEffect(() => {
        if (!isAutoPlaying || items.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, items.length]);

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
        if (Math.abs(distance) > minSwipeDistance) {
            setIsAutoPlaying(false);
            if (distance > 0) {
                setCurrentIndex((prev) => (prev + 1) % items.length);
            } else {
                setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
            }
        }
    };

    const currentItem = items[currentIndex];

    return (
        <div
            className="md:hidden flex flex-col items-center overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <article
                key={currentIndex}
                className="flex flex-col w-full animate-in fade-in slide-in-from-right-5 duration-700"
            >
                <div className="relative w-full aspect-video overflow-hidden rounded-tl-2xl rounded-br-2xl">
                    <Image
                        src={currentItem.img}
                        alt={currentItem.imgAlt}
                        fill
                        className="object-cover"
                        onClick={() => setIsAutoPlaying(false)}
                    />
                </div>
                <div className="mt-6 text-center">
                    <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                        {currentItem.kicker}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-black">{currentItem.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">{currentItem.desc}</p>
                    <Link href={currentItem.href} className="mt-6 inline-block text-[#0700DE] font-semibold">
                        {currentItem.cta}
                    </Link>
                </div>
            </article>

            <div className="flex items-center gap-2 mt-8">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setIsAutoPlaying(false);
                        }}
                        className={`h-2 transition-all duration-300 rounded-full ${
                            currentIndex === index ? "w-8 bg-[#0700DE]" : "w-2 bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}