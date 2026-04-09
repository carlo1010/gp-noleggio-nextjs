import { getPayload } from 'payload';
import config from '@/payload/payload.config';
import DiscoverCarouselWrapper from "./discover-carousel-wrapper";

// 1. Define the Interface for Type Safety
export interface DiscoverItem {
    id: string;
    kicker: string;
    title: string;
    desc: string;
    href: string;
    cta: string;
    img: string;
    imgAlt: string;
}

// 2. The Server Component
export default async function DiscoverSection() {
    const payload = await getPayload({ config });
    
    // Fetch the 6 most recent published blog posts
    const { docs: posts } = await payload.find({
        collection: 'blog-posts',
        limit: 6,
        sort: '-publishedAt',
        where: {
            status: {
                equals: 'published',
            },
        },
    });

    // Map Payload data to the DiscoverItem format
    const items: DiscoverItem[] = posts.map((post: any) => ({
        id: post.id,
        kicker: post.kicker || 'BLOG',
        title: post.title,
        desc: post.excerpt || '',
        href: `/blog/${post.slug}`,
        cta: post.ctaLabel || 'Leggi di più',
        img: typeof post.cardImage === 'object' ? post.cardImage?.url : '',
        imgAlt: post.title,
    }));

    if (items.length === 0) return null;

    return (
        <section className="w-full bg-white overflow-hidden">
            <div className="container mx-auto px-4 py-14 max-w-[1240px]">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Scopri il mondo Piccirillo Rent
                    </h2>
                </div>

                {/* CAROUSEL WRAPPER - Now responsive for all sizes */}
                <DiscoverCarouselWrapper items={items} />
            </div>
        </section>
    );
}