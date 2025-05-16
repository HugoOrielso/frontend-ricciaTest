import { type EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './EmblaCarrousel'
import '../assets/base.css'
import '../assets/embla.css'
const Reply = ({ message, prodotti, resetTest }: { message: string, prodotti: Prodotti[], resetTest: () => void }) => {
    const OPTIONS: EmblaOptionsType = { loop: true }

    return (
        <div className="p-6 border border-[#e87db5]/20 rounded-lg bg-[#e87db5]/10 text-center animate-fadeIn">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className=" ">
                    <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-pink-100 to-pink-200 pb-2"><div className="flex items-center gap-2"><div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-pink-500 text-white px-3 py-1" data-v0-t="badge"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check w-4 h-4 mr-1"><path d="M20 6 9 17l-5-5"></path></svg>Personalizzato</div><h2 className="text-lg font-semibold text-pink-800">La tua routine per capelli ricci</h2></div><p className="text-sm text-pink-700 mt-2">Routine generata in tempo reale con il nostro assistente AI addestrato da La Ragazza Riccia</p></div>
                </div>
                <div className="text-left flex w-full space-y-1 text-[#5D4037]">
                    <ul className="list-disc list-inside space-y-1">
                        {message
                            .split("- ")
                            .filter((r) => r.trim() !== "")
                            .map((step, index) => (
                                <div className="text-left flex w-full">
                                    {
                                        index === 0 ?
                                            <h3 className="text-xl font-medium" key={index}>{step.trim()}</h3>
                                            :
                                            <li key={index}>{step.trim()}</li>
                                    }
                                </div>
                            ))}
                    </ul>
                </div>

                <p className="text-gray-600">
                    Abbiamo creato una routine personalizzata basata sulle tue risposte. Ecco i prodotti consigliati per i tuoi ricci:
                </p>

                {
                    prodotti.length > 0 &&
                    <EmblaCarousel slides={prodotti} options={OPTIONS} />
                }

                <button
                    onClick={resetTest}
                    className="mt-4 bg-white border cursor-pointer border-[#e87db5] text-[#e87db5] hover:bg-[#e87db5] hover:text-white transition-colors duration-200 px-4 py-2 rounded-md"
                >
                    Torna al test
                </button>
            </div>
        </div>
    )
}

export default Reply