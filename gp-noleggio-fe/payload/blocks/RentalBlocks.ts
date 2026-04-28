import type { Block } from 'payload'

export const RentalFeaturesBlock: Block = {
  slug: 'rental-features',
  labels: {
    singular: 'Rental Features',
    plural: 'Rental Features',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    {
      name: 'features',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Miglior Prezzo', value: 'feature-price' },
            { label: 'Dati Sicuri', value: 'feature-security' },
            { label: 'Flessibilità', value: 'feature-time' },
          ],
        },
      ],
    },
  ],
}

export const ComeFunzionaBlock: Block = {
  slug: 'come-funziona',
  labels: {
    singular: 'Come Funziona',
    plural: 'Come Funziona',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [
        { name: 'text', type: 'textarea', required: true },
      ],
    },
  ],
}

export const InfoNoleggioBlock: Block = {
  slug: 'info-noleggio',
  labels: {
    singular: 'Info Noleggio',
    plural: 'Info Noleggio',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}

export const FlottaGrigliaBlock: Block = {
  slug: 'flotta-griglia',
  labels: {
    singular: 'Griglia Flotta',
    plural: 'Griglie Flotta',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'cars',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'autonomia', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}

export const WideImageBannerBlock: Block = {
  slug: 'wide-image-banner',
  labels: {
    singular: 'Banner Immagine Larga',
    plural: 'Banner Immagine Larga',
  },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'alt', type: 'text' },
  ],
}
