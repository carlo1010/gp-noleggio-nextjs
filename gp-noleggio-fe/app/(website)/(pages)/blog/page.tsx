import type { Metadata } from "next";
import HeroBanner from "@/components/hero-banner";
import BlogSection from "@/components/blog-list";
import WhyRent from "@/components/why-rent";

export const metadata: Metadata = {
    title: "Blog – Consigli, Guide e News sul Noleggio Auto",
    description:
        "Leggi le nostre guide sul noleggio auto, furgoni ed elettriche. Consigli pratici, novità di flotta e itinerari in Campania.",
    openGraph: {
        title: "Blog Piccirillo Rent – Consigli e Guide sul Noleggio",
        description: "Guide sul noleggio auto, consigli di viaggio e novità di flotta.",
        url: "/blog",
    },
    alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

const bannerImageUrl = "/hero/sfondo-hero-blog.jpg";
export default async function Blog() {
    const { getPageConfig } = await import("@/lib/fetchPayload");
    const config = await getPageConfig("blog");
    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} config={config} />
            <BlogSection config={config} />
            <WhyRent config={config} />
        </>
    );
}
