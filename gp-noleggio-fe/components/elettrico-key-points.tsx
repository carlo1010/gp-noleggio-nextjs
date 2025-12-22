import MacchinaElettrica from "@/components/svg/macchinaElettrica";
import SimboloElettrico from "@/components/svg/simboloElettrico";

export default function ElettricoKeyPoints() {
    return (
        <section className="w-full bg-[#F7F7F7] py-20">
            <div className="mx-auto w-full max-w-[1124px] px-4">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

                    {/* BLOCCO 1 */}
                    <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
                        <div className="mb-4">
                            <MacchinaElettrica className="h-8 w-8 text-black" />
                        </div>

                        <h4 className="text-sm font-semibold text-black">
                            Le auto elettriche hanno più autonomia di quanto potresti pensare
                        </h4>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Grazie alle ultime tecnologie potrai avere un’autonomia di{" "}
                            <span className="font-semibold text-gray-900">400 KM</span> con una
                            singola ricarica
                        </p>
                    </div>

                    {/* BLOCCO 2 */}
                    <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
                        <div className="mb-4">
                            <SimboloElettrico className="h-8 w-8 text-black" />
                        </div>

                        <h4 className="text-sm font-semibold text-black">
                            I veicoli elettrici sono la scelta migliore per l’ambiente
                        </h4>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Le emissioni di CO2 prodotte per la ricarica dei veicoli elettrici
                            sono inferiori rispetto a quelle prodotte dai veicoli benzina /
                            diesel
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
