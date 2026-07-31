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
  const lavaggioDistante =
    values.guidaLavaggio === "dopo-4-5-giorni" ||
    values.guidaLavaggio === "una-settimana"

  if (lavaggioDistante) {
    return {
      prodotto: "Kit Ricci Perfetti",
      testo: "Lavaggio invertito con kit Ricci Perfetti",
    }
  }

  return {
    prodotto: "Lavaggio invertito + scrub",
    testo: "Lavaggio invertito con Kit Lavaggio Riccia + scrub",
  }
}

function getStyling(values: FormValues): string | undefined {
  const stylingConVolume =
    values.spessoreDensita === "fini-pochi" ||
    values.spessoreDensita === "fini-tanti" ||
    values.spessoreDensita === "medi-normali"

  return stylingConVolume ? "Kit Volume WOW" : undefined
}

function getTrattamento(values: FormValues): string {
  const capelliFini =
    values.spessoreDensita === "fini-pochi" ||
    values.spessoreDensita === "fini-tanti"

  const capelliMedi = values.spessoreDensita === "medi-normali"

  const capelliGrossi =
    values.spessoreDensita === "grossi-voluminosi" ||
    values.spessoreDensita === "tantissimi-difficili"

  const stsChimico = values.sts.includes("colore-decolorazione-stiraggio")
  const stsFarmaci = values.sts.includes("terapie-farmaci")
  const stsMeccanico = values.sts.includes("cuffie-casco-legati")
  const stsNessuno = values.sts.includes("nessuna")

  const lavaggioDistante =
    values.guidaLavaggio === "dopo-4-5-giorni" ||
    values.guidaLavaggio === "una-settimana"

  if (capelliFini) {
    return "Riparazione Proteica"
  }

  if (capelliGrossi) {
    if (stsNessuno && lavaggioDistante) return "Trattamento Idratante"
    if (stsNessuno) return "Kit Trattamenti"

    if (values.spessoreDensita === "grossi-voluminosi") {
      return "Kit Idratazione profonda"
    }

    if (values.spessoreDensita === "tantissimi-difficili") {
      if (lavaggioDistante) return "Kit Idratazione profonda"
      return "Kit Trattamenti"
    }
  }

  if (capelliMedi) {
    if (stsChimico) return "Kit Trattamenti"
    return "Kit Idratazione profonda"
  }

  if (stsChimico) return "Riparazione Proteica"
  if (stsFarmaci || stsMeccanico) return "Kit Riparazione"

  return "Kit Idratazione profonda"
}

function getConsiglioTrattamento(values: FormValues): string | undefined {
  const { spessoreDensita, sts } = values

  if (spessoreDensita === "tantissimi-difficili" && sts.includes("nessuna")) {
    return "Quando i ricci tendono a essere più ruvidi, rigidi o fanno fatica a trattenere l'idratazione, hanno bisogno di costanza più che di grandi quantità di prodotto. Alterna un impacco pre-shampoo con balsamo e qualche goccia di olio: aiuterai i capelli a ritrovare morbidezza, elasticità e saranno molto più facili da gestire."
  }

  if (
    spessoreDensita === "medi-normali" &&
    sts.includes("colore-decolorazione-stiraggio")
  ) {
    return "L’equilibrio dei tuoi ricci devi cercare di mantenerlo nel tempo. Un trattamento proteico periodico aiuta a rinforzare la fibra del capello, mantenendo i ricci elastici, definiti e pronti a sostenere meglio lo styling."
  }

  if (spessoreDensita === "grossi-voluminosi" && sts.includes("nessuna")) {
    return "Quando i ricci tendono a essere più corposi, hanno bisogno di mantenere il giusto equilibrio tra forza e idratazione. Ti consiglio di alternare un impacco pre-shampoo con balsamo e qualche goccia di olio, in questo modo i ricci rimarranno più morbidi, elastici e luminosi, senza perdere definizione."
  }

  if (
    spessoreDensita === "fini-pochi" &&
    sts.includes("colore-decolorazione-stiraggio")
  ) {
    return "I tuoi ricci hanno bisogno di più struttura per mantenere volume e definizione nel tempo. Per questo ti consiglio un trattamento proteico: aiuta a rinforzare il capello senza appesantirlo, così lo styling dura più a lungo e i ricci risultano più corposi e resistenti."
  }

  if (spessoreDensita === "fini-tanti" && sts.includes("nessuna")) {
    return "Anche quando i capelli sono numerosi, se la fibra è sottile può perdere facilmente sostegno. Un trattamento proteico aiuta a rinforzare la struttura del capello, migliorando la tenuta dello styling e lasciando i ricci più definiti e voluminosi."
  }

  return undefined
}

function getConsiglioStyling(values: FormValues): string | undefined {
  const { spessoreDensita } = values

  if (spessoreDensita === "fini-pochi" || spessoreDensita === "fini-tanti") {
    return "Se hai pochi capelli e sono anche fini, la tentazione è quella di usare tanto prodotto per cercare più definizione. In realtà succede l’opposto: più li appesantisci, più perdono volume. Per questo ti consiglio il Kit Volume, pensato per dare ai tuoi ricci idratazione, sostegno e definizione senza appesantirli. Con i giusti prodotti e la corretta tecnica di styling potrai ottenere ricci più pieni, ariosi e con un volume che dura più a lungo."
  }

  if (spessoreDensita === "grossi-voluminosi") {
    return "Con tanti capelli è facilissimo che qualche ciocca rimanga senza prodotto. Per evitarlo, dividi i capelli in 3 grandi sezioni e applica la tua crema di styling preferita su una sezione alla volta. Una volta finito, modella e applica il gel facendo lo scrunch. Bastano pochi minuti in più per avere una definizione molto più uniforme."
  }

  if (spessoreDensita === "medi-normali") {
    return "Con i tuoi ricci non serve complicare lo styling. Applica la tua crema di styling preferita in modo uniforme su tutti i capelli, modellando bene i ricci. Solo alla fine applica il gel facendo lo scrunch: ti aiuterà a mantenere la definizione più a lungo senza appesantire."
  }

  if (spessoreDensita === "tantissimi-difficili") {
    return "Se i tuoi ricci ti sembrano difficili da gestire, il problema spesso non è il prodotto, ma come lo applichi. Lavora i capelli per sezioni, minimo 3 e applica prima la tua crema styling preferita e modella bene ogni parte, meglio per sezioni spruzzando acqua. Poi applica il gel sempre per sezioni se vuoi controllare il crespo, così avrai molto più controllo durante lo styling e una definizione più omogenea, con un volume che arriva gradualmente."
  }

  return undefined
}

function getConsiglioLavaggio(values: FormValues): string | undefined {
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
} {
  const prodotti: Prodotto[] = []

  const lavaggio = getLavaggio(values)
  const styling = getStyling(values)
  const trattamento = getTrattamento(values)
  const consiglio = getConsiglioTrattamento(values)
  const consiglioStyling = getConsiglioStyling(values)
  const consiglioLavaggio = getConsiglioLavaggio(values)

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
  }
}
