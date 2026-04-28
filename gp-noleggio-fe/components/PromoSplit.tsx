import Image from "next/image";
import Link from "next/link";

type PromoSplitProps = {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    imageSrc: string;
    imageAlt: string;

    // "right" = immagine a destra (come primo blocco nello screen)
    // "left"  = immagine a sinistra (se ti serve)
    imageSide?: "left" | "right";

    // opzionali per fine-tuning
    contentMaxWClassName?: string; // es. "max-w-[520px]"
    imageRoundedClassName?: string; // es. "rounded-md" o "rounded-xl"
    imageAspectClassName?: string; // es. "aspect-[4/3]"
    config?: any;
    promoIndex?: number;
};

export default function PromoSplit({
    title,
    body,
    ctaLabel,
    ctaHref,
    imageSrc,
    imageAlt,
    imageSide = "right",
    contentMaxWClassName = "max-w-[520px]",
    imageRoundedClassName = "rounded-md",
    imageAspectClassName = "aspect-[4/3]",
    config,
    promoIndex,
}: PromoSplitProps) {
    const isImageRight = imageSide === "right";

    // Otteniamo il blocco corrispondente in base al promoIndex se definito
    let cmsData = null;
    if (config?.furgoniConfig?.promoSplits && promoIndex !== undefined && promoIndex >= 1) {
        cmsData = config.furgoniConfig.promoSplits[promoIndex - 1];
    } else if (config?.homeConfig?.promoSplit) { // Fallback per altre pagine
        cmsData = config.homeConfig.promoSplit;
    }

    const cmsTitle = cmsData?.title || title;
    const cmsBody = cmsData?.body || body;
    const cmsCtaLabel = cmsData?.ctaLabel || ctaLabel;
    const cmsCtaHref = cmsData?.ctaHref || ctaHref;
    const cmsImageSrc = cmsData?.image?.url || imageSrc;
    const cmsImageAlt = cmsData?.imageAlt || imageAlt;
    const cmsImageSide = cmsData?.imageSide || imageSide;
    const finalIsImageRight = cmsImageSide === "right";

    return (
        <section className="w-full bg-white py-16">
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    {/* TESTO */}
                    <div className={`${contentMaxWClassName} ${finalIsImageRight ? "" : "md:order-2"}`}>
                        <h2 className="text-[20px] font-semibold leading-snug text-black">
                            {cmsTitle}
                        </h2>

                        <p className="mt-4 text-[12px] leading-6 text-gray-600 whitespace-pre-line">
                            {cmsBody}
                        </p>

                        <Link
                            href={cmsCtaHref}
                            className="mt-8 inline-flex h-11 items-center justify-center rounded-br-sm rounded-tl-sm bg-[#0700DE] px-8 text-sm font-semibold text-white hover:opacity-90"
                        >
                            {cmsCtaLabel}
                        </Link>
                    </div>

                    {/* IMMAGINE */}
                    <div className={`relative w-full overflow-hidden ${imageRoundedClassName} ${imageAspectClassName} ${finalIsImageRight ? "" : "md:order-1"}`}>
                        <Image
                            src={cmsImageSrc}
                            alt={cmsImageAlt}
                            fill
                            className="object-cover"
                            priority={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
