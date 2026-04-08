import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
