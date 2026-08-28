import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { domandeCMR, type DomandaID } from "./data"
import { motion, AnimatePresence } from "motion/react"
import {
    ArrowLeft, ArrowRight, Mail,
    Droplet, Droplets, CalendarDays, Sparkles, Waves, FlaskConical,
    Paintbrush, Activity, Pill, HardHat, CircleOff, Feather, Layers3,
    CircleGauge, Cloud, Sun, Volume2, Heart, ShieldCheck, HelpCircle,
    type LucideIcon,
} from "lucide-react"
import Reply from "./Reply"
import { generaRutina } from "@/Data/recomendazioni"

const PINK = "#E92176"
const PINK_LIGHT = "#fbeaf0"
const PINK_MID = "#f4c0d1"
const TEXT_DARK = "#4B1528"
const TEXT_MID = "#72243E"
const TEXT_SOFT = "#993556"
const PRIVACY_URL = "https://laragazzariccia.com/pages/privacy-policy"

const OPTION_ICONS: Record<Exclude<DomandaID, "personalitaRicci">, LucideIcon[]> = {
    guidaLavaggio: [CalendarDays, Droplets],
    porosita: [FlaskConical, Droplets, Layers3, Sparkles],
    sts: [Paintbrush, Activity, Pill, HardHat, CircleOff],
    spessoreDensita: [Feather, Layers3],
    problemaPrincipale: [Cloud, Volume2, Sun, Waves, CalendarDays, Droplet, HelpCircle],
    obiettivoDesiderato: [Sparkles, Volume2, Heart, Feather, CircleGauge, ShieldCheck],
}

const cleanQuestionTitle = (title: string) => title.replace(/^\d+\.\s*/, "")

type CampaignParams = {
    utmSource: string
    utmContent: string
    utmCampaign: string
}

const CAMPAIGN_STORAGE_KEY = "riccia_quiz_campaign"

const readCampaignUrl = (value: string): Partial<CampaignParams> => {
    if (!value) return {}
    try {
        const params = new URL(value).searchParams
        return {
            utmSource: params.get("utm_source") || "",
            utmContent: params.get("utm_content") || "",
            utmCampaign: params.get("utm_campaign") || "",
        }
    } catch {
        return {}
    }
}

const saveCampaignParams = (campaign: CampaignParams) => {
    try {
        sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign))
    } catch {
        // Tracking must never prevent the quiz from loading.
    }
}

const getCampaignParams = () => {
    const campaign: CampaignParams = {
        utmSource: "",
        utmContent: "",
        utmCampaign: "",
    }

    const mergeUrl = (value: string) => {
        const parsed = readCampaignUrl(value)
        campaign.utmSource ||= parsed.utmSource || ""
        campaign.utmContent ||= parsed.utmContent || ""
        campaign.utmCampaign ||= parsed.utmCampaign || ""
    }

    mergeUrl(window.location.href)
    mergeUrl(document.referrer)

    try {
        const stored = JSON.parse(sessionStorage.getItem(CAMPAIGN_STORAGE_KEY) || "{}")
        campaign.utmSource ||= stored.utmSource || ""
        campaign.utmContent ||= stored.utmContent || ""
        campaign.utmCampaign ||= stored.utmCampaign || ""
        saveCampaignParams(campaign)
    } catch {
        // Tracking must never prevent the quiz from loading.
    }

    return campaign
}

const CURL_IMAGES: Record<string, string[]> = {
    "onde": [
        "/images/kindAir/Onde%20morbide%201.webp",
        "/images/kindAir/Onde%20morbide%202%20upright.webp",
    ],
    "ricci-spirale": [
        "/foto%20ricci/2.png",
    ],
    "ricci-ribelli": [
        "/images/kindAir/Ricci%20irregolari%20e%20ribelli.webp",
    ],
    "ricci-stretti-afro": [
        "/images/kindAir/Ricci%20stretti%20o%20afro%201%20upright.webp",
    ],
    "ricci-s": [
        "/images/kindAir/Ricci%20a%20S%201%20upright.webp",
        "/images/kindAir/Ricci%20a%20S%202.webp",
    ],
}

const formSchema = z.object({
    guidaLavaggio: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    porosita: z.string({ required_error: "Seleziona una risposta" }).min(1, "Seleziona una risposta"),
    sts: z.array(z.string()).min(1, "Seleziona almeno una risposta"),
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

const buildQuizAnswers = (values: FormValues) =>
    domandeCMR.map(domanda => {
        const value = values[domanda.id]
        const selectedValues = Array.isArray(value) ? value : [value]
        const labels = domanda.opzioni
            .filter(opzione => selectedValues.includes(opzione.value))
            .map(opzione => opzione.label)

        return {
            id: domanda.id,
            question: domanda.titolo,
            value,
            label: labels.join(", "),
        }
    })

const TestForm = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const PAGEVIEW_URL = API_URL.replace(/\/subscribe\/?$/, "/pageview")
    const [quizSessionId] = useState(() => {
        const storageKey = "riccia_quiz_session_id"
        try {
            const stored = localStorage.getItem(storageKey)
            if (stored) return stored
            const created = crypto.randomUUID()
            localStorage.setItem(storageKey, created)
            return created
        } catch {
            return crypto.randomUUID()
        }
    })
    const [campaignParams, setCampaignParams] = useState(getCampaignParams)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [reply, setReply] = useState<string>("")
    const [prodottiTrovati, setProdottiTrovati] = useState<Prodotti[]>([])
    const [nomeRisultato, setNomeRisultato] = useState("")
    const [coupon, setCoupon] = useState<{ code: string; percent: number; expiresAt: string } | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState<"left" | "right">("right")
    const [formMessage, setFormMessage] = useState("")

    const isLeadStep = currentIndex === domandeCMR.length
    const domanda = isLeadStep ? null : domandeCMR[currentIndex]
    const domandaId = domanda?.id as DomandaID | undefined
    const questionCount = domandeCMR.length
    const isFirst = currentIndex === 0
    const isLast = isLeadStep

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guidaLavaggio: "",
            porosita: "",
            sts: [],
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
        const receiveCampaignContext = (event: MessageEvent) => {
            let hostname = ""
            try {
                hostname = new URL(event.origin).hostname
            } catch {
                return
            }

            if (hostname !== "laragazzariccia.com" && !hostname.endsWith(".laragazzariccia.com")) return
            if (event.data?.type !== "RICCIA_CAMPAIGN_CONTEXT") return

            const fromParentUrl = readCampaignUrl(String(event.data.url || ""))
            const incoming: CampaignParams = {
                utmSource: String(event.data.utmSource || fromParentUrl.utmSource || ""),
                utmContent: String(event.data.utmContent || fromParentUrl.utmContent || ""),
                utmCampaign: String(event.data.utmCampaign || fromParentUrl.utmCampaign || ""),
            }

            setCampaignParams(current => {
                const merged = {
                    utmSource: incoming.utmSource || current.utmSource,
                    utmContent: incoming.utmContent || current.utmContent,
                    utmCampaign: incoming.utmCampaign || current.utmCampaign,
                }
                saveCampaignParams(merged)
                return merged
            })
        }

        window.addEventListener("message", receiveCampaignContext)
        window.parent.postMessage({ type: "RICCIA_REQUEST_CAMPAIGN" }, "*")

        return () => window.removeEventListener("message", receiveCampaignContext)
    }, [])

    useEffect(() => {
        const curlImageUrls = [...new Set(Object.values(CURL_IMAGES).flat())]
        curlImageUrls.forEach(src => {
            const image = new Image()
            image.src = src
        })
    }, [])

    useEffect(() => {
        void fetch(PAGEVIEW_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sourceUrl: document.referrer || window.location.href,
            }),
            keepalive: true,
        }).catch(error => {
            console.warn("PageView tracking failed", error)
        })
    }, [PAGEVIEW_URL])

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


    async function onSubmit(): Promise<void> {
        const values = form.getValues()
        setFormMessage("")

        try {
            setIsSubmitting(true)

            const {
                testo,
                prodotti,
                consiglio: consiglioTrattamento,
                consiglioStyling: notaStyling,
                consiglioLavaggio: notaLavaggio,
                consiglioSTS,
            } = generaRutina(values)

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sessionId: quizSessionId,
                    sourceUrl: document.referrer || window.location.href,
                    ...campaignParams,
                    email: values.email,
                    name: values.nome,
                    newsletterConsent: values.newsletterConsent,
                    quizAnswers: buildQuizAnswers(values),
                    rutina: testo,
                    ...(consiglioTrattamento && { consiglio: consiglioTrattamento }),
                    ...(notaStyling && { consiglioStyling: notaStyling }),
                    ...(notaLavaggio && { consiglioLavaggio: notaLavaggio }),
                    ...(consiglioSTS.length > 0 && { consiglioSTS }),
                    prodotti: prodotti.map(p => ({
                        nome: p.nome,
                        descrizione: p.descrizione,
                        immagine: p.immagine.startsWith("/")
                            ? new URL(p.immagine, window.location.origin).href
                            : p.immagine,
                        link: p.link,
                    })),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.message || "Errore durante l'iscrizione")
            }

            if (!data?.coupon?.code || !data?.coupon?.percent || !data?.coupon?.expiresAt) {
                throw new Error("Il coupon non è stato ricevuto. Riprova.")
            }

            setReply(testo)
            setProdottiTrovati(prodotti)
            setNomeRisultato(values.nome)
            setCoupon(data.coupon)
        } catch (error) {
            setFormMessage(error instanceof Error ? error.message : "Si è verificato un errore. Riprova.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden p-2">
            <div className="relative flex w-full max-w-6xl items-center justify-center py-3 lg:min-h-180">
                {reply.length === 0 && (
                    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
                        <img
                            src="/images/prodottiriccia_1080x1080.webp"
                            alt=""
                            className="absolute left-2 top-28 w-44 -rotate-7 rounded-3xl object-cover shadow-[0_18px_35px_rgba(75,21,40,0.16)] xl:left-8 xl:w-52"
                        />
                        <img
                            src="/images/shampoo_sito_1080x1080.webp"
                            alt=""
                            className="absolute right-2 top-36 w-40 rotate-7 rounded-3xl object-cover shadow-[0_18px_35px_rgba(75,21,40,0.16)] xl:right-8 xl:w-48"
                        />
                        <div className="absolute right-0 top-24 max-w-48 -rotate-3 rounded-2xl bg-[#fbeaf0] px-5 py-3 text-left text-sm font-semibold leading-snug text-[#72243E] shadow-[0_12px_25px_rgba(75,21,40,0.12)]">
                            Sto sfidando le aspettative, non i ricci 🩷
                        </div>
                        <img
                            src="/images/balsamo_1080x1080.webp"
                            alt=""
                            className="absolute bottom-12 left-10 w-36 rotate-6 rounded-3xl object-cover shadow-[0_18px_35px_rgba(75,21,40,0.14)] xl:left-20 xl:w-44"
                        />
                        <img
                            src="/images/ChatGPTImage23apr2026_12_33_23_1080x1080.webp"
                            alt=""
                            className="absolute bottom-8 right-10 w-36 -rotate-6 rounded-3xl object-cover shadow-[0_18px_35px_rgba(75,21,40,0.14)] xl:right-20 xl:w-44"
                        />
                        <div className="absolute bottom-5 left-6 max-w-44 rotate-2 rounded-2xl bg-[#fbeaf0] px-5 py-3 text-left text-sm font-semibold leading-snug text-[#72243E] shadow-[0_12px_25px_rgba(75,21,40,0.12)] xl:left-14">
                            Ogni riccio ha il suo carattere.
                        </div>
                        <div className="absolute bottom-28 right-0 max-w-44 -rotate-3 rounded-2xl bg-[#fbeaf0] px-5 py-3 text-left text-sm font-semibold leading-snug text-[#72243E] shadow-[0_12px_25px_rgba(75,21,40,0.12)]">
                            Effetto crespo? Noi lo chiamiamo effetto wow.
                        </div>
                    </div>
                )}

                <div className={`${reply.length > 0 ? "hidden" : "flex"} relative z-10 mx-auto w-full max-w-2xl flex-col items-center justify-center gap-2`}>
                {reply.length === 0 && (
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <div className="relative overflow-hidden bg-white rounded-3xl shadow-sm" style={{ border: `1px solid ${PINK_MID}` }}>
                            <img
                                src="/images/balsamo_1080x1080.webp"
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-8 -left-8 z-0 size-40 -rotate-12 rounded-3xl object-cover opacity-15 blur-[2px] lg:hidden"
                            />
                            {currentIndex === 0 && (
                            <div className="relative z-10 px-5 pt-5 pb-3" style={{ borderBottom: `1px solid ${PINK_LIGHT}` }}>
                                <div className="mb-1.5 flex flex-col items-center gap-1.5">

                                    <h1 className="text-base font-semibold" style={{ color: TEXT_DARK }}>
                                        Fai il Test: Conosco i miei ricci
                                    </h1>
                                </div>
                                <p className="mx-auto max-w-md text-center text-sm" style={{ color: TEXT_SOFT }}>
                                    Non esiste una routine perfetta per tutte. Esiste quella giusta per te: scoprila ora.
                                </p>
                            </div>
                            )}

                            <div className="relative z-10 flex flex-col gap-2.5 px-5 pt-4">
                                <span className="text-start text-xs font-semibold uppercase tracking-wide" style={{ color: TEXT_SOFT }}>
                                    {isLeadStep ? "Invio risultato" : `Domanda ${currentIndex + 1} di ${domandeCMR.length}`}
                                </span>
                                <div className="grid w-full gap-1.5" style={{ gridTemplateColumns: `repeat(${questionCount}, minmax(0, 1fr))` }} aria-label={`Progresso: ${Math.min(currentIndex + 1, questionCount)} di ${questionCount}`}>
                                    {Array.from({ length: questionCount }).map((_, i) => (
                                        <div key={i} className="h-1 rounded-full transition-all duration-500"
                                            style={{ background: i <= Math.min(currentIndex, questionCount - 1) ? PINK : PINK_LIGHT }} />
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 px-5 pt-3 pb-2 min-h-60">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: direction === "right" ? 40 : -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: direction === "right" ? -40 : 40 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="flex flex-col gap-3"
                                    >
                                        {!isLeadStep && domanda && domandaId && (
                                            <>
                                                <div>
                                                    <h2 className="text-center text-lg font-semibold mb-1" style={{ color: TEXT_DARK }}>
                                                        {domandaId === "personalitaRicci" ? domanda.titolo : cleanQuestionTitle(domanda.titolo)}
                                                    </h2>
                                                    {domanda.descrizione && (
                                                        <p className="text-start text-sm leading-relaxed" style={{ color: TEXT_MID }}>
                                                            {domanda.descrizione}
                                                        </p>
                                                    )}
                                                </div>

                                                {domandaId === "sts" ? (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group">
                                                        {domanda.opzioni.map((opzione, optionIndex) => {
                                                            const selectedValues = form.watch("sts")
                                                            const checked = selectedValues.includes(opzione.value)
                                                            const Icon = OPTION_ICONS.sts[optionIndex]

                                                            return (
                                                                <label
                                                                    key={opzione.id}
                                                                    htmlFor={opzione.id}
                                                                    className="relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl p-3.5 cursor-pointer text-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                                                                    style={{
                                                                        border: `1.5px solid ${checked ? PINK : PINK_MID}`,
                                                                        background: checked ? PINK_LIGHT : "white",
                                                                    }}
                                                                >
                                                                    <input
                                                                        id={opzione.id}
                                                                        type="checkbox"
                                                                        checked={checked}
                                                                        onChange={() => {
                                                                            const nextValues = opzione.value === "nessuna"
                                                                                ? (checked ? [] : ["nessuna"])
                                                                                : checked
                                                                                    ? selectedValues.filter(value => value !== opzione.value)
                                                                                    : [
                                                                                        ...selectedValues.filter(value => value !== "nessuna"),
                                                                                        opzione.value,
                                                                                    ]

                                                                            form.setValue("sts", nextValues, { shouldValidate: true })
                                                                            setFormMessage("")
                                                                        }}
                                                                        className="absolute right-3 top-3 size-4 shrink-0"
                                                                        style={{ accentColor: PINK }}
                                                                    />
                                                                    <span className="flex size-10 items-center justify-center rounded-full" style={{ background: PINK_LIGHT, color: TEXT_SOFT }}>
                                                                        <Icon size={19} strokeWidth={1.9} />
                                                                    </span>
                                                                    <span className="max-w-112 text-sm leading-snug font-semibold" style={{ color: checked ? TEXT_DARK : TEXT_MID }}>
                                                                        {opzione.label}
                                                                    </span>
                                                                </label>
                                                            )
                                                        })}
                                                    </div>
                                                ) : domandaId === "personalitaRicci" ? (
                                                    <RadioGroup
                                                        value={form.watch(domandaId)}
                                                        onValueChange={(v) => {
                                                            form.setValue(domandaId, v, { shouldValidate: true })
                                                            setFormMessage("")
                                                        }}
                                                        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                                                    >
                                                        {domanda.opzioni.map((opzione) => {
                                                            const checked = form.watch(domandaId) === opzione.value
                                                            const images = CURL_IMAGES[opzione.value] ?? []
                                                            return (
                                                                <label
                                                                    key={opzione.id}
                                                                    htmlFor={opzione.id}
                                                                    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                                                                    style={{
                                                                        border: `1.5px solid ${checked ? PINK : PINK_MID}`,
                                                                        background: checked ? "#fff8fb" : "white",
                                                                        boxShadow: checked ? "0 12px 28px rgba(233, 33, 118, 0.14)" : "0 5px 16px rgba(75, 21, 40, 0.06)",
                                                                    }}
                                                                >
                                                                    <span
                                                                        className="grid aspect-square w-full overflow-hidden bg-pink-50"
                                                                        style={{ gridTemplateColumns: `repeat(${images.length || 1}, minmax(0, 1fr))` }}
                                                                    >
                                                                        {images.map((image, imageIndex) => (
                                                                            <img
                                                                                key={image}
                                                                                src={image}
                                                                                alt={`${opzione.label}, esempio ${imageIndex + 1}`}
                                                                                loading="lazy"
                                                                                className="h-full min-h-0 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                                            />
                                                                        ))}
                                                                    </span>
                                                                    <RadioGroupItem
                                                                        value={opzione.value}
                                                                        id={opzione.id}
                                                                        className="absolute right-3 top-3 z-10 size-6 bg-white shadow-sm"
                                                                        style={{ color: PINK, borderColor: checked ? PINK : "white" } as React.CSSProperties}
                                                                    />
                                                                    <span className="px-3 py-3 text-sm leading-snug font-semibold" style={{ color: checked ? TEXT_DARK : TEXT_MID }}>
                                                                        {opzione.label}
                                                                    </span>
                                                                </label>
                                                            )
                                                        })}
                                                    </RadioGroup>
                                                ) : (
                                                    <RadioGroup
                                                        value={form.watch(domandaId)}
                                                        onValueChange={(v) => {
                                                            form.setValue(domandaId, v, { shouldValidate: true })
                                                            setFormMessage("")
                                                        }}
                                                        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                                                    >
                                                        {domanda.opzioni.map((opzione, optionIndex) => {
                                                            const checked = form.watch(domandaId) === opzione.value
                                                            const Icon = OPTION_ICONS[domandaId as Exclude<DomandaID, "personalitaRicci">][optionIndex]
                                                            return (
                                                                <label
                                                                    key={opzione.id}
                                                                    htmlFor={opzione.id}
                                                                    className="relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl p-3.5 cursor-pointer text-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                                                                    style={{
                                                                        border: `1.5px solid ${checked ? PINK : PINK_MID}`,
                                                                        background: checked ? "#fff8fb" : "white",
                                                                        boxShadow: checked ? "0 10px 24px rgba(233, 33, 118, 0.10)" : undefined,
                                                                    }}
                                                                >
                                                                    <RadioGroupItem
                                                                        value={opzione.value}
                                                                        id={opzione.id}
                                                                        className="absolute right-3 top-3 size-4"
                                                                        style={{ color: PINK, borderColor: checked ? PINK : PINK_MID } as React.CSSProperties}
                                                                    />
                                                                    <span className="flex size-10 items-center justify-center rounded-full" style={{ background: PINK_LIGHT, color: TEXT_SOFT }}>
                                                                        <Icon size={19} strokeWidth={1.9} />
                                                                    </span>
                                                                    <span className="max-w-112 text-sm leading-snug font-semibold" style={{ color: checked ? TEXT_DARK : TEXT_MID }}>
                                                                        {opzione.label}
                                                                    </span>
                                                                </label>
                                                            )
                                                        })}
                                                    </RadioGroup>
                                                )}

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
                                                    <h1 className="text-3xl lg:text-4xl font-semibold" style={{ color: TEXT_DARK }}>
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
                                <div className="relative z-10 mx-6 mb-4 rounded-2xl p-5 text-center" style={{ background: PINK_LIGHT, border: `1px solid ${PINK_MID}` }}>
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
                                <div className="relative z-10 px-5 pb-5 pt-1.5 flex flex-col gap-2.5">
                                    <div className="flex justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={prevQuestion}
                                            disabled={isFirst}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition-all duration-150 disabled:opacity-30 cursor-pointer"
                                            style={{ border: `1.5px solid ${PINK_MID}`, color: TEXT_MID, background: "white" }}
                                        >
                                            <ArrowLeft size={14} />
                                            Indietro
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
                <Reply
                    nome={nomeRisultato}
                    prodotti={prodottiTrovati}
                    coupon={coupon}
                />
            )}
            </div>
        </div>
    )
}

export default TestForm
