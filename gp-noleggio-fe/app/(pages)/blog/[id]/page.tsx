import HeroBanner from "@/components/hero-banner";
import WhyRent from "@/components/why-rent";
import BlogArticle from "@/components/blog-article";

const bannerImageUrl = "/hero/sfondo-hero-blog.jpg";

export default async function BlogArticlePage({
                                                  params,
                                              }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} />
            <BlogArticle id={id} />
            <WhyRent />
        </>
    );
}
