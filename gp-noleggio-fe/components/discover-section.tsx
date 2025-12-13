import Image from "next/image";
import Link from "next/link";

const items = [
    {
        kicker: "LOREM IPSUM",
        title: "Lorem ipsum",
        desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: "/",
        cta: "Lorem Ipsum",
        img: "/discover1.png",
        imgAlt: "Discover 1",
    },
    {
        kicker: "LOREM IPSUM",
        title: "Lorem ipsum",
        desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: "/",
        cta: "Lorem Ipsum",
        img: "/discover2.png",
        imgAlt: "Discover 2",
    },
    {
        kicker: "LOREM IPSUM",
        title: "Lorem ipsum",
        desc:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        href: "/",
        cta: "Lorem Ipsum",
        img: "/discover3.png",
        imgAlt: "Discover 3",
    },
];

export default function DiscoverSection() {
    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 py-14">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    Scopri il mondo Piccirillo Rent
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map((item) => (
                        <article key={item.title} className="flex flex-col">
                            {/* Immagine */}
                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
                                <Image
                                    src={item.img}
                                    alt={item.imgAlt}
                                    fill
                                    priority={false}
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                />
                            </div>

                            {/* Testi */}
                            <div className="mt-6">
                                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                                    {item.kicker}
                                </p>

                                <h3 className="mt-2 text-3xl font-bold text-black">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>

                                <Link
                                    href={item.href}
                                    className="mt-6 inline-block text-[#0700DE] font-semibold"
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
