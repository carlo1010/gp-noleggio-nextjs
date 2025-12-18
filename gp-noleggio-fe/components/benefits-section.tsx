import Image from "next/image";
import Link from "next/link";

const benefits = [
    {
        title: "Sconti e benefici",
        desc: "Diventa un socio Piccirillo-Rent",
        button: "Scopri i vantaggi",
        href: "/vantaggi",
        icon: "/benefit1.png",
    },
    {
        title: "Tutto il tempo che vuoi",
        desc: "Noleggia per tutto il tempo che vuoi",
        button: "Prenota subito",
        href: "/prenota",
        icon: "/benefit2.png",
    },
    {
        title: "Online Check-in",
        desc: "Non perdere tempo quando ritiri",
        button: "Vai al Check-in",
        href: "/check-in",
        icon: "/benefit3.png",
    },
];

export default function BenefitsSection() {
    return (
        <section className="w-full bg-white py-10">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {benefits.map((b) => (
                        <div key={b.title} className="flex flex-col items-center text-center">
                            {/* ICONA + SFONDO BLU (immagine) */}
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <Image
                                    src="/rectangle.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />

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

                            <p className="mt-2 text-sm text-gray-500">{b.desc}</p>

                            {/* BOTTONE */}
                            <Link
                                href={b.href}
                                className="mt-6 inline-flex items-center rounded-tl-sm rounded-br-sm justify-center bg-[#0700DE] text-white px-10 py-2  text-sm font-medium hover:bg-[#0500b0] transition"
                            >
                                {b.button}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
