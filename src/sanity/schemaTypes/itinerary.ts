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
      title: 'Destinazioni',
      type: 'array',
      description: 'Seleziona una o più destinazioni per questo itinerario',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
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
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Lusso', value: 'luxury' },
          { title: 'Avventura', value: 'adventure' },
          { title: 'Combinazione', value: 'combination' },
          { title: 'Famiglia', value: 'family' },
          { title: 'Nozze', value: 'honeymoon' },
          { title: 'Zaino in spalla', value: 'backpacking' },
        ],
      },
    }),
    defineField({
      name: 'priceEn',
      title: 'Prezzo (USD)',
      type: 'object',
      fields: [
        { name: 'amount', title: 'Importo', type: 'number' },
        { name: 'currency', title: 'Valuta', type: 'string', initialValue: 'USD' },
      ],
    }),
    defineField({
      name: 'gradient',
      title: 'Gradiente Card (CSS)',
      type: 'string',
      description: 'Es. "from-teal-700 to-blue-900" — usato come sfondo della card quando non c\'è immagine.',
      hidden: true,
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
      name: 'mapImage',
      title: 'Mappa del Percorso',
      type: 'image',
      description: 'Immagine della mappa con il percorso dell\'itinerario',
      options: { hotspot: true },
    }),
    defineField({
      name: 'program',
      title: 'Programma',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Giorno', type: 'number' },
            {
              name: 'title',
              title: 'Titolo',
              type: 'object',
              fields: [
                { name: 'it', title: 'Italiano', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'object',
              fields: [
                { name: 'it', title: 'Italiano', type: 'text' },
                { name: 'en', title: 'English', type: 'text' },
              ],
            },
            {
              name: 'images',
              title: 'Foto del Giorno',
              type: 'array',
              description: 'Aggiungi una o più foto per questo giorno',
              of: [{ type: 'image', options: { hotspot: true } }],
            },
          ],
          preview: {
            select: { title: 'title.it', subtitle: 'day', media: 'images.0' },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare(value: any) {
              return { title: `Giorno ${value.subtitle}: ${value.title}`, media: value.media };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'included',
      title: 'Cosa è incluso',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'notIncluded',
      title: 'Non incluso',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'In evidenza',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hideInEN',
      title: 'Nascondi nella versione inglese',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Ordine di visualizzazione',
      description: 'Numero più basso = appare prima. Lascia vuoto per ordine automatico.',
      type: 'number',
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
