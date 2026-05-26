import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'progetto-australia',
  title: 'Progetto Australia CMS',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti')
          .items([
            S.listItem()
              .title('Itinerari')
              .child(S.documentTypeList('itinerary').title('Itinerari')),
            S.listItem()
              .title('Destinazioni')
              .child(S.documentTypeList('destination').title('Destinazioni')),
            S.listItem()
              .title('Blog')
              .child(S.documentTypeList('blogPost').title('Blog Post')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
