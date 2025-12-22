import Link from "next/link";
import {ChevronRight} from "lucide-react";

export default function GammaElettricaInfo() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <h2 className="text-3xl font-bold text-black">
                    La nostra esclusiva gamma di auto elettriche
                </h2>

                <div className="mt-6 max-w-5xl space-y-6 text-[15px] leading-7 text-black">
                    <p>
                        Noleggiare un auto elettrica oggi significa poter testare con mano la
                        tecnologia e l’innovazione e scoprirne nel dettaglio le
                        caratteristiche e i reali vantaggi. All’interno della nostra
                        esclusiva gamma elettrica troverai dalle piccole city car ad auto più
                        spaziose e confortevoli. Su tutte il comfort di guida, la
                        silenziosità, le prestazioni e il rispetto per l’ambiente sono
                        garantiti.
                    </p>

                    <p>
                        Ti ricordiamo che tutti i nostri noleggi di{" "}
                        <strong>veicoli elettrici includono una carica completa</strong>, il
                        che significa che non è necessario ricaricare prima di restituire il
                        veicolo alla fine del noleggio*, permettendoti di risparmiare
                        ulteriore tempo e denaro.
                    </p>

                    <p>
                        Per maggiori informazioni su dove trovare le auto e dove ricaricarle
                    </p>
                </div>

                <Link
                    href="/punti-di-ricarica"
                    className="mt-10 inline-flex items-center gap-2 text-[#0700DE] font-semibold"
                >
                    Vai ai punti di ricarica
                    <ChevronRight className="h-5 w-5"/>
                </Link>
            </div>
        </section>
    );
}
