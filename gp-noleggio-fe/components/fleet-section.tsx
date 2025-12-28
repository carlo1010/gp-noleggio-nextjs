import Image from "next/image";
import Link from "next/link";

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
    return (
        <section className="w-full relative bg-white px-3 pb-8 md:pb-0">
            {/* ===== FASCIA GRIGIA ===== */}
            <div className="bg-gray-50 h-auto md:h-[422px]">
                <div className="container mx-auto px-4 pt-14 pb-10 md:pb-0">
                    <h2 className="text-3xl font-bold mb-10 text-center md:text-left">La flotta</h2>

                    {/* GRID PRINCIPALE */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10">
                        {fleetItems.map((item, index) => (
                            <div
                                key={item.title}
                                className={`flex flex-col items-center text-center pb-8 md:pb-0 ${
                                    index !== fleetItems.length - 1 ? "border-b md:border-b-0 border-gray-200" : ""
                                }`}
                            >
                                <h3 className="text-xl font-semibold">{item.title}</h3>

                                {/* Descrizione */}
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed md:min-h-[60px]">
                                    {item.desc}
                                </p>

                                <Link
                                    href={item.href}
                                    className="mt-4 inline-block text-sm font-semibold text-[#0700DE]"
                                >
                                    Scopri di più
                                </Link>

                                {/* Immagine visibile SOLO su Mobile (vicino al testo) */}
                                <div className="mt-8 md:hidden">
                                    <Image
                                        src={item.img}
                                        alt={item.imgAlt}
                                        width={item.width}
                                        height={item.height}
                                        className="object-contain"
                                    />
                                </div>
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
