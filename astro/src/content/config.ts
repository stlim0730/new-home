import { defineCollection, z } from 'astro:content';

const photography = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional().default(999),
    featuredImages: z.array(z.string()).optional().default([]),
  }),
});

// console.log("z", z);

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { photography };
