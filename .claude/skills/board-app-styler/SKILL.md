---
name: board-app-styler
description: Use this skill whenever the user asks to style a Vue component, apply project styling to a component, generate a new styled component, or align a component with the board-task-app design system. Covers two flows — (A) styling an existing template/skeleton the user provides, and (B) generating a brand-new component from a description into a specified folder. Trigger this skill on phrases like "style this component", "стилізуй", "застосуй стилі проєкту", "зроби в стилі додатку", "згенеруй компонент <X>", or whenever the user pastes a Vue skeleton without classes.
---

# Board Task App — Component Styler

This skill styles Vue 3 components in the visual language of this project — a dark, ClickUp-inspired, Apple-HIG-flavored UI with a purple accent and a depth-based background system.

## When this skill runs

Two distinct flows, detected from the user's message:

- **Flow A — Style an existing component.** The user pastes (or names a file path to) a Vue skeleton — usually template + script with no classes / no scoped CSS, or a partially styled component they want re-aligned with the design system.
- **Flow B — Generate from scratch.** The user describes a component ("modal for editing a task", "primary submit button") and tells you which folder to put it in.

If the message is ambiguous, ask once which flow.

## Flow A — Style an existing component

Two phases. Do not skip the audit; the user wants to catch missing pieces before styles are applied.

### Phase 1 — Audit the skeleton

Read the file (or the pasted markup). Then produce a short audit, organised by category. Only list issues that actually exist — do not produce empty headings.

Categories to consider:

1. **Semantics** — Is the right HTML element used? `<button>` not `<div>` for clickable things, `<nav>` / `<aside>` / `<main>` / `<section>` where appropriate, `<label>` paired with form controls.
2. **Accessibility** — `aria-label` on icon-only buttons, `type="button"` on every `<button>` that is not a form submit, alt text on images, focusable interactive elements.
3. **Vue / TS shape** — `<script setup lang="ts">` present? Are props typed via `defineProps<{...}>()`? Are emits declared with `defineEmits<{...}>()`? Should there be a `<slot />` for flexibility?
4. **Structure** — Is the markup nesting reasonable? Are there meta wrappers that add nothing? Are conditional branches handled (`v-if` / `v-else`) when there's an empty state?
5. **Icons** — In this project icons are `<div class="i-lucide-<name> ..." />` divs from `@unocss/preset-icons`, not Vue components. Flag any non-conforming icon usage.

Output format:

```
## Audit

**Semantics**
- <issue> — suggested fix

**Accessibility**
- <issue> — suggested fix

(omit categories with no issues)

**Suggested additions** (optional)
- <e.g. "add a `<slot />` so callers can inject extra meta">
```

End the audit with: **"Should I apply these fixes together with the styling, or only style what you sent?"** — wait for the user's response.

### Phase 2 — Apply styles

Once the user confirms (or asks you to proceed straight to styling), edit the file in place using the **Edit tool** (or **Write** if the file is empty / does not exist yet). Always edit the file directly — do not just print the code and stop.

Follow the design system below.

## Flow B — Generate from scratch

1. **Locate the folder.** The user tells you where the component goes (e.g. `src/shared/ui/Button/`). If they only name the component (no folder), ask which folder.
2. **Confirm structure if ambiguous.** If the description doesn't make props/slots/events obvious, ask one short clarification: "What props should it accept? Any events to emit?". If the shape is obvious, skip the question.
3. **Generate the file** via the **Write tool** at `<folder>/<ComponentName>.vue`. If the folder follows the existing `ui/` convention (see `src/shared/ui/SearchInput/ui/SearchInput.vue`), respect that — e.g. `src/shared/ui/Button/ui/Button.vue` plus an `index.ts` barrel.
4. **Add the barrel** (`index.ts`) if the surrounding folders use barrels.

## The design system — what to apply

This is the source of truth. Read it carefully before generating styles.

### Where each style lives

- **In the `<template>`** — UnoCSS atomic classes are used for: flex/grid layout (`flex items-center gap-2`), spacing utilities, icons (`i-lucide-*`), simple text colour / size when the value matches a theme token (`text-primary-400`, `text-xs`, `text-white`).
- **In `<style scoped>`** — owns the component-specific look: backgrounds via CSS variables, paddings, radii, transitions, hover states, custom border colours, complex layout rules. Class names are kebab-case (`task-card`, `task-meta-btn`).

This split is deliberate. Avoid pushing everything into utility classes — it hurts readability in this codebase. Avoid pushing everything into scoped CSS — you lose UnoCSS's icons and quick layout primitives.

### Colour tokens

Colours come from `uno.config.ts`. In **scoped CSS** use the CSS variables that UnoCSS generates: `var(--colors-depth-2)`, `var(--colors-surface-400)`, `var(--colors-primary-400)`. In **template utility classes** you can use `bg-depth-2`, `text-surface-400`, `text-primary-400` directly.

**Depth (backgrounds).** Three levels — pick the one that fits the component's role in the visual hierarchy:

| Token | Value | Use for |
|-------|-------|---------|
| `depth-1` | `#1e1f21` | Sidebar, topmost / outermost surfaces |
| `depth-2` | `#2a2b2e` | Cards, list items, content surfaces |
| `depth-3` | `#35363a` | Elevated containers (e.g. columns) sitting on top of depth-2 |

**Surface (text colour, mostly).**

| Token | Use for |
|-------|---------|
| `surface-200` | Primary body/heading text (light) |
| `surface-300` | Strong labels |
| `surface-400` | Default link / nav text |
| `surface-500` | Secondary text, counts, meta |
| `surface-600` | Muted icons, empty states, faint hints |

**Primary (purple).** Use `primary-400` for interactive accents (icons, hover-revealed colour). `primary-500` (`#7c3aed`) is the canonical brand purple — used sparingly for the strongest accents.

**Semantic.** `--colors-success` (#34c759), `--colors-warning` (#ff9f0a), `--colors-danger` (#ff3b30), `--colors-info` (#007aff). For badges / chips use the colour at full opacity for text and the same colour at `0.12` alpha for the background (see priority chips in `TaskCard.vue`).

> ⚠️ Any new bg/text colour token used **only** inside scoped CSS must be added to `safelist` in `uno.config.ts`, otherwise UnoCSS won't generate the CSS variable. Mention this in the response if you introduce a new token (e.g. you start using `bg-depth-3` only in scoped CSS).

### Borders & separators

Use `1px solid rgba(255, 255, 255, 0.06)` for subtle separator lines (between header/content/footer, between sidebar and main). Never use solid greys for separators — the rgba-on-dark feel is part of the project's identity.

### Hover backgrounds

For hoverable rows / buttons sitting on a dark surface, use white-with-low-alpha overlays:

- Default hover: `rgba(255, 255, 255, 0.05)`
- Stronger hover (e.g. on cards): `rgba(255, 255, 255, 0.06)` – `0.08`
- Active / selected: `rgba(255, 255, 255, 0.10)`

### Radii

| Use | Value |
|-----|-------|
| Tiny pills, priority chips, micro-buttons | `4px` |
| Default (links, buttons, list items) | `8px` |
| Medium (count badges) | `10px` |
| Large cards / columns | `12px` |
| Extra-large (modals, sheets) | `16px` |

### Shadows

Mostly UI is flat; reach for shadows on lifted surfaces (columns, popovers). The theme exposes `shadow-sm`, `shadow` (default), `shadow-md`, `shadow-lg` — prefer the utility class on the template (`<div class="column shadow-md">`).

### Typography

| Use | Size | Weight | Notes |
|-----|------|--------|-------|
| Tiny labels / uppercase chips | `11px` | `600` | `letter-spacing: 0.04em`, `text-transform: uppercase` |
| Meta / counts / dates | `11–12px` | `500` | colour `surface-500` |
| Body / default | `13px` | `500` | colour `surface-200`–`surface-300` |
| Nav links | `14px` | `500` |  |
| Section headers | `13–14px` | `600` | uppercase + `letter-spacing: 0.04em` for ALL-CAPS labels (e.g. column titles) |

Font family inherits from the root (`Inter` stack). Don't redeclare it.

### Spacing

There's no rigid scale, but the project clusters around: `4px` (between icon and label), `8px` (default gap), `10–12px` (item padding), `14–20px` (header padding), `24px` (empty-state padding). When in doubt, mirror similar components.

### Transitions

Default `0.15s ease`. Almost always limit to colour-related properties to keep things crisp:

```css
transition:
    background-color 0.15s ease,
    color 0.15s ease;
```

Avoid transitioning `all` — it churns layout properties unnecessarily.

### Icons

Use `<div class="i-lucide-<name> ..." />` (NOT `<Lucide... />` components). Set the size via `text-base` / `text-sm` / `text-xs` / `text-xl`. Tint with `text-primary-400` or `text-surface-400`, etc.

### Indentation & formatting (Biome rules)

- **Tabs**, width 4, in `.vue`, `.ts`, `.css` blocks.
- **Single quotes** in TS / JS.
- **Semicolons** always.
- Trailing commas: ES5 (so commas in objects/arrays, not after the last function param).
- `<script setup lang="ts">` always for components.

## Worked examples

### Example — Card-like list item (depth-2, hoverable)

```vue
<template>
    <div class="task-card">
        <h5 class="task-title">{{ task.title }}</h5>
        <div class="task-meta">
            <span class="task-due-date">
                <div class="i-lucide-calendar text-xs" />
                {{ formattedDueDate }}
            </span>
        </div>
    </div>
</template>

<style scoped>
    .task-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 12px;
        background-color: var(--colors-depth-2);
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    .task-card:hover {
        background-color: rgba(255, 255, 255, 0.06);
    }

    .task-title {
        margin: 0;
        font-size: 13px;
        font-weight: 500;
        color: var(--colors-surface-200);
        line-height: 1.4;
    }

    .task-meta {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .task-due-date {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--colors-surface-500);
    }
</style>
```

### Example — Primary button

```vue
<template>
    <button
        class="btn-primary"
        type="button"
    >
        <div class="i-lucide-plus text-sm" />
        <span>{{ label }}</span>
    </button>
</template>

<script
    setup
    lang="ts"
>
    defineProps<{
        label: string;
    }>();
</script>

<style scoped>
    .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border: none;
        border-radius: 8px;
        background-color: var(--colors-primary-500);
        color: #fff;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition:
            background-color 0.15s ease,
            color 0.15s ease;
    }

    .btn-primary:hover {
        background-color: var(--colors-primary-400);
    }

    .btn-primary:active {
        background-color: var(--colors-primary-600);
    }
</style>
```

### Example — Ghost / muted icon-only button (for inline action)

```vue
<template>
    <button
        class="icon-btn"
        type="button"
        aria-label="Add task"
    >
        <div class="i-lucide-plus text-xs" />
    </button>
</template>

<style scoped>
    .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        padding: 0;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: var(--colors-surface-600);
        cursor: pointer;
        transition:
            color 0.15s ease,
            background-color 0.15s ease;
    }

    .icon-btn:hover {
        color: var(--colors-surface-300);
        background-color: rgba(255, 255, 255, 0.08);
    }
</style>
```

### Example — Text input (matches the input style needed in `SearchInput.vue`)

```vue
<template>
    <div class="search-input">
        <div class="i-lucide-search text-sm text-surface-500 search-icon" />
        <input
            v-model="model"
            type="text"
            class="search-field"
            :placeholder="placeholder"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
    const model = defineModel<string>({ default: '' });
    defineProps<{
        placeholder?: string;
    }>();
</script>

<style scoped>
    .search-input {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .search-icon {
        position: absolute;
        left: 10px;
        pointer-events: none;
    }

    .search-field {
        width: 100%;
        padding: 8px 12px 8px 32px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        background-color: var(--colors-depth-2);
        color: var(--colors-surface-200);
        font-size: 13px;
        outline: none;
        transition:
            border-color 0.15s ease,
            background-color 0.15s ease;
    }

    .search-field::placeholder {
        color: var(--colors-surface-500);
    }

    .search-field:hover {
        background-color: rgba(255, 255, 255, 0.04);
    }

    .search-field:focus {
        border-color: var(--colors-primary-400);
        background-color: var(--colors-depth-2);
    }
</style>
```

## Output behaviour

- **Always write the result to the actual file** using Edit (existing file) or Write (new file). Do not just paste code in the chat and stop — the user asked for the file to be updated.
- After writing, give a short summary: *what changed* (1-3 bullets) and any caveat (e.g. "I added `bg-depth-3` in scoped CSS — already in safelist, no config change needed").
- Do not run the dev server or any commands unless the user asks.
- Don't add comments to the generated `.vue` file unless the rationale would be non-obvious to a future reader.

## What NOT to do

- Don't introduce new colour values that aren't in `uno.config.ts` — extend the theme instead if the user explicitly asks for a new shade.
- Don't write light-mode variants. This project is dark-mode only.
- Don't use Tailwind utility classes for colours inside `<style scoped>` blocks — they don't apply there. Use the CSS variable form (`var(--colors-...)`).
- Don't replace `<div class="i-lucide-..." />` icons with imported Lucide-Vue components.
- Don't use `transition: all` — list the specific properties.
- Don't add a `font-family` declaration — the root inherits Inter.
