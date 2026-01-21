// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.epistola.app',
  integrations: [
      mermaid({
          strategy: 'client',
          theme: {
              light: 'default',
              dark: 'dark'
          },
          mermaidConfig: {
              startOnLoad: true,
              theme: 'base',
              themeVariables: {
                  darkMode: true
              }
          }
      }),
      starlight({
          title: 'Epistola Documentatie',
          description: 'Open platform voor digitale documentgeneratie zonder vendor lock-in',
          defaultLocale: 'root',
          locales: {
            root: {
              label: 'Nederlands',
              lang: 'nl',
            },
          },
          customCss: [
            // Path to your Tailwind base styles:
            './src/styles/global.css',
         ],
          social: [
            { icon: 'github', label: 'GitHub', href: 'https://github.com/epistola' }
          ],
          sidebar: [
              {
                  label: 'Introductie',
                  autogenerate: { directory: 'introductie' },
                  collapsed: false,
              },
              {
                  label: 'Het Model',
                  collapsed: false,
                  items: [
                      {
                          label: 'Structuur & Rollen',
                          autogenerate: { directory: 'het-model/structuur-rollen' },
                          collapsed: true,
                      },
                      {
                          label: 'Governance & Besluitvorming',
                          autogenerate: { directory: 'het-model/governance' },
                          collapsed: true,
                      },
                      {
                          label: 'Financieel Model',
                          autogenerate: { directory: 'het-model/financieel' },
                          collapsed: true,
                      },
                      {
                          label: 'IP & Licenties',
                          autogenerate: { directory: 'het-model/ip-licenties' },
                          collapsed: true,
                      },
                  ],
              },
              {
                  label: 'Meedoen',
                  collapsed: false,
                  items: [
                      {
                          label: 'Voor Gemeenten',
                          autogenerate: { directory: 'meedoen/gemeenten' },
                          collapsed: true,
                      },
                      {
                          label: 'Voor Leveranciers',
                          autogenerate: { directory: 'meedoen/leveranciers' },
                          collapsed: true,
                      },
                      {
                          label: 'Voor Investeerders',
                          autogenerate: { directory: 'meedoen/investeerders' },
                          collapsed: true,
                      },
                  ],
              },
              {
                  label: 'Referentie',
                  autogenerate: { directory: 'referentie' },
                  collapsed: true,
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});