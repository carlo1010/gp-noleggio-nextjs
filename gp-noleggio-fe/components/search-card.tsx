"use client";

import {
    Building,
    Car,
    MapPin,
    Truck,
    User,
    CalendarArrowUp,
    CalendarArrowDown,
    ClockArrowUp,
    ClockArrowDown,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { listaAgenzia } from "@/hook/useAgenzia";
import { useEffect, useMemo, useState } from "react";
import { format, startOfDay, isBefore } from "date-fns";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout.store";


export default function SearchCard() {
    const router = useRouter();
    const ROW_HEIGHT = "h-11!";
    const parseYMDToLocalDate = (ymd: string) => {
        const [y, m, d] = ymd.split("-").map(Number);
        return new Date(y, m - 1, d); // ✅ locale, no shift
    };


    // ====== STORE (state) ======
    const tipoCliente = useCheckoutStore((s) => s.search.tipoCliente); // "privato" | "azienda"
    const tipoVeicolo = useCheckoutStore((s) => s.search.tipoVeicolo); // "auto" | "furgone"
    const eta = useCheckoutStore((s) => s.search.eta);

    const ritiro = useCheckoutStore((s) => s.search.ritiro);
    const riconsegna = useCheckoutStore((s) => s.search.riconsegna);

    const codicePromo = useCheckoutStore((s) => s.search.codicePromo);

    // ====== STORE (actions) ======

    const setTipoCliente = useCheckoutStore((s) => s.setTipoCliente);
    const setTipoVeicolo = useCheckoutStore((s) => s.setTipoVeicolo);
    const setEta = useCheckoutStore((s) => s.setEta);
    const setRitiro = useCheckoutStore((s) => s.setRitiro);
    const setRiconsegna = useCheckoutStore((s) => s.setRiconsegna);
    const setCodicePromo = useCheckoutStore((s) => s.setCodicePromo);
    const resetCheckout = useCheckoutStore((s) => s.resetCheckout);

    // ====== DERIVATI ======
    const stessoUfficio = riconsegna.stessoUfficio;

    const pickupDate = ritiro.data ? parseYMDToLocalDate(ritiro.data) : new Date();
    const dropoffDate = riconsegna.data ? parseYMDToLocalDate(riconsegna.data) : new Date();


    const pickupTime = ritiro.ora || undefined;
    const dropoffTime = riconsegna.ora || undefined;

    const pickupOfficeId = ritiro.luogo || undefined;
    const dropoffOfficeId = riconsegna.luogo || undefined;
    const pickupOfficeLabel = ritiro.luogoLabel;
    const dropoffOfficeLabel = riconsegna.luogoLabel;



    // ====== UI STATE ======
    const [pickupOpen, setPickupOpen] = useState(false);
    const [dropoffOpen, setDropoffOpen] = useState(false);
    const [country, setCountry] = useState<"italia" | "estero">("italia");
    // Gestione locale della checkbox promo
    const [hasPromo, setHasPromo] = useState(!!codicePromo);

    const pickupDateStr = format(pickupDate, "yyyy-MM-dd");
    const dropoffDateStr = format(dropoffDate, "yyyy-MM-dd");


    // errori UI (solo per mostrare bordo rosso / messaggio)
    const [errors, setErrors] = useState<{
        pickupOffice?: boolean;
        dropoffOffice?: boolean;
        pickupTime?: boolean;
        dropoffTime?: boolean;
        rentalDuration?: boolean;
    }>({});

    const { isPending: isLoadingAgenzie, data: agenzie } = listaAgenzia();

    // oggi "pulito" a mezzanotte
    const today = useMemo(() => startOfDay(new Date()), []);

    // min dropoff = pickup (stesso giorno consentito)
    const minDropoffDate = useMemo(() => startOfDay(pickupDate), [pickupDate]);

    // se stesso ufficio -> riconsegna.luogo segue ritiro.luogo
    useEffect(() => {
        if (stessoUfficio && ritiro.luogo) {
            setRiconsegna({
                luogo: ritiro.luogo,
                luogoLabel: ritiro.luogoLabel,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stessoUfficio, ritiro.luogo, ritiro.luogoLabel]);

    // se pickupDate va oltre dropoffDate, riallineo dropoffDate
    useEffect(() => {
        const p = startOfDay(pickupDate);
        const d = startOfDay(dropoffDate);

        if (isBefore(d, p)) {
            // setto nello store
            setRiconsegna({ data: format(pickupDate, "yyyy-MM-dd") });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ritiro.data]);

    function validateBeforeSearch() {
        const nextErrors: typeof errors = {};

        if (!pickupOfficeId) nextErrors.pickupOffice = true;
        if (!stessoUfficio && !dropoffOfficeId) nextErrors.dropoffOffice = true;

        if (!pickupTime) nextErrors.pickupTime = true;
        if (!dropoffTime) nextErrors.dropoffTime = true;
        if (
            pickupDateStr === dropoffDateStr &&
            pickupTime &&
            dropoffTime &&
            pickupTime >= dropoffTime
        ) {
            nextErrors.rentalDuration = true;
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function handleSearch() {
        if (!validateBeforeSearch()) return;

        // Reset store to clear previous data
        resetCheckout();

        // Re-populate store with current search data
        setTipoCliente(tipoCliente);
        setTipoVeicolo(tipoVeicolo);
        setEta(eta);
        setCodicePromo(codicePromo);

        setRitiro({
            data: pickupDateStr,
            ora: pickupTime,
            luogo: pickupOfficeId,
            luogoLabel: pickupOfficeLabel
        });

        const finalDropoffOfficeId = String(stessoUfficio ? pickupOfficeId : dropoffOfficeId);
        const finalDropoffOfficeLabel = stessoUfficio ? pickupOfficeLabel : dropoffOfficeLabel;

        setRiconsegna({
            data: dropoffDateStr,
            ora: dropoffTime,
            stessoUfficio: stessoUfficio,
            luogo: finalDropoffOfficeId,
            luogoLabel: finalDropoffOfficeLabel
        });


        // Qui continui a passare i parametri in url come prima (step 2)
        const payloadUrl: Record<string, string> = {
            step: "2",
            pickupDate: pickupDateStr,
            dropoffDate: dropoffDateStr,
            tipoCliente,
            tipoVeicolo,
            pickupOfficeId: String(pickupOfficeId),
            dropoffOfficeId: finalDropoffOfficeId,
            pickupTime: String(pickupTime),
            dropoffTime: String(dropoffTime),
            eta: String(eta),
        };

        if (codicePromo) payloadUrl.codicePromo = codicePromo;

        const params = new URLSearchParams(payloadUrl);
        const url = `/ricerca-risultati?${params.toString()}`;

        console.log("[SEARCH URL]", url);
        console.log("[STORE search]", useCheckoutStore.getState().search);

        router.push(url);
    }

    // helpers per disabilitare le date nel calendario
    const disablePickupDate = (date: Date) => isBefore(startOfDay(date), today);

    const disableDropoffDate = (date: Date) => {
        const d = startOfDay(date);
        if (isBefore(d, today)) return true;
        if (isBefore(d, minDropoffDate)) return true;
        return false;
    };

    return (
        <div className="bg-white rounded-br-3xl rounded-tl-3xl shadow-xl w-full p-4 md:p-8 space-y-4 md:space-y-6">
            {/* RIGA 1: SELETTORI - DESIGN FOGLIA (LEAF) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {/* PRIVATO / AZIENDA */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli un’opzione</span>

                    <RadioGroup
                        className="grid grid-cols-2 gap-0 border w-full md:w-[280px] rounded-tl-sm rounded-br-sm overflow-hidden"
                        value={tipoCliente}
                        onValueChange={(val) => setTipoCliente(val as "privato" | "azienda")}
                    >
                        <div
                            className={`transition-colors border-r flex justify-center ${tipoCliente === "privato" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="privato" id="r-privato" />
                            <Label htmlFor="r-privato"
                                   className={`flex items-center justify-center w-full gap-2 px-2 py-2.5 cursor-pointer text-sm font-bold ${tipoCliente === "privato" ? "text-white" : "text-gray-700"}`}>
                                <User className="w-4 h-4" /> Privato
                            </Label>
                        </div>

                        <div
                            className={`transition-colors flex justify-center ${tipoCliente === "azienda" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="azienda" id="r-azienda" />
                            <Label htmlFor="r-azienda"
                                   className={`flex items-center justify-center w-full gap-2 px-2 py-2.5 cursor-pointer text-sm font-bold ${tipoCliente === "azienda" ? "text-white" : "text-gray-700"}`}>
                                <Building className="w-4 h-4" /> Azienda
                            </Label>
                        </div>
                    </RadioGroup>

                </div>

                {/* AUTO / FURGONI */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli il tipo di veicolo</span>

                    <RadioGroup
                        className="grid grid-cols-2 gap-0 border w-full md:w-[280px] rounded-tl-sm rounded-br-sm overflow-hidden"
                        value={tipoVeicolo}
                        onValueChange={(val) => setTipoVeicolo(val as "auto" | "furgone")}
                    >
                        <div
                            className={`transition-colors border-r flex justify-center ${tipoVeicolo === "auto" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="auto" id="r-auto" />
                            <Label htmlFor="r-auto"
                                   className={`flex items-center justify-center w-full gap-2 px-2 py-2.5 cursor-pointer text-sm font-bold ${tipoVeicolo === "auto" ? "text-white" : "text-gray-700"}`}>
                                <Car className="w-4 h-4" /> Auto
                            </Label>
                        </div>

                        <div
                            className={`transition-colors flex justify-center ${tipoVeicolo === "furgone" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="furgone" id="r-furgone" />
                            <Label htmlFor="r-furgone"
                                   className={`flex items-center justify-center w-full gap-2 px-2 py-2.5 cursor-pointer text-sm font-bold ${tipoVeicolo === "furgone" ? "text-white" : "text-gray-700"}`}>
                                <Truck className="w-4 h-4" /> Furgoni
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* MAIN SEARCH GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-3 md:gap-y-6 items-end">
                {/* CITTÀ RITIRO */}
                <div className="col-span-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="pickup-city" className="font-semibold">
                            {stessoUfficio ? "Città ritiro e riconsegna" : "Città ritiro"}
                        </Label>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="same-office"
                                checked={stessoUfficio}
                                onCheckedChange={(val) => {
                                    const checked = val as boolean;
                                    setRiconsegna({
                                        stessoUfficio: checked,
                                        luogo: checked ? (ritiro.luogo || "") : riconsegna.luogo,
                                        luogoLabel: checked ? (ritiro.luogoLabel || "") : riconsegna.luogoLabel,
                                    });

                                }}
                            />
                            <Label className="text-xs cursor-pointer" htmlFor="same-office">
                                Riconsegna nello stesso ufficio
                            </Label>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0700DE] z-10">
                            <MapPin className="w-4 h-4" />
                        </div>

                        <Select
                            value={pickupOfficeId}
                            onValueChange={(v) => {
                                const agenzia = (agenzie ?? []).find((a: any) => a.codiceAgenzia === v);

                                setRitiro({
                                    luogo: v,
                                    luogoLabel: agenzia?.descrizioneAgenzia ?? v,
                                });

                                if (riconsegna.stessoUfficio) {
                                    setRiconsegna({
                                        luogo: v,
                                        luogoLabel: agenzia?.descrizioneAgenzia ?? v,
                                    });
                                }

                                setErrors((e) => ({ ...e, pickupOffice: false }));
                            }}

                            disabled={isLoadingAgenzie}
                        >
                            <SelectTrigger
                                className={[
                                    `w-full ${ROW_HEIGHT} rounded-none rounded-br-sm rounded-tl-sm border pl-10 pr-3 text-sm focus:ring-1 focus:ring-[#0700DE] outline-none`,
                                    errors.pickupOffice ? "border-red-500" : "border-gray-300",
                                ].join(" ")}
                            >
                                <SelectValue
                                    placeholder={
                                        isLoadingAgenzie ? "Caricamento agenzie..." : "Seleziona punto ritiro"
                                    }
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {(agenzie ?? []).map((a: any) => (
                                    <SelectItem key={a.codiceAgenzia} value={a.codiceAgenzia}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{a.descrizioneAgenzia}</span>
                                            <span className="text-xs text-gray-500">
                                                {a.localitaAgenzia} ({a.provinciaAgenzia}) – {a.indirizzoAgenzia}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="h-5">
                        {errors.pickupOffice && (
                            <p className="text-xs text-red-600 animate-in slide-in-from-bottom-2 duration-300">Seleziona una sede di ritiro.</p>
                        )}
                    </div>
                </div>

                {/* DATA/ORA RITIRO */}
                <div className="space-y-2">
                    <Label className="font-semibold text-sm">Data e ora del ritiro</Label>

                    <div
                        className={[
                            `flex ${ROW_HEIGHT} rounded-tl-sm rounded-br-sm border overflow-hidden group`,
                            errors.pickupTime ? "border-red-500" : "border-gray-300",
                        ].join(" ")}
                    >
                        {/* DATE */}
                        <div className="w-1/2 border-r border-gray-300">
                            <Popover open={pickupOpen} onOpenChange={setPickupOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-full w-full rounded-none px-3 flex items-center justify-start hover:bg-gray-50 shadow-none border-none m-0"
                                    >
                                        <CalendarArrowUp className="w-4 h-4 text-[#0700DE] mr-2 shrink-0" />
                                        <span className="truncate text-sm">
                                            {pickupDate ? pickupDate.toLocaleDateString() : ""}
                                        </span>
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={pickupDate}
                                        onSelect={(d) => {
                                            if (!d) return;
                                            // salvo nello store
                                            setRitiro({ data: format(d, "yyyy-MM-dd") });
                                            setPickupOpen(false);
                                        }}
                                        disabled={disablePickupDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* TIME */}
                        <div
                            className="w-1/2 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors relative">
                            <Select
                                value={pickupTime}
                                onValueChange={(v) => {
                                    setRitiro({ ora: v });
                                    setErrors((e) => ({ ...e, pickupTime: false }));
                                }}

                            >
                                <SelectTrigger
                                    className="h-full w-full border-none shadow-none focus:ring-0 focus:ring-offset-0 bg-transparent px-3 rounded-none">
                                    <div className="flex items-center justify-center w-full h-full gap-2 leading-none">
                                        <ClockArrowUp className="w-4 h-4 text-[#0700DE] shrink-0" />
                                        <SelectValue placeholder="Ora" />
                                    </div>
                                </SelectTrigger>

                                <SelectContent
                                    position="popper"
                                    className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]"
                                >
                                    <SelectItem value="09:00">09:00</SelectItem>
                                    <SelectItem value="10:00">10:00</SelectItem>
                                    <SelectItem value="11:00">11:00</SelectItem>
                                    <SelectItem value="12:00">12:00</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="h-5">
                        {errors.pickupTime && (
                            <p className="text-xs text-red-600">Seleziona l’ora di ritiro.</p>
                        )}
                    </div>
                </div>

                {/* DATA/ORA CONSEGNA: SEMPRE (sia stesso ufficio che non) */}
                <div className="col-span-1 space-y-2 animate-in fade-in duration-300">
                    <Label className="font-semibold text-sm">Data e ora della consegna</Label>

                    <div
                        className={[
                            `flex ${ROW_HEIGHT} rounded-tl-sm rounded-br-sm border overflow-hidden`,
                            errors.dropoffTime ? "border-red-500" : "border-gray-300",
                        ].join(" ")}
                    >
                        {/* DATE */}
                        <div className="w-1/2 border-r border-gray-300">
                            <Popover open={dropoffOpen} onOpenChange={setDropoffOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-full w-full rounded-none px-3 flex items-center justify-start hover:bg-gray-50 shadow-none border-none m-0"
                                    >
                                        <CalendarArrowDown className="w-4 h-4 text-[#0700DE] mr-2 shrink-0" />
                                        <span className="truncate text-sm">
                                            {dropoffDate ? dropoffDate.toLocaleDateString() : ""}
                                        </span>
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dropoffDate}
                                        onSelect={(d) => {
                                            if (!d) return;
                                            setRiconsegna({ data: format(d, "yyyy-MM-dd") });
                                            setDropoffOpen(false);
                                        }}
                                        disabled={disableDropoffDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* TIME */}
                        <div
                            className="w-1/2 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors relative">
                            <Select
                                value={dropoffTime}
                                onValueChange={(v) => {
                                    setRiconsegna({ ora: v });
                                    setErrors((e) => ({ ...e, dropoffTime: false }));
                                }}
                            >
                                <SelectTrigger
                                    className="h-full w-full border-none shadow-none focus:ring-0 focus:ring-offset-0 bg-transparent px-3 rounded-none">
                                    <div className="flex items-center justify-center w-full h-full gap-2 leading-none">
                                        <ClockArrowDown className="w-4 h-4 text-[#0700DE] shrink-0" />
                                        <SelectValue placeholder="Ora" />
                                    </div>
                                </SelectTrigger>

                                <SelectContent
                                    position="popper"
                                    className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]"
                                >
                                    <SelectItem value="09:00">09:00</SelectItem>
                                    <SelectItem value="10:00">10:00</SelectItem>
                                    <SelectItem value="11:00">11:00</SelectItem>
                                    <SelectItem value="12:00">12:00</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="h-5">
                        {errors.dropoffTime && (
                            <p className="text-xs text-red-600">Seleziona l’ora di consegna.</p>
                        )}
                        {errors.rentalDuration && (
                            <p className="text-xs text-red-600">
                                Per noleggio in giornata, l&apos;ora di consegna deve essere successiva all&apos;ora di ritiro.
                            </p>
                        )}
                    </div>
                </div>

                {/* SE dropoff diverso ufficio: mostra selettore sede riconsegna */}
                {!stessoUfficio && (
                    <div className="col-span-1 space-y-2 animate-in slide-in-from-top-2 duration-300">
                        <Label htmlFor="dropoff-city" className="font-semibold">
                            Città riconsegna
                        </Label>

                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0700DE]">
                                <MapPin className="w-4 h-4" />
                            </div>

                            <Select
                                value={dropoffOfficeId}
                                onValueChange={(v) => {
                                    const agenzia = (agenzie ?? []).find((a: any) => a.codiceAgenzia === v);

                                    setRiconsegna({
                                        luogo: v,
                                        luogoLabel: agenzia?.descrizioneAgenzia ?? v,
                                    });

                                    setErrors((e) => ({ ...e, dropoffOffice: false }));
                                }}

                                disabled={isLoadingAgenzie}
                            >
                                <SelectTrigger
                                    className={[
                                        `w-full ${ROW_HEIGHT} rounded-none rounded-br-sm rounded-tl-sm border pl-10 pr-3 text-sm focus:ring-1 focus:ring-[#0700DE] outline-none`,
                                        errors.dropoffOffice ? "border-red-500" : "border-gray-300",
                                    ].join(" ")}
                                >
                                    <SelectValue
                                        placeholder={
                                            isLoadingAgenzie ? "Caricamento agenzie..." : "Seleziona punto riconsegna"
                                        }
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {(agenzie ?? []).map((a: any) => (
                                        <SelectItem key={a.codiceAgenzia} value={a.codiceAgenzia}>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{a.descrizioneAgenzia}</span>
                                                <span className="text-xs text-gray-500">
                                                    {a.localitaAgenzia} ({a.provinciaAgenzia}) – {a.indirizzoAgenzia}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="h-5">
                            {errors.dropoffOffice && (
                                <p className="text-xs text-red-600">Seleziona una sede di riconsegna.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* FILTRI BASSO & PROMO */}
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-between pt-4 gap-1 md:gap-4">
                <div className="flex flex-row flex-wrap justify-between md:justify-start items-center gap-2 md:gap-x-12 w-full md:w-auto">
                    {/* ETA */}
                    <div className="flex items-center gap-2 md:gap-3 w-auto">
                        <span className="text-sm text-gray-700 whitespace-nowrap">Età</span>
                        <Select value={String(eta)} onValueChange={(v) => setEta(Number(v))}>
                            <SelectTrigger
                                className={`${ROW_HEIGHT} w-[70px] rounded-none rounded-br-sm rounded-tl-sm border border-gray-300`}>
                                <SelectValue placeholder="Età" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="18">18+</SelectItem>
                                <SelectItem value="21">21+</SelectItem>
                                <SelectItem value="26">26+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* VIVO IN (resta locale) */}
                    <div className="flex items-center gap-2 md:gap-3 w-auto">
                        <span className="text-sm text-gray-700 whitespace-nowrap">Vivo in</span>
                        <Select value={country} onValueChange={(v) => setCountry(v as "italia" | "estero")}>
                            <SelectTrigger
                                className={`${ROW_HEIGHT} w-[110px] rounded-none rounded-br-sm rounded-tl-sm border border-gray-300`}>
                                <SelectValue placeholder="Paese" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="italia">Italia</SelectItem>
                                <SelectItem value="estero">Estero</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* CODICE PROMO */}
                    <div className="flex items-center gap-3 w-full md:w-auto min-h-[40px]">
                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <Checkbox
                                id="hasPromo"
                                checked={hasPromo}
                                onCheckedChange={(val) => {
                                    const checked = val as boolean;
                                    setHasPromo(checked);
                                    if (!checked) setCodicePromo(undefined);
                                }}
                            />
                            {!hasPromo && (
                                <label htmlFor="hasPromo" className="cursor-pointer whitespace-nowrap text-s md:text-sm">
                                    <span className="hidden xs:inline">Ho un </span><span
                                    className="font-semibold">Codice sconto</span>
                                </label>
                            )}
                        </div>

                        {hasPromo && (
                            <div className="animate-in fade-in zoom-in-95 duration-200 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Inserisci codice"
                                    className="h-9 w-32 rounded-br-sm rounded-tl-sm border border-gray-300 px-3 text-sm focus:ring-1 focus:ring-[#0700DE] outline-none"
                                    value={codicePromo ?? ""}
                                    onChange={(e) => setCodicePromo(e.target.value || undefined)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <Button
                    onClick={handleSearch}
                    className="w-full md:w-auto px-12 h-12 bg-[#0700DE] hover:bg-blue-800 text-white font-bold rounded-tl-xl rounded-br-xl transition-all"
                >
                    CERCA VEICOLO
                </Button>
            </div>
        </div>
    );
}
