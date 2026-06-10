import { type EmblaOptionsType } from "embla-carousel"
import EmblaCarousel from "./EmblaCarrousel"
import "../assets/base.css"
import "../assets/embla.css"

const Reply = ({
  message,
  prodotti,
}: {
  message: string
  prodotti: Prodotti[]
  resetTest: () => void
}) => {
  const OPTIONS: EmblaOptionsType = { loop: prodotti.length > 1 }

  const righe = message.split("\n- ").filter(r => r.trim() !== "")
  const titolo = righe[0]
  const passi = righe.slice(1)

  return (
    <div className="w-full max-w-5xl mx-auto px-3 py-4 animate-fadeIn">
      <div className="bg-white border border-[#E92176]/20 rounded-3xl shadow-sm overflow-hidden">

        <div className="px-5 py-4 border-b border-[#E92176]/10 bg-pink-50/40">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#E92176] text-white text-sm font-semibold px-3 py-1 rounded-full">
              ✓ Personalizzato
            </span>
            <span className="text-sm font-medium text-pink-800">
              La tua routine per capelli ricci
            </span>
          </div>
        </div>

        <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          <div>
            <p className="text-sm font-semibold text-[#E92176] uppercase tracking-wide mb-2">
              La tua routine
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {titolo}
            </h3>

            <ol className="space-y-3">
              {passi.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#E92176]/10 text-[#E92176] text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-start text-gray-700 leading-relaxed">
                    {step.trim()}
                  </p>
                </li>
              ))}
            </ol>

            <button
              onClick={() => location.reload()}
              className="mt-5 w-full sm:w-auto border border-[#E92176]/40 text-[#E92176] hover:bg-[#E92176] hover:text-white transition-colors duration-200 px-5 py-2.5 rounded-xl cursor-pointer font-medium"
            >
              ← Rifai il test
            </button>
          </div>

          {prodotti.length > 0 && (
            <div className="bg-pink-50/60 border border-[#E92176]/15 rounded-2xl flex items-center flex-col p-4">
              <p className="text-sm font-semibold text-[#E92176] uppercase tracking-wide mb-3 text-center">
                Prodotti consigliati
              </p>

              <EmblaCarousel slides={prodotti} options={OPTIONS} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reply