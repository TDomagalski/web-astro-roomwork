# CLAUDE.md — Instrukcja dla Asystenta AI

> Ten plik definiuje reguły projektu. Czytasz go raz — stosujesz przez cały czas pracy.

---

## 1. Stack technologiczny

| Obszar    | Technologia                                               |
| --------- | --------------------------------------------------------- |
| Framework | Astro 5.x (tryb static, hybrid gdy SSR wymagany)          |
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

## 8. Content Collections — schematy Zod

Każda kolekcja **musi** mieć schemat. Przykład dla strony wizytówkowej:

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";

const services = defineCollection({
  type: "content",
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

## 10. Zmienne środowiskowe

- Sekrety po stronie serwera: bez prefixu `PUBLIC_` — **nigdy nie trafiają do klienta**.
- Dane publiczne (klucze API map, analytics): `PUBLIC_` prefix.
- Zawsze definiuj typy przez `astro:env` lub własny `src/env.d.ts`.

```ts
// src/env.d.ts
interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_MAPS_KEY: string;
  readonly RESEND_API_KEY: string;
}
```

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

1. Sprawdź czy istnieje podobny komponent w `src/components/`.
2. Jeśli tak — rozbuduj, nie duplikuj.
3. Pisz komponent w Astro (`.astro`) o ile nie wymaga stanu po stronie klienta.
4. Jeśli wymaga stanu → React Island z minimalnym scope `client:visible`.
5. Każdy nowy komponent eksportuje pełny interface Props z JSDoc.

---

_Aktualizuj ten plik przy każdej zmianie Design System lub architektury projektu._
