import Image from "next/image";

export default function VantaggiVacanza() {
    return (
        <section className="bg-gray-50 py-35">
            <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

                <div>
                    <Image
                        src="/no-cost.png"
                        alt="Nessun costo nascosto"
                        width={100}
                        height={100}
                        className="mx-auto mb-4"
                    />
                    <p className="font-medium">Nessun costo nascosto</p>
                </div>

                <div>
                    <Image
                        src="/support-24.png"
                        alt="Supporto 24H"
                        width={100}
                        height={100}
                        className="mx-auto mb-4"
                    />
                    <p className="font-medium">Supporto 24H</p>
                </div>

                <div>
                    <Image
                        src="/wide-range.png"
                        alt="Ampia gamma di auto"
                        width={100}
                        height={100}
                        className="mx-auto mb-4"
                    />
                    <p className="font-medium">Ampia gamma di auto</p>
                </div>

                <div>
                    <Image
                        src="/assistance-247.png"
                        alt="Assistenza 24/7"
                        width={100}
                        height={100}
                        className="mx-auto mb-4"
                    />
                    <p className="font-medium">Assistenza 24/7</p>
                </div>

            </div>
        </section>
    );
}
