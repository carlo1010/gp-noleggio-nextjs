import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function ModelChoice() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    {/* Testo (sx) */}
                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-gray-900">
                            Scegli il modello che desideri, davvero
                        </h2>

                        <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
                            <p>
                                Vuoi essere sicuro di guidare <em>proprio quell&apos;auto</em>?
                            </p>

                            <p>
                                Con l&apos;opzione <strong>Model Choice</strong>, disponibile su alcune
                                categorie <strong>Premium</strong>, puoi selezionare{" "}
                                <strong>marca e modello esatti</strong> al momento della prenotazione.
                            </p>

                            <p>
                                Niente sorprese: <strong>guiderai davvero</strong> l&apos;auto che hai{" "}
                                <strong>scelto</strong>.
                            </p>

                            <p className="text-gray-600">
                                <em>
                                    Controlla la disponibilità nelle sedi Piccirillo Rent aderenti
                                    all&apos;iniziativa.
                                </em>
                            </p>
                        </div>

                        {/* Bottone */}
                        <div className="mt-8">
                            <Button asChild className="h-12 w-[260px]  text-base">
                                <Link href="/veicoli">Scegli la tua auto</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Immagine (dx) */}
                    <div className="relative overflow-hidden rounded-tl-xl rounded-br-xl">
                        <Image
                            src="/lambo-gialla.png" // metti l’immagine in /public/images/
                            alt="Model Choice Piccirillo Rent"
                            width={1100}
                            height={750}
                            className="h-auto w-full object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
