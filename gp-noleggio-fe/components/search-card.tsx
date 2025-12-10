"use client";
import { useState,ReactNode } from "react";
import {
    CalendarDays,
    CircleUser,
    MapPin,
    Building2,
    Car,
    Bus,
    Info,
} from "lucide-react";




type OptionButtonProps = {
    label: string;
    selected: boolean;
    onClick: () => void;
    children?: ReactNode;
};

function OptionButton({ label, selected, onClick, children }: OptionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-br-sm rounded-tl-sm border text-sm font-medium transition
        ${
                selected
                    ? "bg-[#0700DE] text-white border-[#0700DE]"
                    : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
            }
      `}
        >
            {children}
            {label}
        </button>
    );
}


export default function SearchCard() {
    const [customerType, setCustomerType] = useState<"private" | "business">("private");
    const [vehicleType, setVehicleType] = useState<"car" | "van">("car");
    return (
        // form: puoi cambiare action e method quando colleghi il backend
        <form
            className="bg-white rounded-br-3xl rounded-tl-3xl shadow-xl w-full max-w-5xl p-8 space-y-6"
            method="GET"
            action="" // per ora vuoto, lo imposterai tu (es. "/api/search")
        >
            {/* RIGA 1: SELETTORI */}
            <div className="flex flex-col md:flex-row md:items-start md:gap-16 gap-6">
                {/* PRIVATO / AZIENDA */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli un’opzione</span>
                    <div className="flex gap-2">
                        <OptionButton
                            label="Privato"
                            selected={customerType === "private"}
                            onClick={() => setCustomerType("private")}
                        >
                            <CircleUser />
                        </OptionButton>

                        <OptionButton
                            label="Azienda"
                            selected={customerType === "business"}
                            onClick={() => setCustomerType("business")}
                        >
                            <Building2 />
                        </OptionButton>
                    </div>
                </div>

                {/* AUTO / FURGONI */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli il tipo di veicolo</span>
                    <div className="flex gap-2">
                        <OptionButton
                            label="Auto"
                            selected={vehicleType === "car"}
                            onClick={() => setVehicleType("car")}
                        >
                            <Car />
                        </OptionButton>

                        <OptionButton
                            label="Furgoni"
                            selected={vehicleType === "van"}
                            onClick={() => setVehicleType("van")}
                        >
                            <Bus />
                        </OptionButton>

                    </div>
                </div>
            </div>

            {/* RIGA 2: CITTÀ + DATA RITIRO + DATA RICONSEGNA */}
            <div className="flex flex-col md:flex-row md:gap-6 gap-4">
                {/* COLONNA 1: CITTÀ + CHECKBOX */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center">
            <span className="text-sm font-semibold">
              Città ritiro e riconsegna
            </span>

                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer ml-6 md:ml-40">
                            <input
                                type="checkbox"
                                name="sameOffice"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-[#0700DE] focus:ring-[#0700DE]"
                            />
                            <span>Riconsegna nello stesso ufficio</span>
                        </label>
                    </div>

                    {/* input città */}
                    <div className="relative mt-1 ">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2  text-[#0700DE]">
                            <MapPin className="w-4 h-4" />
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
                <div className="flex-1 space-y-2">
                    <span className="text-sm font-semibold">Data e ora del ritiro</span>

                    <div className="flex">
                        {/* data ritiro */}
                        <div className="relative flex-1">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0700DE]">
                                <CalendarDays className="w-4 h-4" />
                            </div>
                            <input
                                type="date"
                                name="pickupDate"
                                className="w-full h-11 rounded-tl-sm border border-gray-300 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0700DE] focus:border-[#0700DE]"
                            />
                        </div>

                        {/* ora ritiro */}
                        <input
                            type="time"
                            name="pickupTime"
                            className="w-24 h-11  rounded-br-sm  border border-gray-300 border-l-0 text-sm text-center focus:outline-none focus:ring-1 focus:ring-[#0700DE] focus:border-[#0700DE]"
                        />
                    </div>
                </div>

                {/* COLONNA 3: DATA E ORA DELLA RICONSEGNA */}
                <div className="flex-1 space-y-2">
          <span className="text-sm font-semibold">
            Data e ora della riconsegna
          </span>

                    <div className="flex">
                        {/* data riconsegna */}
                        <div className="relative flex-1">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0700DE]">
                                <CalendarDays className="w-4 h-4" />
                            </div>
                            <input
                                type="date"
                                name="dropoffDate"
                                className="w-full h-11 rounded-tl-sm border border-gray-300 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0700DE] focus:border-[#0700DE]"
                            />
                        </div>

                        {/* ora riconsegna */}
                        <input
                            type="time"
                            name="dropoffTime"
                            className="w-24 h-11 rounded-br-sm  border border-gray-300 border-l-0 text-sm text-center focus:outline-none focus:ring-1 focus:ring-[#0700DE] focus:border-[#0700DE]"
                        />
                    </div>
                </div>
            </div>

            {/* RIGA 3: 4 COLONNE EQUAMENTE DISTRIBUITE */}
            <div className="flex flex-col md:flex-row gap-4 pt-2 items-center">
                {/* COLONNA 1 - ETÀ (select) */}
                <div className="flex-1 flex items-center">
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
                <div className="flex-1 flex items-center">
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
                <div className="flex-1 flex items-center gap-2 text-sm text-gray-800">
                    <input
                        type="checkbox"
                        name="hasPromo"
                        className="h-4 w-4 rounded border-gray-300 text-[#0700DE] focus:ring-[#0700DE]"
                    />
                    <span>
            Ho un <span className="font-semibold">Codice Promozionale</span>
          </span>
                    <Info className="w-4 h-4 text-gray-400" />
                </div>

                {/* COLONNA 4 - CERCA */}
                <div className="flex-1 flex">
                    <button
                        type="submit"
                        className="w-full h-11 rounded-tl-sm rounded-br-sm bg-[#0700DE] text-white text-sm font-semibold hover:bg-[#0500b0] transition"
                    >
                        Cerca
                    </button>
                </div>
            </div>
        </form>
    );
}
