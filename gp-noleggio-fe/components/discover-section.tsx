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

interface DiscoverSectionProps {
    title?: string;
    featuredPosts?: any[]; // Relationship in Payload
}

// 2. The Server Component
export default async function DiscoverSection({ title = "Scopri il mondo Piccirillo Rent", featuredPosts }: DiscoverSectionProps) {
    const payload = await getPayload({ config });
    
    let posts: any[] = [];

    if (featuredPosts && featuredPosts.length > 0) {
        // Use manually selected posts
        posts = featuredPosts;
    } else {
        // Fallback: Fetch the 6 most recent published blog posts
        const result = await payload.find({
            collection: 'blog-posts',
            limit: 6,
            sort: '-publishedAt',
            where: {
                status: {
                    equals: 'published',
                },
            },
        });
        posts = result.docs;
    }

    // Map Payload data to the DiscoverItem format
    const items: DiscoverItem[] = posts.map((post: any) => {
        // Handle both populated and unpopulated relationships if necessary
        const postData = typeof post === 'object' ? post : {}; 
        
        return {
            id: postData.id || '',
            kicker: postData.kicker || 'BLOG',
            title: postData.title || '',
            desc: postData.excerpt || '',
            href: `/blog/${postData.slug}`,
            cta: postData.ctaLabel || 'Leggi di più',
            img: typeof postData.cardImage === 'object' ? postData.cardImage?.url : '',
            imgAlt: postData.title || '',
        };
    }).filter(item => item.id); // Rimozione eventuali post non validi

    if (items.length === 0) return null;

    return (
        <section className="w-full bg-white overflow-hidden">
            <div className="container mx-auto px-4 py-14 max-w-[1240px]">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        {title}
                    </h2>
                </div>

                {/* CAROUSEL WRAPPER - Now responsive for all sizes */}
                <DiscoverCarouselWrapper items={items} />
            </div>
        </section>
    );
}