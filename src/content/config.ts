// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(), // or z.date() if you want to parse it as a date
    category: z.string(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    readTime: z.string(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    tags: z.array(z.string()),
    link: z.string(),
    linkText: z.string().optional(),
    featured: z.boolean().optional(),
    visibility: z.enum(['public', 'private']).default('public'),
    githubStars: z.number().optional(),
    downloads: z.number().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection,
};