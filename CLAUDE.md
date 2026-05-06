# CLAUDE.md — Instrukcja dla Asystenta AI

> Ten plik definiuje reguły projektu. Czytasz go raz — stosujesz przez cały czas pracy.

---

## 0. Narzędzia MCP — obowiązkowe zasady

**Context7 jest zainstalowany i aktywny.** Przy każdym zadaniu dotyczącym kodu używaj `use context7`, aby pobrać aktualną dokumentację bibliotek. Dotyczy to w szczególności:
- Astro (jakiekolwiek API, komponenty, konfiguracja)
- Tailwind CSS v4 (składnia `@theme`, utility classes)
- React (hooks, Server/Client Components)
- Dowolnej innej biblioteki użytej w projekcie

Nigdy nie polegaj wyłącznie na danych treningowych przy generowaniu kodu dla tych frameworków.

---

## 1. Stack technologiczny

| Obszar    | Technologia                                               |
| --------- | --------------------------------------------------------- |
| Framework | Astro 6.x (tryb static, hybrid gdy SSR wymagany)          |
| Styling   | Tailwind CSS v4                                           |
| UI        | React (wyłącznie jako Client/Server Islands)              |
| Język     | TypeScript — `strict` lub `strictest`                     |
| Hosting   | Vercel (static) / Cloudflare Pages                        |
| Fonty     | Lokalnie w `src/fonts/` — subsetted, `font-display: swap` |
| SEO       | `@astrojs/sitemap` + `astro-seo`                          |
| Obrazy    | `<Image />` z `astro:assets` — zawsze WebP/AVIF           |
| CMS/Treść | Astro Content Collections + Zod                           |

---

## 2. Struktura projektu

```
src/
├── assets/              # obrazy, SVG, ikony — NIGDY w /public (poza favicon)
├── components/
│   ├── ui/              # atomowe komponenty (Button, Card, Badge…)
│   ├── sections/        # sekcje stron (Hero, Features, FAQ…)
│   └── islands/         # komponenty React wymagające JS
├── content/             # Content Collections (blog, services, portfolio…)
├── data/                # statyczne dane TS (nav, socials, config)
├── fonts/               # lokalne pliki czcionek (.woff2)
├── layouts/             # BaseLayout.astro, BlogLayout.astro…
├── pages/               # routing (obowiązkowy)
│   ├── index.astro
│   └── [...slug].astro
└── styles/              # globals.css (tylko reset + font-face)
```

**Zasady:**

- Komponenty w `islands/` mogą mieć `client:*` — reszta nigdy.
- Pliki TS/TSX wymagają jawnych importów typów: `import type { Foo } from '...'`.
- Eksportuj tylko to, czego używasz — tree-shaking działa.

---

## 3. Design System — [WYPEŁNIJ PRZED STARTEM PROJEKTU]

> Uzupełnij poniższe wartości przed pierwszym promptem kodującym. AI nie może zgadywać kolorów.

### Kolory

```ts
// Zastąp wartości HEX rzeczywistymi kolorami klienta
const colors = {
  primary: "#4A6CF7", // spokojny niebieski – CTA, linki
  secondary: "#7B9CF4", // jaśniejszy akcent – hover, badges
  background: "#F6F7F9", // chłodna biel – tło strony
  surface: "#FFFFFF", // czysta biel – karty, sekcje
  text: "#1E2533", // ciemny slate – kontrast ~12:1 na tle
  textMuted: "#6B7589", // średni slate – kontrast ~4.6:1 na tle
  border: "#E2E6EE", // delikatna linia – subtelny podział
  error: "#D95F5F", // stonowana czerwień – czytelna, nie krzyczy
};
```

### Typografia

```ts
const typography = {
  fontSans: "Inter", // czcionka treści
  fontSerif: "Playfair Display", // opcjonalna czcionka nagłówków
  fontMono: "JetBrains Mono", // kod (jeśli potrzebny)
  scale: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },
};
```

### Spacing / Breakpoints

Używaj domyślnej skali Tailwind (4px grid). Breakpointy: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

### Mobile-first — obowiązkowe

Wszystkie komponenty i sekcje piszesz **mobile-first**: najpierw styl bazowy dla małych ekranów, a breakpointy `sm:`, `md:`, `lg:` służą do stopniowego rozszerzania layoutu. Nigdy odwrotnie.

### Motywy: light / dark / auto

Projekt obsługuje **3 motywy** (toggle w Navbarze, default `auto` z systemu). Mechanika: `data-theme="light|dark"` (resolved) + `data-theme-pref="light|dark|auto"` (user preference) na `<html>`. Inline script w `BaseLayout` aplikuje motyw przed renderem (zero FOUC) i ponownie na `astro:after-swap` (View Transitions resetują atrybuty html).

**Tokeny semantyczne** (używaj zawsze, nigdy hardcoded hexów):

| Token | Kiedy użyć |
|---|---|
| `bg-background` | tło sekcji domyślne |
| `bg-surface` | karty, navbar, eyebrow tagi |
| `text-text` | główny tekst |
| `text-text-muted` | drugorzędny tekst, opisy |
| `border-border` | obramowania, separatory |
| `bg-primary` / `bg-secondary` | CTA, akcenty |
| `text-on-primary` | tekst NA bg-primary (zawsze biały) |
| `bg-elevated` | ciemne sekcje-anchor (Footer w light, subtle elevation w dark) |
| `text-on-elevated` | tekst NA bg-elevated |

**Pułapki do uniknięcia:**

- ❌ `text-surface` na CTA `bg-primary` → w dark mode `surface` jest ciemny → tekst znika. ✅ Zawsze `text-on-primary`.
- ❌ `bg-text` jako tło sekcji → w dark mode `text` jest jasny → sekcja staje się jasna. ✅ `bg-elevated` dla stałego ciemnego anchoru.
- ❌ Hardcoded `bg-white` / `text-black` → ✅ `bg-surface` / `text-text`.

**Definicje tokenów:** `src/styles/global.css` — `@theme { ... }` (light defaults) + `[data-theme="dark"] { ... }` (overrides).

---

## 4. Reguły TypeScript

- Konfiguracja: `strict: true` + `verbatimModuleSyntax: true` w `tsconfig.json`.
- Żadnych `any` — używaj `unknown` i zawężaj typy.
- Typy dla Content Collections **zawsze** przez `InferEntrySchema` lub Zod.
- Props komponentów Astro — interface ponad typem gdy publiczne API.

```ts
// ✅ Poprawnie
import type { CollectionEntry } from "astro:content";
interface Props {
  post: CollectionEntry<"blog">;
}

// ❌ Źle
const post: any = Astro.props.post;
```

---

## 5. Reguły wydajności (Performance)

1. **Zero zbędnego JS** — `client:*` tylko gdy interakcja jest niemożliwa w HTML/CSS.
2. **Hierarchy Islands:**
   - `client:visible` — komponenty poniżej fold (karuzele, mapy, kalendarze).
   - `client:idle` — widgety niskiej priorytetu.
   - `server:defer` — spersonalizowane dane (koszyk, sesja, ceny real-time) + skeleton fallback.
3. **Obrazy** — wyłącznie `<Image />` z `astro:assets`. Zawsze `width` + `height`. Pierwsze zdjęcie sekcji: `loading="eager" fetchpriority="high"`. Reszta: domyślnie lazy.
4. **Czcionki** — lokalne `.woff2`, preload krytycznych w `<head>`, subset do używanych znaków.
5. **Nie dodawaj ciężkich bibliotek** bez ostrzeżenia. Alternatywy:
   - Zamiast `framer-motion` → CSS transitions + `@starting-style`.
   - Zamiast `lodash` → natywne metody TS.
   - Zamiast `moment.js` → `Intl.DateTimeFormat` lub `date-fns` (tree-shakeable).

---

## 5a. View Transitions (Client Router)

Strona używa **`<ClientRouter />`** w `BaseLayout.astro` — daje płynne przejścia między podstronami zamiast pełnego przeładowania.

**Reguły dla komponentów:**
- Elementy które mają **przetrwać** między stronami (logo, nav, audio player) → `transition:persist` lub `transition:name="unique-name"` na obu stronach.
- Skrypty inline → opakuj w `<script>document.addEventListener("astro:page-load", () => { ... })</script>` zamiast `DOMContentLoaded`.
- Animacje wejścia/wyjścia → `transition:animate="fade"` lub custom (CSS).

```astro
---
import { ClientRouter } from "astro:transitions";
---
<head>
  <ClientRouter />
</head>
```

**Zdarzenia cyklu życia:**
- `astro:before-preparation` — przed pobraniem nowej strony
- `astro:page-load` — po załadowaniu nowej strony (zamiennik DOMContentLoaded)
- `astro:after-swap` — po podmianie DOM

---

## 6. Reguły SEO

Każda strona **musi** mieć w `<head>`:

```astro
---
// src/layouts/BaseLayout.astro
import { SEO } from 'astro-seo'
interface Props {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}
const { title, description, canonical, ogImage } = Astro.props
---
<SEO
  title={title}
  description={description}
  canonical={canonical ?? Astro.url.href}
  openGraph={{
    basic: {
      title,
      type: 'website',
      image: ogImage ?? '/og-default.jpg',
    }
  }}
  twitter={{ card: 'summary_large_image' }}
/>
```

**Hierarchia nagłówków:**

- Jeden `<h1>` na stronę — zawiera główne słowo kluczowe.
- `<h2>` — sekcje strony.
- `<h3>` — podelemnty sekcji.
- Nigdy nie pomijaj poziomów dla efektu wizualnego (do tego CSS).

**Schema.org (LocalBusiness):**
Dla stron wizytówkowych generuj JSON-LD w `BaseLayout.astro`:

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness", // lub ProfessionalService, Restaurant, etc.
  "name": businessName,
  "url": Astro.url.origin,
  "telephone": phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": street,
    "addressLocality": city,
    "postalCode": zip,
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": lat,
    "longitude": lng
  },
  "openingHoursSpecification": hours
})} />
```

---

## 7. Reguły dostępności (A11y)

- Semantyczny HTML5 — `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` — nie `<div>` do wszystkiego.
- Każdy `<img>` ma `alt`. Obrazy dekoracyjne: `alt=""`.
- Interaktywne elementy: tylko `<button>` i `<a>` (z `href`). Nigdy `<div onClick>`.
- Formulary: każde `<input>` powiązane z `<label>` przez `htmlFor`/`id` lub `aria-label`.
- Kontrast minimum 4.5:1 dla tekstu, 3:1 dla UI i tekstu large.
- Focus visible — nie usuwaj `outline` bez alternatywy.
- Skip link na początku `<body>`:

```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:z-50 ..."
>
  Przejdź do treści
</a>
```

---

## 8. Content Collections — Content Layer API + Zod

**Astro 5+ wymaga loadera** (`type: 'content'` jest deprecated). Zawsze używaj `loader: glob()` z `astro/loaders`.

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(160),
      icon: z.string().optional(),
      cover: image().optional(),
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

export const collections = { services };
```

**Zalety Content Layer API:**
- Możliwość ładowania danych z dowolnego źródła (API, JSON, MD/MDX, CMS)
- Lepsza wydajność builda (cache, inkrementalne aktualizacje)
- Patterns z prefiksem `_` (np. `_draft.md`) automatycznie pomijane przez `[^_]*`

---

## 9. Konwencje nazewnictwa

| Typ                  | Konwencja            | Przykład                 |
| -------------------- | -------------------- | ------------------------ |
| Komponenty Astro     | PascalCase           | `HeroSection.astro`      |
| Komponenty React     | PascalCase + `.tsx`  | `BookingCalendar.tsx`    |
| Pliki danych         | camelCase            | `siteConfig.ts`          |
| Strony               | kebab-case           | `o-nas.astro`            |
| CSS klasy Tailwind   | bez zmian            | `text-primary`           |
| Zmienne środowiskowe | SCREAMING_SNAKE_CASE | `PUBLIC_GOOGLE_MAPS_KEY` |

---

## 10. Zmienne środowiskowe — `astro:env`

**Astro 5+ ma typowany schemat env w `astro.config.mjs`** — nie używaj starego `ImportMetaEnv`. Walidacja przy buildzie, brak ryzyka leak'a sekretu do klienta.

```js
// astro.config.mjs
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  env: {
    schema: {
      PUBLIC_GOOGLE_MAPS_KEY: envField.string({ context: "client", access: "public", optional: true }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
});
```

**Użycie w komponencie:**
```astro
---
import { RESEND_API_KEY } from "astro:env/server";
import { PUBLIC_GOOGLE_MAPS_KEY } from "astro:env/client";
---
```

**Zasady:**
- `context: "client"` — zmienna trafia do bundla klienta (musi mieć prefix `PUBLIC_`)
- `context: "server"` — tylko na serwerze
- `access: "secret"` — nigdy nie trafia do klienta (sekrety: API keys, hasła DB)
- `access: "public"` — może być widoczna w bundle (klucze frontendowe map, analytics)

---

## 11. Czego AI nie robi bez pytania

- Nie instaluje nowych paczek npm — proponuje i czeka na akceptację.
- Nie zmienia struktury folderów po jej ustaleniu.
- Nie używa `any` w TypeScript.
- Nie dodaje `client:load` bez uzasadnienia.
- Nie tworzy inline styles — wyłącznie Tailwind lub CSS custom properties.
- Nie generuje placeholder lorem ipsum w finalnym kodzie — używa realistycznych danych.
- Nie pomija `alt`, `aria-label` ani `<label>` dla inputów.

---

## 12. Workflow przy nowym komponencie

**Skill `frontend-design` jest domyślny dla wszystkich zadań UI.** Używaj go automatycznie — bez czekania na polecenie — gdy zadanie dotyczy:
- tworzenia nowego komponentu (`.astro`, `.tsx`)
- budowania strony lub layoutu
- projektowania sekcji (Hero, Features, CTA, FAQ, Footer…)
- znaczącej modyfikacji istniejącego komponentu wizualnego

**Nie używaj skilla** dla zadań bez warstwy wizualnej: schematy Zod, pliki konfiguracyjne, typy TypeScript, dane statyczne, utilities.

### Kroki

1. Sprawdź czy istnieje podobny komponent w `src/components/`.
2. Jeśli tak — rozbuduj, nie duplikuj.
3. Uruchom skill `frontend-design` (automatycznie, bez pytania) dla każdego nowego lub przepisywanego komponentu UI.
4. Pisz komponent w Astro (`.astro`) o ile nie wymaga stanu po stronie klienta.
5. Jeśli wymaga stanu → React Island z minimalnym scope `client:visible`.
6. Każdy nowy komponent eksportuje pełny interface Props z JSDoc.

---

_Aktualizuj ten plik przy każdej zmianie Design System lub architektury projektu._
