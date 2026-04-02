import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/provider/ReactQueryProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GP Noleggio",
    description: "Il tuo partner di noleggio",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="it">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <QueryProvider>
                {children}
            </QueryProvider>
        </body>
        </html>
    )
}
