# Visie op Open Source in de Publieke Sector

Documentatiesite met een onderbouwde visie op hoe open source platformsoftware in de Nederlandse publieke sector duurzaam gefinancierd en bestuurd kan worden. **Epistola** — een open platform voor digitale documentgeneratie voor gemeenten — fungeert als concreet uitgewerkt voorbeeld.

🌐 **Live:** <https://epistola-app.github.io/visie-op-opensource/>

## Inhoud

De site is opgebouwd uit drie hoofdstukken:

1. **Open Source** — Waarom open source platformsoftware structureel onderhoudsfinanciering nodig heeft, welke financieringsmodellen bestaan en hoe afnemers betrouwbaarheid beoordelen.
2. **Organisatiestructuur** — For-profit, missiegedreven en steward-owned organisaties vergeleken, plus het cost-recovery model.
3. **Epistola** — Drie modellen doorgerekend (open source + diensten, BSL + ecosysteem, centraal aanbesteed) inclusief aanbeveling aan de VNG om de GIBIT aan te passen.

Aanvullende secties: praktische informatie voor gemeenten, leveranciers en investeerders, plus referentiedocumenten (BSL-licentie, begrippen, bronnen).

Alle content is in het Nederlands.

## Lokaal draaien

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # productiebuild in ./dist/
npm run preview  # productiebuild lokaal previewen
```

Vereist Node.js 20+ (zie `.tool-versions`).

## Publicatie

Elke push naar `main` triggert automatisch een GitHub Actions-deploy naar GitHub Pages — zie `.github/workflows/`.

## Techniek

- **Astro 5** met **Starlight** als documentatie-thema
- **Tailwind CSS 4** via de Vite-plugin
- **Mermaid** voor diagrammen (client-side)
- Content in `src/content/docs/`, sidebar handmatig geconfigureerd in `astro.config.mjs`
- Interactieve componenten (`CostCalculator`, `RevenueCalculator`, `SlaLevel`, `SlaComparisonTable`) in `src/components/`
