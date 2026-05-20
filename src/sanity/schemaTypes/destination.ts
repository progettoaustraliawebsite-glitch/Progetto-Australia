import { defineField, defineType } from 'sanity';

export const destination = defineType({
  name: 'destination',
  title: 'Destinazioni',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome',
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
      name: 'country',
      title: 'Paese',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
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

    // ── Rich content fields ──────────────────────────────────────────────────

    defineField({
      name: 'intro',
      title: 'Testo introduttivo (HTML con <strong> consentito)',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'mustSeeImage',
      title: 'Immagine sezione "5 Must" (URL)',
      type: 'url',
      description: 'URL completo o path locale es. /images/must-australia-reef.png',
    }),
    defineField({
      name: 'mustSee',
      title: '5 Da Vedere',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
                { name: 'it', title: 'Italiano', type: 'text', rows: 2 },
                { name: 'en', title: 'English', type: 'text', rows: 2 },
              ],
            },
          ],
          preview: {
            select: { title: 'title.it' },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare(value: any) {
              return { title: value.title as string };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'whenToGo',
      title: 'Quando andare',
      type: 'object',
      fields: [
        {
          name: 'months',
          title: 'Mesi (12 valori: Gen → Dic)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'it', title: 'Nome mese IT', type: 'string' },
                { name: 'en', title: 'Nome mese EN', type: 'string' },
                {
                  name: 'rating',
                  title: 'Valutazione',
                  type: 'string',
                  options: { list: ['best', 'good', 'avoid'] },
                },
              ],
              preview: {
                select: { title: 'it', subtitle: 'rating' },
              },
            },
          ],
        },
        {
          name: 'description',
          title: 'Descrizione stagioni',
          type: 'object',
          fields: [
            { name: 'it', title: 'Italiano', type: 'text', rows: 3 },
            { name: 'en', title: 'English', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
    defineField({
      name: 'practical',
      title: 'Informazioni Pratiche',
      type: 'object',
      fields: [
        {
          name: 'visa',
          title: 'Visto / Visa',
          type: 'object',
          fields: [
            { name: 'it', title: 'Italiano', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'flights',
          title: 'Voli / Flights',
          type: 'object',
          fields: [
            { name: 'it', title: 'Italiano', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'currency',
          title: 'Valuta / Currency',
          type: 'object',
          fields: [
            { name: 'it', title: 'Italiano', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'language',
          title: 'Lingua / Language',
          type: 'object',
          fields: [
            { name: 'it', title: 'Italiano', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
          ],
        },
        {
          name: 'timezone',
          title: 'Fuso Orario / Time Zone',
          type: 'object',
          fields: [
            { name: 'it', title: 'Italiano', type: 'text', rows: 2 },
            { name: 'en', title: 'English', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'experiences',
      title: 'Esperienze Consigliate',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'it', title: 'Italiano', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
          ],
          preview: {
            select: { title: 'it' },
          },
        },
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
