import { Gift, MailCheck, RotateCcw, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const Reply = ({
  nome,
  prodotti,
  coupon,
}: {
  nome: string
  prodotti: Prodotti[]
  coupon: { code: string; percent: number; expiresAt: string } | null
}) => {
  const prodottoPrincipale = prodotti[0]
  const [remainingMs, setRemainingMs] = useState(() =>
    coupon ? Math.max(0, new Date(coupon.expiresAt).getTime() - Date.now()) : 0
  )

  useEffect(() => {
    if (!coupon) return

    const updateCountdown = () => {
      setRemainingMs(Math.max(0, new Date(coupon.expiresAt).getTime() - Date.now()))
    }

    updateCountdown()
    const intervalId = window.setInterval(updateCountdown, 1000)
    return () => window.clearInterval(intervalId)
  }, [coupon])

  const totalSeconds = Math.floor(remainingMs / 1000)
  const countdown = {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
  const couponExpired = remainingMs <= 0

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

          {prodotti.length > 0 && (
            <div className="mx-auto mt-7 max-w-4xl">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-[#E92176]">
                {prodotti.length === 1 ? "prodotto consigliato" : "prodotti consigliati"} per la tua routine
              </p>
              <div className="flex flex-col gap-4">
                {prodotti.map((prodotto, index) => (
                  <article
                    key={`${prodotto.nome}-${index}`}
                    className="flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-[#f4c0d1] bg-white p-5 text-center shadow-[0_8px_24px_rgba(75,21,40,0.06)] sm:flex-row sm:p-6 sm:text-left"
                  >
                    <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#fff7fa] sm:size-32">
                      <img
                        src={prodotto.immagine}
                        alt={prodotto.nome}
                        className="h-full w-full object-contain p-2"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#E92176]">
                        Kit consigliato {index + 1}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-[#4B1528]">
                        {prodotto.nome}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#72243E]">
                        {prodotto.descrizione}
                      </p>
                      <a
                        href={prodotto.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1 font-semibold text-[#E92176] hover:underline"
                      >
                        Scopri il kit <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {coupon && <div className="mx-auto mt-5 flex max-w-4xl flex-col gap-4 rounded-2xl border-2 border-dashed border-[#E92176] bg-[#fff7fa] px-5 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span className="flex items-center justify-center gap-2 font-semibold text-[#72243E] sm:justify-start">
              <Gift size={18} className="shrink-0 text-[#E92176]" />
              <span><strong>{coupon.code}</strong> — {coupon.percent}% sul tuo kit</span>
            </span>

            {couponExpired ? (
              <span className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#993556]">
                Coupon scaduto
              </span>
            ) : (
              <div className="flex flex-col items-center gap-1.5 sm:items-end">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#993556]">
                  Il tuo coupon scade tra
                </span>
                <div className="flex items-center gap-1.5" aria-live="polite" aria-label={`Mancano ${countdown.hours} ore, ${countdown.minutes} minuti e ${countdown.seconds} secondi`}>
                  {[
                    [countdown.hours, "ore"],
                    [countdown.minutes, "min"],
                    [countdown.seconds, "sec"],
                  ].map(([value, label]) => (
                    <span key={label} className="min-w-13 rounded-xl bg-white px-2 py-1.5 text-center shadow-sm">
                      <strong className="block text-base leading-none text-[#E92176]">
                        {String(value).padStart(2, "0")}
                      </strong>
                      <small className="mt-1 block text-[9px] font-semibold uppercase tracking-wide text-[#993556]">
                        {label}
                      </small>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>}

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
