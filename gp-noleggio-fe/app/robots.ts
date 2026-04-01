import { MetadataRoute } from "next";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.piccirillorent.it";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/ricerca-risultati", "/prenotazione-confermata", "/api/"],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
