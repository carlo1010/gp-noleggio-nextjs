interface DoveSiamoProps {
    config?: any;
    title?: string;
    subtitle?: string;
    body?: string;
}

export default function DoveSiamo({ 
    config,
    title = "Piccirillo Rent In Italia", 
    subtitle = "DOVE SIAMO IN ITALIA", 
    body = "Trova la sede Piccirillo Rent più vicina a te! Grazie alla nostra rete capillare di punti di ritiro e riconsegna su tutto il territorio nazionale, puoi noleggiare l’auto dove preferisci e restituirla nella località che ti è più comoda. Scopri tutte le sedi disponibili sulla mappa e prenota direttamente online in pochi clic."
}: DoveSiamoProps) {
    const cmsTitle = config?.scopriConfig?.doveSiamo?.title || title;
    const cmsSubtitle = config?.scopriConfig?.doveSiamo?.subtitle || subtitle;
    const defaultSubtitle = "Punti di ritiro e riconsegna in tutto il Paese";

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 py-14 max-w-[1240px]">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    {cmsTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="h-[400px]">
                        <MapClient />
                    </div>

                    <div className="content-center">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                            {cmsSubtitle}
                        </span>

                        <h3 className="text-2xl font-bold mt-2 mb-4">
                            {cmsTitle === "Piccirillo Rent In Italia" ? defaultSubtitle : cmsTitle}
                        </h3>

                        <p className="text-gray-600 mb-6">
                            {body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
