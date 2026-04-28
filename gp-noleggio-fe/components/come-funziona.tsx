interface ComeFunzionaProps {
    config?: any;
}

export default function ComeFunziona({ config }: ComeFunzionaProps) {
    const sectionConfig = config?.autoConfig?.comeFunziona || 
                          config?.premiumConfig?.comeFunziona || 
                          config?.furgoniConfig?.comeFunziona || 
                          config?.elettricheConfig?.comeFunziona || {};
                          
    const title = sectionConfig.title || "Come noleggiare un'auto con Piccirillo Rent";

    return (
        <section className="w-full bg-[#F7F7F7]">
            <div className="container mx-auto max-w-[1240px] px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                    {title}
                </h2>

                <div className="mt-4 space-y-3 text-sm text-gray-700 leading-relaxed">
                    <p>
                        Prenotare con <strong>Piccirillo Rent</strong> è semplice: seleziona la{" "}
                        <strong>data</strong> e l&apos;<strong>orario</strong>, scegli il{" "}
                        <strong>veicolo</strong> che preferisci e sei pronto a partire.
                    </p>

                    <p>
                        Se hai bisogno di <strong>flessibilità</strong>, puoi riconsegnare
                        l&apos;auto in una sede diversa da quella di ritiro.
                    </p>

                    <p>
                        Visita la sezione <strong>offerte</strong> per scoprire le{" "}
                        <strong>promozioni attive</strong> e iscriviti alla{" "}
                        <strong>newsletter</strong> per ricevere in anteprima{" "}
                        <strong> novità e vantaggi esclusivi</strong>, incluso il{" "}
                        <strong> 10% di sconto</strong> sul tuo primo noleggio.
                    </p>
                </div>
            </div>
        </section>
    );
}
