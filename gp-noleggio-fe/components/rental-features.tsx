import Image from "next/image";

const features = [
    {
        title: "Miglior prezzo garantito",
        desc: "Tariffe adatte alle tue esigenze.",
        icon: "/feature-price.png",
    },
    {
        title: "I tuoi dati sono al sicuro",
        desc: "Processo di prenotazione sicuro.",
        icon: "/feature-security.png",
    },
    {
        title: "Durata del noleggio flessibile",
        desc: "Noleggi auto giornalieri, settimanali o mensili.",
        icon: "/feature-time.png",
    },
];

export default function RentalFeatures() {
    return (
        <section className="w-full bg-white py-20">
            <div className="container mx-auto px-4">

                {/* TITOLO + TESTO */}
                <div className="max-w-4xl mb-16">
                    <p className="text-sm text-gray-500 mb-2">
                        Home &gt; Noleggio Auto
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold mb-6">
                        Piccirillo Rent: il noleggio auto su misura, in tutta Italia
                    </h1>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Piccirillo Rent</strong> ti offre una selezione di veicoli
                        moderni, comodi e sicuri, disponibili in tante città italiane.
                        Siamo presenti nei principali centri urbani, vicino alle stazioni
                        ferroviarie e negli aeroporti più importanti, per garantirti sempre
                        un punto di ritiro comodo e veloce.
                    </p>

                    <p className="text-gray-600 text-sm mt-4">
                        Da <em>Milano</em> a <em>Napoli</em>, passando per <em>Roma</em>,
                        <em> Palermo</em> e <em>Torino</em>, con Piccirillo Rent sei libero di
                        muoverti in tutta Italia.
                    </p>
                </div>

                {/* 3 COLONNE */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="flex flex-col items-center text-center"
                        >
                            {/* ICONA */}
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                {/* sfondo blu */}
                                <Image
                                    src="/rectangle.png"
                                    alt=""

                                    fill
                                    className="object-contain"
                                />

                                {/* icona */}
                                <Image
                                    src={f.icon}
                                    alt={f.title}
                                    width={100}
                                    height={100}
                                    priority
                                    className="relative z-10"
                                />
                            </div>

                            {/* TESTI */}
                            <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                {f.title}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 max-w-xs">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
