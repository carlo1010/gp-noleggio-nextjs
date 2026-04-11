import type { Metadata } from "next";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import HeroBanner from "@/components/hero-banner";

export const metadata: Metadata = {
  title: "Termini del noleggio",
  description: "Consulta termini, condizioni e documenti PDF relativi al servizio di noleggio Piccirillo Rent.",
  openGraph: {
    title: "Termini del noleggio",
    description: "Dettagli, condizioni e documenti PDF del noleggio Piccirillo Rent.",
    url: "/termini-del-noleggio",
  },
  alternates: { canonical: "/termini-del-noleggio" },
};

const terms = [
  "Le condizioni economiche applicate dipendono da durata, periodo, categoria veicolo e sede selezionata al momento della prenotazione.",
  "Documenti, eta minima del conducente, modalita di pagamento, deposito cauzionale e coperture disponibili possono variare in base al tipo di noleggio.",
  "La disponibilita dei veicoli e delle tariffe e soggetta a conferma operativa della sede selezionata.",
  "Eventuali servizi aggiuntivi, franchigie, limitazioni chilometriche o condizioni speciali vengono mostrati nel flusso di prenotazione quando previsti.",
  "Per richieste specifiche o chiarimenti contrattuali, fa fede la documentazione fornita in fase di prenotazione e quella sottoscritta al ritiro del veicolo.",
];

interface RentalDocument {
  fileName: string;
  href: string;
  label: string;
}

function toDocumentLabel(fileName: string) {
  return fileName
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function getRentalDocuments(): Promise<RentalDocument[]> {
  const documentsPath = path.join(process.cwd(), "public", "documenti-noleggio");

  try {
    const fileNames = await fs.readdir(documentsPath);

    return fileNames
      .filter((fileName) => fileName.toLowerCase().endsWith(".pdf"))
      .sort((left, right) => left.localeCompare(right, "it-IT"))
      .map((fileName) => ({
        fileName,
        href: `/documenti-noleggio/${encodeURIComponent(fileName)}`,
        label: toDocumentLabel(fileName),
      }));
  } catch {
    return [];
  }
}

export default async function TerminiDelNoleggioPage() {
  const documents = await getRentalDocuments();

  return (
    <>
      <HeroBanner
        imageUrl="/hero/sfondo-hero-auto.png"
        title="Termini del noleggio"
        description="Consulta condizioni generali e documentazione PDF del servizio di noleggio."
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-tl-3xl rounded-br-3xl bg-[#F7F7F7] p-6 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Condizioni principali
              </span>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                Regole e riferimenti del servizio di noleggio
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600">
                Questa pagina raccoglie le indicazioni generali sul servizio. Le condizioni definitive
                restano quelle confermate per la prenotazione e per la sede selezionata.
              </p>

              <ul className="mt-8 space-y-4 text-gray-700">
                {terms.map((term) => (
                  <li key={term} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0700DE]" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-tl-3xl rounded-br-3xl border border-gray-200 bg-white p-6 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Consulta documenti
              </span>
              <h2 className="mt-3 text-2xl font-bold">Visualizza o scarica i documenti</h2>
              <p className="mt-4 text-gray-600">
                Qui puoi visualizzare i documenti che regolamentano i nostri servizi di noleggio a breve termine.
              </p>

              {documents.length > 0 ? (
                <div className="mt-8 space-y-4">
                  {documents.map((document) => (
                    <div
                      key={document.fileName}
                      className="rounded-tl-2xl rounded-br-2xl border border-gray-200 bg-[#F7F7F7] p-4"
                    >
                      <p className="font-semibold text-black">{document.label}</p>
                      <div className="mt-4 flex flex-wrap gap-4">
                        <Link
                          href={document.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[#0700DE]"
                        >
                          Visualizza
                        </Link>
                        <a
                          href={document.href}
                          download={document.fileName}
                          className="font-semibold text-gray-700"
                        >
                          Scarica
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-tl-2xl rounded-br-2xl border border-dashed border-gray-300 bg-[#F7F7F7] p-4 text-sm text-gray-600">
                  Nessun file disponibile al momento. Aggiungi i documenti in `public/documenti-noleggio`
                  per mostrarli qui automaticamente.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
