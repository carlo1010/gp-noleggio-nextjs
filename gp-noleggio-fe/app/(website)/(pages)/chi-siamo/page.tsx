import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chi Siamo",
    description:
        "Scopri la storia e i valori di Piccirillo Rent, la tua società di noleggio auto in Campania. Flotta rinnovata, team professionale e massima affidabilità.",
    openGraph: {
        title: "Chi Siamo | Piccirillo Rent",
        description: "Scopri la storia e i valori di Piccirillo Rent.",
        url: "/chi-siamo",
    },
    alternates: { canonical: "/chi-siamo" },
};

export default function ChiSiamo() {
    return (
        <div>
            <h1>Chi siamo</h1>
        </div>
    );
}