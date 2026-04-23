interface GammaElettricaInfoProps {
    config?: any;
    title?: string;
    body?: any;
    linkUrl?: string;
    linkLabel?: string;
}

export default function GammaElettricaInfo({
    config,
    title = "La nostra esclusiva gamma di auto elettriche",
    body,
    linkUrl = "/punti-di-ricarica",
    linkLabel = "Vai ai punti di ricarica"
}: GammaElettricaInfoProps) {
    const cmsTitle = config?.elettricheConfig?.introElettrico?.title || title;
    const cmsBody = config?.elettricheConfig?.introElettrico?.body || body;
    return (
        <section className="w-full bg-white">
            <div className="container mx-auto max-w-[1240px] px-4 py-12">
                <h2 className="text-3xl font-bold text-black">
                    {cmsTitle}
                </h2>

                <div className="mt-6 max-w-5xl space-y-6 text-[15px] leading-7 text-black">
                    {cmsBody ? (
                        typeof cmsBody === 'string' ? <p className="whitespace-pre-wrap">{cmsBody}</p> : "Contenuto Rich Text (CMS)"
                    ) : (
                        <>
                            <p>
                                Noleggiare un auto elettrica oggi significa poter testare con mano la
                                tecnologia e l’innovazione e scoprirne nel dettaglio le
                                caratteristiche e i reali vantaggi. All’interno della nostra
                                esclusiva gamma elettrica troverai dalle piccole city car ad auto più
                                spaziosi e confortevoli. Su tutte il comfort di guida, la
                                silenziosità, le prestazioni e il rispetto per l’ambiente sono
                                garantiti.
                            </p>

                            <p>
                                Ti ricordiamo che tutti i nostri noleggi di{" "}
                                <strong>veicoli elettrici includono una carica completa</strong>, il
                                che significa che non è necessario ricaricare prima di restituire il
                                veicolo alla fine del noleggio*, permettendoti di risparmiare
                                ulteriore tempo e denaro.
                            </p>

                            <p>
                                Per maggiori informazioni su dove trovare le auto e dove ricaricarle
                            </p>
                        </>
                    )}
                </div>

                <Link
                    href={linkUrl}
                    className="mt-10 inline-flex items-center gap-2 text-[#0700DE] font-semibold"
                >
                    {linkLabel}
                    <ChevronRight className="h-5 w-5" />
                </Link>
            </div>
        </section>
    );
}
