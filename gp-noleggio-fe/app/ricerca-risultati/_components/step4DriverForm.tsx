"use client";

import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout.store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Step4DriverForm() {
    const conducente = useCheckoutStore((s) => s.conducente);
    const setConducente = useCheckoutStore((s) => s.setConducente);

    const codicePromo = useCheckoutStore((s) => s.search.codicePromo);
    const setCodicePromo = useCheckoutStore((s) => s.setCodicePromo);

    const [openFedelta, setOpenFedelta] = useState(false);
    const [openCoupon, setOpenCoupon] = useState(false);

    return (
        <div className="space-y-8">
            <section className="bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100/50 shadow-sm">
                <h2 className="font-extrabold text-xl text-black mb-6">
                    Dettagli del conducente
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Nome*">
                        <Input
                            className="h-12 bg-white rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                            placeholder="Es. Luigi"
                            value={conducente.nome}
                            onChange={(e) => setConducente({ nome: e.target.value })}
                        />
                    </Field>

                    <Field label="Cognome*">
                        <Input
                            className="h-12 bg-white rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                            placeholder="Es. Rossi"
                            value={conducente.cognome}
                            onChange={(e) => setConducente({ cognome: e.target.value })}
                        />
                    </Field>

                    <Field label="Data di nascita*">
                        <Input
                            className="h-12 bg-white rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                            placeholder="GG/MM/AA"
                            value={conducente.dataNascita}
                            onChange={(e) => setConducente({ dataNascita: e.target.value })}
                        />
                    </Field>

                    <Field label="E-mail*">
                        <Input
                            className="h-12 bg-white rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                            placeholder="nome@email.com"
                            value={conducente.email}
                            onChange={(e) => setConducente({ email: e.target.value })}
                        />
                    </Field>
                </div>

                <div className="mt-6 space-y-4">
                    <CheckboxRow
                        id="privacyInfo"
                        checked={conducente.privacyInfo}
                        onChange={(v) => setConducente({ privacyInfo: v })}
                        text="Desidero ricevere informazioni e offerte speciali e acconsento al trattamento dei dati forniti."
                    />

                    <CheckboxRow
                        id="marketing"
                        checked={conducente.marketing}
                        onChange={(v) => setConducente({ marketing: v })}
                        text="Presto il mio consenso per ricevere comunicazioni marketing tramite email e telefono."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <Field label="Numero di telefono*">
                        <div className="flex gap-2">
                            <div className="h-12 px-4 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm">
                                <span>🇮🇹</span>
                                <span>+39</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                            <Input
                                className="h-12 flex-1 bg-white rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                                placeholder="Numero di telefono"
                                value={conducente.telefono}
                                onChange={(e) => setConducente({ telefono: e.target.value })}
                            />
                        </div>
                    </Field>

                    <Field label="Codice fiscale*">
                        <Input
                            className="h-12 bg-white rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 uppercase"
                            placeholder="ES. RSS LGU..."
                            value={conducente.codiceFiscale}
                            onChange={(e) => setConducente({ codiceFiscale: e.target.value })}
                        />
                    </Field>
                </div>
            </section>

            <section className="bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100/50 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="font-extrabold text-xl text-black">Informazioni sul volo</h2>
                    <Info className="w-4 h-4 text-primary" />
                </div>

                <Field label="Numero di volo">
                    <Input
                        className="h-12 bg-white rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                        placeholder="Es. AZ 1230"
                        value={conducente.numeroVolo ?? ""}
                        onChange={(e) => setConducente({ numeroVolo: e.target.value })}
                    />
                </Field>

                <div className="mt-8 space-y-2">
                    <DropdownRow
                        label="Fai parte di un programma fedeltà?"
                        open={openFedelta}
                        onToggle={() => setOpenFedelta(!openFedelta)}
                    />
                    {openFedelta && (
                        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm mt-2 animate-in fade-in slide-in-from-top-2">
                            <Input
                                className="h-12"
                                placeholder="Inserisci il tuo codice fedeltà"
                                value={conducente.programmaFedelta ?? ""}
                                onChange={(e) => setConducente({ programmaFedelta: e.target.value })}
                            />
                        </div>
                    )}

                    <DropdownRow
                        label="Aggiungi un Codice Coupon"
                        open={openCoupon}
                        onToggle={() => setOpenCoupon(!openCoupon)}
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
            </section>
        </div>
    );
}

/* ================== helper ================== */

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1">
            <Label className="text-sm font-semibold text-gray-700">{label}</Label>
            {children}
        </div>
    );
}

function CheckboxRow({
    id,
    checked,
    onChange,
    text,
}: {
    id: string;
    checked?: boolean;
    onChange: (v: boolean) => void;
    text: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(v) => onChange(Boolean(v))}
                className="mt-0.5 border-[#0700DE] data-[state=checked]:bg-[#0700DE]"
            />
            <Label htmlFor={id} className="text-xs leading-4 text-gray-500 font-normal cursor-pointer">
                {text}
            </Label>
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
