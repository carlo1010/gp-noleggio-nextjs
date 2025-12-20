import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogItem {
    id: string;
    kicker: string;
    title: string;
    desc: string;
    img: string;
    imgAlt: string;
}

interface BlogArticleProps {
    id: string;
}

async function getBlogPost(id: string): Promise<BlogItem | null> {
    const filePath = path.join(process.cwd(), "data", "blog.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const items: BlogItem[] = JSON.parse(fileContents);

    return items.find(item => item.id === id) ?? null;
}

export default async function BlogArticle({ id }: BlogArticleProps) {
    const post = await getBlogPost(id);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-20 max-w-6xl">
            <header className="max-w-3xl mx-auto text-center">
                <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                    {post.kicker}
                </p>

                <h1 className="mt-4 text-4xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {post.title}
                </h1>
            </header>

            <div className="relative w-full aspect-16/7 mt-14 rounded-tl-3xl rounded-br-3xl overflow-hidden">
                <Image
                    src={post.img}
                    alt={post.imgAlt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="mt-14 max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg">
                {post.desc}
            </div>
        </article>

    );
}
