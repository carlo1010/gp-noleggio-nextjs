export type VehicleTransmissionKey = "manuale" | "automatico";
export type VehicleTipologia = "citycar" | "suv" | "berlina" | "van";

export interface BackendListaVeicolo {
    codiceAgenzia: string
    descrizioneAgenzia: string
    codiceClasse: string
    descrizioneClasse: string
    descrizioneGruppo?: string
    codiceTariffa: string
    descrizioneTariffa: string
    tariffaWeb: string
    tariffaBanco: string
    urlImmagine: string
    isTruck: number
    isYoung: number
    giorniNoleggio: number | string
    totalTariffaWeb: string
    totalTariffaBanco: string
    tariffaFranchigiaFurto: string
    tariffaFranchigiaDanno: string
    disponibilita?: number | string
    cambio?: string | null
    cambioKey?: VehicleTransmissionKey
    categoria?: string
    tipologia?: VehicleTipologia
    posti?: number | null
    porte?: number | null
    ariaCondizionata?: boolean | null
    etaMin?: number | null
    alimentazione?: string | null
    combustione?: string | null
    combustioneLabel?: string | null
    ac?: number | null
}

export interface ListaVeicolo extends Omit<BackendListaVeicolo, "giorniNoleggio" | "disponibilita"> {
    giorniNoleggio: number
    disponibilita: number
}

export type VehicleFiltersInput = {
    cambio?: string | null
    posti?: string | null
    tipologia?: string | null
    prezzo?: string | null
    sort?: string | null
}
