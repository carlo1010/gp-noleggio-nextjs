import Image from "next/image";

type WideImageBannerProps = {
    src: string;
    alt: string;
    // se vuoi controllare altezza/ratio
    aspectClassName?: string; // es. "aspect-[16/5]" oppure "aspect-[21/9]"
    roundedClassName?: string; // es. "rounded-md"
};

export default function WideImageBanner({
                                            src,
                                            alt,
                                            aspectClassName = "aspect-[16/5]",
                                            roundedClassName = "rounded-md",
                                        }: WideImageBannerProps) {
    return (
        <section className="w-full bg-white py-10">
            <div className="mx-auto w-full max-w-[1124px] px-4">
                <div className={`relative w-full overflow-hidden ${roundedClassName} ${aspectClassName}`}>
                    <Image src={src} alt={alt} fill className="object-cover" />
                </div>
            </div>
        </section>
    );
}
