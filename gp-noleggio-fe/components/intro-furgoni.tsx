import Link from "next/link";

type IntroFurgoniProps = {
    config?: any;
    breadcrumb?: { label: string; href: string }[];
    title: string;
    subtitle: string;
    body: string;
};

export default function IntroFurgoni({
    config,
    breadcrumb = [
        { label: "Home", href: "/" },
        { label: "Noleggio Furgoni", href: "/noleggio-furgoni" },
    ],
    title,
    subtitle,
    body,
}: IntroFurgoniProps) {
    const cmsTitle = config?.furgoniConfig?.introFurgoni?.title || title;
    const cmsSubtitle = config?.furgoniConfig?.introFurgoni?.subtitle || subtitle;
    const cmsBody = config?.furgoniConfig?.introFurgoni?.body || body;
    return (
        <section className="w-full bg-white py-16">
            <div className="container mx-auto max-w-[1240px] px-4">
                {/* Breadcrumb */}
                <nav className="text-[11px] text-gray-500">
                    {breadcrumb.map((item, idx) => (
                        <span key={item.href}>
                            <Link href={item.href} className="hover:underline">
                                {item.label}
                            </Link>
                            {idx < breadcrumb.length - 1 && <span> &gt; </span>}
                        </span>
                    ))}
                </nav>

                {/* Title */}
                <h1 className="mt-4 max-w-[820px] text-[26px] font-semibold leading-tight text-black">
                    {cmsTitle}
                </h1>

                {/* Subtitle */}
                <p className="mt-10 max-w-[760px] text-center text-sm font-semibold text-black whitespace-pre-wrap">
                    {cmsSubtitle}
                </p>

                {/* Body */}
                <p className="mt-4 max-w-[900px] text-[12px] leading-6 text-gray-600 whitespace-pre-wrap">
                    {cmsBody}
                </p>
            </div>
        </section>
    );
}
