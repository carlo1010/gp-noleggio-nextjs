 const ACRISS_CATEGORY_MAP: Record<string, string> = {
    M: "Mini",
    E: "Economica",
    H: "Economica Elite",
    C: "Compatta",
    D: "Compatta Elite",
    I: "Intermedia",
    J: "Intermedia Elite",
    S: "Standard",
    R: "Standard Elite",
    F: "Fullsize",
    G: "Fullsize Elite",
    P: "Premium",
    U: "Premium Elite",
    L: "Lusso",
    W: "Lusso Elite",
    X: "Straordinaria",
} as const;

 const ACRISS_CARROZZERIA_MAP: Record<string, string> = {
    B: "Berlina 2 porte",
    L: "Gran Coupé 4 porte",
    W: "Station Wagon",
    D: "Berlina 4 porte",
    F: "SUV",
    T: "Cabriolet",
    E: "Coupé 2 porte",
    V: "Furgone",
    Z: "Veicolo a Sorpresa",
} as const;

 const ACRISS_CAMBIO_MAP: Record<string, string> = {
    M: "Manuale",
    A: "Automatico",
    D: "Trazione Integrale (Automatico)",
    "L*": "Veicoli di Lusso (Automatico)",
    "S*": "Auto Speciali (Automatico)",
} as const;

 const ACRISS_CARBURANTE_AC_MAP: Record<string, string> = {
    R: "Veicolo a Combustione",
    H: "Veicolo Ibrido Plug-in",
    E: "Veicolo Elettrico (Autonomia Ridotta)",
    C: "Veicolo Elettrico (Lunga Autonomia)",
    "V*": "Veicoli 5+2 Posti (a Combustione)",
    "P*": "Differenziatore aggiuntivo per auto di lusso",
    "Y*": "Differenziatore aggiuntivo per auto di lusso",
} as const;



export function GetAcriss(acriss: string) {

    const codiceacriss = acriss.slice(-4);
    console.log(acriss);
    // codici 1-2-3-4
    const lettera4 = codiceacriss.substring(0,1);
    const lettera3 = codiceacriss.substring(1,2);
    const lettera2 = codiceacriss.substring(2,3);
    const lettera1 = codiceacriss.substring(3,4);



     console.log(lettera4);
     console.log(lettera3);
     console.log(lettera2);
     console.log(lettera1);

     return{
         cambio: ACRISS_CAMBIO_MAP[lettera2],
         carburante: ACRISS_CARBURANTE_AC_MAP[lettera1],
         carrozzeria: ACRISS_CARROZZERIA_MAP[lettera3],
         categoria: ACRISS_CATEGORY_MAP[lettera4],
     }
}