import HeroBanner from "@/components/hero-banner";
import Footer from "@/components/footer";
import ComeFunziona from "@/components/come-funziona";
import IntroFurgoni from "@/components/intro-furgoni";
import PromoSplit from "@/components/PromoSplit";
import WideImageBanner from "@/components/wide-image-banner";


export default function noleggioFurgoni() {
    return (
        <>

        <HeroBanner imageUrl={'/flotta-furgoni.png'}/>

        <IntroFurgoni
            title="Noleggio furgoni - Scopri la flotta furgoni di Piccirillo Rent, adatta per ogni esigenza"
            subtitle="Con Piccirillo Rent troverai sempre l'offerta di noleggio furgoni giusta per te"
            body="Piccirillo Rent è un punto di riferimento nel noleggio di veicoli, offrendo soluzioni versatili per ogni tipo di esigenza, ovunque ti trovi..."
        />
            <PromoSplit
                title={`Noleggio il furgone perfetto con Piccirillo Rent:
Flessibile, conveniente e senza pensieri!`}
                body={`Sei alla ricerca di un noleggio furgoni affidabile e conveniente?
Piccirillo Rent mette a disposizione una vasta scelta di veicoli, ideali sia per esigenze personali che professionali.

Qualunque sia il motivo — un trasloco, un’attività lavorativa o un’esigenza temporanea — siamo pronti a rispondere alle tue necessità. Scegliere il nostro noleggio significa affidarsi a un servizio semplice, pratico e personalizzato.`}
                ctaLabel="Prenota furgoni"
                ctaHref="/noleggio-furgoni/ricerca"
                imageSrc="/preno-furgone.png"
                imageAlt="Furgone aperto con scatole"
                imageSide="right"
                imageAspectClassName="aspect-[4/3]"
                imageRoundedClassName="rounded-br-xl rounded-tl-xl"
            />
            <WideImageBanner
                src="/furgone-banner-completo.png"
                alt="Operai che caricano scatole in un furgone"
                aspectClassName="aspect-[16/5]"
                roundedClassName="rounded-br-2xl rounded-tl-2xl"
            />
            <PromoSplit
                title="Noleggio furgoni Piccirillo Rent per le aziende: flessibile, efficiente e conveniente"
                body={`In Piccirillo Rent sappiamo quanto sia importante per le aziende avere un servizio di noleggio furgoni affidabile, flessibile e conveniente.

Per questo, proponiamo soluzioni su misura: ritiro e riconsegna in sedi differenti, opzioni configurabili e assistenza dedicata, così da ridurre i tempi e rendere la gestione operativa più semplice.`}
                ctaLabel="Prenota ora"
                ctaHref="/noleggio-furgoni/business"
                imageSrc="/business-furgone.png"
                imageAlt="Professionista con tablet vicino a furgoni"
                imageSide="right"
                imageAspectClassName="aspect-[4/3]"
                imageRoundedClassName="rounded-br-xl rounded-tl-xl"
            />
            <PromoSplit title={"Scopri le offerte e i servizi Piccirillo Rent per il noleggio di furgoni"} body={"Hai bisogno di un furgone a noleggio per motivi professionali o per esigenze personali? Piccirillo Rent ti offre la soluzione ideale: un’ampia scelta di veicoli commerciali, dalle dimensioni compatte a quelle più capienti, adatti a qualsiasi tipo di trasporto. Scegli la massima flessibilità con formule pensate per coprire periodi brevi – perfette per esigenze improvvise o trasporti urgenti.  Organizza i tuoi spostamenti anche nelle ore serali – una soluzione utile se preferisci agire fuori dagli orari tradizionali. Rendi i tuoi viaggi più comodi con la possibilità di inserire un secondo conducente – utile per alternarsi alla guida durante tragitti più lunghi.  Effettua il noleggio in una località e riconsegna in un’altra" +
                " – una soluzione comoda per chi ha bisogno di spostarsi senza tornare al punto di partenza. Scegli anche formule più estese – ideali per chi necessita del mezzo per periodi continuativi, sia per esigenze aziendali che personali."} ctaLabel={"Prenota Ora"} ctaHref={"/noleggio-furgoni/business2"} imageSrc={"/furgoni-neri.png"} imageAlt={"furgoni neri iveco"} imageSide="left"  />
            




        <Footer/>
        <ComeFunziona/>

        </>
    )
}