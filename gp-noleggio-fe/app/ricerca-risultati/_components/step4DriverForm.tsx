"use client";

import { useEffect, useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout.store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import CountryCodeSelect, { type CountryCode } from "@/components/CountryCodeSelect";

/** Applica la maschera GG/MM/AAAA mentre l'utente digita */
function maskDate(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

const driverSchema = z.object({
    nome: z.string().min(2, "Minimo 2 caratteri").regex(/^[A-Za-zÀ-ÿ\s']+$/, "Solo lettere, spazi e apostrofi ammessi"),
    cognome: z.string().min(2, "Minimo 2 caratteri").regex(/^[A-Za-zÀ-ÿ\s']+$/, "Solo lettere, spazi e apostrofi ammessi"),
    dataNascita: z.string()
        .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/, "Formato non valido (GG/MM/AAAA)")
        .refine((dateStr) => {
            const [day, month, year] = dateStr.split('/').map(Number);
            const birthDate = new Date(year, month - 1, day);
            const today = new Date();

            // Calculate age
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            return age >= 18;
        }, "Devi avere almeno 18 anni"),
    email: z.string().email("Email non valida"),
    telefono: z.string().min(9, "Numero troppo corto").regex(/^[0-9]+$/, "Solo numeri ammessi"),
    codiceFiscale: z.string().regex(/^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/i, "Codice fiscale non valido"),
    numeroVolo: z.string().optional(),
    programmaFedelta: z.string().optional(),
    privacyInfo: z.boolean().optional(),
    marketing: z.boolean().optional(),
    codicePromo: z.string().optional(),
});

type DriverFormValues = z.infer<typeof driverSchema>;

export default function Step4DriverForm() {
    const conducente = useCheckoutStore((s) => s.conducente);
    const setConducente = useCheckoutStore((s) => s.setConducente);

    const codicePromo = useCheckoutStore((s) => s.search.codicePromo);
    const setCodicePromo = useCheckoutStore((s) => s.setCodicePromo);

    const setTermini = useCheckoutStore((s) => s.setTermini);
    const setTriggerDriverValidation = useCheckoutStore((s) => s.setTriggerDriverValidation);
    
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>({
        code: "IT",
        flag: "🇮🇹",
        name: "Italia",
        phone: "+39",
    });

    const form = useForm<DriverFormValues>({
        resolver: zodResolver(driverSchema),
        defaultValues: {
            nome: conducente.nome,
            cognome: conducente.cognome,
            dataNascita: conducente.dataNascita,
            email: conducente.email,
            telefono: conducente.telefono,
            codiceFiscale: conducente.codiceFiscale,
            numeroVolo: conducente.numeroVolo ?? "",
            programmaFedelta: conducente.programmaFedelta ?? "",
            privacyInfo: conducente.privacyInfo,
            marketing: conducente.marketing,
            codicePromo: codicePromo ?? "",
        },
        mode: "onBlur",
    });

    const { control, handleSubmit, watch, trigger } = form;

    // Registra la funzione di trigger nello store così step4Payment può attivarla
    useEffect(() => {
        setTriggerDriverValidation(trigger);
        return () => setTriggerDriverValidation(undefined);
    }, [trigger, setTriggerDriverValidation]);

    // ⬇️ stati per i “dropdown”
    const [openFedelta, setOpenFedelta] = useState(false);
    const [openCoupon, setOpenCoupon] = useState(false);


    useEffect(() => {
        const subscription = watch((values) => {
            setConducente({
                nome: values.nome ?? "",
                cognome: values.cognome ?? "",
                dataNascita: values.dataNascita ?? "",
                email: values.email ?? "",
                telefono: values.telefono ?? "",
                codiceFiscale: values.codiceFiscale ?? "",
                numeroVolo: values.numeroVolo || undefined,
                privacyInfo: Boolean(values.privacyInfo),
                marketing: Boolean(values.marketing),
                programmaFedelta: values.programmaFedelta ?? "",
            });
            setCodicePromo(values.codicePromo || undefined);
        });

        return () => subscription.unsubscribe();
    }, [watch, setConducente, setCodicePromo]);

    const onSubmit = handleSubmit(() => { });

    return (
        <div id="driver-form-section" className="bg-[#F7F7F7] p-6 w-full rounded-tl-3xl rounded-br-3xl shadow-sm">
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    {/* Titolo */}
                    <h2 className="font-bold text-xl text-gray-900 mb-6">
                        Dettagli del conducente
                    </h2>

                    {/* Campi */}
                    <div className="space-y-3">
                        <FormField
                            control={control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-semibold text-gray-700">
                                        Nome*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-9 bg-white uppercase"
                                            placeholder="Es. Luigi"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="cognome"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-semibold text-gray-700">
                                        Cognome*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-9 bg-white uppercase"
                                            placeholder="Es. Rossi"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="dataNascita"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-semibold text-gray-700">
                                        Data di nascita*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-9 bg-white"
                                            placeholder="GG/MM/AAAA"
                                            inputMode="numeric"
                                            maxLength={10}
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(maskDate(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-semibold text-gray-700">
                                        E-mail*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-9 bg-white"
                                            placeholder="nome@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600" />
                                </FormItem>
                            )}
                        />

                        {/* Checkbox */}
                        <div className="pt-1 space-y-3">
                            <FormField
                                control={control}
                                name="privacyInfo"
                                render={({ field }) => (
                                    <FormItem className="flex items-start gap-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={Boolean(field.value)}
                                                onCheckedChange={field.onChange}
                                                className="mt-0.5 border-[#0700DE] data-[state=checked]:bg-[#0700DE]"
                                            />
                                        </FormControl>
                                        <FormLabel className="text-xs leading-4 text-gray-500 font-normal cursor-pointer">
                                            Desidero ricevere informazioni e offerte speciali e acconsento al trattamento dei dati forniti.
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="marketing"
                                render={({ field }) => (
                                    <FormItem className="flex items-start gap-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={Boolean(field.value)}
                                                onCheckedChange={field.onChange}
                                                className="mt-0.5 border-[#0700DE] data-[state=checked]:bg-[#0700DE]"
                                            />
                                        </FormControl>
                                        <FormLabel className="text-xs leading-4 text-gray-500 font-normal cursor-pointer">
                                            Presto il mio consenso per ricevere comunicazioni marketing.
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Telefono */}
                        <FormField
                            control={control}
                            name="telefono"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-semibold text-gray-700">
                                        Numero di telefono*
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            <CountryCodeSelect
                                                value={selectedCountry.code}
                                                onChange={setSelectedCountry}
                                            />
                                            <Input
                                                className="h-9 bg-white"
                                                placeholder="Numero di telefono"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="codiceFiscale"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-sm font-semibold text-gray-700">
                                        Codice fiscale*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-9 bg-white uppercase"
                                            placeholder="Es. RSSL..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px bg-gray-200" />

                    {/* Info volo */}
                    <div className="flex items-center gap-2 mb-3 mt-8">
                        <p className="font-bold text-base text-gray-900">Informazioni sul volo</p>
                        <Info className="w-4 h-4 text-[#0700DE]" />
                    </div>

                    <FormField
                        control={control}
                        name="numeroVolo"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                    Numero di volo
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-9 bg-white"
                                        placeholder="Es. AZ 1230"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-red-600" />
                            </FormItem>
                        )}
                    />

                    {/* Programma fedeltà */}
                    <DropdownRow
                        label="Fai parte di un programma fedeltà?"
                        open={openFedelta}
                        onToggle={() => setOpenFedelta(!openFedelta)}
                    />

                    {openFedelta && (
                        <FormField
                            control={control}
                            name="programmaFedelta"
                            render={({ field }) => (
                                <FormItem className="space-y-1 mt-2">
                                    <FormControl>
                                        <Input
                                            className="h-9 bg-white"
                                            placeholder="Es. Miles&More"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-600" />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Coupon */}
                    <DropdownRow
                        label="Aggiungi un Codice Coupon"
                        open={openCoupon}
                        onToggle={() => setOpenCoupon(!openCoupon)}
                    />

                    {openCoupon && (
                        <div className="mt-2 space-y-2">
                            <FormField
                                control={control}
                                name="codicePromo"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Input
                                                className="h-9 bg-white"
                                                placeholder="Inserisci coupon"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" className="h-9 w-full">
                                Applica coupon
                            </Button>
                        </div>
                    )}

                </form>
            </Form>
        </div>
    );
}

function DropdownRow({
    label,
    open,
    onToggle,
}: {
    label: string;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between py-2 text-sm font-bold text-gray-900 border-b border-gray-100"
        >
            {label}
            <ChevronDown
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
        </button>
    );
}
