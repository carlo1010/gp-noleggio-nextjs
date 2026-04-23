interface ModelChoiceProps {
    config?: any;
    title?: string;
    body?: any;
    image?: string | any;
    ctaLabel?: string;
    ctaHref?: string;
}

export default function ModelChoice({ 
    config,
    title = "Scegli il modello che desideri, davvero", 
    body, 
    image,
    ctaLabel = "Scegli la tua auto",
    ctaHref = "/veicoli"
}: ModelChoiceProps) {
    const cmsTitle = config?.premiumConfig?.modelChoice?.title || title;
    const cmsCtaLabel = config?.premiumConfig?.modelChoice?.ctaLabel || ctaLabel;
    const imageUrl = typeof image === 'object' ? image?.url : image || "/lambo-gialla.png";
    const imageAlt = typeof image === 'object' ? image?.alt : title;

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto max-w-[1240px] px-4 py-16">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    {/* Testo (sx) */}
                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-gray-900">
                            {cmsTitle}
                        </h2>

                        <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
                            {body ? (
                                typeof body === 'string' ? body : "Contenuto Rich Text (CMS)"
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>

                        {/* Bottone */}
                        <div className="mt-8">
                            <Button asChild className="h-12 w-[260px]  text-base">
                                <Link href={ctaHref}>{cmsCtaLabel}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Immagine (dx) */}
                    <div className="relative overflow-hidden rounded-tl-xl rounded-br-xl">
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
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
