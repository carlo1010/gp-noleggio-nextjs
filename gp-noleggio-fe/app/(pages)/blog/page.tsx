
import HeroBanner from "@/components/hero-banner";
import BlogSection from "@/components/blog-list";
import WhyRent from "@/components/why-rent";


const bannerImageUrl = "/hero/sfondo-hero-blog.jpg";
export default function Blog() {
    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} />
            <BlogSection />
            <WhyRent />
        </>
    );
}