"use client";

import { useState } from "react";
import { Info, Lock, CreditCard } from "lucide-react";
import Image from "next/image";
import { useCheckoutStore } from "@/store/checkout.store";
import { formatPrice } from "@/lib/formatPrice";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Step4Payment() {
    const total = useCheckoutStore((s) => s.getTotale());

    // Placeholder function for payment logic
    const handlePayment = () => {
        console.log("Processing payment/reservation...");
    };

    return (
        <div className="w-full mt-6">
            <h2 className="font-bold text-xl text-gray-900 mb-6">
                Garantisci la tua prenotazione
            </h2>

            {/* Info Banner */}
            <div className="bg-gray-50 rounded-lg p-4 flex gap-3 text-xs text-gray-600 mb-6">
                <Info className="w-5 h-5 text-[#0700DE] shrink-0 fill-current" />
                <p>
                    Inserendo ora i dati della tua carta di credito accedi al servizio gratuito di Prenotazione Garantita Estesa.
                    <span className="font-bold"> Non ti sarà addebitato alcun importo ora.</span> Il pagamento del tuo noleggio sarà effettuato in fase del ritiro del veicolo presso l'ufficio di noleggio. <span className="underline cursor-pointer">Maggiori dettagli</span>
                </p>
            </div>

            {/* Card Form Container */}
            <div className="border-2 border-[#0700DE] rounded-xl p-6 mb-6 relative">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-base text-gray-900">Carta di credito</h3>
                    <div className="flex gap-2">
                        {/* Placeholder icons - using generic divs/text if images aren't available, or widely available web images? 
                             Better to use Lucide generic or text for now to be safe, or just a small flex row of colored boxes/text.
                             The user wants it to look like the design. I will try to use simple colored divs as placeholders or text.
                         */}
                        <span className="text-[10px] font-bold border rounded px-1">MC</span>
                        <span className="text-[10px] font-bold border rounded px-1">VISA</span>
                        <span className="text-[10px] font-bold border rounded px-1">JCB</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-6">
                    La carta di credito inserita deve essere a nome del conducente principale e <span className="font-bold text-gray-700">deve essere presentata in fase di ritiro del mezzo.</span>
                </p>

                <div className="space-y-4">
                    <div className="relative">
                        <Label className="text-xs font-bold text-gray-700 mb-1 block">Numero della carta di credito</Label>
                        <div className="relative">
                            <Input placeholder="XXXX XXXX XXXX XXXX" className="pl-4 pr-10 h-11 bg-white" />
                            <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label className="text-xs font-bold text-gray-700 mb-1 block">Data di scadenza</Label>
                            <Input placeholder="MM/AA" className="h-11 bg-white" />
                        </div>
                        <div className="flex-1">
                            {/* The image showed two "Data di scadenza" fields? I'll put CVC as the second logical field even if label was confusing in design */}
                            <Label className="text-xs font-bold text-gray-700 mb-1 block">CVC / CVV</Label>
                            <Input placeholder="123" className="h-11 bg-white" />
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-2 mt-2">
                        <p className="text-[10px] text-gray-400 text-right leading-3">
                            Per la tua sicurezza, potrebbe essere richiesta la<br />
                            verifica della tua identità. Contatta la tua banca per<br />
                            maggiori informazioni.
                        </p>
                        {/* Secured by Logos placeholder */}
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-blue-900">Verified by VISA</span>
                            <span className="text-[10px] font-bold text-gray-600">MasterCard SecureCode</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                    <Checkbox id="privacy" className="mt-0.5 border-gray-300" />
                    <label htmlFor="privacy" className="text-xs text-gray-600 leading-tight">
                        Dichiaro di aver letto e compreso l'<span className="font-bold text-gray-900 underline">Informativa Privacy Piocirillo Rent</span>
                    </label>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox id="terms" className="mt-0.5 border-gray-300" />
                    <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
                        Dichiaro di aver letto e di accettare integralmente i <span className="font-bold text-gray-900 underline">Termini e le Condizioni Piocirillo Rent</span>
                    </label>
                </div>
            </div>

            {/* Footer Action */}
            <div className="flex items-center gap-6">
                <Button
                    className="bg-[#0700DE] hover:bg-[#0600b3] text-white font-bold h-12 px-8 rounded-md text-base"
                    onClick={handlePayment}
                >
                    Paga al ritiro
                </Button>
                <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">TOTALE</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(total)}</p>
                </div>
            </div>
        </div>
    );
}
