/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { prodottiDisponibili } from "@/Data/Prodotti"
import { domandeCMR, type DomandaID } from "./data"
import { type EmblaOptionsType } from "embla-carousel"
import EmblaCarousel from './EmblaCarrousel'
import '../assets/base.css'
import '../assets/embla.css'
const formSchema = z.object({
    cuoioCapelluto: z.string({
        required_error: "Seleziona una risposta",
    }),
    spessoreCapello: z.string({
        required_error: "Seleziona una risposta",
    }),
    porosita: z.string({
        required_error: "Seleziona una risposta",
    }),
    sts: z.string({
        required_error: "Seleziona una risposta",
    }),
    densita: z.string({
        required_error: "Seleziona una risposta",
    }),
    personalitaRicci: z.string({
        required_error: "Seleziona una risposta",
    }),
    email: z.string().email({
        message: "Inserisci un indirizzo email valido",
    }),
    nome: z.string().min(1, {
        message: "Inserisci il tuo nome",
    }),
})

type FormValues = z.infer<typeof formSchema>

const TestForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [reply, setReply] = useState<string>('')
    const [prodottiTrovati, setProdottiTrovati] = useState<Prodotti[]>([])
    function resetTest() {
        setIsSubmitting(false)
        setReply('')
    }

    function findProducts(text: string): Prodotti[] {
        return prodottiDisponibili.filter((p: Prodotti) =>
            text.toLowerCase().includes(p.nome.toLowerCase())
        )
    }
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuoioCapelluto: "",
            spessoreCapello: "",
            porosita: "",
            sts: "",
            densita: "",
            personalitaRicci: "",
            email: "",
            nome: "",
        },
    })

    async function onSubmit(values: FormValues): Promise<void> {
        const requiredFields: Array<keyof FormValues> = [
            "cuoioCapelluto",
            "spessoreCapello",
            "porosita",
            "sts",
            "densita",
            "personalitaRicci",
        ]

        const missingFields = requiredFields.filter((field) => !values[field])

        if (missingFields.length > 0) {
            toast.message('Campi obbligatori mancanti', {
                description: "Per favore, seleziona un'opzione per ogni domanda.",
            })
            return
        }

        setIsSubmitting(true)
        try {
            const request = await fetch("https://backend-riccia-test.vercel.app/api/chat", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values)
            })

            if (request.status === 200) {
                const response = await request.json()
                const testoRisposta = response.reply

                toast.success("Grazie per aver completato il test.")
                setReply(testoRisposta)

                const foundedProducts = findProducts(testoRisposta)
                setProdottiTrovati(foundedProducts)
            }
        } catch (error) {
            toast.error("Si è verificato un errore durante l'invio del test. Riprova più tardi.")
        } finally {
            setIsSubmitting(false)
        }
    }
    const OPTIONS: EmblaOptionsType = { loop: true }
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 container max-w-2xl mx-auto px-4 pb-12">
            <h1 className="text-2xl font-bold  mb-6 border-b border-[#E92176]/20 pb-4">Conosco i Miei Ricci</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 container max-w-2xl mx-auto px-4 pb-12">

                {domandeCMR.map((domanda) => {
                    const domandaId = domanda.id as DomandaID;
                    return (
                        <div key={domanda.id} className="space-y-4 items-start justify-start flex flex-col">
                            <h2 className="text-lg font-semibold">{domanda.titolo}</h2>
                            <p className="mb-2 text-left">
                                {domanda.descrizione} <span className="text-red-500 font-bold">*</span>
                            </p>

                            <RadioGroup
                                required
                                onValueChange={(value: string) => form.setValue(domandaId, value)}
                                className="space-y-2"
                            >
                                {domanda.opzioni.map((opzione) => (
                                    <div key={opzione.id} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                            value={opzione.value}
                                            id={opzione.id}
                                        />
                                        <Label htmlFor={opzione.id}> <span className="text-left items-start flex">{opzione.label}</span> </Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            {!form.getValues(domandaId) && form.formState.isSubmitted && (
                                <p className="text-red-500 text-sm mt-1">Seleziona un'opzione</p>
                            )}

                            {form.formState.errors[domandaId] && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors[domandaId]?.message}
                                </p>
                            )}
                        </div>
                    );
                })}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Inserisci la tua email *</Label>
                        <Input
                            className="border-gray-300 focus:border-[#E92176] focus:ring-[#E92176]"
                            id="email"
                            type="email"
                            required
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="nome">Inserisci il tuo nome *</Label>
                        <Input
                            className="border-gray-300 focus:border-[#E92176] focus:ring-[#E92176]"
                            id="nome"
                            type="text"
                            required
                            {...form.register("nome")}
                        />
                        {form.formState.errors.nome && <p className="text-red-500 text-sm">{form.formState.errors.nome.message}</p>}
                    </div>
                </div>

                {isSubmitting && (
                    <div className="p-6 border border-[#E92176]/20 rounded-lg bg-[#E92176]/10 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 rounded-full border-4 border-[#E92176] border-t-transparent animate-spin"></div>
                            <h3 className="text-xl font-medium ">Creando la tua routine personalizzata...</h3>
                            <p className="text-gray-600">
                                Stiamo analizzando le tue risposte per creare la routine perfetta per i tuoi ricci.
                            </p>
                        </div>
                    </div>
                )}

                {reply.length > 0 && (
                    <div className="p-6 border border-[#e87db5]/20 rounded-lg bg-[#e87db5]/10 text-center animate-fadeIn">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className=" ">
                                <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-pink-100 to-pink-200 pb-2"><div className="flex items-center gap-2"><div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-pink-500 text-white px-3 py-1" data-v0-t="badge"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check w-4 h-4 mr-1"><path d="M20 6 9 17l-5-5"></path></svg>Personalizzato</div><h2 className="text-lg font-semibold text-pink-800">La tua routine per capelli ricci</h2></div><p className="text-sm text-pink-700 mt-2">Routine generata in tempo reale con il nostro assistente AI addestrato da La Ragazza Riccia</p></div>
                            </div>
                            <div className="text-left flex w-full space-y-1 text-[#5D4037]">
                                <ul className="list-disc list-inside space-y-1">
                                    {reply
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
                                prodottiTrovati.length > 0 &&
                                <EmblaCarousel slides={prodottiTrovati} options={OPTIONS} />
                            }

                            <button
                                onClick={resetTest}
                                className="mt-4 bg-white border cursor-pointer border-[#e87db5] text-[#e87db5] hover:bg-[#e87db5] hover:text-white transition-colors duration-200 px-4 py-2 rounded-md"
                            >
                                Torna al test
                            </button>
                        </div>
                    </div>
                )}

                {
                    (!isSubmitting && reply.length === 0) &&
                    (
                        <Button
                            type="submit"
                            className="bg-[#E92176] cursor-pointer hover:bg-[#d66da5] text-white font-medium py-2 px-6 rounded-md w-full"
                        >
                            Inviare
                        </Button>
                    )
                }
            </form>
        </div>
    )
}

export default TestForm



