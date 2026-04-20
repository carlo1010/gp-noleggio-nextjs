type WideImageBannerProps = {
    image?: string | any;
    alt?: string;
    // se vuoi controllare altezza/ratio
    aspectClassName?: string; // es. "aspect-[16/5]" oppure "aspect-[21/9]"
    roundedClassName?: string; // es. "rounded-md"
};

export default function WideImageBanner({
    image,
    alt,
    aspectClassName = "aspect-[16/5]",
    roundedClassName = "rounded-md",
}: WideImageBannerProps) {
    const imageUrl = typeof image === 'object' ? image?.url : image;
    const finalAlt = alt || (typeof image === 'object' ? image?.alt : "Banner");

    if (!imageUrl) return null;

    return (
        <section className="w-full bg-white py-10">
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className={`relative w-full overflow-hidden ${roundedClassName} ${aspectClassName}`}>
                    <Image src={imageUrl} alt={finalAlt} fill className="object-cover" />
                </div>
            </div>
        </section>
    );
}
