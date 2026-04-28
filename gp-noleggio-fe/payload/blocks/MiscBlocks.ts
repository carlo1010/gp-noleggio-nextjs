import type { Block } from 'payload'

export const ElettricoKeyPointsBlock: Block = {
  slug: 'elettrico-key-points',
  labels: {
    singular: 'Punti Chiave Elettrico',
    plural: 'Punti Chiave Elettrico',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Macchina Elettrica', value: 'macchinaElettrica' },
            { label: 'Simbolo Elettrico', value: 'simboloElettrico' },
          ],
        },
      ],
    },
  ],
}

export const GammaElettricaInfoBlock: Block = {
  slug: 'gamma-elettrica-info',
  labels: {
    singular: 'Info Gamma Elettrica',
    plural: 'Info Gamma Elettrica',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

export const PremiumIntroBlock: Block = {
  slug: 'premium-intro',
  labels: {
    singular: 'Intro Premium',
    plural: 'Intro Premium',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    {
      name: 'cards',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
        {
          name: 'logos',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

export const ModelChoiceBlock: Block = {
  slug: 'model-choice',
  labels: {
    singular: 'Model Choice',
    plural: 'Model Choice',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}

export const DoveSiamoBlock: Block = {
  slug: 'dove-siamo',
  labels: {
    singular: 'Sezione Dove Siamo',
    plural: 'Sezioni Dove Siamo',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'body', type: 'textarea' },
  ],
}

export const WhyRentBlock: Block = {
  slug: 'why-rent',
  labels: {
    singular: 'Sezione Why Rent',
    plural: 'Sezioni Why Rent',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Nessun costo', value: 'no-cost' },
            { label: 'Supporto 24H', value: 'support-24' },
            { label: 'Gamma larga', value: 'wide-range' },
            { label: 'Assistenza 24/7', value: 'assistance-247' },
          ],
        },
      ],
    },
  ],
}
