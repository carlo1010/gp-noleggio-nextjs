import Image from "next/image";
import Link from "next/link";

const benefits = [
    {
        title: "Nessun costo nascosto",
        icon: "/no-cost.png",
    },
    {
        title: "Supporto 24H",
        icon: "/support-24.png",
    },
    {
        title: "Auto a noleggio nuove",
        icon: "/wide-range.png",
    },
    {
        title: "Assistenza 24/7 negli aereporti nazionali",
        icon: "/assistance-247.png",
    },
];

export default function WhyRent() {
    return (
        <section className="w-full bg-white py-10">

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    Perché noleggiare un’auto con Piccirillo Rent?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {benefits.map((b) => (
                        <div key={b.title} className="flex flex-col items-center text-center">
                            {/* ICONA + SFONDO BLU (immagine) */}
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <Image
                                    src={b.icon}
                                    alt={b.title}
                                    width={100}
                                    height={100}
                                    priority
                                    className="relative z-10"
                                />
                            </div>

                            {/* TESTI */}
                            <h3 className="mt-6 text-xl font-semibold text-gray-900">
                                {b.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
