import Image from "next/image";
import Link from "next/link";

const fleetItems = [
    {
        title: "Auto",
        desc: "La nostra ampia flotta offre auto di piccole e grandi dimensioni, incluse soluzioni eco-friendly.",
        href: "/flotta/auto",
        img: "/auto.png",
        imgAlt: "Auto",
        width: 301,
        height: 150,

    },
    {
        title: "Elettriche",
        desc: "Scegli l’auto elettrica perfetta per te nella nostra esclusiva gamma di modelli",
        href: "/flotta/elettriche",
        img: "/elettriche.png",
        imgAlt: "Elettriche",
        width: 236,
        height: 157,
    },
    {
        title: "Premium",
        desc: "Prenota un’auto firmata da uno dei brand automobilistici più rinomati al mondo",
        href: "/flotta/premium",
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
        <section className="w-full relative bg-white px-3">
            {/* ===== FASCIA GRIGIA (422px) ===== */}
            <div className="bg-gray-50 h-[422px]">
                <div className="container mx-auto px-4 pt-14 ">
                    <h2 className="text-3xl font-bold mb-10">La flotta</h2>

                    {/* TESTI */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        {fleetItems.map((item) => (
                            <div key={item.title} className="text-center">
                                <h3 className="text-xl font-semibold">{item.title}</h3>

                                {/* 3 righe minime per allineamento */}
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed min-h-[60px]">
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

            {/* ===== IMMAGINI (FUORI FASCIA) ===== */}
            <div className="container mx-auto px-4 -mt-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
