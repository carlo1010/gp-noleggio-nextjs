import Image from "next/image";
import NextBreadcrumb from "@/components/blog-breadcrumbs";

interface BlogPost {
    kicker: string;
    title: string;
    desc: string;
    img: string | any;
    imgAlt: string;
}

interface BlogArticleProps {
    post: BlogPost;
}

export default function BlogArticle({ post }: BlogArticleProps) {
    const imageUrl = typeof post.img === 'object' && post.img?.url ? post.img.url : '/placeholder.png';

    return (
        <article className="container mx-auto px-4 py-20 max-w-[1240px]">
            <NextBreadcrumb
                homeElement={'Home'}
                separator={<span> | </span>}
                activeClasses='text-blue-500'
                containerClasses='flex py-1'
                listClasses='hover:underline mx-2 font-bold'
                capitalizeLinks
            />
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
                    src={imageUrl}
                    alt={post.imgAlt || "Immagine articolo"}
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