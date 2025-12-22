import {useIntersection} from "next/dist/client/use-intersection";
import Image from "next/image";

interface FlottaGrigliaProps {
    title: string;
    cars: {
        imageUrl: string;
        nome: string;
        autonomia: string;
    }[];
}

export default function FlottaGriglia(props: FlottaGrigliaProps) {
    return (
        <section className="w-full bg-white">

            <div className="mx-auto max-w-6xl px-4 py-5">
                <h2 className=" text-2xl font-bold text-black justify-start">
                    {props.title}
                </h2>

                <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 py-40">
                    {props.cars.map((car, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            {/* contenitore immagine */}
                            <div className="relative h-[70px] w-[140px] overflow-hidden rounded-md">
                                <Image
                                    src={car.imageUrl}
                                    alt={car.nome}
                                    fill
                                    className="object-cover"
                                    sizes="140px"
                                />
                            </div>

                            <div className="mt-3 text-[12px] font-semibold text-black">
                                {car.nome}
                            </div>
                            <div className="mt-1 text-[10px] text-gray-600">
                                {car.autonomia}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}






