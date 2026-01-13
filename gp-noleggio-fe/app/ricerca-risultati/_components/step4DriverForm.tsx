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

const driverSchema = z.object({
    nome: z.string().min(1, "Nome obbligatorio"),
    cognome: z.string().min(1, "Cognome obbligatorio"),
    dataNascita: z.string().min(1, "Data di nascita obbligatoria"),
    email: z.string().email("Email non valida"),
    telefono: z.string().min(1, "Telefono obbligatorio"),
    codiceFiscale: z.string().min(1, "Codice fiscale obbligatorio"),
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

    const { control, handleSubmit, watch } = form;

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

    const onSubmit = handleSubmit(() => {});

    return (
        <div className="bg-[#F7F7F7] p-6 w-full rounded-tl-3xl rounded-br-3xl shadow-sm">
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
                                    className="h-9 bg-white"
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
                                    className="h-9 bg-white"
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
                                    placeholder="GG/MM/AA"
                                    {...field}
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
                                    <div className="h-9 px-2 bg-white border rounded-md flex items-center gap-2 text-xs">
                                        <span>🇮🇹</span>
                                        <span>+39</span>
                                    </div>
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
                                    className="h-9 bg-white"
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
                    {openCoupon && (
                        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm mt-2 flex gap-3 animate-in fade-in slide-in-from-top-2">
                            <Input
                                className="h-12 flex-1"
                                placeholder="Inserisci coupon"
                                value={codicePromo ?? ""}
                                onChange={(e) => setCodicePromo(e.target.value || undefined)}
                            />
                            <Button className="h-12 px-6 font-bold bg-primary text-white rounded-tl-xl rounded-br-xl hover:bg-blue-800 transition-colors">
                                APPLICA
                            </Button>
                        </div>
                    )}
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
