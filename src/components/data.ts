export const domandeCMR = [
  {
    id: "guidaLavaggio",
    titolo: "1. Quante volte lavi i capelli in una settimana?",
    descrizione: "",
    opzioni: [
      { id: "massimo-una-volta", value: "massimo-una-volta", label: "Al massimo una volta a settimana" },
      { id: "piu-volte", value: "piu-volte", label: "Più volte a settimana" },
    ],
  },
  {
    id: "porosita",
    titolo: "2. Quando applichi balsamo o maschera, i tuoi capelli...",
    descrizione: "",
    opzioni: [
      { id: "assorbono-secchi-crespi", value: "assorbono-secchi-crespi", label: "Assorbono subito tutto ma restano comunque secchi o crespi" },
      { id: "tanto-prodotto", value: "tanto-prodotto", label: "Prima di diventare morbidi, metto tanto prodotto" },
      { id: "effetto-cartone", value: "effetto-cartone", label: `Appena li bagno sembrano duri, effetto "cartone"` },
      { id: "subito-morbidi-setosi", value: "subito-morbidi-setosi", label: "Con poco prodotto diventano subito morbidi e setosi" },
    ],
  },
  {
    id: "sts",
    titolo: "3. Negli ultimi 12 mesi hai vissuto una di queste situazioni?",
    descrizione: "",
    opzioni: [
      { id: "colore-decolorazione-stiraggio", value: "colore-decolorazione-stiraggio", label: "Colore, decolorazione o stiraggio" },
      { id: "caduta-stress-ormoni", value: "caduta-stress-ormoni", label: "Caduta, stress o cambiamenti ormonali" },
      { id: "terapie-farmaci", value: "terapie-farmaci", label: "Terapie/farmaci importanti" },
      { id: "cuffie-casco-legati", value: "cuffie-casco-legati", label: "Uso spesso cuffie/casco/capelli legati" },
      { id: "nessuna", value: "nessuna", label: "Nessuna di queste" },
    ],
  },
  {
    id: "spessoreDensita",
    titolo: "4. Paragonando i tuoi capelli a un filo di cotone sono più spessi o più fini rispetto al filo?",
    descrizione: "",
    opzioni: [
      { id: "fini", value: "fini", label: "Fini" },
      { id: "spessi", value: "spessi", label: "Spessi" },
    ],
  },
  {
    id: "personalitaRicci",
    titolo: "5. I tuoi ricci senza styling assomigliano di più a...",
    descrizione: "",
    opzioni: [
      { id: "onde", value: "onde", label: "Onde" },
      { id: "ricci-spirale", value: "ricci-spirale", label: "Ricci a spirale" },
      { id: "ricci-ribelli", value: "ricci-ribelli", label: "Ricci irregolari e ribelli" },
      { id: "ricci-stretti-afro", value: "ricci-stretti-afro", label: "Ricci molto stretti o afro" },
      { id: "ricci-s", value: "ricci-s", label: "Ricci a S" },
    ],
  },
  {
    id: "problemaPrincipale",
    titolo: "6. Qual è la cosa che ti frustra di più dei tuoi ricci?",
    descrizione: "",
    opzioni: [
      { id: "crespo", value: "crespo", label: "Crespo" },
      { id: "poco-volume", value: "poco-volume", label: "Poco volume" },
      { id: "secchezza", value: "secchezza", label: "Secchezza" },
      { id: "nodi-districare", value: "nodi-districare", label: "Nodi e difficoltà a districarli" },
      { id: "styling-dura-poco", value: "styling-dura-poco", label: "Styling che dura pochissimo" },
      { id: "cute-grassa-prurito", value: "cute-grassa-prurito", label: "Cute grassa/prurito" },
      { id: "non-capisco-cosa-usare", value: "non-capisco-cosa-usare", label: "Non capisco cosa usare" },
    ],
  },
  {
    id: "obiettivoDesiderato",
    titolo: "7. Come vorresti che fossero i tuoi ricci?",
    descrizione: "",
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
