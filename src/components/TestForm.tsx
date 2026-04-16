import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'sonner'
import { domandeCMR, type DomandaID } from "./data"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Reply from "./Reply"
import { generaRutina } from "@/Data/recomendazioni"

const PINK = "#E92176"
const PINK_LIGHT = "#fbeaf0"
const PINK_MID = "#f4c0d1"
const TEXT_DARK = "#4B1528"   // pink-900 — nunca negro puro
const TEXT_MID = "#72243E"    // pink-800
const TEXT_SOFT = "#993556"   // pink-700

const formSchema = z.object({
    cuoioCapelluto: z.string({ required_error: "Seleziona una risposta" }),
    spessoreCapello: z.string({ required_error: "Seleziona una risposta" }),
    porosita: z.string({ required_error: "Seleziona una risposta" }),
    sts: z.string({ required_error: "Seleziona una risposta" }),
    densita: z.string({ required_error: "Seleziona una risposta" }),
    personalitaRicci: z.string({ required_error: "Seleziona una risposta" }),
    email: z.string().email({ message: "Inserisci un indirizzo email valido" }),
    nome: z.string().min(1, { message: "Inserisci il tuo nome" }),
})

type FormValues = z.infer<typeof formSchema>

const TestForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [reply, setReply] = useState<string>('')
    const [prodottiTrovati, setProdottiTrovati] = useState<Prodotti[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const domanda = domandeCMR[currentIndex]
    const domandaId = domanda.id as DomandaID
    const [direction, setDirection] = useState<"left" | "right">("right")

    const isFirst = currentIndex === 0
    const isLast = currentIndex === domandeCMR.length - 1
    const progress = ((currentIndex + 1) / domandeCMR.length) * 100

    const nextQuestion = () => {
        if (!isLast) { setDirection("right"); setCurrentIndex(p => p + 1) }
    }
    const prevQuestion = () => {
        if (!isFirst) { setDirection("left"); setCurrentIndex(p => p - 1) }
    }
    const resetTest = () => { setIsSubmitting(false); setReply('') }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuoioCapelluto: "", spessoreCapello: "", porosita: "",
            sts: "", densita: "", personalitaRicci: "", email: "", nome: "",
        },
    })

    async function onSubmit(values: FormValues): Promise<void> {
        const requiredFields: Array<keyof FormValues> = [
            "cuoioCapelluto", "spessoreCapello", "porosita",
            "sts", "densita", "personalitaRicci",
        ]
        const missingFields = requiredFields.filter(f => !values[f])
        if (missingFields.length > 0) {
            toast.message('Campi obbligatori mancanti', {
                description: "Per favore, seleziona un'opzione per ogni domanda.",
            })
            return
        }
        setIsSubmitting(true)
        await new Promise(r => setTimeout(r, 900))
        const { testo, prodotti } = generaRutina(values)
        setReply(testo)
        setProdottiTrovati(prodotti)
        toast.success("Grazie per aver completato il test.")
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">

            {reply.length === 0 && (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-xl"
                >
                    {/* Card principal */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden"
                        style={{ border: `1px solid ${PINK_MID}` }}>

                        {/* Header */}
                        <div className="px-6 pt-6 pb-4"
                            style={{ borderBottom: `1px solid ${PINK_LIGHT}` }}>
                            <div className="flex items-center gap-2 mb-1">
                                {/* Icono ricci decorativo */}
                                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                                    style={{ background: PINK }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z" />
                                    </svg>
                                </div>
                                <h1 className="text-base font-semibold"
                                    style={{ color: TEXT_DARK }}>
                                    Conosco i Miei Ricci
                                </h1>
                            </div>
                            <p className="text-xs" style={{ color: TEXT_SOFT }}>
                                Rispondi a {domandeCMR.length} domande per scoprire la tua routine perfetta
                            </p>
                        </div>

                        {/* Barra progreso */}
                        <div className="h-1 w-full" style={{ background: PINK_LIGHT }}>
                            <div
                                className="h-1 transition-all duration-500"
                                style={{ width: `${progress}%`, background: PINK }}
                            />
                        </div>

                        {/* Contador pasos */}
                        <div className="flex justify-between items-center px-6 pt-4">
                            <span className="text-xs font-medium" style={{ color: TEXT_SOFT }}>
                                Domanda {currentIndex + 1} di {domandeCMR.length}
                            </span>
                            <div className="flex gap-1">
                                {domandeCMR.map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                        style={{ background: i <= currentIndex ? PINK : PINK_MID }} />
                                ))}
                            </div>
                        </div>

                        {/* Contenido animado */}
                        <div className="px-6 pt-4 pb-2 min-h-[280px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: direction === "right" ? 40 : -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction === "right" ? -40 : 40 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="flex flex-col gap-4"
                                >
                                    <div>
                                        <h2 className="text-base font-semibold mb-1"
                                            style={{ color: TEXT_DARK }}>
                                            {domanda.titolo}
                                        </h2>
                                        <p className="text-sm leading-relaxed"
                                            style={{ color: TEXT_MID }}>
                                            {domanda.descrizione}
                                            <span style={{ color: PINK, marginLeft: 2 }}>*</span>
                                        </p>
                                    </div>

                                    <RadioGroup
                                        value={form.watch(domandaId)}
                                        onValueChange={(v) => form.setValue(domandaId, v)}
                                        className="flex flex-col gap-2"
                                    >
                                        {domanda.opzioni.map((opzione) => {
                                            const checked = form.watch(domandaId) === opzione.value
                                            return (
                                                <label
                                                    key={opzione.id}
                                                    htmlFor={opzione.id}
                                                    className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all duration-150"
                                                    style={{
                                                        border: `1.5px solid ${checked ? PINK : PINK_MID}`,
                                                        background: checked ? PINK_LIGHT : "white",
                                                    }}
                                                >
                                                    <RadioGroupItem
                                                        value={opzione.value}
                                                        id={opzione.id}
                                                        className="shrink-0"
                                                        style={{ accentColor: PINK, color: PINK, borderColor: PINK } as React.CSSProperties}
                                                    />
                                                    <span className="text-sm leading-snug"
                                                        style={{ color: checked ? TEXT_DARK : TEXT_MID }}>
                                                        {opzione.label}
                                                    </span>
                                                </label>
                                            )
                                        })}
                                    </RadioGroup>

                                    {form.formState.errors[domandaId] && (
                                        <p className="text-xs" style={{ color: PINK }}>
                                            {form.formState.errors[domandaId]?.message}
                                        </p>
                                    )}

                                    {/* Campos email/nome en la última pregunta */}
                                    {isLast && (
                                        <div className="flex flex-col gap-3 pt-2">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs font-medium" style={{ color: TEXT_MID }}>
                                                    La tua email *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="nome@esempio.com"
                                                    {...form.register("email")}
                                                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                                                    style={{
                                                        border: `1.5px solid ${PINK_MID}`,
                                                        color: TEXT_DARK,
                                                        background: "white",
                                                    }}
                                                    onFocus={e => e.target.style.borderColor = PINK}
                                                    onBlur={e => e.target.style.borderColor = PINK_MID}
                                                />
                                                {form.formState.errors.email && (
                                                    <p className="text-xs" style={{ color: PINK }}>
                                                        {form.formState.errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs font-medium" style={{ color: TEXT_MID }}>
                                                    Il tuo nome *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Come ti chiami?"
                                                    {...form.register("nome")}
                                                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                                                    style={{
                                                        border: `1.5px solid ${PINK_MID}`,
                                                        color: TEXT_DARK,
                                                        background: "white",
                                                    }}
                                                    onFocus={e => e.target.style.borderColor = PINK}
                                                    onBlur={e => e.target.style.borderColor = PINK_MID}
                                                />
                                                {form.formState.errors.nome && (
                                                    <p className="text-xs" style={{ color: PINK }}>
                                                        {form.formState.errors.nome.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Spinner enviando */}
                        {isSubmitting && (
                            <div className="mx-6 mb-4 rounded-2xl p-5 text-center"
                                style={{ background: PINK_LIGHT, border: `1px solid ${PINK_MID}` }}>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent animate-spin"
                                        style={{ borderColor: `${PINK_MID} ${PINK_MID} ${PINK_MID} transparent` }} />
                                    <p className="text-sm font-medium" style={{ color: TEXT_DARK }}>
                                        Creiamo la tua routine...
                                    </p>
                                    <p className="text-xs" style={{ color: TEXT_SOFT }}>
                                        Analizziamo le tue risposte
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Footer: navegación + submit */}
                        {!isSubmitting && (
                            <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevQuestion}
                                        disabled={isFirst}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 disabled:opacity-30"
                                        style={{
                                            border: `1.5px solid ${PINK_MID}`,
                                            color: TEXT_MID,
                                            background: "white",
                                        }}
                                    >
                                        <ArrowLeft size={14} /> Indietro
                                    </button>

                                    {!isLast ? (
                                        <button
                                            type="button"
                                            onClick={nextQuestion}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                                            style={{ background: PINK, color: "white" }}
                                        >
                                            Avanti <ArrowRight size={14} />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-150"
                                            style={{ background: PINK, color: "white" }}
                                        >
                                            Scopri la tua routine
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            )}

            {reply.length > 0 && (
                <Reply message={reply} prodotti={prodottiTrovati} resetTest={resetTest} />
            )}
        </div>
    )
}

export default TestForm