import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefono', type: 'string' }),
    defineField({ name: 'phoneUS', title: 'Telefono USA', type: 'string' }),
    defineField({ name: 'address', title: 'Indirizzo', type: 'string' }),
    defineField({ name: 'hours', title: 'Orari (IT)', type: 'string' }),
    defineField({ name: 'hoursEn', title: 'Orari (EN)', type: 'string' }),
  ],
  preview: {
    prepare() {
      return { title: 'Impostazioni Sito' };
    },
  },
});
