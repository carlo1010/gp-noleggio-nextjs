import type { Metadata } from "next";
import { getPayload } from "@/lib/payload";
import type { BlogPost } from "@/payload-types";
import HeroBanner from "@/components/hero-banner";
import WhyRent from "@/components/why-rent";
import BlogArticle from "@/components/blog-article";
import { notFound } from "next/navigation";

async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const payload = await getPayload();
        const { docs } = await payload.find({
            collection: 'blog-posts',
            where: {
                slug: {
                    equals: slug,
                }
            },
            limit: 1,
        });
        return (docs[0] as BlogPost | undefined) ?? null;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const post = await getBlogPost(id);

    if (!post) {
        return { title: "Articolo non trovato" };
    }

    const imageUrl = typeof post.cardImage === 'object' && post.cardImage?.url ? post.cardImage.url : '/placeholder.png';
    const alt = typeof post.cardImage === 'object' && post.cardImage?.alt ? post.cardImage.alt : "Immagine articolo";

    return {
        title: post.title,
        description: post.excerpt || "",
        openGraph: {
            title: post.title,
            description: post.excerpt || "",
            url: `/blog/${id}`,
            images: [{ url: imageUrl, alt: alt }],
        },
        alternates: { canonical: `/blog/${id}` },
    };
}

const bannerImageUrl = "/hero/sfondo-hero-blog.jpg";

export default async function BlogArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getBlogPost(id);

    if (!post) {
        notFound();
    }

    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} />
            <BlogArticle post={post} />
            <WhyRent />
        </>
    );
}
