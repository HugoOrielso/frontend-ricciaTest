export const domandeCMR = [
  {
    id: "guidaLavaggio",
    titolo: "1. Dopo quanti giorni senti il bisogno di lavare i tuoi ricci?",
    descrizione: "",
    opzioni: [
      { id: "dopo-1-giorno", value: "dopo-1-giorno", label: "Dopo 1 giorno" },
      { id: "dopo-2-3-giorni", value: "dopo-2-3-giorni", label: "Dopo 2-3 giorni" },
      { id: "dopo-4-5-giorni", value: "dopo-4-5-giorni", label: "Dopo 4-5 giorni" },
      { id: "una-settimana", value: "una-settimana", label: "Potrei stare anche una settimana" },
    ],
  },
  {
    id: "porosita",
    titolo: "2. Quando applichi balsamo o maschera, i tuoi capelli…",
    descrizione: "Porosità e bisogno delle lunghezze.",
    opzioni: [
      { id: "assorbono-secchi-crespi", value: "assorbono-secchi-crespi", label: "Assorbono subito tutto ma restano comunque secchi o crespi" },
      { id: "tanto-prodotto", value: "tanto-prodotto", label: "Devono assorbire tanto prodotto prima di diventare morbidi" },
      { id: "effetto-cartone", value: "effetto-cartone", label: "Appena li bagno sembrano duri, effetto “cartone”" },
      { id: "subito-morbidi-setosi", value: "subito-morbidi-setosi", label: "Con poco prodotto diventano subito morbidi e setosi" },
    ],
  },
  {
    id: "sts",
    titolo: "3. Negli ultimi 12 mesi hai vissuto una di queste situazioni?",
    descrizione: "STS semplificato: stile di vita, trattamenti e salute.",
    opzioni: [
      { id: "colore-decolorazione-stiraggio", value: "colore-decolorazione-stiraggio", label: "Colore, decolorazione o stiraggio" },
      { id: "terapie-farmaci", value: "terapie-farmaci", label: "Terapie/farmaci importanti" },
      { id: "cuffie-casco-legati", value: "cuffie-casco-legati", label: "Uso spesso cuffie/casco/capelli legati" },
      { id: "nessuna", value: "nessuna", label: "Nessuna di queste" },
    ],
  },
  {
    id: "spessoreDensita",
    titolo: "4. Come descriveresti i tuoi capelli nella vita reale?",
    descrizione: "Spessore e densità.",
    opzioni: [
      { id: "fini-pochi", value: "fini-pochi", label: "Fini e pochi" },
      { id: "fini-tanti", value: "fini-tanti", label: "Fini ma tanti" },
      { id: "medi-normali", value: "medi-normali", label: "Medi e normali" },
      { id: "grossi-voluminosi", value: "grossi-voluminosi", label: "Grossi e voluminosi" },
      { id: "tantissimi-difficili", value: "tantissimi-difficili", label: "Tantissimi e difficili da gestire" },
    ],
  },
  {
    id: "personalitaRicci",
    titolo: "5. I tuoi ricci senza styling assomigliano di più a…",
    descrizione: "Personalità del riccio.",
    opzioni: [
      { id: "onde-morbide", value: "onde-morbide", label: "Onde morbide" },
      { id: "ricci-definiti", value: "ricci-definiti", label: "Ricci definiti" },
      { id: "ricci-ribelli", value: "ricci-ribelli", label: "Ricci irregolari e “ribelli”" },
      { id: "ricci-stretti-afro", value: "ricci-stretti-afro", label: "Ricci molto stretti o afro" },
      { id: "mix-tutto", value: "mix-tutto", label: "Un mix di tutto 😂" },
    ],
  },
  {
    id: "problemaPrincipale",
    titolo: "6. Qual è la cosa che ti frustra di più dei tuoi ricci?",
    descrizione: "Problema principale.",
    opzioni: [
      { id: "crespo", value: "crespo", label: "Crespo" },
      { id: "poco-volume", value: "poco-volume", label: "Poco volume" },
      { id: "secchezza", value: "secchezza", label: "Secchezza" },
      { id: "nodi-districare", value: "nodi-districare", label: "Nodo e difficoltà a districarli" },
      { id: "styling-dura-poco", value: "styling-dura-poco", label: "Styling che dura pochissimo" },
      { id: "cute-grassa-prurito", value: "cute-grassa-prurito", label: "Cute grassa/prurito" },
      { id: "non-capisco-cosa-usare", value: "non-capisco-cosa-usare", label: "Non capisco cosa usare" },
    ],
  },
  {
    id: "obiettivoDesiderato",
    titolo: "7. Come vorresti che fossero i tuoi ricci?",
    descrizione: "Obiettivo desiderato.",
    opzioni: [
      { id: "piu-definiti", value: "piu-definiti", label: "Più definiti" },
      { id: "piu-voluminosi", value: "piu-voluminosi", label: "Più voluminosi" },
      { id: "piu-morbidi", value: "piu-morbidi", label: "Più morbidi" },
      { id: "piu-leggeri", value: "piu-leggeri", label: "Più leggeri" },
      { id: "piu-facili", value: "piu-facili", label: "Più facili da gestire" },
      { id: "piu-sani-forti", value: "piu-sani-forti", label: "Più sani e forti" },
    ],
  },
] as const

export type DomandaID =
  | "guidaLavaggio"
  | "porosita"
  | "sts"
  | "spessoreDensita"
  | "personalitaRicci"
  | "problemaPrincipale"
  | "obiettivoDesiderato"