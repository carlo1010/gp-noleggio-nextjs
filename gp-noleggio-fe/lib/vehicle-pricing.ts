import { calcDays } from "@/lib/date";
import { parsePrice } from "@/lib/price";
import type { ListaVeicolo } from "@/types/veicolo";

type RentalWindow = {
    pickupDate?: string | null;
    pickupTime?: string | null;
    dropoffDate?: string | null;
    dropoffTime?: string | null;
};

export function getEffectiveRentalDays(window: RentalWindow) {
    return calcDays(
        window.pickupDate ?? undefined,
        window.pickupTime ?? undefined,
        window.dropoffDate ?? undefined,
        window.dropoffTime ?? undefined,
    );
}

export function getNormalizedVehiclePricing(
    veicolo: ListaVeicolo,
    window: RentalWindow,
) {
    const effectiveDays = getEffectiveRentalDays(window);
    const prezzoGiornalieroWeb = parsePrice(veicolo.tariffaWeb);
    const prezzoGiornalieroBanco = parsePrice(veicolo.tariffaBanco);

    return {
        effectiveDays,
        prezzoGiornalieroWeb,
        prezzoGiornalieroBanco,
        prezzoTotaleWeb: prezzoGiornalieroWeb * effectiveDays,
        prezzoTotaleBanco: prezzoGiornalieroBanco * effectiveDays,
    };
}
