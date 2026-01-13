import {create} from "zustand";

import type {ListaVeicolo} from "@/types/veicolo";
import {calcDays} from "@/lib/date";

export type ClienteTipo = "privato" | "azienda";
export type VeicoloTipo = "auto" | "furgone";
export type PacchettoTipo = string;
export type MetodoPagamento = "web" | "ritiro";

export type ServizioSelezionato = {
    codice: string;
    titolo: string;
    descrizione?: string;
    prezzo: number;
    quantita: number;
    flagQtaServizio: 0 | 1;
};

export type ProtezioneSelezionata = {
    nome: string;
    descrizione: string;
    importo: number;
    franchigiaFurto: string;
    franchigiaDanno: string;
    note: string;
};

export type CheckoutState = {
    step: number;

    search: {
        tipoCliente: ClienteTipo;
        tipoVeicolo: VeicoloTipo;
        ritiro: { luogo: string; luogoLabel: string; data: string; ora: string };
        riconsegna: { luogo: string; luogoLabel: string; data: string; ora: string; stessoUfficio: boolean };
        eta: number;
        codicePromo?: string;
    };

    veicolo?: ListaVeicolo;

    tariffa: {
        tipo?: MetodoPagamento;
        prezzoGiorno: number;
        prezzoTotale: number;
    };


    protezioni: {
        pacchetto: PacchettoTipo;
        prezzoGiorno: number;
        prezzoTotale: number;
        opzioni: string[]; // es: ["danni","furto"] o codici
        selezionata?: ProtezioneSelezionata;
    };

    servizi: Record<string, ServizioSelezionato>;


    conducente: {
        nome: string;
        cognome: string;
        dataNascita: string;
        email: string;
        telefono: string;
        codiceFiscale: string;
        numeroVolo?: string;

        privacyInfo: boolean;   // ricevere info/offerte + trattamento dati
        marketing: boolean;     // consenso marketing partner ecc
        programmaFedelta?: string;
    };

    pagamento: {
        tokenCarta?: string;
        terminiAccettati: boolean;
    };
};

type CheckoutActions = {
    // step
    setStep: (step: number) => void;

    // search (granulare)
    setTipoCliente: (tipoCliente: ClienteTipo) => void;
    setTipoVeicolo: (tipoVeicolo: VeicoloTipo) => void;
    setRitiro: (patch: Partial<CheckoutState["search"]["ritiro"]>) => void;
    setRiconsegna: (patch: Partial<CheckoutState["search"]["riconsegna"]>) => void;
    setEta: (eta: number) => void;
    setCodicePromo: (codicePromo?: string) => void;

    // veicolo
    setVeicolo: (veicolo: ListaVeicolo) => void;

    // tariffa
    setTariffa: (payload: {
        tipo: MetodoPagamento;
        prezzoGiorno: number;
        prezzoTotale: number;
    }) => void;

    // protezioni
    setPacchetto: (pacchetto: PacchettoTipo) => void;
    toggleProtezioneOpzione: (codice: string) => void;
    clearProtezioniOpzioni: () => void;

    // extra
    setServizio: (payload: ServizioSelezionato) => void;
    incServizio: (
        codice: string,
        titolo: string,
        prezzo: number,
        flagQtaServizio: 0 | 1,
        descrizione?: string
    ) => void;
    decServizio: (codice: string) => void;
    toggleServizio: (
        codice: string,
        titolo: string,
        prezzo: number,
        flagQtaServizio: 0 | 1,
        descrizione?: string
    ) => void;

    // totale
    getTotale: () => number;

    // conducente
    setConducente: (patch: Partial<CheckoutState["conducente"]>) => void;

    // pagamento
    setTermini: (value: boolean) => void;
    setTokenCarta: (token?: string) => void;

    // reset
    resetCheckout: () => void;
    setPacchettoConPrezzo: (
        pacchetto: PacchettoTipo,
        prezzoGiorno: number,
        selezionata?: ProtezioneSelezionata
    ) => void;
    clearStep3: () => void;


};

const initialCheckoutState: CheckoutState = {
    step: 1,

    search: {
        tipoCliente: "privato",
        tipoVeicolo: "auto",
        ritiro: {luogo: "", luogoLabel: "", data: "", ora: ""},
        riconsegna: {luogo: "", luogoLabel: "", data: "", ora: "", stessoUfficio: true},
        eta: 18,
        codicePromo: undefined,
    },

    veicolo: undefined,
    tariffa: {
        tipo: undefined,
        prezzoGiorno: 0,
        prezzoTotale: 0,
    },


    protezioni: {
        pacchetto: "",
        prezzoGiorno: 0,
        prezzoTotale: 0,
        opzioni: [],
    },

    servizi: {},

    conducente: {
        nome: "",
        cognome: "",
        dataNascita: "",
        email: "",
        telefono: "",
        codiceFiscale: "",
        numeroVolo: undefined,


        privacyInfo: false,
        marketing: false,
        programmaFedelta: "",
    },

    pagamento: {
        tokenCarta: undefined,
        terminiAccettati: false,
    },
};


const calcGiorniNoleggio = (dataInizio?: string, dataFine?: string) =>
    calcDays(dataInizio, dataFine);

export const useCheckoutStore = create<CheckoutState & CheckoutActions>((set, get) => ({
    ...initialCheckoutState,

    // step
    setStep: (step) => set({step}),

    // search
    setTipoCliente: (tipoCliente) =>
        set((s) => ({search: {...s.search, tipoCliente}})),

    setTipoVeicolo: (tipoVeicolo) =>
        set((s) => ({search: {...s.search, tipoVeicolo}})),

    setRitiro: (patch) =>
        set((s) => ({search: {...s.search, ritiro: {...s.search.ritiro, ...patch}}})),

    setRiconsegna: (patch) =>
        set((s) => ({
            search: {...s.search, riconsegna: {...s.search.riconsegna, ...patch}},
        })),

    setEta: (eta) => set((s) => ({search: {...s.search, eta}})),

    setCodicePromo: (codicePromo) =>
        set((s) => ({search: {...s.search, codicePromo}})),

    // veicolo
    setVeicolo: (veicolo) => set({veicolo}),
    // tariffa
    setTariffa: (payload) =>
        set((s) => ({
            tariffa: {
                ...s.tariffa,
                ...payload,
            },
        })),

    clearStep3: () =>
        set((s) => ({
            protezioni: {
                ...s.protezioni,
                pacchetto: "",
                prezzoGiorno: 0,
                prezzoTotale: 0,
                opzioni: [],
                selezionata: undefined,
            },
            servizi: {},
        })),


    // protezioni
    setPacchetto: (pacchetto) =>
        set((s) => ({protezioni: {...s.protezioni, pacchetto}})),

    toggleProtezioneOpzione: (codice) =>
        set((s) => {
            const exists = s.protezioni.opzioni.includes(codice);
            const opzioni = exists
                ? s.protezioni.opzioni.filter((x) => x !== codice)
                : [...s.protezioni.opzioni, codice];

            return {protezioni: {...s.protezioni, opzioni}};
        }),

    clearProtezioniOpzioni: () =>
        set((s) => ({protezioni: {...s.protezioni, opzioni: []}})),

    // extra


    setServizio: ({codice, titolo, descrizione, prezzo, quantita, flagQtaServizio}) =>
        set((s) => ({
            servizi: {
                ...s.servizi,
                [codice]: {
                    codice,
                    titolo,
                    descrizione,
                    prezzo,
                    quantita: Math.max(0, quantita),
                    flagQtaServizio,
                },
            },
        })),

    incServizio: (codice, titolo, prezzo, flagQtaServizio, descrizione) =>
        set((s) => {
            const current = s.servizi[codice]?.quantita ?? 0;
            return {
                servizi: {
                    ...s.servizi,
                    [codice]: {
                        codice,
                        titolo,
                        descrizione,
                        prezzo,
                        quantita: current + 1,
                        flagQtaServizio,
                    },
                },
            };
        }),

    decServizio: (codice) =>
        set((s) => {
            const item = s.servizi[codice];
            const current = item?.quantita ?? 0;
            const next = Math.max(0, current - 1);

            if (!item) return s;

            // se arrivi a 0, lo rimuovo dal record (così non resta “sporco”)
            if (next === 0) {
                const {[codice]: _removed, ...rest} = s.servizi;
                return {servizi: rest};
            }

            return {
                servizi: {
                    ...s.servizi,
                    [codice]: {...item, quantita: next},
                },
            };
        }),

    toggleServizio: (codice, titolo, prezzo, flagQtaServizio, descrizione) =>
        set((s) => {
            const current = s.servizi[codice]?.quantita ?? 0;

            // se esiste (quantita > 0) => rimuovi
            if (current > 0) {
                const {[codice]: _removed, ...rest} = s.servizi;
                return {servizi: rest};
            }

            // altrimenti aggiungi con quantita 1
            return {
                servizi: {
                    ...s.servizi,
                    [codice]: {codice, titolo, descrizione, prezzo, quantita: 1, flagQtaServizio},
                },
            };
        }),


    // conducente
    setConducente: (patch) =>
        set((s) => ({conducente: {...s.conducente, ...patch}})),

    // pagamento
    setTermini: (value) =>
        set((s) => ({pagamento: {...s.pagamento, terminiAccettati: value}})),

    setTokenCarta: (token) =>
        set((s) => ({pagamento: {...s.pagamento, tokenCarta: token}})),


    getTotale: () => {
        const s = get();

        const base = s.tariffa?.prezzoTotale ?? 0;
        const protezioniTot = s.protezioni?.prezzoTotale ?? 0;

        const giorni = calcGiorniNoleggio(s.search.ritiro?.data, s.search.riconsegna?.data);

        const serviziTot = Object.values(s.servizi ?? {}).reduce((acc, item) => {
            const prezzo = Number(item.prezzo) || 0;
            const qta = Number(item.quantita) || 0;
            return acc + prezzo * qta * giorni;
        }, 0);

        return base + protezioniTot + serviziTot;
    },


    // reset
    resetCheckout: () => set({...initialCheckoutState}),
    setPacchettoConPrezzo: (pacchetto, prezzoGiorno, selezionata) =>
        set((s) => ({
            protezioni: {
                ...s.protezioni,
                pacchetto,
                prezzoGiorno,
                prezzoTotale: prezzoGiorno * calcGiorniNoleggio(s.search.ritiro?.data, s.search.riconsegna?.data),
                selezionata,
            },
        })),

}));
