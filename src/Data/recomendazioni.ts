import { prodottiDisponibili } from "@/Data/Prodotti"

type FormValues = {
  guidaLavaggio: string
  porosita: string
  sts: string
  spessoreDensita: string
  personalitaRicci: string
  problemaPrincipale: string
  obiettivoDesiderato: string
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

function getLavaggio(values: FormValues): string {
  const lavaggioFrequente =
    values.guidaLavaggio === "dopo-1-giorno" ||
    values.guidaLavaggio === "dopo-2-3-giorni"

  const lavaggioDistante =
    values.guidaLavaggio === "dopo-4-5-giorni" ||
    values.guidaLavaggio === "una-settimana"

  const capelliFini =
    values.spessoreDensita === "fini-pochi" ||
    values.spessoreDensita === "fini-tanti"

  const stsStress =
    values.sts === "stress-ormonali" ||
    values.sts === "cuffie-casco-legati"

  if (capelliFini && stsStress) {
    return "Kit Lavaggio Riccia BASE"
  }

  if (lavaggioDistante) {
    return "RICCI PERFETTI"
  }

  if (lavaggioFrequente) {
    return "Kit Lavaggio Riccia BASE"
  }

  return "Kit Lavaggio Riccia BASE"
}

function getStyling(values: FormValues): string | null {
  const capelliFini =
    values.spessoreDensita === "fini-pochi" ||
    values.spessoreDensita === "fini-tanti"

  const capelliMedi = values.spessoreDensita === "medi-normali"

  const serveVolume =
    capelliFini ||
    capelliMedi ||
    values.problemaPrincipale === "poco-volume" ||
    values.obiettivoDesiderato === "piu-voluminosi"

  if (serveVolume) {
    return "Kit Volume WOW"
  }

  return null
}

function getTrattamento(values: FormValues): string {
  const capelliFini =
    values.spessoreDensita === "fini-pochi" ||
    values.spessoreDensita === "fini-tanti"

  const capelliMedi = values.spessoreDensita === "medi-normali"

  const capelliGrossi =
    values.spessoreDensita === "grossi-voluminosi" ||
    values.spessoreDensita === "tantissimi-difficili"

  const stsChimico = values.sts === "colore-decolorazione-stiraggio"
  const stsStress = values.sts === "stress-ormonali"
  const stsFarmaci = values.sts === "terapie-farmaci"
  const stsMeccanico = values.sts === "cuffie-casco-legati"
  const stsNessuno = values.sts === "nessuna"

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
  if (stsStress || stsFarmaci || stsMeccanico) return "Kit Riparazione"

  return "Kit Idratazione profonda"
}

export function generaRutina(values: FormValues): { testo: string; prodotti: Prodotto[] } {
  const prodotti: Prodotto[] = []

  const lavaggio = getLavaggio(values)
  const styling = getStyling(values)
  const trattamento = getTrattamento(values)

  addUnique(prodotti, lavaggio)

  if (styling) {
    addUnique(prodotti, styling)
  }

  addUnique(prodotti, trattamento)

  const passi: string[] = []

  passi.push(`Lavaggio consigliato: ${lavaggio}.`)

  if (styling) {
    passi.push(`Styling consigliato: ${styling}.`)
  }

  passi.push(`Trattamento consigliato: ${trattamento}.`)

  const testo =
    `La tua routine personalizzata, ${values.nome}\n- ` + passi.join("\n- ")

  return { testo, prodotti }
}