import type { Block } from 'payload'

export const BlogListBlock: Block = {
  slug: 'blog-list',
  labels: {
    singular: 'Lista Blog',
    plural: 'Liste Blog',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Articoli in evidenza',
    },
    {
      name: 'manualSelection',
      type: 'checkbox',
      label: 'Selezione Manuale Articoli',
      defaultValue: false,
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'blog-posts',
      hasMany: true,
      label: 'Articoli Selezionati',
      admin: {
        condition: (data, siblingData) => siblingData?.manualSelection,
      },
    },
  ],
}
