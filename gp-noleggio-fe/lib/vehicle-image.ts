import type { ListaVeicolo } from "@/types/veicolo";

export function resolveVehicleImageSrc(
    vehicle?: Pick<ListaVeicolo, "urlImmagine" | "codiceClasse"> | null,
): { src: string; unoptimized: boolean } {
    const fallback = "/fiat-500.png";
    const imageUrl = vehicle?.urlImmagine?.trim();

    if (imageUrl) {
        if (imageUrl.startsWith("/")) {
            return { src: imageUrl, unoptimized: false };
        }

        if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
            return { src: imageUrl, unoptimized: true };
        }
    }

    const codiceClasse = vehicle?.codiceClasse?.trim();
    if (codiceClasse) {
        return { src: `/${codiceClasse}.png`, unoptimized: false };
    }

    return { src: fallback, unoptimized: false };
}
