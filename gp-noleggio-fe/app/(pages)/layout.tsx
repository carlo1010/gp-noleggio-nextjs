import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { QueryProvider } from "@/provider/ReactQueryProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GP Noleggio",
    description: "Il tuo partner di noleggio",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="it">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative min-h-dvh overflow-x-hidden">
            <QueryProvider>
                <Header />
                {children}
                <Footer />
            </QueryProvider>
        </div>
        </body>
        </html>
    );
}
