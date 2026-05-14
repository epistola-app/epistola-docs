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
          title: 'Duurzame Open Source voor de Publieke Sector',
          description: 'Financiering, governance en ecosysteem — Epistola als concreet voorbeeld',
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
              { label: 'Samenvatting', link: '/samenvatting' },
              {
                  label: 'Open Source',
                  collapsed: false,
                  items: [
                      { label: 'Financiële Uitdagingen', link: '/open-source/financiele-uitdagingen' },
                      { label: 'Financieringsmodellen', link: '/open-source/financieringsmodellen' },
                      { label: 'Afnemersperspectief', link: '/open-source/afnemersperspectief' },
                  ],
              },
              {
                  label: 'Organisatiestructuur',
                  collapsed: false,
                  items: [
                      { label: 'For-Profit', link: '/organisatiestructuur/for-profit' },
                      { label: 'Missiegedreven & Steward Ownership', link: '/organisatiestructuur/steward-ownership' },
                      { label: 'Cost-Recovery Model', link: '/organisatiestructuur/cost-recovery' },
                  ],
              },
              {
                  label: 'Epistola',
                  collapsed: false,
                  items: [
                      { label: 'Organisatiestructuur', link: '/epistola/organisatiestructuur' },
                      { label: 'Model 1: Open Source + Diensten', link: '/epistola/model-1-open-source' },
                      { label: 'Model 2: BSL + Ecosysteem', link: '/epistola/model-2-bsl-licentie' },
                      { label: 'Model 3: Centraal Aanbesteed', link: '/epistola/model-3-centraal-aanbesteed' },
                      { label: 'Modelkeuze & Transitie', link: '/epistola/modelkeuze' },
                      {
                          label: 'Governance',
                          collapsed: true,
                          autogenerate: { directory: 'epistola/governance' },
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
                              { label: 'Certificering', link: '/meedoen/leveranciers/certificering' },
                              { label: 'Doorontwikkeling & Roadmap', link: '/meedoen/leveranciers/roadmap-en-doorontwikkeling' },
                          ],
                      },
                      {
                          label: 'Voor Investeerders',
                          collapsed: true,
                          items: [
                              { label: 'Overzicht', link: '/meedoen/investeerders/overzicht' },
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