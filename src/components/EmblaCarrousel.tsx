import React from "react"
import { type EmblaOptionsType } from "embla-carousel"
import { DotButton, useDotButton } from "./EmblaCarouselDotButton"
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons"
import useEmblaCarousel from "embla-carousel-react"
import { Package } from "lucide-react"

type PropType = {
  slides: Prodotti[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla w-full flex flex-col">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <article className="h-full bg-white rounded-2xl border border-[#E92176]/10 p-3 text-center">
                <img
                  className="w-full max-h-[210px] aspect-square rounded-xl object-cover bg-gray-100"
                  src={item.immagine}
                  alt={item.nome}
                />

                <div className="pt-3 space-y-2">
                  <h4 className="font-semibold text-gray-900 leading-tight">
                    {item.nome}
                  </h4>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                    {item.descrizione}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-2 bg-[#E92176] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Package size={16} />
                    Acquista ora
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="embla__controls mt-3">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default EmblaCarousel