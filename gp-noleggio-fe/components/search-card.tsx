"use client";
import {
    Building,
    Car,
    Info,
    MapPin,
    Truck,
    User,
    CalendarArrowUp,
    CalendarArrowDown,
    ClockArrowUp,
    ClockArrowDown
} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {listaAgenzia} from "@/hook/useAgenzia";
import {useEffect, useState} from "react";


export default function SearchCard() {
    // STATE VARIABLES
    const [customerType, setCustomerType] = useState<"private" | "business">("private");
    const [vehicleType, setVehicleType] = useState<"car" | "van">("car");

    const [sameOffice, setSameOffice] = useState(true);
    const [pickupDate, setPickupDate] = useState<Date | undefined>();
    const [pickupOpen, setPickupOpen] = useState(false);
    const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
    const [dropoffOpen, setDropoffOpen] = useState(false);
    const [hasPromo, setHasPromo] = useState(false);
    const [dropoffTime, setDropoffTime] = useState<string | undefined>();
    const [pickupTime, setPickupTime] = useState<string | undefined>();
    const [stessoUfficioChecked, setStessoUfficioChecked] = useState<boolean>(true);
    const [pickupOfficeId, setPickupOfficeId] = useState<string | undefined>();
    const [dropoffOfficeId, setDropoffOfficeId] = useState<string | undefined>();


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const {isPending: isLoadingAgenzie, data: agenzie,} = listaAgenzia()

    console.log(agenzie)

    useEffect(() => {
        if (sameOffice) {
            setDropoffOfficeId(pickupOfficeId);
        }
    }, [sameOffice, pickupOfficeId]);

    return (
        <form
            className="bg-white rounded-br-3xl rounded-tl-3xl shadow-xl w-full max-w-5xl p-8 space-y-6"
            method="GET"
            action=""
        >
            {/* RIGA 1: SELETTORI */}
            <div className="grid grid-cols-4 gap-x-3 gap-y-6">

                {/* SELETTORE: PRIVATO / AZIENDA */}
                <div className="flex col-span-1 flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli un’opzione</span>
                    <RadioGroup
                        className="flex flex-row gap-0 border max-w-max rounded-tl-sm rounded-br-sm overflow-hidden"
                        value={customerType}
                        onValueChange={(val) => setCustomerType(val as "private" | "business")}
                    >
                        {/* Option: Privato */}
                        <div
                            className={`transition-colors border-r ${customerType === "private" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="private" id="r-private"/>
                            <Label
                                htmlFor="r-private"
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm font-medium ${customerType === "private" ? "text-white" : "text-gray-700"}`}
                            >
                                <User className='w-4 h-4'/> Privato
                            </Label>
                        </div>

                        {/* Option: Azienda */}
                        <div
                            className={`transition-colors ${customerType === "business" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="business" id="r-business"/>
                            <Label
                                htmlFor="r-business"
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm font-medium ${customerType === "business" ? "text-white" : "text-gray-700"}`}
                            >
                                <Building className='w-4 h-4'/> Azienda
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* SELETTORE: AUTO / FURGONI */}
                <div className="flex col-span-1 flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli il tipo di veicolo</span>
                    <RadioGroup
                        className="flex flex-row gap-0 border max-w-max rounded-tl-sm rounded-br-sm overflow-hidden"
                        value={vehicleType}
                        onValueChange={(val) => setVehicleType(val as "car" | "van")}
                    >
                        {/* Option: Auto */}
                        <div
                            className={`transition-colors border-r ${vehicleType === "car" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="car" id="r-car"/>
                            <Label
                                htmlFor="r-car"
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm font-medium ${vehicleType === "car" ? "text-white" : "text-gray-700"}`}
                            >
                                <Car className='w-4 h-4'/> Auto
                            </Label>
                        </div>

                        {/* Option: Furgoni */}
                        <div
                            className={`transition-colors ${vehicleType === "van" ? "bg-[#0700DE]" : "bg-white hover:bg-gray-50"}`}>
                            <RadioGroupItem className="sr-only" value="van" id="r-van"/>
                            <Label
                                htmlFor="r-van"
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm font-medium ${vehicleType === "van" ? "text-white" : "text-gray-700"}`}
                            >
                                <Truck className='w-4 h-4'/> Furgoni
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
            </div>

            {/* MAIN SEARCH GRID */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-6 items-end">

                {/* CITTÀ RITIRO */}
                <div className="col-span-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="pickup-city" className="font-semibold">
                            {sameOffice ? "Città ritiro e riconsegna" : "Città ritiro"}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="same-office"
                                checked={sameOffice}
                                onCheckedChange={(val) => setSameOffice(val as boolean)}
                            />
                            <Label className='text-xs cursor-pointer' htmlFor="same-office">Riconsegna nello stesso
                                ufficio</Label>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0700DE] z-10">
                            <MapPin className="w-4 h-4"/>
                        </div>

                        <Select
                            value={pickupOfficeId}
                            onValueChange={setPickupOfficeId}
                            disabled={isLoadingAgenzie}
                        >
                            <SelectTrigger
                                className="w-full h-14 rounded-none rounded-br-sm rounded-tl-sm border border-gray-300 pl-10 pr-3 text-sm focus:ring-1 focus:ring-[#0700DE] outline-none">
                                <SelectValue
                                    placeholder={isLoadingAgenzie ? "Caricamento agenzie..." : "Seleziona punto ritiro"}
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {(agenzie ?? []).map((a) => (
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


                </div>

                {/* DATA/ORA RITIRO */}
                <div className="col-span-1 space-y-2">
                    <Label className="font-semibold text-sm">Data e ora del ritiro</Label>
                    <div className="flex h-11 rounded-tl-sm rounded-br-sm border border-gray-300 overflow-hidden group">
                        {/* LEFT SIDE: DATE PICKER */}
                        <div className="w-1/2 border-r border-gray-300">
                            <Popover open={pickupOpen} onOpenChange={setPickupOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-full w-full rounded-none px-3 flex items-center justify-start hover:bg-gray-50 shadow-none border-none m-0"
                                    >
                                        <CalendarArrowUp className="w-4 h-4 text-[#0700DE] mr-2 shrink-0"/>
                                        <span className="truncate text-sm">
                            {pickupDate ? pickupDate.toLocaleDateString() : tomorrow.toLocaleDateString()}
                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={pickupDate} onSelect={(d) => {
                                        setPickupDate(d);
                                        setPickupOpen(false)
                                    }}/>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* RIGHT SIDE: TIME SELECT */}
                        <div
                            className="w-1/2 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors relative">
                            <Select value={pickupTime} onValueChange={setPickupTime}>
                                <SelectTrigger
                                    className="h-full w-full border-none shadow-none focus:ring-0 focus:ring-offset-0 bg-transparent p-0 rounded-none"
                                >
                                    <div className="flex items-center justify-center w-full h-full gap-2 leading-none">
                                        <ClockArrowUp className="w-4 h-4 text-[#0700DE] shrink-0"/>
                                        <SelectValue placeholder="Ora"/>
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
                </div>

                {/* DATA/ORA CONSEGNA (SE STESSO UFFICIO) */}
                {sameOffice && (
                    <div className="col-span-1 space-y-2 animate-in fade-in duration-300">
                        <Label className="font-semibold text-sm">Data e ora della consegna</Label>
                        <div className="flex h-11 rounded-tl-sm rounded-br-sm border border-gray-300 overflow-hidden">

                            {/* LEFT SIDE: DATE PICKER */}
                            <div className="w-1/2 border-r border-gray-300">
                                <Popover open={dropoffOpen} onOpenChange={setDropoffOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-full w-full rounded-none px-3 flex items-center justify-start hover:bg-gray-50 shadow-none border-none m-0"
                                        >
                                            <CalendarArrowDown className='w-4 h-4 text-[#0700DE] mr-2 shrink-0'/>
                                            <span className="truncate text-sm">
                                {dropoffDate ? dropoffDate.toLocaleDateString() : dayAfterTomorrow.toLocaleDateString()}
                            </span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={dropoffDate} onSelect={(d) => {
                                            setDropoffDate(d);
                                            setDropoffOpen(false)
                                        }}/>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* RIGHT SIDE: TIME SELECT */}
                            {/* This wrapper div handles the background color and centering */}
                            <div
                                className="w-1/2 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors relative">
                                <Select value={dropoffTime} onValueChange={setDropoffTime}>
                                    <SelectTrigger
                                        className="h-full w-full border-none shadow-none focus:ring-0 focus:ring-offset-0 bg-transparent p-0 rounded-none"
                                    >
                                        <div
                                            className="flex items-center justify-center w-full h-full gap-2 leading-none">
                                            <ClockArrowDown className="w-4 h-4 text-[#0700DE] shrink-0"/>
                                            <SelectValue placeholder="Ora"/>
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
                    </div>
                )}

                {/* NUOVA RIGA: CITTÀ RICONSEGNA + DATA CONSEGNA (SE DIVERSO UFFICIO) */}
                {!sameOffice && (
                    <>
                        {/* ROW 1, COL 3: SPACER (Keeps City/Date on Row 2) */}
                        <div className="col-span-1"></div>

                        {/* ROW 2, COL 1: Città Riconsegna */}
                        <div className="col-span-1 space-y-2 animate-in slide-in-from-top-2 duration-300">
                            <Label htmlFor="dropoff-city" className="font-semibold">Città riconsegna</Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0700DE]">
                                    <MapPin className="w-4 h-4"/>
                                </div>
                                <Select
                                    value={dropoffOfficeId}
                                    onValueChange={setDropoffOfficeId}
                                    disabled={isLoadingAgenzie}
                                >
                                    <SelectTrigger
                                        className="w-full h-14  rounded-none rounded-br-sm rounded-tl-sm border border-gray-300 pl-10 pr-3 text-sm focus:ring-1 focus:ring-[#0700DE] outline-none">
                                        <SelectValue
                                            placeholder={
                                                isLoadingAgenzie
                                                    ? "Caricamento agenzie..."
                                                    : "Seleziona punto riconsegna"
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
                        </div>

                        {/* ROW 2, COL 2: Data e ora della consegna (Fixed split) */}
                        <div className="col-span-1 space-y-2 animate-in slide-in-from-top-2 duration-300">
                            <Label className="font-semibold text-sm">Data e ora della consegna</Label>
                            <div
                                className="flex h-11 rounded-tl-sm rounded-br-sm border border-gray-300 overflow-hidden">

                                {/* LEFT SIDE: DATE */}
                                <div className="w-1/2 border-r border-gray-300">
                                    <Popover open={dropoffOpen} onOpenChange={setDropoffOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-full w-full rounded-none px-3 flex items-center justify-start hover:bg-gray-50 shadow-none border-none m-0"
                                            >
                                                <CalendarArrowDown className='w-4 h-4 text-[#0700DE] mr-2 shrink-0'/>
                                                <span className="truncate text-sm">
                                    {dropoffDate ? dropoffDate.toLocaleDateString() : dayAfterTomorrow.toLocaleDateString()}
                                </span>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={dropoffDate} onSelect={(d) => {
                                                setDropoffDate(d);
                                                setDropoffOpen(false)
                                            }}/>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* RIGHT SIDE: ORA (Fixed centering and background) */}
                                <div
                                    className="w-1/2 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors relative">
                                    <Select value={dropoffTime} onValueChange={setDropoffTime}>
                                        <SelectTrigger
                                            className="h-full w-full border-none shadow-none focus:ring-0 focus:ring-offset-0 bg-transparent p-0 rounded-none"
                                        >
                                            <div
                                                className="flex items-center justify-center w-full h-full gap-2 leading-none">
                                                <ClockArrowDown className="w-4 h-4 text-[#0700DE] shrink-0"/>
                                                <SelectValue placeholder="Ora"/>
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
                        </div>

                        {/* ROW 2, COL 3: Empty Spacer to keep layout tight */}
                        <div className="col-span-1"></div>
                    </>
                )}
            </div>

            {/* FILTRI BASSO & PROMO */}
            <div className="grid grid-cols-4 pt-4 items-center gap-y-4">
                {/* This container spans 3 columns.
                    It holds Age, Country, and the Promo logic.
                */}
                <div className="flex justify-start gap-x-12 flex-row col-span-3">
                    {/* COLONNA 1 - ETÀ */}
                    <div className="flex items-center">
                        <label className="flex items-center gap-1 text-sm text-gray-800 cursor-pointer">
                            <span>Età</span>
                            <select
                                className="bg-transparent border-none outline-none font-semibold pr-4 cursor-pointer"
                                defaultValue="26+">
                                <option value="26+">26+</option>
                                <option value="30+">30+</option>
                            </select>
                        </label>
                    </div>

                    {/* COLONNA 2 - VIVO IN
                    <div className="flex items-center">
                        <label className="flex items-center gap-1 text-sm text-gray-800 cursor-pointer">
                            <span>Vivo in</span>
                            <select
                                className="bg-transparent border-none outline-none font-semibold pr-4 cursor-pointer"
                                defaultValue="IT">
                                <option value="IT">Italia</option>
                            </select>
                        </label>
                    </div>
*/}
                    {/* COLONNA 3 - CODICE PROMO CHECKBOX & INPUT */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <Checkbox
                                id="hasPromo"
                                checked={hasPromo}
                                onCheckedChange={(val) => setHasPromo(val as boolean)}
                            />
                            <label htmlFor="hasPromo" className="cursor-pointer whitespace-nowrap">
                                Ho un <span className="font-semibold">Codice Promozionale</span>
                            </label>
                            <Info className="w-4 h-4 text-gray-400 shrink-0"/>
                        </div>

                        {/* DYNAMIC PROMO INPUT */}
                        {hasPromo && (
                            <div className="animate-in fade-in zoom-in-95 duration-200">
                                <input
                                    type="text"
                                    placeholder="Inserisci codice"
                                    className="h-9 w-32 rounded-br-sm rounded-tl-sm border border-gray-300 px-3 text-sm focus:ring-1 focus:ring-[#0700DE] outline-none"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* COLONNA 4: BOTTONE CERCA
                    It stays on the same row as long as the content in col-span-3 doesn't overflow.
                */}
                <div className="col-span-1">
                    <Button
                        className="w-full h-12 bg-[#0700DE] hover:bg-[#0500b0] rounded-tl-sm rounded-br-sm text-lg font-bold transition-all">
                        Cerca
                    </Button>
                </div>
            </div>
        </form>
    );
}
