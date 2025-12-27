import Header from "@/components/header";
import Footer from "@/components/footer";
import StepStatus from "@/components/checkout/stepstatus";

export default function SiteLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header dark={true}/>
            <section className="bg-[#f7f7f7] pt-[80px]">
                <div className="container mx-auto py-4">
                    <StepStatus/>
                </div>
            </section>
            {children}
        </>
    );
}
