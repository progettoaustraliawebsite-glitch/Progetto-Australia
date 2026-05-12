import { defineField, defineType } from 'sanity';

export const weddingPackage = defineType({
  name: 'weddingPackage',
  title: 'Pacchetti Nozze',
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
      name: 'description',
      title: 'Descrizione',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
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
      name: 'inclusions',
      title: 'Inclusioni',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title.it', media: 'image' },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});
