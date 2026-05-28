import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'publishedAt',
      title: 'Data di pubblicazione',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Autore',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Estratto',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Introduzione',
      description: 'Paragrafo introduttivo dell\'articolo, mostrato prima delle sezioni.',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'text', rows: 6 },
        { name: 'en', title: 'English', type: 'text', rows: 6 },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sezioni',
      description: 'Ogni sezione ha un titolo, un ID (per i link interni) e il contenuto bilingue.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Sezione',
          preview: {
            select: { title: 'title.it', subtitle: 'id' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title ?? 'Sezione', subtitle: subtitle };
            },
          },
          fields: [
            { name: 'id', title: 'ID (ancora URL)', type: 'string', description: 'es. "documenti", "clima", "trasporti"' },
            {
              name: 'title',
              title: 'Titolo sezione',
              type: 'object',
              fields: [
                { name: 'it', title: 'Italiano', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
            },
            {
              name: 'content',
              title: 'Contenuto sezione',
              type: 'object',
              fields: [
                { name: 'it', title: 'Italiano', type: 'text', rows: 8 },
                { name: 'en', title: 'English', type: 'text', rows: 8 },
              ],
            },
            {
              name: 'image',
              title: 'Immagine (opzionale)',
              type: 'image',
              options: { hotspot: true },
              description: 'Immagine associata a questa sezione. Verrà mostrata sotto il testo.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Contenuto (Portable Text — avanzato)',
      description: 'Alternativa alle sezioni: contenuto libero con testo ricco. Usare solo se non si usano le Sezioni.',
      type: 'object',
      fields: [
        { name: 'it', title: 'Italiano', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Immagine Hero',
      type: 'image',
      options: { hotspot: true },
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
