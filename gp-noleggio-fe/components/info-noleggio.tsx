import Image from "next/image";

interface InfoNoleggioProps {
    config?: any;
}

export default function InfoNoleggio({ config }: InfoNoleggioProps) {
    const sectionConfig = config?.autoConfig?.infoNoleggio || {};
    const title = sectionConfig.title || "Noleggio a breve, medio o lungo termine";
    const imageUrl = sectionConfig.image?.url || "/toyota-rossa.png";
    const body = sectionConfig.body; // se presente, potremmo renderizzarlo. per ora teniamo l'HTML statico con fallback o sostituzione.

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto max-w-[1240px] px-4 py-14">
                <div className=" bg-white  p-6 md:p-10">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
                        {/* Immagine */}
                        <div className="relative overflow-hidden rounded-tl-xl rounded-br-xl">
                            <Image
                                src={imageUrl} // <-- metti qui la tua immagine in /public/images/
                                alt={title}
                                width={900}
                                height={700}
                                className="h-auto w-full object-cover"
                                priority
                            />
                        </div>

                        {/* Testo */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                {title}
                            </h3>

                            {body ? (
                                <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                                    {body}
                                </div>
                            ) : (
                                <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
                                    <p>
                                        Che tu abbia bisogno di un&apos;auto per <strong>un giorno</strong> o per{" "}
                                        <strong> diverse settimane</strong>, abbiamo la <strong>formula adatta</strong>{" "}
                                        alle tue esigenze.
                                    </p>

                                    <p>
                                        Il <strong>noleggio giornaliero</strong> è perfetto per{" "}
                                        <strong> brevi spostamenti</strong> o gite <strong>fuori porta</strong>.
                                    </p>

                                    <p>
                                        Il <strong>noleggio settimanale</strong> è ideale per le{" "}
                                        <strong> vacanze</strong>, mentre la <strong>formula mensile</strong> è pensata
                                        per chi vuole <strong>libertà di movimento</strong> senza l&apos;impegno di un
                                        acquisto.
                                    </p>

                                    <h4 className="pt-2 text-base md:text-lg font-bold text-gray-900">
                                        City car, familiari o SUV: scegli la tua auto
                                    </h4>

                                    <p>
                                        La flotta <strong>Piccirillo Rent</strong> include{" "}
                                        <strong> auto compatte</strong> per la città, <strong>modelli spaziosi</strong>{" "}
                                        per la famiglia e <strong>SUV</strong> per i tuoi viaggi più lunghi.
                                        Disponiamo anche di <strong>veicoli ibridi</strong> e a{" "}
                                        <strong> basso consumo</strong>, per un&apos;esperienza più sostenibile.
                                    </p>

                                    <p>
                                        Qualunque sia il tuo <em>stile di guida</em>, abbiamo{" "}
                                        <strong> l&apos;auto giusta per te</strong>.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
