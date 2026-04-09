import type { Metadata } from "next";
import { getPayload } from "@/lib/payload";
import type { Post } from "@/payload-types";
import HeroBanner from "@/components/hero-banner";
import WhyRent from "@/components/why-rent";
import BlogArticle from "@/components/blog-article";
import { notFound } from "next/navigation";

async function getBlogPost(slug: string): Promise<Post | null> {
    const payload = await getPayload();
    const { docs } = await payload.find({
        collection: 'posts',
        where: {
            slug: {
                equals: slug,
            }
        },
        limit: 1,
    });
    return (docs[0] as Post | undefined) ?? null;
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

    const imageUrl = typeof post.img === 'object' && post.img?.url ? post.img.url : '/placeholder.png';

    return {
        title: post.title,
        description: post.desc,
        openGraph: {
            title: post.title,
            description: post.desc,
            url: `/blog/${id}`,
            images: [{ url: imageUrl, alt: post.imgAlt }],
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
