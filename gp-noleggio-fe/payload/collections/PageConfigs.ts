import type { CollectionConfig } from 'payload'

export const PageConfigs: CollectionConfig = {
  slug: 'page-configs',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'updatedAt'],
    description: 'Gestisci i testi statici e le immagini delle varie pagine. Lascia i campi vuoti per utilizzare i testi di default.',
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
        { name: 'title', type: 'text', label: 'Titolo Hero' },
        { name: 'description', type: 'textarea', label: 'Descrizione Hero' },
        { name: 'bgImage', type: 'upload', relationTo: 'media', label: 'Immagine di Sfondo' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        // TAB HOME
        {
          label: 'Impostazioni Home',
          name: 'homeConfig',
          admin: { condition: (data) => data.slug === 'home' },
          fields: [
            {
              type: 'group',
              name: 'offersSection',
              label: 'Sezione Offerte',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'vantaggiTitle', type: 'text', label: 'Titolo Vantaggi (es. Viaggia in tranquillità)' },
                { name: 'vantaggiSubtitle', type: 'text', label: 'Sottotitolo (es. IL MEGLIO)' },
                { name: 'vantaggiBody', type: 'textarea', label: 'Testo Vantaggi' },
                { name: 'imageVantaggi', type: 'upload', relationTo: 'media', label: 'Immagine Vantaggi' },
                {
                  name: 'vantaggiList',
                  type: 'array',
                  label: 'Lista Vantaggi (Testi sovrapposti)',
                  fields: [
                    { name: 'testo', type: 'text', label: 'Testo Vantaggio' },
                  ],
                },
              ],
            },
            {
              type: 'group',
              name: 'fleetSection',
              label: 'Sezione Flotta',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo Flotta' },
                { name: 'subtitle', type: 'textarea', label: 'Sottotitolo Flotta' },
              ],
            },
            {
              type: 'group',
              name: 'benefitsSection',
              label: 'Sezione Perché Sceglierci',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'textarea', label: 'Sottotitolo' },
                { name: 'bgImage', type: 'upload', relationTo: 'media', label: 'Immagine Sfondo' },
              ],
            },
            {
              type: 'group',
              name: 'discoverSection',
              label: 'Sezione Scopri di più',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
              ],
            },
          ],
        },
        // TAB AUTO
        {
          label: 'Impostazioni Auto',
          name: 'autoConfig',
          admin: { condition: (data) => data.slug === 'noleggio-auto' },
          fields: [
            {
              type: 'group',
              name: 'rentalFeatures',
              label: 'Sezione Vantaggi (Icone)',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
              ],
            },
            {
              type: 'group',
              name: 'comeFunziona',
              label: 'Sezione Come Funziona',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'text', label: 'Sottotitolo' },
              ],
            },
            {
              type: 'group',
              name: 'infoNoleggio',
              label: 'Sezione Info Noleggio (Testo + Img)',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'text', label: 'Sottotitolo' },
                { name: 'body', type: 'textarea', label: 'Testo' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine' },
              ],
            },
          ],
        },
        // TAB PREMIUM
        {
          label: 'Impostazioni Premium',
          name: 'premiumConfig',
          admin: { condition: (data) => data.slug === 'noleggio-premium' },
          fields: [
            {
              type: 'group',
              name: 'premiumIntro',
              label: 'Introduzione Premium',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'textarea', label: 'Sottotitolo' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine' },
              ],
            },
            {
              type: 'group',
              name: 'comeFunziona',
              label: 'Sezione Come Funziona',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'text', label: 'Sottotitolo' },
              ],
            },
            {
              type: 'group',
              name: 'modelChoice',
              label: 'Sezione Scelta Modelli',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'ctaLabel', type: 'text', label: 'Testo Bottone' },
              ],
            },
          ],
        },
        // TAB FURGONI
        {
          label: 'Impostazioni Furgoni',
          name: 'furgoniConfig',
          admin: { condition: (data) => data.slug === 'noleggio-furgoni' },
          fields: [
            {
              type: 'group',
              name: 'introFurgoni',
              label: 'Intro Furgoni',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'textarea', label: 'Sottotitolo' },
                { name: 'body', type: 'textarea', label: 'Testo lungo' },
              ],
            },
            {
              type: 'group',
              name: 'promo1',
              label: 'Promo 1 (Privati/Aperto)',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'body', type: 'textarea', label: 'Testo' },
                { name: 'ctaLabel', type: 'text', label: 'Testo Bottone' },
                { name: 'ctaHref', type: 'text', label: 'Link Bottone' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine' },
              ],
            },
            {
              type: 'group',
              name: 'promo2',
              label: 'Promo 2 (Aziende)',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'body', type: 'textarea', label: 'Testo' },
                { name: 'ctaLabel', type: 'text', label: 'Testo Bottone' },
                { name: 'ctaHref', type: 'text', label: 'Link Bottone' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine' },
              ],
            },
            {
              type: 'group',
              name: 'promo3',
              label: 'Promo 3 (Servizi)',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'body', type: 'textarea', label: 'Testo' },
                { name: 'ctaLabel', type: 'text', label: 'Testo Bottone' },
                { name: 'ctaHref', type: 'text', label: 'Link Bottone' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine' },
              ],
            },
            {
              type: 'group',
              name: 'wideBanner',
              label: 'Immagine Larga Background',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine Banner' },
              ],
            },
            {
              type: 'group',
              name: 'comeFunziona',
              label: 'Sezione Come Funziona',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'text', label: 'Sottotitolo' },
              ],
            },
          ],
        },
        // TAB ELETTRICHE
        {
          label: 'Impostazioni Elettriche',
          name: 'elettricheConfig',
          admin: { condition: (data) => data.slug === 'noleggio-elettriche' },
          fields: [
            {
              type: 'group',
              name: 'introElettrico',
              label: 'Intro Elettrico',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'textarea', label: 'Sottotitolo' },
                { name: 'body', type: 'textarea', label: 'Testo lungo' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine' },
              ],
            },
            {
              type: 'group',
              name: 'vantaggiElettrico',
              label: 'Blocco Vantaggi',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'textarea', label: 'Sottotitolo' },
              ],
            },
            {
              type: 'group',
              name: 'comeFunziona',
              label: 'Sezione Come Funziona',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'text', label: 'Sottotitolo' },
              ],
            },
          ],
        },
        // TAB SCOPRI
        {
          label: 'Impostazioni Scopri',
          name: 'scopriConfig',
          admin: { condition: (data) => data.slug === 'scopri' },
          fields: [
            {
              type: 'group',
              name: 'chiSiamo',
              label: 'Sezione Chi Siamo',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'body', type: 'textarea', label: 'Testo' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Immagine' },
              ],
            },
            {
              type: 'group',
              name: 'doveSiamo',
              label: 'Sezione Dove Siamo',
              fields: [
                { name: 'title', type: 'text', label: 'Titolo' },
                { name: 'subtitle', type: 'textarea', label: 'Sottotitolo' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
