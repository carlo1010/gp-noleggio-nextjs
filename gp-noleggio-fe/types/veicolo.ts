export interface ListaVeicolo {
    codiceAgenzia: string
    descrizioneAgenzia: string
    codiceClasse: string
    descrizioneClasse: string
    codiceTariffa: string
    descrizioneTariffa: string
    tariffaWeb: string
    tariffaBanco: string
    urlImmagine: string
    isTruck: number
    isYoung: number
    giorniNoleggio: number
    totalTariffaWeb: string
    totalTariffaBanco: string
    tariffaFranchigiaFurto: string
    tariffaFranchigiaDanno: string
}