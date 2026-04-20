import React from 'react'
import dynamic from 'next/dynamic'

// Caricamento dinamico dei componenti per ottimizzare il bundle
const PromoSplit = dynamic(() => import('./PromoSplit'))
const OffersSection = dynamic(() => import('./offer-section'))
const FleetSection = dynamic(() => import('./fleet-section'))
const BenefitsSection = dynamic(() => import('./benefits-section'))
const DiscoverSection = dynamic(() => import('./discover-section'))
const RentalFeatures = dynamic(() => import('./rental-features'))
const ComeFunziona = dynamic(() => import('./come-funziona'))
const InfoNoleggio = dynamic(() => import('./info-noleggio'))
const FlottaGriglia = dynamic(() => import('./flotta-griglia'))
const WideImageBanner = dynamic(() => import('./wide-image-banner'))
const WhyRent = dynamic(() => import('./why-rent'))
const DoveSiamo = dynamic(() => import('./dove-siamo'))
const BlogSection = dynamic(() => import('./blog-list'))

// Altri componenti specifici
const ElettricoKeyPoints = dynamic(() => import('./elettrico-key-points'))
const GammaElettricaInfo = dynamic(() => import('./gamma-elettricainfo'))
const PremiumIntro = dynamic(() => import('./premium-intro'))
const ModelChoice = dynamic(() => import('./model-choice'))

interface BlockRendererProps {
  blocks: any[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'promo-split':
            return (
              <PromoSplit
                key={index}
                title={block.title}
                body={block.body}
                ctaLabel={block.ctaLabel}
                ctaHref={block.ctaHref}
                image={block.image}
                imageSide={block.imageSide}
              />
            )
          case 'offers-section':
            return <OffersSection key={index} title={block.title} offers={block.offers} />
          case 'fleet-section':
            return <FleetSection key={index} title={block.title} items={block.items} />
          case 'benefits-section':
            return <BenefitsSection key={index} items={block.items} />
          case 'discover-section':
            return <DiscoverSection key={index} title={block.title} featuredPosts={block.featuredPosts} />
          case 'rental-features':
            return (
              <RentalFeatures
                key={index}
                title={block.title}
                description={block.description}
                features={block.features}
              />
            )
          case 'come-funziona':
            return <ComeFunziona key={index} title={block.title} paragraphs={block.paragraphs} />
          case 'info-noleggio':
            return (
              <InfoNoleggio
                key={index}
                title={block.title}
                body={block.body}
                image={block.image}
              />
            )
          case 'flotta-griglia':
            return <FlottaGriglia key={index} title={block.title} cars={block.cars} />
          case 'wide-image-banner':
            return <WideImageBanner key={index} image={block.image} alt={block.alt} />
          case 'why-rent':
            return <WhyRent key={index} title={block.title} benefits={block.benefits} />
          case 'dove-siamo':
            return <DoveSiamo key={index} title={block.title} subtitle={block.subtitle} body={block.body} />
          case 'elettrico-key-points':
            return <ElettricoKeyPoints key={index} items={block.items} />
          case 'gamma-elettrica-info':
            return (
              <GammaElettricaInfo
                key={index}
                title={block.title}
                body={block.body}
                ctaLabel={block.ctaLabel}
                ctaHref={block.ctaHref}
              />
            )
          case 'premium-intro':
            return (
              <PremiumIntro
                key={index}
                title={block.title}
                body={block.body}
                cards={block.cards}
                ctaLabel={block.ctaLabel}
                ctaHref={block.ctaHref}
              />
            )
          case 'model-choice':
            return (
              <ModelChoice
                key={index}
                title={block.title}
                body={block.body}
                image={block.image}
                ctaLabel={block.ctaLabel}
                ctaHref={block.ctaHref}
              />
            )
          case 'blog-list':
             // @ts-ignore
            return <BlogSection key={index} title={block.title} manualSelection={block.manualSelection} manualItems={block.manualItems} />
          default:
            return <div key={index}>Block type {block.blockType} not supported</div>
        }
      })}
    </>
  )
}
