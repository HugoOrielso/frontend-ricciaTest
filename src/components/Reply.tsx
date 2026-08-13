import { Check, Gift, MailCheck, RotateCcw, Sparkles } from "lucide-react"

const Reply = ({
  nome,
  prodotti,
}: {
  nome: string
  prodotti: Prodotti[]
}) => {
  const prodottoPrincipale = prodotti[0]

  return (
    <div className="w-full max-w-5xl mx-auto px-3 py-5 animate-fadeIn">
      <section className="overflow-hidden rounded-3xl border border-[#E92176]/20 bg-white shadow-[0_18px_50px_rgba(75,21,40,0.10)]">
        <div className="px-5 py-9 sm:px-8 sm:py-12">
          <header className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#fbeaf0] text-[#E92176]">
              <Sparkles size={22} fill="currentColor" strokeWidth={1.8} />
            </span>
            <h1 className="mt-4 text-2xl font-semibold text-[#4B1528] sm:text-3xl">
              {nome}, la tua routine è pronta
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#993556] sm:text-base">
              Abbiamo analizzato le tue risposte con il metodo Conosco i Miei Ricci®.
            </p>
          </header>

          {prodottoPrincipale && (
            <div className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-2xl border border-[#f4c0d1] bg-white">
              <div className="flex flex-col items-center gap-5 p-5 text-center sm:flex-row sm:p-6 sm:text-left">
                <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#fff7fa] sm:size-32">
                  <img
                    src={prodottoPrincipale.immagine}
                    alt={prodottoPrincipale.nome}
                    className="h-full w-full object-contain p-2"
                    loading="eager"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#E92176]">
                    Kit consigliato
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-[#4B1528] sm:text-xl">
                    {prodottoPrincipale.nome}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#72243E]">
                    {prodottoPrincipale.descrizione}
                  </p>
                  <a
                    href={prodottoPrincipale.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 font-semibold text-[#E92176] hover:underline"
                  >
                    Scopri il kit <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {prodotti.length > 1 && (
                <div className="border-t border-[#fbeaf0] bg-[#fffafd] px-5 py-4 sm:px-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#993556]">
                    La routine include anche
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {prodotti.slice(1).map(prodotto => (
                      <a
                        key={prodotto.nome}
                        href={prodotto.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-[#4B1528] transition-colors hover:bg-[#fbeaf0]"
                      >
                        <Check size={16} className="shrink-0 text-[#E92176]" />
                        <span>{prodotto.nome}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mx-auto mt-5 flex max-w-3xl flex-col gap-2 rounded-2xl border-2 border-dashed border-[#E92176] bg-[#fff7fa] px-5 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span className="flex items-center justify-center gap-2 font-semibold text-[#72243E] sm:justify-start">
              <Gift size={18} className="text-[#E92176]" />
              <span><strong>RICCI15</strong> — 15% sul tuo kit</span>
            </span>
            <span className="text-xs font-medium text-[#993556]">Valido 48 ore</span>
          </div>

          {prodottoPrincipale && (
            <div className="mt-6 text-center">
              <a
                href={prodottoPrincipale.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#E92176] px-9 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(233,33,118,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#cf1766]"
              >
                Scopri il tuo kit
              </a>
            </div>
          )}

          <div className="mx-auto mt-7 flex max-w-3xl items-start justify-center gap-2 border-t border-[#fbeaf0] pt-5 text-center text-sm leading-relaxed text-[#993556]">
            <MailCheck size={18} className="mt-0.5 shrink-0 text-[#E92176]" />
            <p>
              Abbiamo inviato i consigli completi alla tua email. Controlla anche la cartella spam.
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => location.reload()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-[#993556] transition-colors hover:bg-[#fbeaf0] hover:text-[#E92176]"
            >
              <RotateCcw size={15} />
              Rifai il test
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reply
