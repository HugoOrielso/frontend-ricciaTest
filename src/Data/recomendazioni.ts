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
  newsletterConsent?: boolean
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

function getStyling(): string {
  return "Kit Volume WOW"
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
  if (stsFarmaci || stsMeccanico) return "Kit Riparazione"

  return "Kit Idratazione profonda"
}

export function generaRutina(values: FormValues): { testo: string; prodotti: Prodotto[] } {
  const prodotti: Prodotto[] = []

  const lavaggio = getLavaggio(values)
  const styling = getStyling()
  const trattamento = getTrattamento(values)

  addUnique(prodotti, lavaggio.prodotto, styling, trattamento)

  const passi = [
    `Lavaggio: ${lavaggio.testo}`,
    `Styling: ${styling}`,
    `Trattamento: ${trattamento}`,
  ]

  const testo =
    `LA TUA ROUTINE PERSONALIZZATA, ${values.nome}\n- ` + passi.join("\n- ")

  return { testo, prodotti }
}
