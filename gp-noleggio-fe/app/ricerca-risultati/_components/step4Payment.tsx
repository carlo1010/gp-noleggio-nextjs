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
        <div className="w-full space-y-8">
            <h2 className="font-extrabold text-xl text-black">
                Garantisci la tua prenotazione
            </h2>

            {/* Info Banner */}
            <div className="bg-blue-50/50 rounded-2xl p-6 flex gap-4 border border-blue-100 shadow-sm">
                <div className="bg-primary rounded-full p-1 h-fit shrink-0">
                    <Info className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-blue-900 leading-relaxed">
                    Inserendo ora i dati della tua carta di credito accedi al servizio gratuito di <span className="font-bold">Prenotazione Garantita Estesa. Non ti sarà addebitato alcun importo ora.</span> Il pagamento del tuo noleggio sarà effettuato in fase del ritiro del veicolo presso l'ufficio di noleggio. <span className="font-black underline cursor-pointer hover:text-primary transition-colors">Maggiori dettagli</span>
                </p>
            </div>

            {/* Card Form Container */}
            <div className="border-2 border-primary rounded-3xl p-6 md:p-8 bg-white shadow-xl shadow-primary/5 relative">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-black">Carta di credito</h3>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 opacity-60">
                            {/* Simple placeholders for card logos */}
                            <span className="w-8 h-5 bg-orange-100 rounded text-[8px] font-black flex items-center justify-center text-orange-600">MC</span>
                            <span className="w-8 h-5 bg-blue-100 rounded text-[8px] font-black flex items-center justify-center text-blue-600">VISA</span>
                            <span className="w-8 h-5 bg-gray-100 rounded text-[8px] font-black flex items-center justify-center text-gray-600">JCB</span>
                            <span className="w-8 h-5 bg-red-100 rounded text-[8px] font-black flex items-center justify-center text-red-600">AX</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-8 leading-relaxed">
                    La carta di credito inserita deve essere a nome del conducente principale e <span className="font-bold text-black uppercase tracking-tight">deve essere presentata in fase di ritiro del mezzo.</span>
                </p>

                <div className="space-y-6">
                    <div className="relative">
                        <Label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wider">Numero della carta di credito</Label>
                        <div className="relative">
                            <Input placeholder="XXXX XXXX XXXX XXXX" className="pl-4 pr-12 h-14 bg-gray-50/30 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 text-lg font-medium" />
                            <Lock className="w-5 h-5 text-gray-300 absolute right-4 top-4.5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Data di scadenza</Label>
                            <Input placeholder="MM/AA" className="h-14 bg-gray-50/30 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">CVC / CVV</Label>
                            <Input placeholder="123" className="h-14 bg-gray-50/30 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-gray-400" />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Secure Connection</span>
                        </div>
                        <div className="flex gap-4 opacity-40 grayscale">
                            <span className="text-[10px] font-black text-blue-900 border px-1 border-blue-900 rounded">VISA</span>
                            <span className="text-[10px] font-black text-red-900 border px-1 border-red-900 rounded">MasterCard</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-5 py-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors">
                    <Checkbox id="privacy" className="mt-1 border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black" />
                    <label htmlFor="privacy" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                        Dichiaro di aver letto e compreso l'<span className="font-bold text-black underline decoration-2 underline-offset-4 hover:text-primary transition-colors">Informativa Privacy Piocirillo Rent</span>
                    </label>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors">
                    <Checkbox id="terms" className="mt-1 border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black" />
                    <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                        Dichiaro di aver letto e di accettare integralmente i <span className="font-bold text-black underline decoration-2 underline-offset-4 hover:text-primary transition-colors">Termini e le Condizioni Piocirillo Rent</span>
                    </label>
                </div>
            </div>

            {/* Final Action */}
            <div className="pt-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-2xl shadow-gray-100/50">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">TOTALE DA PAGARE</p>
                        <p className="text-4xl font-black text-black">{formatPrice(total)}</p>
                    </div>

                    <Button
                        className="bg-primary hover:bg-blue-800 text-white font-black h-16 px-12 rounded-tl-sm rounded-br-sm text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                        onClick={handlePayment}
                    >
                        Paga al ritiro
                    </Button>
                </div>

                <p className="text-[10px] text-gray-400 text-center leading-relaxed max-w-2xl mx-auto">
                    Le informazioni sopra riportate sono soggette ai Termini e Condizioni di Noleggio. Premendo il tasto "Paga al ritiro" confermi la tua prenotazione e accetti le condizioni di noleggio e l'informativa sulla privacy.
                </p>
            </div>
        </div>
    );
}
