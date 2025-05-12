export const domandeCMR = [
    {
        id: "cuoioCapelluto",
        titolo: "1. Oleosità del cuoio capelluto",
        descrizione: "Cosa succede al tuo cuoio capelluto dopo 2-3 giorni dal lavaggio?",
        opzioni: [
            { id: "rimane-secco", value: "rimane-secco", label: "Rimane secco, sento tensione e prurito" },
            { id: "normale", value: "normale", label: "È normale, non noto nulla di strano" },
            { id: "unto", value: "unto", label: "Si unge e inizia a pizzicare/prudere" },
            { id: "giorni-dopo", value: "giorni-dopo", label: "Dopo 1 giorno già grasso/unto" },
        ]
    },
    {
        id: "spessoreCapello",
        titolo: "2. Spessore del capello",
        descrizione: "Prendi un solo capello tra le dita. Come lo senti?",
        opzioni: [
            { id: "sottile", value: "sottile", label: "Sottile come un filo d'erba" },
            { id: "medio", value: "medio", label: "Medio, lo sento ma non troppo" },
            { id: "grosso", value: "grosso", label: "Grosso come un filo di nylon" },
        ]
    },
    {
        id: "porosita",
        titolo: "3. Porosità",
        descrizione: "Quando applichi il balsamo, come reagiscono i tuoi capelli?",
        opzioni: [
            { id: "assorbono", value: "assorbono", label: "Lo assorbono subito e sembrano asciutti" },
            { id: "ci-mettono", value: "ci-mettono", label: "Ci mettono un po' per diventare morbidi" },
            { id: "rimane-sulla", value: "rimane-sulla", label: "Rimane sulla 'superficie' e scivolano via" },
        ]
    },
    {
        id: "sts",
        titolo: "4. STS - Stile di vita, Trattamenti, Salute",
        descrizione: "Negli ultimi 3 mesi, quale di questi ti rappresenta di più?",
        opzioni: [
            { id: "cambi-capigliatura", value: "cambi-capigliatura", label: "Ho fatto cambi capigliatura (decolorazioni)" },
            { id: "stress", value: "stress", label: "Ho avuto stress ormonali, stress o caduta" },
            { id: "cura-nulla", value: "cura-nulla", label: "Non curo molto i miei ricci" },
            { id: "routine", value: "routine", label: "Ho una routine costante, ma non vedo risultati" },
            { id: "nessuno", value: "nessuno", label: "Nessuno di questi" },
        ]
    },
    {
        id: "densita",
        titolo: "5. Densità",
        descrizione: "Quando ti guardi allo specchio a capelli asciutti, pensi che i tuoi capelli siano...",
        opzioni: [
            { id: "pochi", value: "pochi", label: "Pochi, vedo spesso la cute" },
            { id: "normali", value: "normali", label: "Normali, la cute si vede poco" },
            { id: "tanti", value: "tanti", label: "Tanti, non si vede nulla e sembrano una nuvola" },
        ]
    },
    {
        id: "personalitaRicci",
        titolo: "6. Personalità dei ricci",
        descrizione: "Come si comportano i tuoi ricci nella vita reale?",
        opzioni: [
            { id: "carattere", value: "carattere", label: "Ogni riccio ha il suo carattere, fanno come vogliono" },
            { id: "coerenti", value: "coerenti", label: "Sono coerenti e ordinati, ma si gonfiano facilmente" },
            { id: "definiti", value: "definiti", label: "Molto definiti, ma tendono al crespo" },
            { id: "mossi", value: "mossi", label: "Mossi, quasi lisci" },
        ]
    }
]

export type DomandaID =
    | "cuoioCapelluto"
    | "spessoreCapello"
    | "porosita"
    | "sts"
    | "densita"
    | "personalitaRicci";

