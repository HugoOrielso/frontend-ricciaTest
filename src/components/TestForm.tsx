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


    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 container max-w-2xl mx-auto px-4 pb-12">
            <h1 className="text-2xl font-bold  mb-6 border-b border-[#E92176]/20 pb-4">Conosco i Miei Ricci</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 container max-w-2xl mx-auto px-4 pb-12">

                {/* 1. Cuoio capelluto */}
                <div className="space-y-4 items-start justify-start flex flex-col">
                    <h2 className="text-lg font-semibold ">1. Oleosità del cuoio capelluto</h2>
                    <p className="mb-2 text-left">
                        Cosa succede al tuo cuoio capelluto dopo 2-3 giorni dal lavaggio?{" "}
                        <span className="text-red-500 font-bold">*</span>
                    </p>

                    <RadioGroup
                        required
                        onValueChange={(value: string) => form.setValue("cuoioCapelluto", value)}
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="rimane-secco"
                                id="rimane-secco"
                            />
                            <Label htmlFor="rimane-secco">Rimane secco, sento tensione e prurito</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="normale"
                                id="normale"
                            />
                            <Label htmlFor="normale">È normale, non noto nulla di strano</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]" value="unto" id="unto" />
                            <Label htmlFor="unto">Si unge e inizia a pizzicare/prudere</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="giorni-dopo"
                                id="giorni-dopo"
                            />
                            <Label htmlFor="giorni-dopo">Dopo 1 giorno già grasso/unto</Label>
                        </div>
                    </RadioGroup>
                    {!form.getValues("cuoioCapelluto") && form.formState.isSubmitted && (
                        <p className="text-red-500 text-sm mt-1">Seleziona un'opzione</p>
                    )}
                    {form.formState.errors.cuoioCapelluto && (
                        <p className="text-red-500 text-sm">{form.formState.errors.cuoioCapelluto.message}</p>
                    )}
                </div>

                {/* 2. Spessore del capello */}
                <div className="space-y-4 items-start justify-start flex flex-col">
                    <h2 className="text-lg font-semibold ">2. Spessore del capello</h2>
                    <p className="mb-2 text-left">
                        Prendi un solo capello tra le dita. Come lo senti? <span className="text-red-500 font-bold">*</span>
                    </p>

                    <RadioGroup
                        required
                        onValueChange={(value: string) => form.setValue("spessoreCapello", value)}
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="sottile"
                                id="sottile"
                            />
                            <Label htmlFor="sottile">Sottile come un filo d'erba</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="medio"
                                id="medio"
                            />
                            <Label htmlFor="medio">Medio, lo sento ma non troppo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="grosso"
                                id="grosso"
                            />
                            <Label htmlFor="grosso">Grosso come un filo di nylon</Label>
                        </div>
                    </RadioGroup>
                    {!form.getValues("spessoreCapello") && form.formState.isSubmitted && (
                        <p className="text-red-500 text-sm mt-1">Seleziona un'opzione</p>
                    )}
                    {form.formState.errors.spessoreCapello && (
                        <p className="text-red-500 text-sm">{form.formState.errors.spessoreCapello.message}</p>
                    )}
                </div>

                {/* 3. Porosità */}
                <div className="space-y-4 items-start justify-start flex flex-col">
                    <h2 className="text-lg font-semibold ">3. Porosità</h2>
                    <p className="mb-2 text-left">
                        Quando applichi il balsamo, come reagiscono i tuoi capelli?{" "}
                        <span className="text-red-500 font-bold">*</span>
                    </p>

                    <RadioGroup
                        required
                        onValueChange={(value: string) => form.setValue("porosita", value)}
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="assorbono"
                                id="assorbono"
                            />
                            <Label htmlFor="assorbono">Lo assorbono subito e sembrano asciutti</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="ci-mettono"
                                id="ci-mettono"
                            />
                            <Label htmlFor="ci-mettono">Ci mettono un po' per diventare morbidi</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="rimane-sulla"
                                id="rimane-sulla"
                            />
                            <Label htmlFor="rimane-sulla">Rimane sulla "superficie" e scivolano via</Label>
                        </div>
                    </RadioGroup>
                    {!form.getValues("porosita") && form.formState.isSubmitted && (
                        <p className="text-red-500 text-sm mt-1">Seleziona un'opzione</p>
                    )}
                    {form.formState.errors.porosita && (
                        <p className="text-red-500 text-sm">{form.formState.errors.porosita.message}</p>
                    )}
                </div>

                {/* 4. STS */}
                <div className="space-y-4 items-start justify-start flex flex-col">
                    <h2 className="text-lg font-semibold ">4. STS - Stile di vita, Trattamenti, Salute</h2>
                    <p className="mb-2 text-left">
                        Negli ultimi 3 mesi, quale di questi ti rappresenta di più?{" "}
                        <span className="text-red-500 font-bold">*</span>
                    </p>

                    <RadioGroup required onValueChange={(value: string) => form.setValue("sts", value)} className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="cambi-capigliatura"
                                id="cambi-capigliatura"
                            />
                            <Label htmlFor="cambi-capigliatura">Ho fatto cambi capigliatura (decolorazioni)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="stress"
                                id="stress"
                            />
                            <Label htmlFor="stress">Ho avuto stress ormonali, stress o caduta</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="cura-nulla"
                                id="cura-nulla"
                            />
                            <Label htmlFor="cura-nulla">Non curo molto i miei ricci</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="routine"
                                id="routine"
                            />
                            <Label htmlFor="routine">Ho una routine costante, ma non vedo risultati</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="nessuno"
                                id="nessuno"
                            />
                            <Label htmlFor="nessuno">Nessuno di questi</Label>
                        </div>
                    </RadioGroup>
                    {!form.getValues("sts") && form.formState.isSubmitted && (
                        <p className="text-red-500 text-sm mt-1">Seleziona un'opzione</p>
                    )}
                    {form.formState.errors.sts && <p className="text-red-500 text-sm">{form.formState.errors.sts.message}</p>}
                </div>

                {/* 5. Densità */}
                <div className="space-y-4 items-start justify-start flex flex-col">
                    <h2 className="text-lg font-semibold ">5. Densità</h2>
                    <p className="mb-2 text-left">
                        Quando ti guardi allo specchio a capelli asciutti, pensi che i tuoi capelli siano...{" "}
                        <span className="text-red-500 font-bold">*</span>
                    </p>

                    <RadioGroup required onValueChange={(value: string) => form.setValue("densita", value)} className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="pochi"
                                id="pochi"
                            />
                            <Label htmlFor="pochi">Pochi, vedo spesso la cute</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="normali"
                                id="normali"
                            />
                            <Label htmlFor="normali">Normali, la cute si vede poco</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="tanti"
                                id="tanti"
                            />
                            <Label htmlFor="tanti">Tanti, non si vede nulla e sembrano una nuvola</Label>
                        </div>
                    </RadioGroup>
                    {!form.getValues("densita") && form.formState.isSubmitted && (
                        <p className="text-red-500 text-sm mt-1">Seleziona un'opzione</p>
                    )}
                    {form.formState.errors.densita && (
                        <p className="text-red-500 text-sm">{form.formState.errors.densita.message}</p>
                    )}
                </div>

                {/* 6. Personalità dei ricci */}
                <div className="space-y-4 items-start justify-start flex flex-col">
                    <h2 className="text-lg font-semibold ">6. Personalità dei ricci</h2>
                    <p className="mb-2 text-left">
                        Come si comportano i tuoi ricci nella vita reale? <span className="text-red-500 font-bold">*</span>
                    </p>

                    <RadioGroup
                        required
                        onValueChange={(value: string) => form.setValue("personalitaRicci", value)}
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="carattere"
                                id="carattere"
                            />
                            <Label htmlFor="carattere">Ogni riccio ha il suo carattere, fanno come vogliono</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="coerenti"
                                id="coerenti"
                            />
                            <Label htmlFor="coerenti">Sono coerenti e ordinati, ma si gonfiano facilmente</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="definiti"
                                id="definiti"
                            />
                            <Label htmlFor="definiti">Molto definiti, ma tendono al crespo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="text-[#E92176] border-[#E92176] focus:ring-[#E92176]"
                                value="mossi"
                                id="mossi"
                            />
                            <Label htmlFor="mossi">Mossi, quasi lisci</Label>
                        </div>
                    </RadioGroup>
                    {!form.getValues("personalitaRicci") && form.formState.isSubmitted && (
                        <p className="text-red-500 text-sm mt-1">Seleziona un'opzione</p>
                    )}
                    {form.formState.errors.personalitaRicci && (
                        <p className="text-red-500 text-sm">{form.formState.errors.personalitaRicci.message}</p>
                    )}
                </div>

                {/* Email e Nome */}
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
                            <div className="w-12 h-12 rounded-full bg-[#e87db5] flex items-center justify-center text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-xl text-left font-medium text-pretty text-[#5D4037]">{reply}</h3>

                            <p className="text-gray-600">
                                Abbiamo creato una routine personalizzata basata sulle tue risposte. Ecco i prodotti consigliati per i tuoi ricci:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                                {prodottiTrovati.map((prodotto, index) => (
                                    <div
                                        key={index}
                                        className="bg-white flex-col p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3"
                                    >
                                        <div>
                                            <img className="aspect-square rounded object-cover" src={prodotto.immagine} alt={prodotto.nome} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{prodotto.nome}</h4>
                                            <p className="text-sm text-gray-500"> {prodotto.descrizione} </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

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