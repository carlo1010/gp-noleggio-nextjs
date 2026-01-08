"use client";

import { Info } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout.store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Step4DriverForm() {
    const conducente = useCheckoutStore((s) => s.conducente);
    const setConducente = useCheckoutStore((s) => s.setConducente);

    const codicePromo = useCheckoutStore((s) => s.search.codicePromo);
    const setCodicePromo = useCheckoutStore((s) => s.setCodicePromo);

    const terminiAccettati = useCheckoutStore((s) => s.pagamento.terminiAccettati);
    const setTermini = useCheckoutStore((s) => s.setTermini);

    return (
        <div className="bg-[#F6F6F6] rounded-2xl border border-gray-100 p-5 max-w-[360px]">
            {/* Titolo sezione */}
            <p className="font-semibold text-sm text-gray-900 mb-4">
                Dettagli del conducente
            </p>

            {/* campi (colonna singola come foto) */}
            <div className="space-y-3">
                <Field label="Nome*" >
                    <Input
                        className="h-9 rounded-md bg-white"
                        placeholder="Es. Luigi"
                        value={conducente.nome}
                        onChange={(e) => setConducente({ nome: e.target.value })}
                    />
                </Field>

                <Field label="Cognome*">
                    <Input
                        className="h-9 rounded-md bg-white"
                        placeholder="Es. Rossi"
                        value={conducente.cognome}
                        onChange={(e) => setConducente({ cognome: e.target.value })}
                    />
                </Field>

                <Field label="Data di nascita*">
                    <Input
                        className="h-9 rounded-md bg-white"
                        placeholder="GG/MM/AA"
                        value={conducente.dataNascita}
                        onChange={(e) => setConducente({ dataNascita: e.target.value })}
                    />
                </Field>

                <Field label="E-mail*">
                    <Input
                        className="h-9 rounded-md bg-white"
                        placeholder="nome@email.com"
                        value={conducente.email}
                        onChange={(e) => setConducente({ email: e.target.value })}
                    />
                </Field>

                {/* checkbox + testo piccolo */}
                <div className="pt-1 space-y-3">
                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="privacyInfo"
                            checked={conducente.privacyInfo}
                            onCheckedChange={(v) => setConducente({ privacyInfo: Boolean(v) })}
                            className="mt-0.5"
                        />
                        <Label
                            htmlFor="privacyInfo"
                            className="text-[11px] leading-4 text-gray-600 font-normal"
                        >
                            Desidero ricevere informazioni e offerte speciali e acconsento al
                            trattamento dei dati forniti.
                        </Label>
                    </div>

                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="marketing"
                            checked={conducente.marketing}
                            onCheckedChange={(v) => setConducente({ marketing: Boolean(v) })}
                            className="mt-0.5"
                        />
                        <Label
                            htmlFor="marketing"
                            className="text-[11px] leading-4 text-gray-600 font-normal"
                        >
                            Presto il mio consenso per ricevere comunicazioni marketing.
                        </Label>
                    </div>
                </div>

                {/* telefono */}
                <div className="pt-2">
                    <Field label="Numero di telefono*">
                        <div className="flex items-center gap-2">
                            {/* Prefisso come foto (semplice) */}
                            <div className="h-9 px-2 rounded-md bg-white border flex items-center gap-2 text-xs text-gray-700">
                                <span>🇮🇹</span>
                                <span>+39</span>
                            </div>

                            <Input
                                className="h-9 rounded-md bg-white"
                                placeholder="Numero di telefono"
                                value={conducente.telefono}
                                onChange={(e) => setConducente({ telefono: e.target.value })}
                            />
                        </div>
                    </Field>
                </div>

                {/* cf */}
                <Field label="Codice fiscale*">
                    <Input
                        className="h-9 rounded-md bg-white"
                        placeholder="Es. RSSL..."
                        value={conducente.codiceFiscale}
                        onChange={(e) => setConducente({ codiceFiscale: e.target.value })}
                    />
                </Field>
            </div>

            {/* separatore */}
            <div className="my-6 h-px bg-gray-200" />

            {/* Info volo */}
            <div className="flex items-center gap-2 mb-3">
                <p className="font-semibold text-sm text-gray-900">Informazioni sul volo</p>
                <Info className="w-4 h-4 text-primary" />
            </div>

            <div className="space-y-3">
                <Field label="Numero di volo">
                    <Input
                        className="h-9 rounded-md bg-white"
                        placeholder="Es. AZ 1230"
                        value={conducente.numeroVolo ?? ""}
                        onChange={(e) => setConducente({ numeroVolo: e.target.value })}
                    />
                </Field>
            </div>

            {/* dropdown rows come foto */}
            <div className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="fedelta" className="border-0">
                        <AccordionTrigger className="py-2 text-xs font-semibold text-gray-900 hover:no-underline">
                            Fai parte di un programma fedeltà?
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                            <Input
                                className="h-9 rounded-md bg-white"
                                placeholder="Es. Miles&More"
                                value={conducente.programmaFedelta ?? ""}
                                onChange={(e) => setConducente({ programmaFedelta: e.target.value })}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="coupon" className="border-0">
                        <AccordionTrigger className="py-2 text-xs font-semibold text-gray-900 hover:no-underline">
                            Aggiungi un Codice Coupon
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 space-y-2">
                            <Input
                                className="h-9 rounded-md bg-white"
                                placeholder="Inserisci coupon"
                                value={codicePromo ?? ""}
                                onChange={(e) => setCodicePromo(e.target.value || undefined)}
                            />
                            <Button type="button" className="h-9 w-full rounded-md">
                                Applica coupon
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* termini + bottone (se vuoi lo metti dopo) */}
            <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="termini"
                        checked={terminiAccettati}
                        onCheckedChange={(v) => setTermini(Boolean(v))}
                        className="mt-0.5"
                    />
                    <Label htmlFor="termini" className="text-[11px] leading-4 text-gray-600 font-normal">
                        Accetto termini e condizioni.
                    </Label>
                </div>

                <Button className="h-10 w-full rounded-md" disabled={!terminiAccettati}>
                    Conferma e continua
                </Button>
            </div>
        </div>
    );
}

function Field({
                   label,
                   children,
               }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1">
            <Label className="text-[11px] font-semibold text-gray-900">{label}</Label>
            {children}
        </div>
    );
}
