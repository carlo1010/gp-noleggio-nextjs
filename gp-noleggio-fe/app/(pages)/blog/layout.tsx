import Header from "@/components/header";
import TerminiCondizioni from "@/components/termini-condizioni";

export default function BlogLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            {children}
            <TerminiCondizioni/>
        </>
    );
}
