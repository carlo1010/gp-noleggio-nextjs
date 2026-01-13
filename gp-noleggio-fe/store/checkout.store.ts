import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ClienteTipo = "privato" | "azienda";
export type VeicoloTipo = "auto" | "furgone";
export type PacchettoTipo = "basic" | "medium" | "premium";

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

    veicolo?: any;

    tariffa: {
        tipo?: "web" | "ritiro";
        prezzoGiorno: number;
        prezzoTotale: number;
        codiceTariffa: string;

    };


    protezioni: {
        pacchetto: PacchettoTipo;
        prezzoGiorno: number;
        prezzoTotale: number;
        opzioni: string[]; // es: ["danni","furto"] o codici
    };

    extra: Record<string, { titolo: string; prezzo: number; quantita: number }>;


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
    setVeicolo: (veicolo: any) => void;

    // tariffa
    setTariffa: (payload: {
        tipo: "web" | "ritiro";
        prezzoGiorno: number;
        prezzoTotale: number;
        codiceTariffa: string;
    }) => void;

    // protezioni
    setPacchetto: (pacchetto: PacchettoTipo) => void;
    toggleProtezioneOpzione: (codice: string) => void;
    clearProtezioniOpzioni: () => void;

    // extra
    setExtra: (codice: string, titolo: string, prezzo: number, quantita: number) => void;
    incExtra: (codice: string, titolo: string, prezzo: number) => void;
    decExtra: (codice: string) => void;
    toggleExtra: (codice: string, titolo: string, prezzo: number) => void;

    // totale
    getTotale: () => number;

    // conducente
    setConducente: (patch: Partial<CheckoutState["conducente"]>) => void;

    // pagamento
    setTermini: (value: boolean) => void;
    setTokenCarta: (token?: string) => void;

    // reset
    resetCheckout: () => void;
    setPacchettoConPrezzo: (pacchetto: PacchettoTipo, prezzoGiorno: number, prezzoTotale: number) => void;
    clearStep3: () => void;


};

const initialCheckoutState: CheckoutState = {
    step: 1,

    search: {
        tipoCliente: "privato",
        tipoVeicolo: "auto",
        ritiro: { luogo: "", luogoLabel: "", data: "", ora: "" },
        riconsegna: { luogo: "", luogoLabel: "", data: "", ora: "", stessoUfficio: true },
        eta: 18,
        codicePromo: undefined,
    },

    veicolo: undefined,
    tariffa: {
        tipo: undefined,
        prezzoGiorno: 0,
        prezzoTotale: 0,
        codiceTariffa: "",
    },


    protezioni: {
        pacchetto: "basic",
        prezzoGiorno: 0,
        prezzoTotale: 0,
        opzioni: [],
    },

    extra: {},

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


const parseYMDToLocalDate = (yMD: string) => {
    const [y, m, d] = yMD.split('-');
    return new Date(Number(y), Number(m) - 1, Number(d));
};
const calcGiorniNoleggio = (dataInizio?: string, dataFine?: string) => {
    if (!dataInizio || !dataFine) return 1;
    const start = parseYMDToLocalDate(dataInizio);
    const end = parseYMDToLocalDate(dataFine);

    const ms = end.getTime() - start.getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    // se stesso giorno => 1
    return Math.max(1, days);
};

export const useCheckoutStore = create<CheckoutState & CheckoutActions>()(
    persist(
        (set, get) => ({
            ...initialCheckoutState,

            // step
            setStep: (step) => set({ step }),

            // search
            setTipoCliente: (tipoCliente) =>
                set((s) => ({ search: { ...s.search, tipoCliente } })),

            setTipoVeicolo: (tipoVeicolo) =>
                set((s) => ({ search: { ...s.search, tipoVeicolo } })),

            setRitiro: (patch) =>
                set((s) => ({ search: { ...s.search, ritiro: { ...s.search.ritiro, ...patch } } })),

            setRiconsegna: (patch) =>
                set((s) => ({
                    search: { ...s.search, riconsegna: { ...s.search.riconsegna, ...patch } },
                })),

            setEta: (eta) => set((s) => ({ search: { ...s.search, eta } })),

            setCodicePromo: (codicePromo) =>
                set((s) => ({ search: { ...s.search, codicePromo } })),

            // veicolo
            setVeicolo: (veicolo) => set({ veicolo }),
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
                        pacchetto: "basic",
                        prezzoGiorno: 0,
                        prezzoTotale: 0,
                        opzioni: [],
                    },
                    extra: {},
                })),


            // protezioni
            setPacchetto: (pacchetto) =>
                set((s) => ({ protezioni: { ...s.protezioni, pacchetto } })),

            toggleProtezioneOpzione: (codice) =>
                set((s) => {
                    const exists = s.protezioni.opzioni.includes(codice);
                    const opzioni = exists
                        ? s.protezioni.opzioni.filter((x) => x !== codice)
                        : [...s.protezioni.opzioni, codice];

                    return { protezioni: { ...s.protezioni, opzioni } };
                }),

            clearProtezioniOpzioni: () =>
                set((s) => ({ protezioni: { ...s.protezioni, opzioni: [] } })),

            // extra


            setExtra: (codice, titolo, prezzo, quantita) =>
                set((s) => ({
                    extra: {
                        ...s.extra,
                        [codice]: { titolo, prezzo, quantita: Math.max(0, quantita) },
                    },
                })),

            incExtra: (codice, titolo, prezzo) =>
                set((s) => {
                    const current = s.extra[codice]?.quantita ?? 0;
                    return {
                        extra: {
                            ...s.extra,
                            [codice]: { titolo, prezzo, quantita: current + 1 },
                        },
                    };
                }),

            decExtra: (codice) =>
                set((s) => {
                    const item = s.extra[codice];
                    const current = item?.quantita ?? 0;
                    const next = Math.max(0, current - 1);

                    if (!item) return s;

                    // se arrivi a 0, lo rimuovo dal record (così non resta “sporco”)
                    if (next === 0) {
                        const { [codice]: _removed, ...rest } = s.extra;
                        return { extra: rest };
                    }

                    return {
                        extra: {
                            ...s.extra,
                            [codice]: { ...item, quantita: next },
                        },
                    };
                }),

            toggleExtra: (codice, titolo, prezzo) =>
                set((s) => {
                    const current = s.extra[codice]?.quantita ?? 0;

                    // se esiste (quantita > 0) => rimuovi
                    if (current > 0) {
                        const { [codice]: _removed, ...rest } = s.extra;
                        return { extra: rest };
                    }

                    // altrimenti aggiungi con quantita 1
                    return {
                        extra: {
                            ...s.extra,
                            [codice]: { titolo, prezzo, quantita: 1 },
                        },
                    };
                }),


            // conducente
            setConducente: (patch) =>
                set((s) => ({ conducente: { ...s.conducente, ...patch } })),

            // pagamento
            setTermini: (value) =>
                set((s) => ({ pagamento: { ...s.pagamento, terminiAccettati: value } })),

            setTokenCarta: (token) =>
                set((s) => ({ pagamento: { ...s.pagamento, tokenCarta: token } })),


            getTotale: () => {
                const s = get();

                const base = s.tariffa?.prezzoTotale ?? 0;
                const protezioniTot = s.protezioni?.prezzoTotale ?? 0;

                const extraTot = Object.values(s.extra ?? {}).reduce((acc, item) => {
                    const prezzo = Number(item.prezzo) || 0;
                    const qta = Number(item.quantita) || 0;
                    return acc + prezzo * qta;
                }, 0);

                return base + protezioniTot + extraTot;
            },


            // reset
            resetCheckout: () => set({ ...initialCheckoutState }),
            setPacchettoConPrezzo: (pacchetto, prezzoGiorno, prezzoTotale) =>
                set((s) => ({
                    protezioni: {
                        ...s.protezioni,
                        pacchetto,
                        prezzoGiorno,
                        prezzoTotale,
                    },
                })),

        }),
        {
            name: "checkout-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
