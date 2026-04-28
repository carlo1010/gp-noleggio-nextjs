import Image from "next/image";
import NextBreadcrumb from "@/components/blog-breadcrumbs";
import type { BlogPost as PayloadBlogPost } from "@/payload-types";

interface BlogArticleProps {
    post: PayloadBlogPost;
}

export default function BlogArticle({ post }: BlogArticleProps) {
    const imageUrl = typeof post.cardImage === 'object' && post.cardImage?.url ? post.cardImage.url : '/placeholder.png';
    const alt = typeof post.cardImage === 'object' && post.cardImage?.alt ? post.cardImage.alt : "Immagine articolo";

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
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="mt-14 max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg">
                {/* Il contenuto può contenere HTML se viene dal rich text di Payload CMS. 
                    Se è HTML puro, decommenta l'uso di dangerouslySetInnerHTML e rimuovi post.content
                */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    );
}