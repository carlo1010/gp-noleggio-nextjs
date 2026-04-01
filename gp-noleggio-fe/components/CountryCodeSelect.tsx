import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type CountryCode = {
  code: string;
  flag: string;
  name: string;
  phone: string;
};

export const COUNTRY_CODES: CountryCode[] = [
  { code: "IT", flag: "🇮🇹", name: "Italia", phone: "+39" },
  { code: "AT", flag: "🇦🇹", name: "Austria", phone: "+43" },
  { code: "BE", flag: "🇧🇪", name: "Belgio", phone: "+32" },
  { code: "HR", flag: "🇭🇷", name: "Croazia", phone: "+385" },
  { code: "CY", flag: "🇨🇾", name: "Cipro", phone: "+357" },
  { code: "CZ", flag: "🇨🇿", name: "Repubblica Ceca", phone: "+420" },
  { code: "DK", flag: "🇩🇰", name: "Danimarca", phone: "+45" },
  { code: "EE", flag: "🇪🇪", name: "Estonia", phone: "+372" },
  { code: "FI", flag: "🇫🇮", name: "Finlandia", phone: "+358" },
  { code: "FR", flag: "🇫🇷", name: "Francia", phone: "+33" },
  { code: "DE", flag: "🇩🇪", name: "Germania", phone: "+49" },
  { code: "GR", flag: "🇬🇷", name: "Grecia", phone: "+30" },
  { code: "HU", flag: "🇭🇺", name: "Ungheria", phone: "+36" },
  { code: "IE", flag: "🇮🇪", name: "Irlanda", phone: "+353" },
  { code: "LV", flag: "🇱🇻", name: "Lettonia", phone: "+371" },
  { code: "LT", flag: "🇱🇹", name: "Lituania", phone: "+370" },
  { code: "LU", flag: "🇱🇺", name: "Lussemburgo", phone: "+352" },
  { code: "MT", flag: "🇲🇹", name: "Malta", phone: "+356" },
  { code: "NL", flag: "🇳🇱", name: "Paesi Bassi", phone: "+31" },
  { code: "PL", flag: "🇵🇱", name: "Polonia", phone: "+48" },
  { code: "PT", flag: "🇵🇹", name: "Portogallo", phone: "+351" },
  { code: "RO", flag: "🇷🇴", name: "Romania", phone: "+40" },
  { code: "SK", flag: "🇸🇰", name: "Slovacchia", phone: "+421" },
  { code: "SI", flag: "🇸🇮", name: "Slovenia", phone: "+386" },
  { code: "ES", flag: "🇪🇸", name: "Spagna", phone: "+34" },
  { code: "SE", flag: "🇸🇪", name: "Svezia", phone: "+46" },
  { code: "GB", flag: "🇬🇧", name: "Regno Unito", phone: "+44" },
  { code: "CH", flag: "🇨🇭", name: "Svizzera", phone: "+41" },
  { code: "NO", flag: "🇳🇴", name: "Norvegia", phone: "+47" },
  { code: "US", flag: "🇺🇸", name: "Stati Uniti", phone: "+1" },
];

export interface CountryCodeSelectProps {
  value?: string;
  onChange?: (country: CountryCode) => void;
}

export default function CountryCodeSelect({
  value = "IT",
  onChange,
}: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0];

  const handleSelect = (country: CountryCode) => {
    onChange?.(country);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-2 bg-white border rounded-md flex items-center gap-2 text-xs whitespace-nowrap hover:bg-gray-50"
      >
        <span>{selected.flag}</span>
        <span>{selected.phone}</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-50 w-64 max-h-80 overflow-y-auto">
          {COUNTRY_CODES.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleSelect(country)}
              className="w-full px-3 py-2 text-left text-xs hover:bg-blue-50 flex items-center gap-2 border-b last:border-b-0 hover:text-blue-600"
            >
              <span className="text-sm">{country.flag}</span>
              <span className="flex-1">{country.name}</span>
              <span className="font-mono text-gray-500">{country.phone}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
