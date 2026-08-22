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

type Styling = { prodotto: string; consiglio: string }

function getStyling(values: FormValues): Styling {
  const chiave = `${values.spessoreDensita}|${values.personalitaRicci}`
  const styling: Record<string, Styling> = {
    "fini|onde": {
      prodotto: "Kit Volume WOW",
      consiglio: "Con i tuoi ricci la parola d’ordine è leggerezza: non serve abbondare con i prodotti per ottenere più definizione, perché rischieresti di togliere proprio quel volume che vogliamo valorizzare. Per questo ti consiglio il Kit Volume. Spruzza il Leave-in, modella i ricci con le mani o con la spazzola e, alla fine, applica il gel facendo scrunch. Pochi prodotti, usati nel modo giusto, ti aiuteranno ad avere ricci definiti, ariosi e con più volume.",
    },
    "fini|ricci-spirale": {
      prodotto: "Kit Volume WOW",
      consiglio: "Con i tuoi ricci la quantità e la distribuzione del prodotto fanno davvero la differenza. Una struttura più corposa ha bisogno del giusto condizionamento per rimanere morbida e facile da modellare. Per questo ti consiglio il Kit Volume insieme alla tua crema styling preferita: spruzza il Leave-in, applica la crema dividendo i capelli in sezioni e aggiungi acqua quando serve. Poi modella i ricci con le mani o la spazzola e applica il gel per fissare la forma. Così avrai più controllo, morbidezza e definizione, facendo durare lo styling più a lungo.",
    },
    "fini|ricci-s": {
      prodotto: "Kit Volume WOW",
      consiglio: "Con i tuoi ricci la quantità e la distribuzione del prodotto fanno davvero la differenza. Una struttura più corposa ha bisogno del giusto condizionamento per rimanere morbida e facile da modellare. Per questo ti consiglio il Kit Volume insieme alla tua crema styling preferita: spruzza il Leave-in, applica la crema dividendo i capelli in sezioni e aggiungi acqua quando serve. Poi modella i ricci con le mani o la spazzola e applica il gel per fissare la forma. Così avrai più controllo, morbidezza e definizione, facendo durare lo styling più a lungo.",
    },
    "fini|ricci-stretti-afro": {
      prodotto: "Styling Gel",
      consiglio: "Con i tuoi ricci distribuire bene il prodotto fa davvero la differenza: quando i capelli sono tanti, è facile che alcune ciocche ne ricevano troppo e altre quasi niente. Dividili in 3 grandi sezioni e applica la tua crema styling una sezione alla volta, aggiungendo acqua quando serve. Poi modella con le mani e applica il gel su ciocche più piccole facendo raking. Termina con lo scrunch inverso per limitare il restringimento. Qualche minuto in più nello styling ti aiuterà ad avere ricci più uniformi, definiti e facili da gestire.",
    },
    "fini|ricci-ribelli": {
      prodotto: "Styling Gel",
      consiglio: "Qui il segreto non è usare più prodotto, ma farlo arrivare bene su tutti i ricci. Con una chioma così corposa, lavorare tutto insieme rischia di lasciarti alcune zone meno definite. Dividi i capelli in 3 grandi sezioni, applica la tua crema styling e aggiungi un po’ d’acqua quando senti che serve. Poi modella i ricci e distribuisci il gel su ciocche più piccole aiutandoti con la spazzola. Alla fine fai lo scrunch inverso per contrastare il restringimento. Così avrai più controllo, una definizione più omogenea e ricci meglio distribuiti su tutta la chioma.",
    },
    "spessi|ricci-spirale": {
      prodotto: "Styling Gel",
      consiglio: "Con una chioma corposa, la differenza la fa soprattutto come distribuisci i prodotti. Se lavori tutti i capelli insieme, è facile ritrovarti con alcune zone super definite e altre un po’ meno. Dividi i capelli in 3 grandi sezioni, applica la tua crema styling e aggiungi acqua quando serve. Poi lavora su ciocche più piccole, distribuisci bene il gel aiutandoti con la spazzola e termina con lo scrunch inverso per limitare il restringimento. Così avrai più controllo, ricci definiti in modo uniforme e uno styling molto più ordinato.",
    },
    "spessi|ricci-ribelli": {
      prodotto: "Styling Gel",
      consiglio: "Con una chioma corposa, la differenza la fa soprattutto come distribuisci i prodotti. Se lavori tutti i capelli insieme, è facile ritrovarti con alcune zone super definite e altre un po’ meno. Dividi i capelli in 3 grandi sezioni, applica la tua crema styling e aggiungi acqua quando serve. Poi lavora su ciocche più piccole, distribuisci bene il gel aiutandoti con la spazzola e termina con lo scrunch inverso per limitare il restringimento. Così avrai più controllo, ricci definiti in modo uniforme e uno styling molto più ordinato.",
    },
    "spessi|onde": {
      prodotto: "Kit Volume WOW",
      consiglio: "Se i tuoi ricci ti sembrano difficili da gestire, il problema spesso non è il prodotto, ma come lo applichi. Lavora i capelli per sezioni, minimo 3, e applica prima la tua crema styling preferita, modellando bene ogni parte e spruzzando acqua quando serve. Poi applica il gel sempre per sezioni se vuoi controllare il crespo. Così avrai molto più controllo durante lo styling e una definizione più omogenea, con un volume che arriva gradualmente.",
    },
    "spessi|ricci-s": {
      prodotto: "Kit Volume WOW",
      consiglio: "Se i tuoi ricci ti sembrano difficili da gestire, il problema spesso non è il prodotto, ma come lo applichi. Lavora i capelli per sezioni, minimo 3, e applica prima la tua crema styling preferita, modellando bene ogni parte e spruzzando acqua quando serve. Poi applica il gel sempre per sezioni se vuoi controllare il crespo. Così avrai molto più controllo durante lo styling e una definizione più omogenea, con un volume che arriva gradualmente.",
    },
    "spessi|ricci-stretti-afro": {
      prodotto: "Styling Gel",
      consiglio: "Per i tuoi ricci lavorare per sezioni ti cambia davvero lo styling. Hai tanti capelli e il prodotto deve arrivare bene ovunque, soprattutto nelle zone più interne. Dividi la chioma in 3 grandi sezioni, applica la tua crema styling una sezione alla volta e aggiungi acqua quando senti che serve. Poi passa a ciocche più piccole, modella con le mani e distribuisci il gel facendo raking. Alla fine fai lo scrunch inverso per aiutarti a controllare il restringimento. Così sarà più semplice ottenere ricci ben modellati, uniformi e definiti dalla radice alle punte.",
    },
  }

  return styling[chiave]
}

type Trattamento = { prodotti: string[]; consiglio: string }

const KIT_RECOVERY = "Kit Recovery – Balsamo + Booster Lipidico"

function getTrattamento(values: FormValues): Trattamento {
  const chiave = `${values.spessoreDensita}|${values.personalitaRicci}`
  const trattamenti: Record<string, Trattamento> = {
    "fini|ricci-s": {
      prodotti: ["Riparazione Proteica"],
      consiglio: "I tuoi ricci hanno bisogno di più struttura per mantenere volume e definizione nel tempo. Per questo ti consiglio la Riparazione Proteica, che aiuta a dare sostegno al capello senza appesantirlo. A maggior ragione se hai decolorato i capelli o hai notato dei cambiamenti negli ultimi 6 mesi: in questa fase un aiuto in più può fare davvero la differenza sulla tenuta dello styling.",
    },
    "fini|onde": {
      prodotti: ["Riparazione Proteica"],
      consiglio: "Quando il capello è sottile può perdere facilmente sostegno, anche quando i capelli sono tanti. La Riparazione Proteica aiuta a rinforzarne la struttura, migliorando elasticità, definizione e durata dello styling. Te la consiglio ancora di più se hai fatto una decolorazione o se negli ultimi 6 mesi hai visto cambiare i tuoi ricci.",
    },
    "fini|ricci-spirale": {
      prodotti: ["Riparazione Proteica"],
      consiglio: "Se i tuoi ricci sono morbidi ma fanno fatica a mantenere forma e definizione, potrebbe mancare un po’ di struttura. Qui entra in gioco la Riparazione Proteica: aiuta a dare più forza e sostegno al capello, senza caricarlo di prodotti pesanti. Se poi hai decolorato o i tuoi capelli sono cambiati negli ultimi 6 mesi, questo trattamento diventa ancora più importante nella tua routine.",
    },
    "fini|ricci-ribelli": {
      prodotti: [KIT_RECOVERY],
      consiglio: "Anche un capello sottile può avere bisogno di una parte più lipidica, soprattutto quando appare secco, crespo o poco luminoso. Il Kit Recovery con Balsamo + Olio ti permette di lavorare su questa esigenza prima ancora del lavaggio: applicalo da asciutto come pre-shampoo e lascialo agire non più di un’ora. In questo modo aiuti i ricci a ritrovare morbidezza ed elasticità, mantenendo però quella leggerezza di cui hanno bisogno.",
    },
    "fini|ricci-stretti-afro": {
      prodotti: [KIT_RECOVERY],
      consiglio: "I tuoi ricci tendono a essere secchi e a perdere facilmente morbidezza, hanno bisogno di aiuto per trattenere meglio l’idratazione. Per questo ti consiglio il Kit Recovery con Balsamo + Olio, da usare come impacco pre-shampoo, meglio sui capelli asciutti. Nel tuo caso non serve esagerare: lascialo in posa massimo un’ora, così dai morbidezza e luminosità senza rischiare di appesantire i tuoi capelli sottili.",
    },
    "spessi|ricci-s": {
      prodotti: ["Riparazione Proteica", "Balsamo Riccia"],
      consiglio: "I tuoi ricci hanno bisogno di più struttura per mantenere meglio forma, volume e definizione. Per questo ti consiglio la Riparazione Proteica, soprattutto se hai decolorato o hai notato dei cambiamenti nei tuoi capelli negli ultimi 6 mesi. Dopo aver risciacquato il trattamento, applica un po’ di Balsamo sulle lunghezze e risciacqua subito: non serve lasciarlo in posa, ci serve semplicemente per ridare morbidezza al capello dopo le proteine. Così lavoriamo sulla struttura senza rinunciare a morbidezza ed elasticità.",
    },
    "spessi|onde": {
      prodotti: ["Riparazione Proteica", "Balsamo Riccia"],
      consiglio: "Quando il capello è sottile può perdere facilmente sostegno, anche quando i capelli sono tanti. La Riparazione Proteica aiuta a dare più struttura, migliorando elasticità, definizione e durata dello styling. Te la consiglio ancora di più se hai decolorato o se negli ultimi 6 mesi hai visto cambiare i tuoi ricci. Dopo aver risciacquato le proteine, applica un po’ di Balsamo sulle lunghezze e risciacqua subito, senza lasciarlo in posa: ci serve semplicemente per restituire morbidezza al capello. Così lavoriamo sulla struttura, mantenendo i ricci morbidi, elastici e leggeri.",
    },
    "spessi|ricci-spirale": {
      prodotti: ["Riparazione Proteica", "Balsamo Riccia"],
      consiglio: "Se i tuoi ricci sono morbidi ma fanno fatica a mantenere forma e definizione, potrebbe mancare un po’ di struttura. Qui entra in gioco la Riparazione Proteica, che aiuta a dare più forza e sostegno al capello senza appesantirlo. A maggior ragione se hai decolorato o hai notato dei cambiamenti negli ultimi 6 mesi. Dopo aver risciacquato il trattamento, applica un po’ di Balsamo sulle lunghezze e risciacqua subito, senza lasciarlo in posa: ci serve solo per restituire morbidezza dopo le proteine. Così aiutiamo i ricci a ritrovare struttura, morbidezza e una definizione che dura più a lungo.",
    },
    "spessi|ricci-ribelli": {
      prodotti: [KIT_RECOVERY],
      consiglio: "Quando il capello è spesso e irregolare, può apparire più ruvido, secco e perdere facilmente morbidezza e luminosità. Il Kit Recovery con Balsamo + Olio ti aiuta a lavorare proprio su questo, dando ai ricci quella parte lipidica che li rende più morbidi e facili da gestire. Applicalo da asciutto come pre-shampoo: puoi lasciarlo in posa per un’ora oppure tutta la notte come impacco notturno. Al lavaggio successivo risciacqua bene e procedi con lo shampoo: con costanza noterai ricci più morbidi, elastici e luminosi, anche nelle zone più difficili da gestire.",
    },
    "spessi|ricci-stretti-afro": {
      prodotti: [KIT_RECOVERY],
      consiglio: "I tuoi ricci tendono a essere secchi e a perdere facilmente morbidezza, quindi hanno bisogno di una mano per trattenere meglio l’idratazione. Per questo ti consiglio il Kit Recovery con Balsamo + Olio, da applicare sui capelli asciutti prima dello shampoo. Puoi lasciarlo agire per un’ora oppure, quando vuoi fare un trattamento più lungo, tenerlo tutta la notte come impacco notturno. Al lavaggio successivo risciacqua bene e procedi con lo shampoo: aiuterai i ricci a ritrovare morbidezza, elasticità e luminosità.",
    },
  }

  return trattamenti[chiave] ?? trattamenti["fini|onde"]
}

function getConsiglioSTS(values: FormValues): string[] {
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

  return selezionati
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
  consiglioSTS: string[]
} {
  const prodotti: Prodotto[] = []

  const lavaggio = getLavaggio(values)
  const styling = getStyling(values)
  const trattamento = getTrattamento(values)
  const consiglio = trattamento.consiglio
  const consiglioStyling = styling.consiglio
  const consiglioLavaggio = getConsiglioLavaggio(values)
  const consiglioSTS = getConsiglioSTS(values)

  addUnique(prodotti, lavaggio.prodotto, styling.prodotto, ...trattamento.prodotti)

  const passi = [
    `Lavaggio: ${lavaggio.testo}`,
    `Styling: ${styling.prodotto}`,
    `Trattamento: ${trattamento.prodotti.join(" + ")}`,
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
