import Link from "next/link";
import Image from "next/image";

interface BenefitsSectionProps {
    config?: any;
    items?: {
        title: string;
        description: string;
        buttonLabel: string;
        link: string;
        icon: string;
    }[];
}

export default function BenefitsSection({ config, items }: BenefitsSectionProps) {
    const cmsTitle = config?.homeConfig?.benefitsSection?.title;
    const cmsSubtitle = config?.homeConfig?.benefitsSection?.subtitle;
    const defaultBenefits = [
        {
            title: "Sconti e benefici",
            description: "Diventa un socio Piccirillo-Rent",
            buttonLabel: "Scopri i vantaggi",
            link: "/vantaggi",
            icon: "benefit1",
        },
        {
            title: "Tutto il tempo che vuoi",
            description: "Noleggia per tutto il tempo che vuoi",
            buttonLabel: "Prenota subito",
            link: "/prenota",
            icon: "benefit2",
        },
        {
            title: "Online Check-in",
            description: "Non perdere tempo quando ritiri",
            buttonLabel: "Vai al Check-in",
            link: "/check-in",
            icon: "benefit3",
        },
    ];

    const displayBenefits = items || defaultBenefits;

    const getIconSrc = (icon: string) => {
        switch (icon) {
            case 'benefit1': return '/benefit1.png';
            case 'benefit2': return '/benefit2.png';
            case 'benefit3': return '/benefit3.png';
            default: return '/benefit1.png';
        }
    };

    return (
        <section className="w-full bg-white py-10">
            <div className="container mx-auto px-4 py-16 max-w-[1240px]">
                {cmsTitle && <h2 className="text-3xl font-bold mb-2 text-center md:text-left">{cmsTitle}</h2>}
                {cmsSubtitle && <p className="mb-10 text-gray-600 text-center md:text-left">{cmsSubtitle}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {displayBenefits.map((b, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            {/* ICONA + SFONDO BLU */}
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <Image
                                    src="/rectangle.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />

                                <Image
                                    src={getIconSrc(b.icon)}
                                    alt={b.title}
                                    width={100}
                                    height={100}
                                    priority
                                    className="relative z-10"
                                />
                            </div>

                            {/* TESTI */}
                            <h3 className="mt-6 text-xl font-semibold text-gray-900">
                                {b.title}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">{b.description || (b as any).desc}</p>

                            {/* BOTTONE */}
                            <Link
                                href={b.link || (b as any).href}
                                className="mt-6 inline-flex items-center rounded-tl-sm rounded-br-sm justify-center bg-[#0700DE] text-white px-10 py-2  text-sm font-medium hover:bg-[#0500b0] transition"
                            >
                                {b.buttonLabel || (b as any).button}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
