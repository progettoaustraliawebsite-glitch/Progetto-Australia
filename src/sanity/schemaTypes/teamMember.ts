import { defineField, defineType } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string' }),
    defineField({ name: 'photo', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'role',
      title: 'Ruolo',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biografia',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'logos',
      title: 'Certificazioni / Loghi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Immagine', type: 'image' },
            { name: 'alt', title: 'Descrizione', type: 'string' },
          ],
          preview: {
            select: { title: 'alt', media: 'image' },
          },
        },
      ],
    }),
    defineField({ name: 'order', title: 'Ordine di visualizzazione', type: 'number', initialValue: 99 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role.it', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
