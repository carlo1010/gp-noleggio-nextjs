import Link from "next/link";

type IntroFurgoniProps = {
    breadcrumb?: { label: string; href: string }[];
    title: string;
    subtitle: string;
    body: string;
};

export default function IntroFurgoni({
                                         breadcrumb = [
                                             { label: "Home", href: "/" },
                                             { label: "Noleggio Furgoni", href: "/noleggio-furgoni" },
                                         ],
                                         title,
                                         subtitle,
                                         body,
                                     }: IntroFurgoniProps) {
    return (
        <section className="w-full bg-white py-16">
            <div className="mx-auto w-full max-w-[1124px] px-4">
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
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="mt-10 max-w-[760px] text-center text-sm font-semibold text-black">
                    {subtitle}
                </p>

                {/* Body */}
                <p className="mt-4 max-w-[900px] text-[12px] leading-6 text-gray-600">
                    {body}
                </p>
            </div>
        </section>
    );
}
