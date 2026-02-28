import { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.piccirillorent.it";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Load dynamic blog articles
    const filePath = path.join(process.cwd(), "data", "blog.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const blogItems: { id: string }[] = JSON.parse(fileContents);

    const blogArticleUrls: MetadataRoute.Sitemap = blogItems.map((item) => ({
        url: `${BASE_URL}/blog/${item.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/scopri`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/chi-siamo`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog/noleggio-business`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/noleggio-furgoni`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/noleggio-vacanza`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/tipo-noleggio/noleggio-auto`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/tipo-noleggio/noleggio-elettriche`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/tipo-noleggio/noleggio-furgoni`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/tipo-noleggio/noleggio-premium`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...blogArticleUrls,
    ];
}
