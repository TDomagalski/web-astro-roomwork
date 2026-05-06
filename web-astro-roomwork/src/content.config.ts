import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(160),
      icon: z.string().optional(),
      cover: image().optional(),
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(160),
      cover: image(),
      tags: z.array(z.string()).default([]),
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),
      description: z.string().max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      author: z.string().default('Roomwork'),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

export const collections = { services, portfolio, posts };
