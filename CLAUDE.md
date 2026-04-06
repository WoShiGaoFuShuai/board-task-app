# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check with vue-tsc, then build with Vite
npm run preview   # Preview the production build
```

There are no lint or test commands configured yet.

## Architecture

Vue 3 + TypeScript SPA using Vite, Pinia (state management), and Vue Router.

The project follows **Feature-Sliced Design (FSD)** — a layered, feature-based architecture:

```
src/
  app/       # App-level setup: router config, global stores, root styles
  entities/  # Domain models and their Pinia stores (e.g. Task, Project, User)
  features/  # Self-contained feature modules (business logic + UI tied to one action)
  pages/     # Top-level route components — compose widgets and features
  widgets/   # Reusable composite UI blocks used across pages
```

**Layer rules (strict import direction):**
- `pages` may import from `widgets`, `features`, `entities`
- `widgets` may import from `features`, `entities`
- `features` may import from `entities`
- `entities` must not import from upper layers

**Patterns to follow:**
- Use `<script setup lang="ts">` in all `.vue` files
- Pinia stores live in their respective layer (e.g., `entities/task/model/store.ts`)
- Vue Router routes are registered in `app/router/`