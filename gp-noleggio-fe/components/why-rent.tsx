interface WhyRentProps {
    title?: string;
    benefits?: {
        title: string;
        icon: string;
    }[];
}

export default function WhyRent({ 
    title = "Perché noleggiare un’auto con Piccirillo Rent?", 
    benefits 
}: WhyRentProps) {
    const defaultBenefits = [
        {
            title: "Nessun costo nascosto",
            icon: "no-cost",
        },
        {
            title: "Supporto 24H",
            icon: "support-24",
        },
        {
            title: "Auto a noleggio nuove",
            icon: "wide-range",
        },
        {
            title: "Assistenza 24/7 negli aereporti nazionali",
            icon: "assistance-247",
        },
    ];

    const displayBenefits = benefits || defaultBenefits;

    const getIconSrc = (icon: string) => {
        switch (icon) {
            case 'no-cost': return '/no-cost.png';
            case 'support-24': return '/support-24.png';
            case 'wide-range': return '/wide-range.png';
            case 'assistance-247': return '/assistance-247.png';
            default: return '/no-cost.png';
        }
    };

    return (
        <section className="w-full bg-white py-10">
            <div className="container mx-auto px-4 py-16 max-w-[1240px]">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    {title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {displayBenefits.map((b, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            {/* ICONA */}
                            <div className="relative w-24 h-24 flex items-center justify-center">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
