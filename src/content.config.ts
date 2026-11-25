import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional().default(''),
    image: z.string().optional().default(''),
    imageAlt: z.string().optional().default(''),
    imageFit: z.enum(['cover', 'contain']).optional().default('cover'),
    order: z.number().optional().default(99),
    featured: z.boolean().optional().default(false),
    color: z.enum(['dark', 'blue', 'yellow', 'red', 'green']).optional().default('blue'),
    link: z.string().optional().default(''),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional().default(''),
    date: z.string().optional().default(''),
    place: z.string().optional().default(''),
    image: z.string().optional().default(''),
    imageAlt: z.string().optional().default(''),
    imageFit: z.enum(['cover', 'contain']).optional().default('cover'),
    summary: z.string().optional().default(''),
    order: z.number().optional().default(99),
  }),
});

export const collections = { projects, events };
