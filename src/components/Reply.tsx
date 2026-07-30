import { type EmblaOptionsType } from "embla-carousel"
import EmblaCarousel from "./EmblaCarrousel"
import "../assets/base.css"
import "../assets/embla.css"

const Reply = ({
  nome,
  prodotti,
}: {
  nome: string
  prodotti: Prodotti[]
}) => {
  const OPTIONS: EmblaOptionsType = { loop: prodotti.length > 1 }

  return (
    <div className="w-full max-w-5xl mx-auto px-3 py-4 animate-fadeIn">
      <div className="bg-white border border-[#E92176]/20 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E92176]/10 bg-pink-50/40">
          <div className="flex flex-wrap items-center gap-2"> 
            <span className="text-sm font-medium text-pink-800">
              La tua routine per capelli ricci
            </span>
          </div>
        </div>

        <div className="p-5 md:p-7">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {nome}, ecco la tua routine:
            </h3>
            <p className="mt-3 leading-relaxed text-gray-700">
              I prodotti da usare in base alle tue caratteristiche sono i seguenti:
            </p>
          </div>

          {prodotti.length > 0 && (
            <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#E92176]/15 bg-pink-50/60 p-4">
              <EmblaCarousel slides={prodotti} options={OPTIONS} />
            </div>
          )}

          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#E92176]/20 bg-white p-5 text-center shadow-sm">
            <p className="font-semibold leading-relaxed text-gray-900">
              Controlla la tua posta: hai appena ricevuto i consigli per ottenere il massimo dai tuoi ricci.
            </p>
            <p className="mt-2 leading-relaxed text-gray-700">
              Se non trovi l&apos;email, controlla anche nella cartella spam.
            </p>
            <p className="mt-2 leading-relaxed text-gray-700">
              Altrimenti scrivici a{" "}
              <a
                href="mailto:info@laragazzariccia.com"
                className="font-semibold text-[#E92176] underline underline-offset-2"
              >
                info@laragazzariccia.com
              </a>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => location.reload()}
              className="w-full sm:w-auto border border-[#E92176]/40 text-[#E92176] hover:bg-[#E92176] hover:text-white transition-colors duration-200 px-5 py-2.5 rounded-xl cursor-pointer font-medium"
            >
              Rifai il test
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reply
