# CLAUDE.md

Project: Apple.com-style marketing site. Astro + Tailwind CSS v4 + GSAP.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design System

Full spec lives in `DESIGN.md` (design tokens, typography, components, do's/don'ts). This section is the implementation contract for that spec.

### Principle

Apple.com's language: spacious, editorial, restrained. Centered hero copy, two-action CTA rows, near-white surfaces, pill buttons, near-zero shadow, SF Pro type. Every new page/section should default to this rhythm unless explicitly told otherwise.

### Tokens as CSS variables

Design tokens are **plain CSS custom properties**, not Tailwind `@theme` entries. Define them once in `src/styles/global.css`:

```css
:root {
  /* Colors */
  --color-primary: #0071e3;
  --color-secondary: #0066cc;
  --color-tertiary: #f5f5f7;
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f5f5f7;
  --color-neutral-100: #e5e7eb;
  --color-neutral-900: #1d1d1f;
  --color-surface-default: #ffffff;
  --color-surface-elevated: #ffffff;
  --color-surface-muted: #f5f5f7;
  --color-on-surface-default: #1d1d1f;
  --color-on-surface-muted: #6e6e73;
  --color-on-surface-inverse: #ffffff;
  --color-error: #d92d20;

  /* Radius */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 980px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 12px;
  --space-md: 20px;
  --space-lg: 44px;
  --space-xl: 102px;

  /* Typography */
  --font-display: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-text: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

Why raw CSS variables instead of `@theme`: GSAP and any runtime JS need to read these values directly (`getComputedStyle`, easing/scale calculations tied to spacing), and it keeps a single source of truth that isn't coupled to Tailwind's build-time class generation.

### Using tokens in markup

Consume variables through Tailwind's arbitrary value syntax:

```html
<button class="bg-[var(--color-primary)] text-[var(--color-on-surface-inverse)]
               rounded-[var(--radius-full)] px-[21px] py-[11px] min-h-11
               font-[var(--font-text)] text-[17px]">
  Learn more
</button>
```

Don't hardcode hex values or px radii in components — always reference the variable.

### Typography scale

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| headline-display | 48px | 700 | 58px | Hero titles |
| headline-lg | 40px | 600 | 52px | Section intros |
| headline-md | 34px | 600 | 36px | Product cards |
| body-lg | 24px | 400 | 36px | Hero subtitles |
| body-md | 17px | 400 | 1.35 | Default copy |
| body-sm | 15px | 400 | 1.4 | Footnotes |
| label-lg | 17px | 400 | 1.35 | Buttons/nav |
| label-sm | 13px | 400 | 1.4 | Legal/meta |

Headline sizes use `--font-display`; body/label sizes use `--font-text`.

### Components

- **Button primary**: solid `--color-primary` fill, inverse text, `--radius-full`, min-height 44px, no shadow.
- **Button secondary**: transparent fill, `--color-secondary` border + text, same shape/size as primary.
- **Button link**: no border/padding, `--color-secondary` text, inline only.
- **Card**: white bg, 1px `--color-neutral-100` border, `--radius-md`, 16px padding, no shadow.
- Always pair primary + secondary CTAs in hero sections, `--space-sm` to `--space-md` gap between them.
- Never use square corners on CTAs. Never stack visible shadows.

### Layout rhythm

- Center hero content. Order: headline → subhead → CTA row → product image.
- `--space-xl` between major sections, `--space-lg` between headline/subhead/CTA groups, `--space-md`/`--space-sm` for internal component spacing.
- One strong accent color per section max. Let product imagery dominate — don't compete with dense UI chrome.

## GSAP Animation Conventions

### Setup

Register plugins once, in a shared module (`src/lib/gsap.ts`), imported wherever animation is needed:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

Never call `gsap.registerPlugin` inside a component — leads to duplicate registration warnings and race conditions across Astro islands.

### Scoping and cleanup

Every animated component uses `gsap.context()` scoped to its root element, and reverts on teardown:

```ts
let ctx: gsap.Context;

function initAnimation(root: HTMLElement) {
  ctx = gsap.context(() => {
    gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%" } })
      .from(".headline", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(".subhead", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
  }, root);
}

function cleanup() {
  ctx?.revert();
}
```

If the site uses Astro View Transitions, hook cleanup into `astro:before-swap` and re-init on `astro:page-load` — ScrollTrigger instances from the previous page must be killed or they'll fire against stale DOM:

```ts
document.addEventListener("astro:before-swap", () => cleanup());
document.addEventListener("astro:page-load", () => initAnimation(document.querySelector("#hero")!));
```

### Motion feel (match Apple, not defaults)

- Default ease: `power2.out` for entrances, `power3.inOut` for continuous/scroll-driven motion. Avoid `elastic`/`bounce` — reads as playful, not premium.
- Durations: 0.6–0.9s for hero reveals, 0.3–0.4s for micro-interactions (hover, tap feedback). Nothing under 0.2s or over 1.2s without a scroll-scrubbed reason.
- Stagger: 0.05–0.1s between sibling elements (nav items, card grids) — enough to read as sequential, not enough to feel slow.
- ScrollTrigger `start`/`end` should key off `--space-xl`/`--space-lg` rhythm so animation timing matches the layout's visual breathing room.

### Accessibility

Always gate non-essential motion behind `prefers-reduced-motion`:

```ts
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // scroll/entrance animations here
});
```

Content must be fully readable/usable with animations disabled — never hide critical info inside an animation-only reveal.

### File organization

- `src/lib/gsap.ts` — plugin registration, shared instance.
- `src/animations/` — one file per animated section/pattern (e.g. `hero-reveal.ts`, `scroll-pin.ts`), each exporting an `init`/`cleanup` pair.
- Component `<script>` blocks import from `src/animations/`, never write raw GSAP calls inline in `.astro` files beyond simple one-liners.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
- [Tailwind CSS v4 docs](https://tailwindcss.com/docs)
- [GSAP docs](https://gsap.com/docs/v3/)
- [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)