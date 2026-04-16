import { prodottiDisponibili } from "@/Data/Prodotti"

type FormValues = {
  cuoioCapelluto: string
  spessoreCapello: string
  porosita: string
  sts: string
  densita: string
  personalitaRicci: string
  nome: string
  email: string
}

type Prodotto = typeof prodottiDisponibili[number]

function getProdotto(nome: string): Prodotto | undefined {
  return prodottiDisponibili.find(p => p.nome === nome)
}

function addUnique(arr: Prodotto[], ...nomi: string[]) {
  for (const nome of nomi) {
    const p = getProdotto(nome)
    if (p && !arr.find(x => x.nome === nome)) arr.push(p)
  }
}

export function generaRutina(values: FormValues): { testo: string; prodotti: Prodotto[] } {
  const prodotti: Prodotto[] = []
  const passi: string[] = []

  // ── 1. DETERGENZA (sempre presente) ──────────────────────────────────────
  if (values.cuoioCapelluto === "unto" || values.cuoioCapelluto === "giorni-dopo") {
    passi.push("Inizia con lo Scrub Detossinante una volta a settimana per purificare la cute, poi lava con lo Shampoo Riccia per rimuovere i residui senza aggredire il capello.")
    addUnique(prodotti, "Scrub Detossinante", "Shampoo Riccia")
  } else if (values.cuoioCapelluto === "rimane-secco") {
    passi.push("Lava i capelli ogni 7–10 giorni con lo Shampoo Riccia, massaggiando con i polpastrelli senza sfregare per non irritare la cute secca.")
    addUnique(prodotti, "Shampoo Riccia")
  } else {
    // "normale" o qualsiasi altro valore
    passi.push("Lava i capelli ogni 5–7 giorni con lo Shampoo Riccia per mantenere la cute in equilibrio.")
    addUnique(prodotti, "Shampoo Riccia")
  }

  // ── 2. IDRATAZIONE (sempre presente, varia per porosità) ──────────────────
  if (values.porosita === "assorbono") {
    // Alta porosità: ha bisogno di prodotti ricchi e frequenti
    passi.push("Applica il Balsamo Riccia su ogni lavaggio (3–5 min) per sigillare l'umidità. Una volta a settimana sostituiscilo con la Crema 3 in 1 come maschera profonda.")
    addUnique(prodotti, "Balsamo Riccia", "Crema 3 in 1 250ml")
  } else if (values.porosita === "rimane-sulla") {
    // Bassa porosità: la cuticola è chiusa, serve calore
    passi.push("Usa il Balsamo Riccia su capelli ancora gocciolanti, poi avvolgi i capelli in una t-shirt o cuffia termica per 5 minuti: il calore apre le cuticole e permette al prodotto di penetrare.")
    addUnique(prodotti, "Balsamo Riccia")
  } else {
    // Porosità media
    passi.push("Applica il Balsamo Riccia su ogni lavaggio per 2–3 minuti, poi risciacqua. È sufficiente per mantenere i capelli morbidi e idratati.")
    addUnique(prodotti, "Balsamo Riccia")
  }

  // ── 3. LEAVE-IN (capelli fini o poco densi) ──────────────────────────────
  const capelloFine = values.spessoreCapello === "sottile"
  const densitaBassa = values.densita === "pochi"
  const densitaNormale = values.densita === "normali"

  if (capelloFine || densitaBassa) {
    passi.push("Distribuisci il Leave-in Riccia su capelli bagnati prima dello styling: è la formula più leggera, perfetta per non appesantire i capelli fini o radi.")
    addUnique(prodotti, "Leave-in Riccia")
  } else if (densitaNormale && values.spessoreCapello === "medio") {
    passi.push("Puoi usare il Leave-in Riccia oppure una piccola quantità di Balsamo Riccia come leave-in: entrambi funzionano da base per lo styling.")
    addUnique(prodotti, "Leave-in Riccia")
  }
  // capelli grossi/densi → il balsamo già inserito è sufficiente come base

  // ── 4. STYLING (sempre presente) ──────────────────────────────────────────
  if (values.personalitaRicci === "definiti" || values.personalitaRicci === "carattere") {
    passi.push("Definisci ciocca per ciocca con il Gel Modellante su capelli bagnati (tecnica praying hands): tenuta anti-crespo duratura e ricci ben delineati.")
    addUnique(prodotti, "Gel Modellante 250 ml")
  } else if (values.personalitaRicci === "coerenti") {
    passi.push("Usa la Crema 3 in 1 come styler: definisce senza irrigidire, ideale per ricci che tendono a gonfiarsi. Scrunch generoso su capelli bagnati.")
    addUnique(prodotti, "Crema 3 in 1 250ml")
  } else if (values.personalitaRicci === "mossi") {
    // mossi/quasi lisci → gel leggero per definire le onde
    passi.push("Applica il Gel Modellante su capelli bagnati a onde per esaltare la forma naturale e bloccare il crespo senza appesantire.")
    addUnique(prodotti, "Gel Modellante 250 ml")
  } else {
    // fallback
    passi.push("Definisci con il Gel Modellante su capelli bagnati per tenuta e anti-crespo.")
    addUnique(prodotti, "Gel Modellante 250 ml")
  }

  // ── 5. TRATTAMENTO EXTRA (STS) ────────────────────────────────────────────
  if (values.sts === "cambi-capigliatura") {
    passi.push("I capelli trattati chimicamente hanno bisogno di cure intensive: usa il KIT I MIEI SUPERPOTERI una volta a settimana per riparare la struttura e restituire elasticità.")
    addUnique(prodotti, "KIT I MIEI SUPERPOTERI")
  } else if (values.sts === "stress") {
    passi.push("Lo stress può indebolire il capello: aggiungi una maschera settimanale con la Crema 3 in 1 per rinforzare e ripristinare la vitalità dei ricci.")
    addUnique(prodotti, "Crema 3 in 1 250ml")
  } else if (values.sts === "routine") {
    passi.push("Se hai già una routine ma non vedi risultati, prova ad aggiungere lo Scrub Detossinante una volta al mese: rimuove i residui di prodotto che possono bloccare i progressi.")
    addUnique(prodotti, "Scrub Detossinante")
  } else if (values.sts === "cura-nulla") {
    passi.push("Per chi inizia da zero: il KIT I MIEI SUPERPOTERI è il punto di partenza ideale, con tutto ciò che serve per le prime settimane di routine.")
    addUnique(prodotti, "KIT I MIEI SUPERPOTERI")
  }
  // "nessuno" → nessun step extra, va bene così

  // ── Garanzia minima: almeno 2 prodotti sempre presenti ────────────────────
  if (prodotti.length < 2) {
    addUnique(prodotti, "Balsamo Riccia", "Shampoo Riccia")
  }

  const testo =
    `La tua routine personalizzata, ${values.nome}\n- ` + passi.join("\n- ")

  return { testo, prodotti }
}