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
                  collapsed: false,
                  items: [
                      { label: 'Het Probleem', link: '/introductie/het-probleem' },
                      { label: 'Het Model in Één Oogopslag', link: '/introductie/het-model-in-een-oogopslag' },
                      { label: 'Snelstart per Doelgroep', link: '/introductie/snelstart' },
                  ],
              },
              {
                  label: 'Het Verdienmodel',
                  collapsed: false,
                  items: [
                      { label: 'Overzicht & Escalatieladder', link: '/het-verdienmodel/overzicht' },
                      { label: '1. Licenties', link: '/het-verdienmodel/licenties' },
                      { label: '2. SLA & Support', link: '/het-verdienmodel/sla-en-support' },
                      { label: '3. Diensten', link: '/het-verdienmodel/diensten' },
                      { label: '4. Continuïteitsbijdrage', link: '/het-verdienmodel/continuiteits-bijdrage' },
                  ],
              },
              {
                  label: 'Verantwoord Beheer',
                  collapsed: false,
                  items: [
                      { label: 'Steward Ownership', link: '/verantwoord-beheer/steward-ownership' },
                      { label: 'Structuur & Rollen', link: '/verantwoord-beheer/structuur' },
                      {
                          label: 'Governance',
                          collapsed: true,
                          autogenerate: { directory: 'verantwoord-beheer/governance' },
                      },
                  ],
              },
              {
                  label: 'Meedoen',
                  collapsed: false,
                  items: [
                      {
                          label: 'Voor Gemeenten',
                          collapsed: true,
                          items: [
                              { label: 'Overzicht', link: '/meedoen/gemeenten/overzicht' },
                              { label: 'Aanbestedingen', link: '/meedoen/gemeenten/aanbestedingen' },
                              { label: 'Veelgestelde Vragen', link: '/meedoen/gemeenten/faq' },
                          ],
                      },
                      {
                          label: 'Voor Leveranciers',
                          collapsed: true,
                          items: [
                              { label: 'Overzicht', link: '/meedoen/leveranciers/overzicht' },
                              { label: 'Doorontwikkeling & Roadmap', link: '/meedoen/leveranciers/doorontwikkeling' },
                          ],
                      },
                  ],
              },
              {
                  label: 'Referentie',
                  collapsed: true,
                  autogenerate: { directory: 'referentie' },
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});