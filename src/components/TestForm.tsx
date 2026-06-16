import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { domandeCMR, type DomandaID } from "./data"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight, Mail } from "lucide-react"
import Reply from "./Reply"
import { generaRutina } from "@/Data/recomendazioni"

const PINK = "#E92176"
const PINK_LIGHT = "#fbeaf0"
const PINK_MID = "#f4c0d1"
const TEXT_DARK = "#4B1528"
const TEXT_MID = "#72243E"
const TEXT_SOFT = "#993556"
const PRIVACY_URL = "https://laragazzariccia.com/pages/privacy-policy"

const formSchema = z.object({
    guidaLavaggio: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    porosita: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    sts: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    spessoreDensita: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    personalitaRicci: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    problemaPrincipale: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    obiettivoDesiderato: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    email: z.string().email({ message: "Inserisci un indirizzo email valido" }),
    nome: z.string().min(1, { message: "Inserisci il tuo nome" }),
    newsletterConsent: z.boolean().refine(value => value, {
        message: "Devi selezionare questa opzione per ricevere la tua routine.",
    }),
})
type FormValues = z.infer<typeof formSchema>

const TestForm = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [reply, setReply] = useState<string>("")
    const [prodottiTrovati, setProdottiTrovati] = useState<Prodotti[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<"left" | "right">("right")
    const [formMessage, setFormMessage] = useState("")

    const isLeadStep = currentIndex === domandeCMR.length
    const domanda = isLeadStep ? null : domandeCMR[currentIndex]
    const domandaId = domanda?.id as DomandaID | undefined
    const totalSteps = domandeCMR.length + 1
    const isFirst = currentIndex === 0
    const isLast = isLeadStep
    const progress = ((currentIndex + 1) / totalSteps) * 100

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guidaLavaggio: "",
            porosita: "",
            sts: "",
            spessoreDensita: "",
            personalitaRicci: "",
            problemaPrincipale: "",
            obiettivoDesiderato: "",
            email: "",
            nome: "",
            newsletterConsent: false,
        },
    })

    useEffect(() => {
        const sendHeight = () => {
            const height = document.documentElement.scrollHeight

            window.parent.postMessage(
                {
                    type: "RICCIA_IFRAME_HEIGHT",
                    height,
                },
                "https://laragazzariccia.com"
            )
        }

        sendHeight()

        const observer = new ResizeObserver(sendHeight)
        observer.observe(document.body)

        window.addEventListener("load", sendHeight)
        window.addEventListener("resize", sendHeight)

        return () => {
            observer.disconnect()
            window.removeEventListener("load", sendHeight)
            window.removeEventListener("resize", sendHeight)
        }
    }, [currentIndex, reply, prodottiTrovati.length])

    const nextQuestion = async () => {
        setFormMessage("")

        if (isLeadStep || !domandaId) return

        const isValid = await form.trigger(domandaId)
        if (!isValid) {
            setFormMessage("Seleziona una risposta per continuare.")
            return
        }

        setDirection("right")
        setCurrentIndex(p => Math.min(p + 1, domandeCMR.length))
    }

    const prevQuestion = () => {
        if (!isFirst) {
            setFormMessage("")
            setDirection("left")
            setCurrentIndex(p => p - 1)
        }
    }


    async function onSubmit(values: FormValues): Promise<void> {
        setFormMessage("")

        try {
            setIsSubmitting(true)

            const { testo, prodotti } = generaRutina(values)

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    name: values.nome,
                    newsletterConsent: values.newsletterConsent,
                    rutina: testo,
                    prodotti: prodotti.map(p => ({
                        nome: p.nome,
                        descrizione: p.descrizione,
                        immagine: p.immagine,
                        link: p.link,
                    })),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.message || "Errore durante l'iscrizione")
            }

            setReply(testo)
            setProdottiTrovati(prodotti)
        } catch (error) {
            setFormMessage(error instanceof Error ? error.message : "Si è verificato un errore. Riprova.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-start justify-center">
            <div className="flex flex-col gap-2">
                {reply.length === 0 && (
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <div className="bg-white rounded-3xl shadow-sm" style={{ border: `1px solid ${PINK_MID}` }}>
                            <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${PINK_LIGHT}` }}>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: PINK }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                            <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-base font-semibold" style={{ color: TEXT_DARK }}>
                                        Conosco i Miei Ricci
                                    </h1>
                                </div>
                                <p style={{ color: TEXT_SOFT }}>
                                    Compila il test e scopri i prodotti più adatti ai tuoi ricci
                                </p>
                            </div>

                            <div className="h-1 w-full" style={{ background: PINK_LIGHT }}>
                                <div
                                    className="h-1 transition-all duration-500"
                                    style={{ width: `${progress}%`, background: PINK }}
                                />
                            </div>

                            <div className="flex justify-between items-center px-6 pt-4">
                                <span className="font-medium" style={{ color: TEXT_SOFT }}>
                                    {isLeadStep ? "Invio risultato" : `Domanda ${currentIndex + 1} di ${domandeCMR.length}`}
                                </span>
                                <div className="flex gap-1">
                                    {Array.from({ length: totalSteps }).map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                            style={{ background: i <= currentIndex ? PINK : PINK_MID }} />
                                    ))}
                                </div>
                            </div>

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
                                        {!isLeadStep && domanda && domandaId && (
                                            <>
                                                <div>
                                                    <h2 className="text-start font-semibold mb-1" style={{ color: TEXT_DARK }}>
                                                        {domanda.titolo}
                                                    </h2>
                                                    {domanda.descrizione && (
                                                        <p className="text-start leading-relaxed" style={{ color: TEXT_MID }}>
                                                            {domanda.descrizione}
                                                        </p>
                                                    )}
                                                </div>

                                                <RadioGroup
                                                    value={form.watch(domandaId)}
                                                    onValueChange={(v) => {
                                                        form.setValue(domandaId, v, { shouldValidate: true })
                                                        setFormMessage("")
                                                    }}
                                                    className="flex flex-col gap-2"
                                                >
                                                    {domanda.opzioni.map((opzione) => {
                                                        const checked = form.watch(domandaId) === opzione.value
                                                        return (
                                                            <label
                                                                key={opzione.id}
                                                                htmlFor={opzione.id}
                                                                className="flex items-center gap-3 rounded-xl p-5 cursor-pointer transition-all duration-150"
                                                                style={{
                                                                    border: `1.5px solid ${checked ? PINK : PINK_MID}`,
                                                                    background: checked ? PINK_LIGHT : "white",
                                                                }}
                                                            >
                                                                <RadioGroupItem
                                                                    value={opzione.value}
                                                                    id={opzione.id}
                                                                    className="shrink-0 size-6"
                                                                    style={{ accentColor: PINK, color: PINK, borderColor: PINK } as React.CSSProperties}
                                                                />
                                                                <span className="text-start leading-snug" style={{ color: checked ? TEXT_DARK : TEXT_MID }}>
                                                                    {opzione.label}
                                                                </span>
                                                            </label>
                                                        )
                                                    })}
                                                </RadioGroup>

                                                {form.formState.errors[domandaId] && (
                                                    <p style={{ color: PINK }}>
                                                        {form.formState.errors[domandaId]?.message}
                                                    </p>
                                                )}
                                            </>
                                        )}

                                        {isLeadStep && (
                                            <div className="flex flex-col gap-4">
                                                <div className="space-y-3 text-start">
                                                    <h1 className="text-4xl lg:text-5xl font-semibold" style={{ color: TEXT_DARK }}>
                                                        🩷 La tua routine è pronta
                                                    </h1>
                                                    <p style={{ color: TEXT_MID }}>
                                                        In base alle tue risposte abbiamo identificato:
                                                    </p>
                                                    <div className="space-y-2" style={{ color: TEXT_MID }}>
                                                        <p>✔ Il comportamento della tua cute</p>
                                                        <p>✔ Le esigenze dei tuoi ricci</p>
                                                        <p>✔ Il tipo di trattamento più adatto ai tuoi capelli</p>
                                                        <p>✔ I prodotti che potrebbero aiutarti a ottenere il risultato che desideri</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold" style={{ color: TEXT_DARK }}>
                                                            Dove possiamo inviarti il risultato?
                                                        </p>
                                                        <p style={{ color: TEXT_MID }}>
                                                            Inserisci il tuo nome e la tua email e riceverai subito la tua routine personalizzata.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div className="flex flex-col gap-1">
                                                        <label className="font-medium text-start" style={{ color: TEXT_MID }}>
                                                            Nome
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Nome"
                                                            {...form.register("nome")}
                                                            className="w-full rounded-xl px-4 py-2.5 outline-none transition-all"
                                                            style={{ border: `1.5px solid ${PINK_MID}`, color: TEXT_DARK, background: "white" }}
                                                            onFocus={e => e.target.style.borderColor = PINK}
                                                            onBlur={e => e.target.style.borderColor = PINK_MID}
                                                        />
                                                        {form.formState.errors.nome && (
                                                            <p className="text-sm" style={{ color: PINK }}>
                                                                {form.formState.errors.nome.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col gap-1">
                                                        <label className="font-medium text-start" style={{ color: TEXT_MID }}>
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            required
                                                            placeholder="Email"
                                                            {...form.register("email")}
                                                            className="w-full rounded-xl px-4 py-2.5 outline-none transition-all"
                                                            style={{ border: `1.5px solid ${PINK_MID}`, color: TEXT_DARK, background: "white" }}
                                                            onFocus={e => e.target.style.borderColor = PINK}
                                                            onBlur={e => e.target.style.borderColor = PINK_MID}
                                                        />
                                                        {form.formState.errors.email && (
                                                            <p className="text-sm" style={{ color: PINK }}>
                                                                {form.formState.errors.email.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <p className="leading-relaxed text-start" style={{ color: TEXT_SOFT }}>
                                                    Inserendo la tua email riceverai la tua routine personalizzata e confermi di aver letto la{" "}
                                                    <a href={PRIVACY_URL} target="_blank" rel="noreferrer" className="font-semibold underline" style={{ color: PINK }}>
                                                        Privacy Policy
                                                    </a>.
                                                </p>

                                                <label className="flex items-center text-center gap-3  cursor-pointer" style={{ color: TEXT_MID }}>
                                                    <input
                                                        type="checkbox"
                                                        {...form.register("newsletterConsent")}
                                                        required
                                                        className="mt-1 h-4 w-4"
                                                        style={{ accentColor: PINK }}
                                                    />
                                                    <span>Voglio ricevere consigli pratici per prendermi cura dei miei ricci.</span>
                                                </label>
                                                {form.formState.errors.newsletterConsent && (
                                                    <p className="text-sm text-start" style={{ color: PINK }}>
                                                        {form.formState.errors.newsletterConsent.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {formMessage && (
                                            <p className="rounded-xl px-4 py-3 text-start" style={{ color: PINK, background: PINK_LIGHT }}>
                                                {formMessage}
                                            </p>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {isSubmitting && (
                                <div className="mx-6 mb-4 rounded-2xl p-5 text-center" style={{ background: PINK_LIGHT, border: `1px solid ${PINK_MID}` }}>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-10 h-10 rounded-full border-[3px] border-t-transparent animate-spin"
                                            style={{ borderColor: `${PINK_MID} ${PINK_MID} ${PINK_MID} transparent` }} />
                                        <p className="text-sm font-medium" style={{ color: TEXT_DARK }}>
                                            Creiamo la tua routine...
                                        </p>
                                        <p style={{ color: TEXT_SOFT }}>
                                            Analizziamo le tue risposte
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!isSubmitting && (
                                <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                                    <div className="flex justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={prevQuestion}
                                            disabled={isFirst}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition-all duration-150 disabled:opacity-30 cursor-pointer"
                                            style={{ border: `1.5px solid ${PINK_MID}`, color: TEXT_MID, background: "white" }}
                                        >
                                            <ArrowLeft size={14} /> Indietro
                                        </button>

                                        {!isLast ? (
                                            <button
                                                type="button"
                                                onClick={nextQuestion}
                                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition-all duration-150 cursor-pointer"
                                                style={{ background: PINK, color: "white" }}
                                            >
                                                Avanti <ArrowRight size={14} />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="flex items-center gap-1.5 px-5 py-2 rounded-xl font-semibold transition-all duration-150 cursor-pointer"
                                                style={{ background: PINK, color: "white" }}
                                            >
                                                <Mail size={16} />
                                                Inviami la mia routine
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </div>
            {reply.length > 0 && (
                <Reply message={reply} prodotti={prodottiTrovati}  />
            )}
        </div>
    )
}

export default TestForm
