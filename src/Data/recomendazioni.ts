import { prodottiDisponibili } from "@/Data/Prodotti"

type FormValues = {
  guidaLavaggio: string
  porosita: string
  sts: string[]
  spessoreDensita: string
  personalitaRicci: string
  problemaPrincipale: string
  obiettivoDesiderato: string
  nome: string
  email: string
  newsletterConsent?: boolean
}

type Prodotto = typeof prodottiDisponibili[number]

function getProdotto(nome: string): Prodotto | undefined {
  return prodottiDisponibili.find(p => p.nome === nome)
}

function addUnique(arr: Prodotto[], ...nomi: Array<string | undefined>) {
  for (const nome of nomi) {
    if (!nome) continue

    const p = getProdotto(nome)
    if (p && !arr.find(x => x.nome === nome)) arr.push(p)
  }
}

function getLavaggio(values: FormValues): { prodotto: string; testo: string } {
  const chiave = `${values.spessoreDensita}|${values.guidaLavaggio}|${values.personalitaRicci}`
  const prodotti: Record<string, string> = {
    "fini|massimo-una-volta|onde": "Kit Lavaggio base",
    "fini|massimo-una-volta|ricci-spirale": "Kit Lavaggio base",
    "fini|massimo-una-volta|ricci-ribelli": "Kit Lavaggio base",
    "fini|massimo-una-volta|ricci-stretti-afro": "Kit Lavaggio base",
    "fini|massimo-una-volta|ricci-s": "Kit Lavaggio base",
    "fini|piu-volte|onde": "Kit Lavaggio Riccia",
    "fini|piu-volte|ricci-spirale": "Kit Lavaggio Riccia",
    "fini|piu-volte|ricci-ribelli": "Kit Lavaggio base",
    "fini|piu-volte|ricci-stretti-afro": "Kit Lavaggio base",
    "fini|piu-volte|ricci-s": "Kit Lavaggio base",
    "spessi|massimo-una-volta|onde": "Kit Lavaggio base",
    "spessi|massimo-una-volta|ricci-spirale": "Kit Lavaggio base",
    "spessi|massimo-una-volta|ricci-ribelli": "Kit Ricci Perfetti",
    "spessi|massimo-una-volta|ricci-stretti-afro": "Kit Ricci Perfetti",
    "spessi|massimo-una-volta|ricci-s": "Kit Lavaggio base",
    "spessi|piu-volte|onde": "Kit Lavaggio Riccia",
    "spessi|piu-volte|ricci-spirale": "Kit Lavaggio Riccia",
    "spessi|piu-volte|ricci-ribelli": "Kit Ricci Perfetti",
    "spessi|piu-volte|ricci-stretti-afro": "Kit Ricci Perfetti",
    "spessi|piu-volte|ricci-s": "Kit Lavaggio base",
  }
  const prodotto = prodotti[chiave] ?? "Kit Lavaggio base"
  return { prodotto, testo: prodotto }
}

function getStyling(values: FormValues): string | undefined {
  const stylingConVolume =
    values.spessoreDensita === "fini"

  return stylingConVolume ? "Kit Volume WOW" : undefined
}

function getTrattamento(values: FormValues): string {
  const capelliFini = values.spessoreDensita === "fini"
  const capelliGrossi = values.spessoreDensita === "spessi"

  const stsChimico = values.sts.includes("colore-decolorazione-stiraggio")
  const stsFarmaci = values.sts.includes("terapie-farmaci")
  const stsMeccanico = values.sts.includes("cuffie-casco-legati")
  const stsNessuno = values.sts.includes("nessuna")

  const lavaggioDistante = values.guidaLavaggio === "massimo-una-volta"

  if (values.spessoreDensita === "spessi" && stsNessuno) {
    return "Trattamento Riparazione Lipidica"
  }

  if (capelliFini) {
    return "Riparazione Proteica"
  }

  if (capelliGrossi) {
    if (stsNessuno && lavaggioDistante) return "Trattamento Idratante"
    if (stsNessuno) return "Kit Trattamenti"

    if (lavaggioDistante) return "Kit Idratazione profonda"
    return "Kit Trattamenti"
  }

  if (stsChimico) return "Riparazione Proteica"
  if (stsFarmaci || stsMeccanico) return "Kit Riparazione"

  return "Kit Idratazione profonda"
}

function getConsiglioTrattamento(values: FormValues): string | undefined {
  const { spessoreDensita, sts } = values
  if (spessoreDensita === "spessi" && sts.includes("nessuna")) {
    return "Quando i ricci tendono a essere più corposi, hanno bisogno di mantenere il giusto equilibrio tra forza e idratazione. Ti consiglio di alternare un impacco pre-shampoo con balsamo e qualche goccia di olio, in questo modo i ricci rimarranno più morbidi, elastici e luminosi, senza perdere definizione."
  }
  if (spessoreDensita === "fini" && sts.includes("colore-decolorazione-stiraggio")) {
    return "I tuoi ricci hanno bisogno di più struttura per mantenere volume e definizione nel tempo. Per questo ti consiglio un trattamento proteico: aiuta a rinforzare il capello senza appesantirlo, così lo styling dura più a lungo e i ricci risultano più corposi e resistenti."
  }
  if (spessoreDensita === "fini" && sts.includes("nessuna")) {
    return "Anche quando i capelli sono numerosi, se la fibra è sottile può perdere facilmente sostegno. Un trattamento proteico aiuta a rinforzare la struttura del capello, migliorando la tenuta dello styling e lasciando i ricci più definiti e voluminosi."
  }

  return undefined
}

function getConsiglioSTS(values: FormValues): string | undefined {
  const consigli: Record<string, string> = {
    "colore-decolorazione-stiraggio":
      "Se hai colorato o decolorato i capelli, è normale che in questo periodo i tuoi ricci si comportino in modo diverso. Non significa che resteranno così per sempre. Adatta la routine a quello che stanno vivendo oggi e inizia dalla routine che ti ho appena consigliato.",
    "caduta-stress-ormoni":
      "Lo stress, gli ormoni o un periodo particolare della vita possono cambiare temporaneamente anche i tuoi ricci. Non cercare di combatterli: ascoltali. In questo momento hanno bisogno di attenzioni diverse, così come te, e va bene così. Quando questa fase passerà, cambieranno ancora, ma tu saprai come gestirli seguendo la routine che ti ho appena consigliato.",
    "terapie-farmaci":
      "Alcune terapie possono rendere i capelli diversi da come li hai sempre conosciuti. Se oggi sono più secchi, fragili o meno definiti non significa che hai sbagliato qualcosa. Semplicemente i tuoi ricci ti stanno chiedendo cure diverse. Tu continua ad ascoltarli, senza pretendere la perfezione, e segui la routine che ti ho appena consigliato.",
    "cuffie-casco-legati":
      "Se usi spesso casco, cuffie o tieni i capelli legati, è normale che lo styling duri meno o che i ricci si schiaccino più facilmente. Non viverlo come un problema: basta qualche accorgimento nella routine e torneranno a prendere forma molto più facilmente, per esempio rinfrescandoli con una mousse. Per mantenerli sani, segui la routine che ti ho appena consigliato.",
    nessuna:
      "In questo momento i tuoi ricci non stanno affrontando cambiamenti particolari, ed è un ottimo punto di partenza. Continua a prendertene cura con costanza seguendo la routine che ti ho appena consigliato, ma senza l'ansia di dover fare tutto alla perfezione. Anche una routine semplice, se fatta con continuità, può fare una grande differenza.",
  }

  const selezionati = values.sts
    .map(value => consigli[value])
    .filter((consiglio): consiglio is string => Boolean(consiglio))

  return selezionati.length
    ? selezionati.map((consiglio, index) => `${index + 1}. ${consiglio}`).join("\n\n")
    : undefined
}

function getConsiglioStyling(values: FormValues): string | undefined {
  const { spessoreDensita } = values
  return spessoreDensita === "fini"
    ? "I capelli fini si appesantiscono facilmente e perdono volume velocemente. Scegli prodotti styling leggeri, come leave-in spray e gel, e applicali in piccole quantità."
    : "I capelli spessi hanno bisogno di prodotti più corposi. Applica la crema dividendo i capelli in 3 grandi sezioni e completa lo styling con il gel."
}

function getConsiglioLavaggio(values: FormValues): string | undefined {
  const ricciConLavaggioLeggero = ["onde", "ricci-spirale", "ricci-s"].includes(values.personalitaRicci)
  const ricciConPiuIdratazione = ["ricci-ribelli", "ricci-stretti-afro"].includes(values.personalitaRicci)

  if (ricciConLavaggioLeggero) {
    const indicazioneSpessore = values.spessoreDensita === "fini"
      ? "Visto che hai i capelli sottili, applica il balsamo solo prima dello shampoo e non ripeterlo dopo il risciacquo: manterrai i ricci leggeri, voluminosi e definiti."
      : "Visto che hai i capelli spessi, distribuisci bene il balsamo sulle lunghezze e, dopo il risciacquo, applica un leave-in in crema per preparare i capelli allo styling."

    return `I tuoi ricci hanno bisogno di essere lavati frequentemente. Non è un problema: significa semplicemente che la tua cute produce più sebo o accumula più facilmente sudore e prodotti. Per questo ti consigliamo un lavaggio invertito con un solo passaggio di shampoo se lavi i capelli tutti i giorni; altrimenti applica lo shampoo due volte. ${indicazioneSpessore} Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.`
  }

  if (ricciConPiuIdratazione) {
    const indicazioneSpessore = values.spessoreDensita === "fini"
      ? "Hai i capelli sottili, quindi non utilizzare maschere o oli dopo il risciacquo."
      : "Hai i capelli spessi: dopo il risciacquo applica un leave-in in crema per preparare i capelli allo styling."

    return `I tuoi ricci mantengono la piega per diversi giorni, ma le lunghezze tendono ad aver bisogno di più idratazione. Per questo ti consigliamo il lavaggio invertito da asciutto, da ripetere dopo il primo risciacquo. ${indicazioneSpessore} Inoltre, la tua cute produce poco sebo: per questo i capelli possono apparire secchi prima ancora di sporcarsi. Ti consigliamo un lavaggio detox da asciutto ogni 15 giorni, seguito da un lavaggio invertito con due passaggi di shampoo. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.`
  }

  const chiave = `${values.spessoreDensita}|${values.guidaLavaggio}`

  const consigli: Record<string, string> = {
    "fini-pochi|dopo-1-giorno":
      "I tuoi ricci hanno bisogno di essere lavati frequentemente. Non è un problema: significa semplicemente che la tua cute produce più sebo o accumula più facilmente sudore e prodotti. Per questo ti consigliamo un lavaggio invertito con un solo passaggio di shampoo. Se hai i capelli sottili, applica il balsamo solo prima dello shampoo e non ripeterlo dopo il risciacquo: manterrai i ricci leggeri, voluminosi e definiti. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "fini-pochi|dopo-2-3-giorni":
      "La tua cute ha un buon equilibrio naturale, ma per mantenerla pulita senza alterare il benessere dei ricci è importante detergere correttamente. Ti consigliamo il lavaggio invertito con due passaggi di shampoo. Hai i capelli sottili, applica il balsamo solo prima dello shampoo ed evita balsamo o maschera dopo il risciacquo, così da non appesantire i ricci e preservarne il volume. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "fini-pochi|dopo-4-5-giorni":
      "I tuoi ricci mantengono la piega per diversi giorni, ma le lunghezze tendono ad aver bisogno di più idratazione. Per questo ti consigliamo il lavaggio invertito da asciutto, da ripetere dopo il primo risciacquo. Hai i capelli sottili, utilizza il balsamo solo nella fase pre-shampoo ed evita maschere o oli dopo il risciacquo. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "fini-pochi|una-settimana":
      "La tua cute produce poco sebo, per questo i capelli possono apparire secchi prima ancora di sporcarsi. Ti consigliamo un lavaggio detox da asciutto ogni 15 giorni, seguito da un lavaggio invertito con due passaggi di shampoo. Hai i capelli sottili, applica il balsamo solo prima dello shampoo ed evita balsamo o maschera dopo il risciacquo. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "fini-tanti|dopo-1-giorno":
      "I tuoi ricci hanno bisogno di essere lavati frequentemente. Non è un problema: significa semplicemente che la tua cute produce più sebo o accumula più facilmente sudore e prodotti. Per questo ti consigliamo un lavaggio invertito con un solo passaggio di shampoo. Se hai i capelli sottili, applica il balsamo solo prima dello shampoo e non ripeterlo dopo il risciacquo: manterrai i ricci leggeri, voluminosi e definiti. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "fini-tanti|dopo-2-3-giorni":
      "La tua cute ha un buon equilibrio naturale, ma per mantenerla pulita senza alterare il benessere dei ricci è importante detergere correttamente. Ti consigliamo il lavaggio invertito con due passaggi di shampoo. Hai i capelli sottili, applica il balsamo solo prima dello shampoo ed evita balsamo o maschera dopo il risciacquo, così da non appesantire i ricci e preservarne il volume. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "fini-tanti|dopo-4-5-giorni":
      "I tuoi ricci mantengono lo styling per diversi giorni, ma le lunghezze tendono ad aver bisogno di più idratazione. Per questo ti consigliamo il lavaggio invertito da asciutto, da ripetere dopo il primo risciacquo. Hai i capelli sottili, utilizza il balsamo solo nella fase pre-shampoo ed evita maschere o oli dopo il risciacquo. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "fini-tanti|una-settimana":
      "La tua cute produce poco sebo, per questo i capelli possono apparire secchi prima ancora di sporcarsi. Ti consigliamo un lavaggio detox da asciutto ogni 15 giorni, seguito da un lavaggio invertito con due passaggi di shampoo. Hai i capelli sottili, applica il balsamo solo prima dello shampoo ed evita balsamo o maschera dopo il risciacquo. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "medi-normali|dopo-1-giorno":
      "Se senti il bisogno di lavare i ricci ogni giorno, non c’è nulla di sbagliato. La tua cute ha semplicemente bisogno di una detersione più frequente. Nel tuo caso ti consiglio il lavaggio invertito con un solo passaggio di shampoo, così mantieni la cute pulita senza togliere morbidezza e leggerezza alle lunghezze.",
    "medi-normali|dopo-2-3-giorni":
      "La tua frequenza di lavaggio è abbastanza equilibrata. Per detergere bene la cute e mantenere i ricci morbidi, ti consiglio il lavaggio invertito con due passaggi di shampoo. Il primo aiuta a sciogliere sebo e residui, il secondo completa la pulizia e prepara i capelli allo styling.",
    "medi-normali|dopo-4-5-giorni":
      "Quando passano diversi giorni tra un lavaggio e l’altro, le lunghezze possono perdere morbidezza prima che la cute risulti davvero sporca. Ti consiglio quindi di iniziare con il lavaggio invertito da asciutto, proseguire con un altro passaggio di shampoo e applicare poi il trattamento indicato nella tua routine. In questo modo manterrai i ricci più elastici, luminosi e facili da gestire.",
    "medi-normali|una-settimana":
      "Se potresti arrivare anche a una settimana senza lavarli, la tua cute tende probabilmente a produrre poco sebo. Per evitare che i capelli diventino opachi o secchi, ti consiglio un lavaggio detox da asciutto ogni 15 giorni, seguito dal lavaggio invertito con due passaggi di shampoo e dal trattamento previsto nella tua routine. Così aiuterai i ricci a mantenere morbidezza, equilibrio e definizione più a lungo.",
    "grossi-voluminosi|dopo-1-giorno":
      "I tuoi ricci hanno bisogno di essere lavati frequentemente. Non è un problema: significa semplicemente che la tua cute produce più sebo o accumula più facilmente sudore e prodotti. Per questo ti consigliamo un lavaggio invertito con un solo passaggio di shampoo. Se hai i capelli sottili, applica il balsamo solo prima dello shampoo e non ripeterlo dopo il risciacquo: manterrai i ricci leggeri, voluminosi e definiti. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "grossi-voluminosi|dopo-2-3-giorni":
      "La tua cute ha un buon equilibrio naturale, ma per mantenerla pulita senza alterare il benessere dei ricci è importante detergere correttamente. Ti consigliamo il lavaggio invertito con due passaggi di shampoo. Hai i capelli sottili, applica il balsamo solo prima dello shampoo ed evita balsamo o maschera dopo il risciacquo, così da non appesantire i ricci e preservarne il volume. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "grossi-voluminosi|dopo-4-5-giorni":
      "I tuoi ricci mantengono lo styling per diversi giorni, ma le lunghezze tendono ad aver bisogno di più idratazione. Per questo ti consigliamo il lavaggio invertito da asciutto, da ripetere dopo il primo risciacquo. Hai i capelli sottili, utilizza il balsamo solo nella fase pre-shampoo ed evita maschere o oli dopo il risciacquo. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "grossi-voluminosi|una-settimana":
      "La tua cute produce poco sebo, quindi il nutrimento naturale fatica a raggiungere le lunghezze. Per questo ti consigliamo un lavaggio detox da asciutto ogni 15 giorni, seguito dal lavaggio invertito con due passaggi di shampoo. Completa sempre il lavaggio con il trattamento consigliato, così da mantenere i ricci morbidi, elastici e luminosi tra un lavaggio e l’altro. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "tantissimi-difficili|dopo-1-giorno":
      "Se i tuoi ricci chiedono di essere lavati ogni giorno, ascoltali. Non è la frequenza il problema, ma il modo in cui li lavi. Ti consiglio il lavaggio invertito con un solo passaggio di shampoo, così detergerai la cute senza togliere morbidezza alle lunghezze. È il modo migliore per mantenere i capelli puliti senza renderli ancora più difficili da gestire. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "tantissimi-difficili|dopo-2-3-giorni":
      "La tua cute ha trovato un buon ritmo di lavaggio. Per mantenere i ricci morbidi e definiti ti consiglio il lavaggio invertito con due passaggi di shampoo: il primo elimina sebo e residui, il secondo completa la detersione. Così la cute rimane pulita e le lunghezze ricevono tutto ciò di cui hanno bisogno. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "tantissimi-difficili|dopo-4-5-giorni":
      "Quando passano diversi giorni tra un lavaggio e l’altro, i capelli spessi tendono a perdere acqua prima ancora di sporcarsi. Per questo ti consiglio di iniziare con il lavaggio invertito da asciutto, proseguire con un altro da bagnato e concludere con il trattamento consigliato o direttamente lo styling. In questo modo i ricci rimarranno più morbidi, elastici e facili da gestire. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
    "tantissimi-difficili|una-settimana":
      "Se riesci a stare anche una settimana senza lavarli, probabilmente la tua cute produce poco sebo. Nei capelli spessi questo significa che le lunghezze ricevono ancora meno nutrimento naturale. Per questo ti consiglio un lavaggio detox da asciutto ogni 15 giorni, seguito dal lavaggio invertito con due passaggi di shampoo e dal trattamento consigliato, così da mantenere i ricci morbidi, luminosi e ben idratati. Per ottenere i migliori risultati, segui la modalità d’uso indicata nella scheda del prodotto in base allo spessore dei tuoi capelli. La frequenza di lavaggio non è un problema. Il segreto è come lavi i tuoi ricci.",
  }

  return consigli[chiave]
}

export function generaRutina(values: FormValues): {
  testo: string
  prodotti: Prodotto[]
  consiglio?: string
  consiglioStyling?: string
  consiglioLavaggio?: string
  consiglioSTS?: string
} {
  const prodotti: Prodotto[] = []

  const lavaggio = getLavaggio(values)
  const styling = getStyling(values)
  const trattamento = getTrattamento(values)
  const consiglio = getConsiglioTrattamento(values)
  const consiglioStyling = getConsiglioStyling(values)
  const consiglioLavaggio = getConsiglioLavaggio(values)
  const consiglioSTS = getConsiglioSTS(values)

  addUnique(prodotti, lavaggio.prodotto, styling, trattamento)

  const passi = [
    `Lavaggio: ${lavaggio.testo}`,
    styling ? `Styling: ${styling}` : undefined,
    `Trattamento: ${trattamento}`,
  ].filter((passo): passo is string => Boolean(passo))

  const testo =
    `LA TUA ROUTINE PERSONALIZZATA, ${values.nome}\n- ` + passi.join("\n- ")

  return {
    testo,
    prodotti,
    consiglio,
    consiglioStyling,
    consiglioLavaggio,
    consiglioSTS,
  }
}
