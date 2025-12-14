import Link from "next/link";

export default function TerminiCondizioni() {
    return (
        <section className="bg-white py-14">
            <div className="mx-auto max-w-[1200px] px-4">
                <h3 className="text-2xl font-bold">Termini e Condizioni</h3>

                <ul className="mt-6 list-disc space-y-4 pl-6 text-gray-700">
                    <li>L’offerta è valida per noleggi prenotati entro il 30 giugno 2025 ed effettuati in Italia fino al
                        31 Dicembre 2025.
                    </li>
                    <li>L’offerta è valida per il noleggio di tutte le categorie di auto.</li>
                    <li>L’offerta è valida esclusivamente per i noleggi di durata massima di 27 giorni.</li>
                    <li>L’offerta prevede uno sconto fino al 20% per noleggi in Italia. Lo sconto varia in base al
                        periodo di noleggio.
                    </li>
                </ul>

                <Link href="/termini" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#0700DE]">
                    Maggiori dettagli <span aria-hidden>⌄</span>
                </Link>
            </div>
        </section>
    );
}
