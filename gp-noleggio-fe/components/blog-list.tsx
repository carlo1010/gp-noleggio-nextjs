import Image from "next/image";
import Link from "next/link";
import NextBreadcrumb from "@/components/blog-breadcrumbs";
import { getPayload } from "@/lib/payload";

interface BlogSectionProps {
    config?: any;
}

export default async function BlogSection({ config }: BlogSectionProps) {
    let items: Array<any> = [];

    const blogConfig = config?.scopriConfig?.chiSiamo || config?.homeConfig?.discoverSection || config; // fallback if needed, wait, better use the root config if passed, or just fetch directly.
    const isManualSelection = config?.blogConfig?.blogList?.manualSelection;
    const manualItems = config?.blogConfig?.blogList?.items;

    if (isManualSelection && manualItems && manualItems.length > 0) {
        items = manualItems;
    } else {
        try {
            const payload = await getPayload();
            const result = await payload.find({
                collection: 'blog-posts',
                where: {
                    status: {
                        equals: 'published'
                    }
                },
                limit: 10,
                sort: '-publishedAt'
            });
            items = result.docs;
        } catch {
            items = [];
        }
    }

    // Handle the "No items" state
    if (!items || items.length === 0) {
        return (
            <section className="w-full bg-white py-14">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500 italic">
                        Articoli temporaneamente non disponibili
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 py-14 max-w-[1240px]">
                <NextBreadcrumb
                    homeElement={'Home'}
                    separator={<span> | </span>}
                    activeClasses='text-blue-500'
                    containerClasses='flex py-1'
                    listClasses='hover:underline mx-2 font-bold'
                    capitalizeLinks
                />
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    Articoli in evidenza
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map((item) => {
                        // The cardImage is now nested inside the collapsible group or at the root depending on payload response
                        const imageObj = item.cardImage || item.img;
                        const imageUrl = typeof imageObj === 'object' && imageObj?.url ? imageObj.url : '/placeholder.png';
                        return (
                            <article key={item.id} className="flex flex-col group">

                                {/* --- CLICKABLE IMAGE --- */}
                                <Link href={`/blog/${item.slug}`} className="block overflow-hidden rounded-2xl">
                                    <div className="relative w-full aspect-video">
                                        <Image
                                            src={imageUrl}
                                            alt={item.imgAlt || item.title || "Immagine articolo"}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                        />
                                    </div>
                                </Link>

                                <div className="mt-6">
                                    <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                                        {item.kicker}
                                    </p>
                                    <Link href={`/blog/${item.slug}`}>
                                        <h3 className="mt-2 text-3xl font-bold text-black hover:text-[#0700DE] transition-colors">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">
                                        {item.excerpt || item.desc}
                                    </p>
                                    <Link
                                        href={`/blog/${item.slug}`}
                                        className="mt-6 inline-block text-[#0700DE] font-semibold hover:text-blue-800 transition-colors"
                                    >
                                        {item.ctaLabel || item.cta || "Leggi di più"}
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
