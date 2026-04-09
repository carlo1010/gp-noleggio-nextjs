export function getSimilarVehicleLabel(descrizioneGruppo?: string | null): string {
    const gruppo = descrizioneGruppo?.trim();
    return gruppo
        ? `O ${gruppo} SIMILARE`.toLocaleUpperCase("it-IT")
        : "O SIMILARE";
}
