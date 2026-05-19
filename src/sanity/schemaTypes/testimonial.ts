import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonianze',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string' }),
    defineField({ name: 'photo', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'trip',
      title: 'Viaggio',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Titolo Recensione',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'text',
      title: 'Testo',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({ name: 'rating', title: 'Valutazione (1-5)', type: 'number', initialValue: 5 }),
    defineField({
      name: 'date',
      title: 'Data',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano (es. Ottobre 2025)', type: 'string' },
        { name: 'en', title: 'English (es. October 2025)', type: 'string' },
      ],
    }),
    defineField({
      name: 'platform',
      title: 'Piattaforma',
      type: 'string',
      options: {
        list: [
          { title: 'Matrimonio.com', value: 'matrimonio' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Sito Web', value: 'website' },
        ],
      },
    }),
    defineField({ name: 'reviewCount', title: 'Punteggio (es. 4.8 / 5)', type: 'string' }),
    defineField({ name: 'order', title: 'Ordine di visualizzazione', type: 'number', initialValue: 99 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'trip.it', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
