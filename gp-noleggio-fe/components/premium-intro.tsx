import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function PremiumIntro() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-6xl px-6 py-12">
                {/* Breadcrumb */}
                <div className="text-xs text-gray-500">
                    <span>Home</span> <span className="mx-1">{">"}</span>
                    <span className="text-gray-700">Noleggio Auto Premium</span>
                </div>

                {/* Titolo */}
                <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900">
                    Auto Premium Piccirillo Rent: trasforma ogni viaggio in un’esperienza
                    memorabile
                </h1>

                {/* Testo intro */}
                <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-700">
                    <p>
                        <strong>Comfort, eleganza e prestazioni d’eccellenza:</strong> scopri
                        la nostra selezione di veicoli Premium
                        <br/>
                        Se ami guidare <strong>auto di alta gamma</strong> anche in viaggio, o
                        stai cercando il massimo del comfort per te e la tua famiglia,{" "}
                        <strong>Piccirillo Rent</strong> ha la soluzione perfetta per te.
                        <br/>
                        Che tu stia partendo per una vacanza romantica o un weekend con gli
                        amici, con la nostra <strong>flotta Premium</strong> potrai vivere
                        un’esperienza di guida superiore, a bordo di modelli dei migliori
                        marchi.
                    </p>

                    <p>
                        <em>Eleganza, tecnologia e sicurezza</em> ti accompagneranno ovunque.
                    </p>

                    <p>
                        <strong>
                            Scegli la tua prossima destinazione in Italia e prenota ora la tua
                            auto Premium con Piccirillo Rent.
                        </strong>
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Card SX */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8">
                        <div className="flex items-center justify-center gap-12">
                            {/* Sostituisci con i tuoi loghi in /public */}
                            <Image src="/Lambo-logo.png" alt="Lamborghini" width={70} height={75}/>
                            <Image src="/Mercedes-Logo.png" alt="Mercedes" width={71} height={71}/>
                            <Image src="/Bmw-logo.png" alt="BMW" width={70} height={70}/>
                            <Image src="/Porsche-logo.png" alt="Porsche" width={103} height={103}/>
                        </div>

                        <h3 className="mt-8 text-2xl font-bold text-gray-900">
                            Solo i brand migliori, senza compromessi
                        </h3>

                        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
                            <p>
                                Nella nostra gamma Premium trovi <strong>solo veicoli firmati dai
                                migliori produttori</strong>:<br/>
                                <strong>
                                    Audi, BMW, Mercedes-Benz, Volvo, Tesla, Lexus, Jaguar, Land
                                    Rover, Alfa Romeo e Volkswagen.
                                </strong>
                            </p>

                            <p>
                                Ogni modello è selezionato per offrire il perfetto equilibrio tra{" "}
                                <strong>prestazioni, lusso e innovazione</strong>.
                                <br/>
                                Vuoi distinguerti con stile, anche a noleggio? Questa è la scelta
                                giusta.
                            </p>
                        </div>
                    </div>

                    {/* Card DX */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8">
                        <div className="flex items-center gap-6">
                            {/* Sostituisci con immagini auto in /public */}
                            <Image src="/r8.png" alt="Auto Premium 1" width={160} height={63}/>
                            <Image src="/gle.png" alt="Auto Premium 2" width={160} height={105}/>
                            <Image src="/m3.png" alt="Auto Premium 3" width={146} height={100}/>
                        </div>

                        <h3 className="mt-8 text-2xl font-bold text-gray-900">
                            Come prenotare un’auto Premium
                        </h3>

                        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
                            <p>
                                Prenotare una Premium Piccirillo Rent è <strong>semplice e veloce</strong>:
                                durante la prenotazione online, ti basterà selezionare un’auto
                                contrassegnata con il tag <strong>&quot;Premium garantito&quot;</strong>{" "}
                                per avere la certezza di guidare <strong>esattamente ciò che hai scelto</strong>,
                                senza sorprese.
                            </p>

                            <p>
                                <strong>Massima trasparenza, massima qualità.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 flex justify-center">
                    <Button asChild className="h-12 w-[220px]  text-base">
                        <Link href="/prenota">Prenota ora</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
