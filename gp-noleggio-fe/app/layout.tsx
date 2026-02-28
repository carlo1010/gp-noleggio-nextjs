import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {QueryProvider} from "@/provider/ReactQueryProvider";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.piccirillorent.it"),
    title: {
        default: "Piccirillo Rent – Noleggio Auto, Furgoni ed Elettriche in Campania",
        template: "%s | Piccirillo Rent",
    },
    description:
        "Noleggio auto, furgoni, elettriche e premium in Campania. Prenota online con tariffa scontata o paga al ritiro. Flotta rinnovata, assistenza dedicata.",
    keywords: [
        "noleggio auto",
        "noleggio furgoni",
        "noleggio auto elettriche",
        "noleggio premium",
        "Campania",
        "Piccirillo Rent",
        "noleggio breve termine",
        "autonoleggio Campania",
    ],
    openGraph: {
        type: "website",
        locale: "it_IT",
        siteName: "Piccirillo Rent",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Piccirillo Rent – Noleggio auto in Campania",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
            <html lang="it">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <div className="relative min-h-dvh overflow-x-hidden">
                <QueryProvider>
                    {children}
                </QueryProvider>
            </div>
            </body>
            </html>
    );
}

