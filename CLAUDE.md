# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for Epistola, an open platform for digital document generation for Dutch municipalities without vendor lock-in. The site is built with Astro and Starlight, and is written entirely in Dutch (Nederlands).

**Important Context:**
- All content is in Dutch - maintain this language consistently
- The project focuses on explaining Epistola's governance model, financial structure, IP licensing, and participation options for municipalities, vendors, and investors
- Content is aimed at stakeholders in Dutch public sector (gemeenten)

## Development Commands

Run all commands from the project root:

- `npm install` - Install dependencies
- `npm run dev` - Start local development server at `localhost:4321`
- `npm run build` - Build production site to `./dist/`
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Architecture

### Framework Stack
- **Astro 5.6+**: Static site generator with content collections
- **Starlight**: Astro documentation theme handling navigation, search, and layout
- **Tailwind CSS 4.x**: Styling via `@tailwindcss/vite` plugin with custom theme
- TypeScript with strict mode enabled

### Content Structure

Documentation lives in `src/content/docs/` with automatic routing based on file paths:

```
src/content/docs/
├── introductie/          # Introduction & quick start
├── het-model/            # The Model
│   ├── structuur-rollen/ # Structure & roles
│   ├── governance/       # Governance & decision-making
│   ├── financieel/       # Financial model
│   └── ip-licenties/     # IP & licensing
├── meedoen/              # Participation
│   ├── gemeenten/        # For municipalities
│   ├── leveranciers/     # For vendors
│   └── investeerders/    # For investors
└── referentie/           # Reference materials
```

**Navigation Configuration:**
- Sidebar structure defined in `astro.config.mjs` using `autogenerate` for each section
- Sections can be collapsed/expanded via `collapsed` property
- Root locale set to Dutch (`nl`) in Starlight config

### Custom Components

Located in `src/components/`:
- **ROICalculator.astro** - Interactive calculator for investor ROI with ROI-cap model
- **RevenueCalculator.astro** - Revenue projections for municipalities/vendors
- **CostCalculator.astro** - Cost analysis tool

These are Astro components with embedded JavaScript for interactivity, imported and used in MDX files.

### Styling

- **src/styles/global.css** - Single global stylesheet with Tailwind layers and custom CSS variables
- Uses `@layer` directive: `base`, `starlight`, `theme`, `components`, `utilities`
- Custom theme colors defined for accent (blues) and gray palettes
- Starlight's default styles imported via `@astrojs/starlight-tailwind`

### Content Configuration

`src/content.config.ts` defines a single `docs` collection using:
- `docsLoader()` - Starlight's content loader
- `docsSchema()` - Starlight's frontmatter schema

## Working with Content

**Adding Documentation:**
1. Create `.md` or `.mdx` files in appropriate `src/content/docs/` subdirectory
2. Frontmatter should include `title` and optionally `description`
3. File paths automatically become routes (e.g., `introductie/wat-is-epistola.md` → `/introductie/wat-is-epistola/`)
4. Write all content in Dutch

**Using Custom Components:**
Import at top of MDX files:
```mdx
---
title: Page Title
---
import ROICalculator from '../../components/ROICalculator.astro';

<ROICalculator />
```

**Images:**
- Place in `src/assets/` and reference with relative links in Markdown
- Static assets (favicons, etc.) go in `public/`

## Build Output

Production build outputs to `./dist/` directory, which is git-ignored along with `.astro/` (generated types).

## Centralized Data

**SLA Levels** are defined in `src/data/sla-levels.json` and used throughout the site to ensure consistency:

- **Structure**: JSON file with array of SLA level objects containing multiplier, uptime, features, etc.
- **Components using it**:
  - `CostCalculator.astro` - Displays SLA options and calculates costs
  - `RevenueCalculator.astro` - Imports SLA data (imported but not actively rendered)
  - `SlaLevel.astro` - Renders individual SLA level details
  - `SlaComparisonTable.astro` - Displays comparison table
- **Content using it**:
  - `src/content/docs/referentie/sla-niveaus.mdx` - Reference documentation page

When updating SLA information, modify the JSON file and all components/pages will reflect the changes automatically.

**Pattern for components**: Use JSON embedding for client-side scripts:
```astro
<!-- Embed data as JSON for TypeScript access -->
<script id="data-id" type="application/json" set:html={JSON.stringify(data)} />
<script>
  const myData = JSON.parse(document.getElementById('data-id')!.textContent!);
  // Full TypeScript support here
</script>
```

## Key Technical Details

- No testing framework configured
- No linting/formatting tools configured (ESLint/Prettier)
- No CHANGELOG.md currently in project
- TypeScript config extends Astro's strict preset
- Uses Vite with Tailwind CSS plugin for development and builds
- Client-side scripts in `.astro` files support full TypeScript when not using `define:vars`
