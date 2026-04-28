import MacchinaElettrica from "@/components/svg/macchinaElettrica";
import SimboloElettrico from "@/components/svg/simboloElettrico";

interface ElettricoKeyPointsProps {
    config?: any;
}

export default function ElettricoKeyPoints({ config }: ElettricoKeyPointsProps) {
    const points = config?.elettricheConfig?.keyPoints?.points;
    
    // Fallback data
    const p1Title = points?.[0]?.title || "Le auto elettriche hanno più autonomia di quanto potresti pensare";
    const p1Desc = points?.[0]?.description || "Grazie alle ultime tecnologie potrai avere un’autonomia di 400 KM con una singola ricarica";
    
    const p2Title = points?.[1]?.title || "I veicoli elettrici sono la scelta migliore per l’ambiente";
    const p2Desc = points?.[1]?.description || "Le emissioni di CO2 prodotte per la ricarica dei veicoli elettrici sono inferiori rispetto a quelle prodotte dai veicoli benzina / diesel";

    return (
        <section className="w-full bg-[#F7F7F7] py-20">
            <div className="container mx-auto max-w-[1240px] px-4">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

                    {/* BLOCCO 1 */}
                    <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
                        <div className="mb-4">
                            <MacchinaElettrica className="h-8 w-8 text-black" />
                        </div>

                        <h4 className="text-sm font-semibold text-black">
                            {p1Title}
                        </h4>

                        <p className="mt-3 text-sm leading-6 text-gray-600 whitespace-pre-wrap">
                            {p1Desc}
                        </p>
                    </div>

                    {/* BLOCCO 2 */}
                    <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
                        <div className="mb-4">
                            <SimboloElettrico className="h-8 w-8 text-black" />
                        </div>

                        <h4 className="text-sm font-semibold text-black">
                            {p2Title}
                        </h4>

                        <p className="mt-3 text-sm leading-6 text-gray-600 whitespace-pre-wrap">
                            {p2Desc}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
