"use client";
import {useState} from "react";
import {Building, CalendarDays, Car, Info, MapPin, Truck, User,} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Popover, PopoverTrigger} from "@radix-ui/react-popover";
import {PopoverContent} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SearchCard() {
    const [customerType, setCustomerType] = useState<"private" | "business">("private");
    const [vehicleType, setVehicleType] = useState<"car" | "van">("car");
    // pickup
    const [pickupDate, setPickupDate] = useState<Date | undefined>()
    const [pickupOpen, setPickupOpen] = useState(false)

    // dropoff
    const [dropoffDate, setDropoffDate] = useState<Date | undefined>()
    const [dropoffOpen, setDropoffOpen] = useState(false)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    return (
        // form: puoi cambiare action e method quando colleghi il backend
        <form
            className="bg-white rounded-br-3xl rounded-tl-3xl shadow-xl w-full max-w-5xl p-8 space-y-6"
            method="GET"
            action="" // per ora vuoto, lo imposterai tu (es. "/api/search")
        >
            {/* RIGA 1: SELETTORI */}
            <div className={"grid grid-cols-4 gap-x-3 gap-y-6"}>
                {/* PRIVATO / AZIENDA */}
                <div className="flex col-span-1 flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli un’opzione</span>
                    <div className="flex gap-x-5 border max-w-max rounded-tl-sm rounded-br-sm ">
                        <RadioGroup className="flex flex-row gap-0 " defaultValue="privato">
                            <div
                                className='selection-button-tl px-3'>
                                <RadioGroupItem className="sr-only" value="privato" id="privato"/>
                                <Label htmlFor="privato"> <User className='w-4 h-4'/> Privato</Label>
                            </div>
                            <div
                                className='selection-button-br px-3'>
                                <RadioGroupItem className="sr-only" value="azienda" id="azienda"/>
                                <Label htmlFor="azienda"> <Building className='w-4 h-4'/>Azienda</Label>
                            </div>
                        </RadioGroup>

                    </div>
                </div>

                {/* AUTO / FURGONI */}
                <div className="flex col-span-1 flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli il tipo di veicolo</span>
                    <div className="flex gap-x-5 border max-w-max rounded-tl-sm rounded-br-sm  ">
                        <RadioGroup className="flex flex-row gap-0 " defaultValue="auto">
                            <div className='selection-button-tl px-3'>
                                <RadioGroupItem className="sr-only" value="auto" id="auto"/>
                                <Label htmlFor="auto"> <Car className='w-4 h-4'/> Auto</Label>
                            </div>
                            <div className='selection-button-br px-3'>
                                <RadioGroupItem className="sr-only" value="furgoni" id="furgoni"/>
                                <Label htmlFor="furgoni"> <Truck className='w-4 h-4'/> Furgoni</Label>
                            </div>
                        </RadioGroup>


                    </div>
                </div>


                <div className="col-span-1"></div>
                <div className="col-span-1"></div>


                
                {/* COLONNA 1: CITTÀ + CHECKBOX */}
                <div className="col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="terms">Città ritiro e riconsegna</Label>

                        <div className="flex items-center gap-3">
                            <Checkbox id="terms"/>
                            <Label className='text-xs ' htmlFor="terms">Riconsegna nello stesso ufficio</Label>
                        </div>
                    </div>

                    {/* input città */}
                    <div className="relative mt-1 ">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2  text-[#0700DE]">
                            <MapPin className="w-4 h-4"/>
                        </div>
                        <input
                            type="text"
                            name="city"
                            placeholder="Città, indirizzo, punto di interesse"
                            className="w-full h-11 rounded-br-sm rounded-tl-sm border border-gray-300 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0700DE] focus:border-[#0700DE]"
                        />
                    </div>
                </div>

                {/* COLONNA 2: DATA E ORA DEL RITIRO */}
                <div className="col-span-1 space-y-2">
                    <Label className="font-semibold">Data e ora del ritiro</Label>

                        <div className="flex h-11 rounded-tl-sm rounded-br-sm border border-gray-300 overflow-hidden">
                        {/* data ritiro */}
                            <div className="flex flex-col">
                              <Popover open={pickupOpen} onOpenChange={setPickupOpen}>
                                    <PopoverTrigger asChild className="">
                                        <Button
                                            variant="ghost"
                                            id="pickup-date-picker"
                                            className="h-full w-full rounded-none bg-transparent px-3 text-sm flex items-center leading-none border-r shadow-none hover:bg-transparent focus-visible:ring-0">
                                            <CalendarDays className='w-4 h-4 text-[#0700DE]'/>
                                        {pickupDate ? pickupDate.toLocaleDateString() : tomorrow.toLocaleDateString()}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={pickupDate}
                                            captionLayout="dropdown"
                                             onSelect={(date) => {
                                                if (!date) return
                                                setPickupDate(date)
                                                setPickupOpen(false)   // autoclose on selected date
                                              }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col">
                                <Select>

                                    <SelectTrigger size="sm"
                                                   className="!h-full !py-0 flex items-center px-3 leading-none rounded-none bg-transparent border-none shadow-none hover:bg-transparent focus-visible:ring-0"
                                    >

                                        <SelectValue placeholder="ora" className="leading-none"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="apple">01:00</SelectItem>
                                            <SelectItem value="banana">02:00</SelectItem>
                                            <SelectItem value="blueberry">03:00</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        </div>
                        {/* COLONNA 3: DATA E ORA DELLA RICONSEGNA */}
                         <div className="col-span-1 space-y-2">
                            <Label className="font-semibold">Data e ora della consegna</Label>

                            <div className="flex h-11 rounded-tl-sm rounded-br-sm border border-gray-300 overflow-hidden">
                                <div className="flex flex-col">
                                    <Popover open={dropoffOpen} onOpenChange={setDropoffOpen}>
                                        <PopoverTrigger asChild className="">
                                            <Button
                                                variant="ghost"
                                                id="dropoff-date-picker"
                                                className="h-full w-full rounded-none bg-transparent px-3 text-sm flex items-center leading-none border-r shadow-none hover:bg-transparent focus-visible:ring-0">
                                                <CalendarDays className='w-4 h-4 text-[#0700DE]'/>
                                        {dropoffDate ? dropoffDate.toLocaleDateString() : dayAfterTomorrow.toLocaleDateString()}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={dropoffDate}
                                                captionLayout="dropdown"
                                                  onSelect={(date) => {
                                                    if (!date) return
                                                    setDropoffDate(date)
                                                    setDropoffOpen(false)  // autoclose on selected
                                                  }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col">
                                <Select>
                                <SelectTrigger size="sm" className="!h-full !py-0 flex items-center px-3 leading-none rounded-none bg-transparent border-none shadow-none hover:bg-transparent focus-visible:ring-0">
                                    <SelectValue placeholder="Ora" className="leading-none"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="apple">01:00</SelectItem>
                                                                        <SelectItem value="banana">02:00</SelectItem>
                                                                        <SelectItem value="blueberry">03:00</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                </Select>
                                </div>
                            </div>
                        </div>

                    {/* RIGA 3: 4 COLONNE EQUAMENTE DISTRIBUITE */}
                </div>



            <div className="grid grid-cols-4 ">

                <div className="flex justify-start gap-x-12 flex-row col-span-3">
                    {/* COLONNA 1 - ETÀ (select) */}
                    <div className=" flex items-center">
                        <label className="flex items-center gap-1 text-sm text-gray-800">
                            <span>Età</span>
                            <select
                                name="age"
                                className="bg-transparent border-none outline-none font-semibold pr-4 cursor-pointer"
                                defaultValue="26+"
                            >
                                <option value="18+">18+</option>
                                <option value="21+">21+</option>
                                <option value="26+">26+</option>
                                <option value="30+">30+</option>
                            </select>
                        </label>
                    </div>

                    {/* COLONNA 2 - VIVO IN (select) */}
                    <div className=" flex items-center">
                        <label className="flex items-center gap-1 text-sm text-gray-800">
                            <span>Vivo in</span>
                            <select
                                name="country"
                                className="bg-transparent border-none outline-none font-semibold pr-4 cursor-pointer"
                                defaultValue="IT"
                            >
                                <option value="IT">Italia</option>
                                <option value="FR">Francia</option>
                                <option value="DE">Germania</option>
                                <option value="ES">Spagna</option>
                            </select>
                        </label>
                    </div>

                    {/* COLONNA 3 - CODICE PROMO */}
                    <div className=" flex items-center gap-2 text-sm text-gray-800">
                        <input
                            type="checkbox"
                            name="hasPromo"
                            className="h-4 w-4 rounded border-gray-300 text-[#0700DE] focus:ring-[#0700DE]"
                        />
                        <span>
            Ho un <span className="font-semibold">Codice Promozionale</span>
          </span>
                        <Info className="w-4 h-4 text-gray-400"/>
                    </div>
                </div>

                {/* COLONNA 4 - CERCA */}
                <div className="col-span-1">
                    <Button className="w-full rounded-none rounded-tl-sm rounded-br-sm">
                        Cerca
                    </Button>
                </div>
            </div>

        </form>
    );
}
