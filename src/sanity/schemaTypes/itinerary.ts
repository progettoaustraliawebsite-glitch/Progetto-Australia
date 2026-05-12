import { defineField, defineType } from 'sanity';

export const itinerary = defineType({
  name: 'itinerary',
  title: 'Itinerari',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.it' },
    }),
    defineField({
      name: 'destination',
      title: 'Destinazione',
      type: 'reference',
      to: [{ type: 'destination' }],
    }),
    defineField({
      name: 'duration',
      title: 'Durata (giorni)',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Prezzo',
      type: 'object',
      fields: [
        { name: 'amount', title: 'Importo', type: 'number' },
        { name: 'currency', title: 'Valuta', type: 'string', initialValue: 'EUR' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Avventura', value: 'adventure' },
          { title: 'Lusso', value: 'luxury' },
          { title: 'Gruppo', value: 'group' },
          { title: 'Nozze', value: 'honeymoon' },
          { title: 'Famiglia', value: 'family' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Immagine Hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'In evidenza',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.it', media: 'heroImage' },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});
