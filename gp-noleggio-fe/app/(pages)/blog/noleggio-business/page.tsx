import OfferBar from "@/components/offer-banner";
import VantaggiIcone from "@/components/vantaggi-icone";
import HeroBanner from "@/components/hero-banner";
import { getPayload } from "@/lib/payload";
import RichText from "@/components/RichText";
import { notFound } from "next/navigation";
import NextBreadcrumb from "@/components/blog-breadcrumbs";
import Image from "next/image";

export default async function Page() {
    const slug = 'noleggio-business';
    const payload = await getPayload();
    
    const { docs } = await payload.find({
        collection: 'blog-posts',
        where: {
            slug: {
                equals: slug,
            },
            status: {
                equals: 'published',
            },
        },
    });

    const post = docs[0];

    if (!post) {
        notFound();
    }

    const featuredImage = typeof post.cardImage === 'object' ? post.cardImage?.url : '';
    const featuredImageAlt = typeof post.cardImage === 'object' ? post.cardImage?.alt : post.title;

    return (
        <main className="bg-white min-h-screen">
            <OfferBar/>
            <HeroBanner imageUrl="/hero/sfondo-hero-blog.jpg" showSearch={true} />
            <section className="py-14 md:py-20">
                <div className="container mx-auto px-4 max-w-[1240px]">
                    <div className="mb-10"><NextBreadcrumb homeElement={'Home'} separator={<span> | </span>} activeClasses='text-blue-500' containerClasses='flex text-sm font-semibold' listClasses='hover:underline mx-2' capitalizeLinks /></div>
                    <header className="text-center max-w-4xl mx-auto mb-14">
                        <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">{post.kicker}</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">{post.title}</h1>
                    </header>
                    {featuredImage && (
                        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-lg">
                            <Image src={featuredImage} alt={featuredImageAlt || post.title} fill className="object-cover" priority />
                        </div>
                    )}
                    <div className="max-w-4xl mx-auto"><RichText content={post.content} /></div>
                </div>
            </section>
            <VantaggiIcone/>
        </main>
    );
}
