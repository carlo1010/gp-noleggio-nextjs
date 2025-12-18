import Image from "next/image";
import Link from "next/link";
import { promises as fs } from 'fs';
import path from 'path';

interface BlogItem {
    id: string;
    kicker: string;
    title: string;
    desc: string;
    href: string;
    cta: string;
    img: string;
    imgAlt: string;
}

async function getBlogData(): Promise<BlogItem[]> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'blog.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        // Log the error for debugging, but don't crash the app
        console.error("Errore caricamento feed Blog:", error);
        return []; // Return an empty array so the component can still render
    }
}

export default async function BlogSection() {
    const items = await getBlogData();

    // Handle the "No items" or "Broken file" state
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
            <div className="container mx-auto px-4 py-14">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    Articoli in evidenza
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map((item) => (
                        <article key={item.id} className="flex flex-col group">
                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
                                <Image
                                    src={item.img}
                                    alt={item.imgAlt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                />
                            </div>

                            <div className="mt-6">
                                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                                    {item.kicker}
                                </p>
                                <h3 className="mt-2 text-3xl font-bold text-black">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">
                                    {item.desc}
                                </p>
                                <Link
                                    href={item.href}
                                    className="mt-6 inline-block text-[#0700DE] font-semibold hover:text-blue-800 transition-colors"
                                >
                                    {item.cta}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}