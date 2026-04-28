import type { Block } from 'payload'

export const PromoSplitBlock: Block = {
  slug: 'promo-split',
  labels: {
    singular: 'Promo Split',
    plural: 'Promo Splits',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'ctaLabel', type: 'text', required: true },
    { name: 'ctaHref', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Destra', value: 'right' },
        { label: 'Sinistra', value: 'left' },
      ],
    },
  ],
}

export const OffersSectionBlock: Block = {
  slug: 'offers-section',
  labels: {
    singular: 'Sezione Offerte',
    plural: 'Sezioni Offerte',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Le offerte del momento' },
    {
      name: 'offers',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'link', type: 'text', required: true },
        { name: 'badgeTop', type: 'text', defaultValue: 'Fino al' },
        { name: 'badgeBottom', type: 'text', required: true },
      ],
    },
  ],
}

export const FleetSectionBlock: Block = {
  slug: 'fleet-section',
  labels: {
    singular: 'Sezione Flotta',
    plural: 'Sezioni Flotta',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'La flotta' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
  ],
}

export const BenefitsSectionBlock: Block = {
  slug: 'benefits-section',
  labels: {
    singular: 'Sezione Benefici',
    plural: 'Sezioni Benefici',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'buttonLabel', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Sconti e benefici', value: 'benefit1' },
            { label: 'Tutto il tempo', value: 'benefit2' },
            { label: 'Check-in', value: 'benefit3' },
          ],
        },
      ],
    },
  ],
}

export const DiscoverSectionBlock: Block = {
  slug: 'discover-section',
  labels: {
    singular: 'Sezione Scopri (Blog)',
    plural: 'Sezioni Scopri (Blog)',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Scopri il mondo Piccirillo Rent' },
    {
      name: 'featuredPosts',
      type: 'relationship',
      relationTo: 'blog-posts',
      hasMany: true,
      maxRows: 6,
    },
  ],
}
