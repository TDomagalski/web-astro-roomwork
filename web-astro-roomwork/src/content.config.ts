import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
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
  type: 'content',
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

export const collections = { services, portfolio };
