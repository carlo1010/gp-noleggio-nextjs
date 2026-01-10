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

    const terminiAccettati = useCheckoutStore((s) => s.pagamento.terminiAccettati);
    const setTermini = useCheckoutStore((s) => s.setTermini);

    // ⬇️ stati per i “dropdown”
    const [openFedelta, setOpenFedelta] = useState(false);
    const [openCoupon, setOpenCoupon] = useState(false);

    return (
        <div className="bg-[#F7F7F7] p-6 w-full rounded-tl-3xl rounded-br-3xl shadow-sm">
            {/* Titolo */}
            <h2 className="font-bold text-xl text-gray-900 mb-6">
                Dettagli del conducente
            </h2>

            {/* Campi */}
            <div className="space-y-3">
                <Field label="Nome*">
                    <Input
                        className="h-9 bg-white"
                        placeholder="Es. Luigi"
                        value={conducente.nome}
                        onChange={(e) => setConducente({ nome: e.target.value })}
                    />
                </Field>

                <Field label="Cognome*">
                    <Input
                        className="h-9 bg-white"
                        placeholder="Es. Rossi"
                        value={conducente.cognome}
                        onChange={(e) => setConducente({ cognome: e.target.value })}
                    />
                </Field>

                <Field label="Data di nascita*">
                    <Input
                        className="h-9 bg-white"
                        placeholder="GG/MM/AA"
                        value={conducente.dataNascita}
                        onChange={(e) => setConducente({ dataNascita: e.target.value })}
                    />
                </Field>

                <Field label="E-mail*">
                    <Input
                        className="h-9 bg-white"
                        placeholder="nome@email.com"
                        value={conducente.email}
                        onChange={(e) => setConducente({ email: e.target.value })}
                    />
                </Field>

                {/* Checkbox */}
                <div className="pt-1 space-y-3">
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
                        text="Presto il mio consenso per ricevere comunicazioni marketing."
                    />
                </div>

                {/* Telefono */}
                <Field label="Numero di telefono*">
                    <div className="flex gap-2">
                        <div className="h-9 px-2 bg-white border rounded-md flex items-center gap-2 text-xs">
                            <span>🇮🇹</span>
                            <span>+39</span>
                        </div>
                        <Input
                            className="h-9 bg-white"
                            placeholder="Numero di telefono"
                            value={conducente.telefono}
                            onChange={(e) => setConducente({ telefono: e.target.value })}
                        />
                    </div>
                </Field>

                <Field label="Codice fiscale*">
                    <Input
                        className="h-9 bg-white"
                        placeholder="Es. RSSL..."
                        value={conducente.codiceFiscale}
                        onChange={(e) => setConducente({ codiceFiscale: e.target.value })}
                    />
                </Field>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-200" />

            {/* Info volo */}
            <div className="flex items-center gap-2 mb-3 mt-8">
                <p className="font-bold text-base text-gray-900">Informazioni sul volo</p>
                <Info className="w-4 h-4 text-[#0700DE]" />
            </div>

            <Field label="Numero di volo">
                <Input
                    className="h-9 bg-white"
                    placeholder="Es. AZ 1230"
                    value={conducente.numeroVolo ?? ""}
                    onChange={(e) => setConducente({ numeroVolo: e.target.value })}
                />
            </Field>

            {/* Programma fedeltà */}
            <DropdownRow
                label="Fai parte di un programma fedeltà?"
                open={openFedelta}
                onToggle={() => setOpenFedelta(!openFedelta)}
            />

            {openFedelta && (
                <Input
                    className="h-9 bg-white mt-2"
                    placeholder="Es. Miles&More"
                    value={conducente.programmaFedelta ?? ""}
                    onChange={(e) => setConducente({ programmaFedelta: e.target.value })}
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
                    <Input
                        className="h-9 bg-white"
                        placeholder="Inserisci coupon"
                        value={codicePromo ?? ""}
                        onChange={(e) => setCodicePromo(e.target.value || undefined)}
                    />
                    <Button type="button" className="h-9 w-full">
                        Applica coupon
                    </Button>
                </div>
            )}

            {/* Termini */}
            <div className="mt-5 space-y-3">
                <CheckboxRow
                    id="termini"
                    checked={terminiAccettati}
                    onChange={setTermini}
                    text="Accetto termini e condizioni."
                />

                <Button
                    className="h-10 w-full"
                    disabled={!terminiAccettati}
                >
                    Conferma e continua
                </Button>
            </div>
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
