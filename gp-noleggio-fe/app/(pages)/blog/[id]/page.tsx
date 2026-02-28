import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import HeroBanner from "@/components/hero-banner";
import WhyRent from "@/components/why-rent";
import BlogArticle from "@/components/blog-article";

interface BlogItem {
    id: string;
    kicker: string;
    title: string;
    desc: string;
    img: string;
    imgAlt: string;
}

async function getBlogPost(id: string): Promise<BlogItem | null> {
    const filePath = path.join(process.cwd(), "data", "blog.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const items: BlogItem[] = JSON.parse(fileContents);
    return items.find((item) => item.id === id) ?? null;
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

    return {
        title: post.title,
        description: post.desc,
        openGraph: {
            title: post.title,
            description: post.desc,
            url: `/blog/${id}`,
            images: [{ url: post.img, alt: post.imgAlt }],
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

    return (
        <>
            <HeroBanner imageUrl={bannerImageUrl} />
            <BlogArticle id={id} />
            <WhyRent />
        </>
    );
}
