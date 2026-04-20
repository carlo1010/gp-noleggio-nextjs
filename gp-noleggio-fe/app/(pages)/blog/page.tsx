import HeroBanner from "@/components/hero-banner";
import BlockRenderer from "@/components/block-renderer";
import { getPageConfig } from "@/lib/fetchPayload";

// Import dei componenti originali per il fallback di default
import BlogSection from "@/components/blog-list";
import WhyRent from "@/components/why-rent";


const bannerImageUrl = "/hero/sfondo-hero-blog.jpg";
export default async function Blog() {
    const config = await getPageConfig('blog');
    
    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} config={config} />
            
            {config?.layout && config.layout.length > 0 ? (
                <BlockRenderer blocks={config.layout} />
            ) : (
                <>
                    <BlogSection />
                    <WhyRent />
                </>
            )}
        </>
    );
}