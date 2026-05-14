import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Pagina's die wel lokaal zichtbaar moeten zijn maar (nog) niet in productie
const localOnly = ['epistola/financiele-prognose.mdx'];

const pattern: string | string[] = import.meta.env.PROD
	? ['**/[^_]*.{md,mdx,markdown}', ...localOnly.map((p) => `!${p}`)]
	: '**/[^_]*.{md,mdx,markdown}';

export const collections = {
	docs: defineCollection({
		loader: glob({ pattern, base: './src/content/docs' }),
		schema: docsSchema(),
	}),
};
