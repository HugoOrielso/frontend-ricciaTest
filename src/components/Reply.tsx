import { type EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './EmblaCarrousel'
import '../assets/base.css'
import '../assets/embla.css'

const Reply = ({
  message,
  prodotti,
}: {
  message: string
  prodotti: Prodotti[]
  resetTest: () => void
}) => {
  const OPTIONS: EmblaOptionsType = { loop: true }

  const righe = message
    .split("\n- ")
    .filter(r => r.trim() !== "")

  const titolo = righe[0]
  const passi = righe.slice(1)

  return (
    <div className="w-full  mx-auto px-2 py-6 animate-fadeIn">

      {/* Badge header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 bg-[#E92176] text-white  font-medium px-3 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          Personalizzato
        </span>
        <h2 className="text-base font-semibold text-pink-800">La tua routine per capelli ricci</h2>
      </div>

      {/* Layout: 2 col desktop, 1 col mobile */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Colonna sinistra: testo routine */}
        <div className="flex-1 bg-white border border-[#E92176]/15 rounded-2xl p-5 shadow-sm">
          <p className="  font-medium text-[#E92176] uppercase tracking-wide mb-3">
            La tua routine
          </p>
          <h3 className=" font-semibold text-gray-800 mb-4">{titolo}</h3>
          <ol className="space-y-3">
            {passi.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#E92176]/10 text-[#E92176]  font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className=" text-gray-700 leading-relaxed">{step.trim()}</p>
              </li>
            ))}
          </ol>

          <button
            onClick={ ()=> location.reload()}
            className="mt-6 w-full  border border-[#E92176]/40 text-[#E92176] hover:bg-[#E92176] hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg cursor-pointer"
          >
            ← Rifai il test
          </button>
        </div>

        {/* Colonna destra: prodotti */}
        {prodotti.length > 0 && (
          <div className="flex-1 items-center justify-center bg-pink-50/60 border border-[#E92176]/15 rounded-2xl p-5 shadow-sm">
            <p className=" font-medium text-[#E92176] uppercase tracking-wide mb-3">
              Prodotti consigliati
            </p>
            <EmblaCarousel slides={prodotti} options={OPTIONS} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Reply