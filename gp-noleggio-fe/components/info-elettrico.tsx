import Link from "next/link";

export default function InfoElettrico() {
    return (
        <section className="w-full bg-white py-16">
            <div className="mx-auto w-full max-w-[1124px] px-4">
                {/* Divider top */}
                <div className="border-t border-gray-200 pt-10">
                    <div className="max-w-[900px] text-sm leading-6 text-gray-700">
                        <p>
                            La nostra gamma elettrica è oggi disponibile sia per noleggi
                            giornalieri ma anche all’interno delle nostre Long-Term Solutions.
                            Non perdere questa occasione, prenota ora su uno degli uffici
                            abilitati o{" "}
                            <span className="font-semibold text-gray-900">
                richiedi subito un contatto per scoprire le nostre Long-Term
                Solutions.
              </span>
                        </p>

                        <p className="mt-4">
                            Vorresti prenotare un noleggio auto elettriche ma ti servono
                            maggiori informazioni su dove trovare le nostre auto, dove
                            ricaricarle e scoprire tutti i vantaggi del noleggio elettrico?
                        </p>

                        <Link
                            href="/elettrico/vantaggi"
                            className="mt-5 inline-flex items-center gap-1 text-[#0700DE] font-semibold hover:underline"
                        >
                            Scopri i vantaggi dell’elettrico <span aria-hidden>›</span>
                        </Link>

                        <p className="mt-6 text-xs leading-5 text-gray-500">
                            *Ti ricordiamo che con Piccirillo Rent in Italia puoi riconsegnarci
                            l’auto senza doverla ricaricare. Sarà però necessario riconsegnare
                            il veicolo con un livello di ricarica sufficiente per permettere
                            al personale di Piccirillo Rent di poter movimentare i veicoli.
                        </p>

                        <p className="mt-4">
                            Quando noleggi un veicolo elettrico, le regole per il livello di
                            ricarica di batteria al rientro del veicolo possono variare a
                            seconda del paese di destinazione.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
