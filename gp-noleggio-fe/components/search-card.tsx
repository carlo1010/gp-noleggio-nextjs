type OptionButtonProps = {
    label: string;
    active?: boolean;
    children?: React.ReactNode;
};

function OptionButton({ label, active, children }: OptionButtonProps) {
    return (
        <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-br-sm rounded-tl-sm border text-sm font-medium transition
                ${
                active
                    ? "bg-[#0700DE] text-white border-[#0700DE]"
                    : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
            }
            `}
        >
            {children && <span className="flex items-center">{children}</span>}
            {label}
        </button>
    );
}
import { CircleUser } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { Car } from 'lucide-react';
import { Bus } from 'lucide-react';


export default function SearchCard() {
    return(
        <div className="bg-white rounded-br-3xl rounded-tl-3xl shadow-xl w-full max-w-5xl p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:gap-16 gap-6">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli un’opzione</span>
                    <div className="flex gap-2">
                        <OptionButton label="Privato"active>
                            <CircleUser />
                        </OptionButton>

                        <OptionButton label="Azienda" >
                            <Building2 />
                        </OptionButton>
                    </div>

                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold">Scegli il tipo di veicolo</span>
                    <div className="flex gap-2">
                        <OptionButton label="Auto" active >
                            <Car />
                        </OptionButton>
                        <OptionButton label="Furgoni" >
                            <Bus />
                        </OptionButton>
                    </div>
                </div>
            </div>

            <p className="text-gray-500 text-sm">
                (Qui sotto aggiungeremo Città, date, età, vivo in Italia, codice promo, ecc.)
            </p>
        </div>
    )
}