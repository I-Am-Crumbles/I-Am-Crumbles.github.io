import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entry ids mirror folders: web-app-security/portswigger/<slug>
const writeups = defineCollection({
  loader: glob({ base: './src/content', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    section: z.string().optional(),
  }),
});

export const collections = { writeups };
