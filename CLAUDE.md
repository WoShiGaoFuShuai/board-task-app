# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check with vue-tsc, then build with Vite
npm run preview   # Preview the production build
```

No test runner is configured yet. Linting and formatting are handled by **Biome** (`biome.json`), but no `lint`/`format` npm scripts are defined — run `npx biome check` manually if needed.

## Architecture

Vue 3 + TypeScript SPA using Vite, Pinia (state management), Vue Router, and UnoCSS (atomic CSS).

The project follows **Feature-Sliced Design (FSD)** — a layered, feature-based architecture:

```
src/
  app/       # App-level setup: router config, global stores, root styles
  entities/  # Domain models — Pinia stores, types, and UI (Board, Column, Task)
  features/  # Self-contained feature modules (business logic + UI tied to one action)
  pages/     # Top-level route components — compose widgets and features
  widgets/   # Reusable composite UI blocks used across pages (e.g. Sidebar)
```

**Layer rules (strict import direction):**
- `pages` may import from `widgets`, `features`, `entities`
- `widgets` may import from `features`, `entities`
- `features` may import from `entities`
- `entities` must not import from upper layers

Each entity/feature/widget/page exposes a public API via `index.ts` barrel file.

## Entities

| Entity | Store | Types | UI |
|--------|-------|-------|----|
| Board | `entities/board/model/store.ts` | `model/types.ts` | — |
| Column | `entities/column/model/store.ts` | `model/types.ts` | `ColumnCard.vue` |
| Task | `entities/task/model/store.ts` | `model/types.ts` | `TaskCard.vue` |

All Pinia stores use the **Composition API** pattern (`defineStore` with setup function). Data is currently hardcoded (no backend).

## Routes

| Path | Name | Page Component |
|------|------|----------------|
| `/` | `main` | `MainPage.vue` |
| `/board/:id` | `board` | `BoardPage.vue` |

Routes are defined in `app/router/router.ts`.

## Styling

- **UnoCSS** with `preset-wind` (Tailwind-compatible utilities) — config in `uno.config.ts`
- **Lucide icons** via `@unocss/preset-icons` + `@iconify-json/lucide`
- **Scoped CSS** in components for custom styles
- **Dark theme** with depth-based backgrounds: `depth-1` (sidebar), `depth-2` (content), `depth-3` (cards)
- **Primary color:** purple (#7c3aed)
- **Font:** Inter + system stack

## Path Aliases

Defined in `tsconfig.app.json` and resolved by `vite-tsconfig-paths`:

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@app/*` | `src/app/*` |
| `@pages/*` | `src/pages/*` |
| `@widgets/*` | `src/widgets/*` |
| `@features/*` | `src/features/*` |
| `@entities/*` | `src/entities/*` |
| `@shared/*` | `src/shared/*` |

## Patterns to follow

- Use `<script setup lang="ts">` in all `.vue` files
- Pinia stores live in `model/store.ts` within their respective layer
- Types live in `model/types.ts` within their respective layer
- UI components live in `ui/` subdirectories
- Each module has an `index.ts` barrel re-exporting its public API
- Vue Router routes are registered in `app/router/`

## Code Style (Biome)

- Indentation: tabs (width 4)
- Quotes: single
- Semicolons: always
- Trailing commas: ES5
- Max line width: 150 (HTML: 120)
