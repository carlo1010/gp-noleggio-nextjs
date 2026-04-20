interface FlottaGrigliaProps {
    title?: string;
    cars?: {
        image: string | any;
        name: string;
        autonomia: string;
    }[];
}

export default function FlottaGriglia({ 
    title = "I nostri modelli", 
    cars = [] 
}: FlottaGrigliaProps) {
    return (
        <section className="w-full bg-white">
            <div className="container mx-auto max-w-[1240px] px-4 py-5">
                <h2 className=" text-2xl font-bold text-black justify-start">
                    {title}
                </h2>

                <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 py-10">
                    {cars.map((car, index) => {
                        const imageUrl = typeof car.image === 'object' ? car.image?.url : car.image;
                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                {/* contenitore immagine */}
                                <div className="relative h-[70px] w-[140px] overflow-hidden rounded-md">
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt={car.name}
                                            fill
                                            className="object-cover"
                                            sizes="140px"
                                        />
                                    )}
                                </div>

                                <div className="mt-3 text-[12px] font-semibold text-black">
                                    {car.name}
                                </div>
                                <div className="mt-1 text-[10px] text-gray-600">
                                    {car.autonomia}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}






