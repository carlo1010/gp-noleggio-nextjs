import type { CollectionConfig } from 'payload'
import {
  PromoSplitBlock,
  OffersSectionBlock,
  FleetSectionBlock,
  BenefitsSectionBlock,
  DiscoverSectionBlock,
} from '../blocks/Sections'
import {
  RentalFeaturesBlock,
  ComeFunzionaBlock,
  InfoNoleggioBlock,
  FlottaGrigliaBlock,
  WideImageBannerBlock,
} from '../blocks/RentalBlocks'
import {
  ElettricoKeyPointsBlock,
  GammaElettricaInfoBlock,
  PremiumIntroBlock,
  ModelChoiceBlock,
  DoveSiamoBlock,
  WhyRentBlock,
} from '../blocks/MiscBlocks'
import { BlogListBlock } from '../blocks/BlogBlocks'

export const PageConfigs: CollectionConfig = {
  slug: 'page-configs',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'updatedAt'],
    description: 'Gestisci il contenuto delle pagine: Hero e sezioni dinamiche.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Noleggio Auto', value: 'noleggio-auto' },
        { label: 'Noleggio Premium', value: 'noleggio-premium' },
        { label: 'Noleggio Furgoni', value: 'noleggio-furgoni' },
        { label: 'Noleggio Elettriche', value: 'noleggio-elettriche' },
        { label: 'Scopri', value: 'scopri' },
        { label: 'Blog', value: 'blog' },
      ],
      label: 'Pagina',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Sezione Hero',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titolo Hero',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrizione Hero',
        },
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Immagine di Sfondo',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Contenuto Pagina',
      blocks: [
        PromoSplitBlock,
        OffersSectionBlock,
        FleetSectionBlock,
        BenefitsSectionBlock,
        DiscoverSectionBlock,
        RentalFeaturesBlock,
        ComeFunzionaBlock,
        InfoNoleggioBlock,
        FlottaGrigliaBlock,
        WideImageBannerBlock,
        ElettricoKeyPointsBlock,
        GammaElettricaInfoBlock,
        PremiumIntroBlock,
        ModelChoiceBlock,
        DoveSiamoBlock,
        WhyRentBlock,
        BlogListBlock,
      ],
    },
  ],
}
