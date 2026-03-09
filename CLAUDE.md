# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Static export to out/
npm run start    # Serve production build
npm run lint     # ESLint via Next.js
```

No test suite is configured.

## Architecture

Minimal Next.js 14 app with static export. Almost all logic lives in a single client component.

- **`app/page.tsx`** — Entry point; renders `<BlueSkyApp />`
- **`components/BlueSkyApp.tsx`** — The entire interactive site (337 lines, `'use client'`). Manages all state: active unit, overlays (menu/inquiry), form fields, debug mode. Renders the floor plan image with absolutely-positioned clickable zones from `data/units.ts`.
- **`data/units.ts`** — Single source of truth for all unit data (id, name, beds, sqft, status, zone position/size). Edit here to update availability, specs, or pricing. `AVAILABLE_UNITS` is a pre-filtered export.
- **`app/globals.css`** — All styles (~10KB). No CSS framework. Uses CSS variables (`--gold`, `--dark`, `--bg`) and Google Fonts (EB Garamond, Jost). Zone click areas are positioned with `top`/`left`/`width`/`height` percentages relative to the floor plan image.
- **`public/sketch.png`** — The building floor plan image that zone overlays are positioned against.

## Key Details

- **Static export**: `next.config.js` sets `output: 'export'`. No server-side features. Deploys to Vercel; pushes to `main` auto-deploy.
- **No CSS framework**: Styling is pure CSS in `globals.css` — no Tailwind, no CSS modules.
- **Zone positioning**: Each unit in `data/units.ts` has `top`, `left`, `w`, `h` as percentage values for positioning clickable zones over `sketch.png`. These are tuned to the actual image dimensions.
- **Inquiry form**: Uses `mailto:gloria@blueskypv.com` — no backend or API routes.
- **Debug mode**: Press `d` key in browser to toggle debug overlay showing zone boundaries.
- **Prettier**: Semi-less, single quotes, trailing commas ES5, 100-char print width.
