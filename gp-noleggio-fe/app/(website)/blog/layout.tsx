import Header from "@/components/header";
import TerminiCondizioni from "@/components/termini-condizioni";
import { QueryProvider } from "@/provider/ReactQueryProvider";

export default function BlogLayout({children}: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <Header/>
            {children}
            <TerminiCondizioni/>
        </QueryProvider>
    );
}
