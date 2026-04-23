import MacchinaElettrica from "@/components/svg/macchinaElettrica";
import SimboloElettrico from "@/components/svg/simboloElettrico";

interface ElettricoKeyPointsProps {
    config?: any;
    items?: {
        title: string;
        description: string;
        icon: string;
    }[];
}

export default function ElettricoKeyPoints({ config, items }: ElettricoKeyPointsProps) {
    const defaultItems = [
        {
            title: "Le auto elettriche hanno più autonomia di quanto potresti pensare",
            description: "Grazie alle ultime tecnologie potrai avere un’autonomia di 400 KM con una singola ricarica",
            icon: "macchinaElettrica",
        },
        {
            title: "I veicoli elettrici sono la scelta migliore per l’ambiente",
            description: "Le emissioni di CO2 prodotte per la ricarica dei veicoli elettrici sono inferiori rispetto a quelle prodotte dai veicoli benzina / diesel",
            icon: "simboloElettrico",
        },
    ];

    const displayItems = items || defaultItems;

    return (
        <section className="w-full bg-[#F7F7F7] py-20">
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                    {displayItems.map((item, idx) => (
                        <div key={idx} className="mx-auto flex max-w-[420px] flex-col items-center text-center">
                            <div className="mb-4">
                                {item.icon === "macchinaElettrica" ? (
                                    <MacchinaElettrica className="h-8 w-8 text-black" />
                                ) : (
                                    <SimboloElettrico className="h-8 w-8 text-black" />
                                )}
                            </div>

                            <h4 className="text-sm font-semibold text-black">
                                {item.title}
                            </h4>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
