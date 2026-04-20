type PromoSplitProps = {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    image?: string | any;
    imageAlt?: string;

    // "right" = immagine a destra (come primo blocco nello screen)
    // "left"  = immagine a sinistra (se ti serve)
    imageSide?: "left" | "right";

    // opzionali per fine-tuning
    contentMaxWClassName?: string; // es. "max-w-[520px]"
    imageRoundedClassName?: string; // es. "rounded-md" o "rounded-xl"
    imageAspectClassName?: string; // es. "aspect-[4/3]"
};

export default function PromoSplit({
    title,
    body,
    ctaLabel,
    ctaHref,
    image,
    imageAlt,
    imageSide = "right",
    contentMaxWClassName = "max-w-[520px]",
    imageRoundedClassName = "rounded-md",
    imageAspectClassName = "aspect-[4/3]",
}: PromoSplitProps) {
    const isImageRight = imageSide === "right";
    
    const imageUrl = typeof image === 'object' ? image?.url : image;
    const finalAlt = imageAlt || (typeof image === 'object' ? image?.alt : title) || "";

    return (
        <section className="w-full bg-white py-16">
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    {/* TESTO */}
                    <div className={`${contentMaxWClassName} ${isImageRight ? "" : "md:order-2"}`}>
                        <h2 className="text-[20px] font-semibold leading-snug text-black">
                            {title}
                        </h2>

                        <p className="mt-4 text-[12px] leading-6 text-gray-600 whitespace-pre-line">
                            {body}
                        </p>

                        <Link
                            href={ctaHref || "#"}
                            className="mt-8 inline-flex h-11 items-center justify-center rounded-br-sm rounded-tl-sm bg-[#0700DE] px-8 text-sm font-semibold text-white hover:opacity-90"
                        >
                            {ctaLabel}
                        </Link>
                    </div>

                    {/* IMMAGINE */}
                    <div className={`relative w-full overflow-hidden ${imageRoundedClassName} ${imageAspectClassName} ${isImageRight ? "" : "md:order-1"}`}>
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={finalAlt}
                                fill
                                className="object-cover"
                                priority={false}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
