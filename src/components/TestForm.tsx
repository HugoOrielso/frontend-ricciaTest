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
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react"
import Reply from "./Reply"

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const domanda = domandeCMR[currentIndex];
    const domandaId = domanda.id as DomandaID;
    const [direction, setDirection] = useState<"left" | "right">("right");

    const nextQuestion = () => {
        if (currentIndex < domandeCMR.length - 1) {
            setDirection("right");
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setDirection("left");
            setCurrentIndex((prev) => prev - 1);
        }
    };

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

    return (
        <div className=" container min-h-screen flex items-center justify-center max-w-3xl mx-auto ">
            {
                reply.length === 0 &&

                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md flex flex-col justify-between space-y-8 min-h-[400px] container max-w-2xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-6 border-b border-[#E92176]/20 pb-4">Conosco i Miei Ricci</h1>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 items-start min-h-full justify-start flex flex-col"
                        >
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
                                        <Label htmlFor={opzione.id}>
                                            <span className="text-left items-start flex">{opzione.label}</span>
                                        </Label>
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

                            {currentIndex === domandeCMR.length - 1 && (
                                <div className="space-y-4 w-full">
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
                                            <p className="text-red-500 text-sm">
                                                {form.formState.errors.email.message}
                                            </p>
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
                                        {form.formState.errors.nome && (
                                            <p className="text-red-500 text-sm">
                                                {form.formState.errors.nome.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>


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

                    {
                        (!isSubmitting && reply.length === 0) &&
                        (
                            <div>


                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevQuestion}
                                        disabled={currentIndex === 0}
                                        className={`p-1 rounded-full cursor-pointer  ${currentIndex === 0 ? 'bg-gray-200' : 'bg-[#E92176]'} rounded disabled:opacity-50 text-white`}
                                    >
                                        <ArrowLeft />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextQuestion}
                                        disabled={currentIndex === domandeCMR.length - 1}
                                        className={`p-1 rounded-full cursor-pointer  bg-[#E92176] ${currentIndex === domandeCMR.length - 1 ? 'bg-gray-200' : 'bg-[#E92176]'} text-white rounded`}
                                    >
                                        <ArrowRight />
                                    </button>
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-[#E92176] cursor-pointer hover:bg-[#d66da5] text-white font-medium py-2 px-6 rounded-md w-full"
                                >
                                    Inviare
                                </Button>
                            </div>
                        )
                    }
                </form>
            }

            {reply.length > 0 && (
                <Reply message={reply} prodotti={prodottiTrovati} resetTest={resetTest}  />
            )}
        </div>
    )
}

export default TestForm



