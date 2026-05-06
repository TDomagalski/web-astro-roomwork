# PROGRESS — web-astro-roomwork

> Ten plik jest aktualizowany przez asystenta AI na końcu każdej sesji roboczej.
> Służy jako briefing na start kolejnej sesji — czytaj go przed rozpoczęciem pracy.

---

## Stan projektu: W BUDOWIE

---

## Sesja 4 — 2026-05-07

### Wykonane

#### Aktualizacja CLAUDE.md
- [x] Astro 5.x → Astro 6.x (sekcja 1)
- [x] Sekcja 5a (NOWA) — View Transitions / ClientRouter, lifecycle events
- [x] Sekcja 8 — Content Layer API z `loader: glob()` zamiast deprecated `type: 'content'`
- [x] Sekcja 10 — `astro:env` z envField zamiast `ImportMetaEnv`
- [x] Mobile-first jako obowiązkowa zasada (sekcja 3)

#### Migracja Astro 5 → 6 wzorców
- [x] `content.config.ts` — migracja na `loader: glob()`, dodana kolekcja `posts` (blog)
- [x] `astro.config.mjs` — env schema (envField), prefetch (prefetchAll + viewport), image config
- [x] `env.d.ts` — usunięto stary `ImportMetaEnv` (zastąpiony przez `astro:env`)
- [x] Foldery `src/content/{services,portfolio,posts}` z `.gitkeep`

#### View Transitions
- [x] `<ClientRouter />` w `BaseLayout.astro`

#### SEO & Performance
- [x] `public/robots.txt` z odniesieniem do `sitemap-index.xml`
- [x] `BaseLayout.astro` — `theme-color`, `apple-touch-icon`, `format-detection`, OG `siteName` + `locale`
- [x] Schema.org rozszerzony — `priceRange`, `image`, `email`, `openingHoursSpecification`
- [x] `siteConfig.ts` — pola `themeColor`, `defaultOgImage`, `priceRange`, `openingHours`

#### A11y
- [x] `global.css` — `prefers-reduced-motion`, globalny `:focus-visible`

#### ESLint
- [x] Migracja na flat config (`eslint.config.js`) — wymagane przez ESLint 10
- [x] Wymiana `@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin` na zunifikowany `typescript-eslint`
- [x] `npm install` wykonany, build przechodzi

### Do zrobienia

#### Dane do uzupełnienia przez klienta
- [ ] `siteConfig.ts` — geo (lat/lng) dla Schema.org
- [ ] `siteConfig.ts` — social media (Facebook, Instagram)
- [ ] `siteConfig.ts` — opis strony (description)
- [ ] `siteConfig.ts` — godziny otwarcia (zweryfikować — obecnie placeholder Pn-Pt 8-18, So 9-14)
- [ ] `public/og-default.jpg` (1200×630)
- [ ] `public/apple-touch-icon.png` (180×180)

#### Komponenty do zbudowania
- [ ] `Navbar.astro` — nawigacja z logo i linkami
- [ ] `Footer.astro` — stopka z danymi kontaktowymi i social media
- [ ] `HeroSection.astro` — pierwsza sekcja strony
- [ ] Pozostałe sekcje strony

#### Funkcjonalności
- [ ] Formularz kontaktowy (Resend)
- [ ] Treść Content Collections (services, posts)

#### Inne MCP (opcjonalnie)
- [ ] Brave Search MCP (wymaga API key)
- [ ] GitHub MCP

---

## Sesja 3 — 2026-05-07

### Wykonane

- [x] Omówiono skill `frontend-design` — zakres działania i kiedy go używać
- [x] Zaktualizowano `CLAUDE.md` sekcja 12 — skill `frontend-design` jest teraz **domyślny** dla wszystkich zadań UI (komponenty, strony, sekcje); uruchamiany automatycznie bez oczekiwania na polecenie

---

## Sesja 2 — 2026-05-06

### Wykonane

- [x] Zainstalowany Context7 MCP (`@upstash/context7-mcp`) — status ✓ Connected
- [x] Reguła Context7 dodana do `CLAUDE.md` (sekcja 0) — AI używa go automatycznie
- [x] Usunięte wewnętrzne `.git` z `web-astro-roomwork/` — folder trackowany w zewnętrznym repo
- [x] Dodany `.gitattributes` — LF w repo, brak CRLF warningów na Windows
- [x] Commit całego projektu do repozytorium

---

## Sesja 1 — 2026-05-06

### Wykonane

- [x] Inicjalizacja projektu Astro 5 (`npm create astro@latest web-astro-roomwork`)
- [x] Instalacja integracji: React, Tailwind CSS v4, Vercel adapter, Sitemap
- [x] Instalacja paczek: `astro-seo`, ESLint, Prettier z pluginami Astro i Tailwind
- [x] Konfiguracja `astro.config.mjs` — site URL, output static, adapter Vercel
- [x] Konfiguracja `tsconfig.json` — strict, verbatimModuleSyntax
- [x] Utworzenie `.prettierrc` i `.eslintrc.cjs`
- [x] Utworzenie `.env.example` i `src/env.d.ts`
- [x] Struktura folderów: `assets/`, `components/ui|sections|islands/`, `content/`, `data/`, `fonts/`, `layouts/`
- [x] `src/data/siteConfig.ts` — wypełniony danymi klienta (nazwa, telefon, email, adres)
- [x] `src/content.config.ts` — kolekcje `services` i `portfolio` ze schematami Zod
- [x] `src/styles/global.css` — design tokens Tailwind v4 (`@theme`), `@font-face` dla Roboto
- [x] `src/layouts/BaseLayout.astro` — SEO (`astro-seo`), Schema.org LocalBusiness, skip link, preload fonta
- [x] `src/pages/index.astro` — podłączony pod BaseLayout
- [x] Konwersja fontów TTF → WOFF2 (Roboto variable font: normalny + italic)
- [x] Build bez błędów (`npm run build`)

### Do zrobienia

#### Dane do uzupełnienia przez klienta
- [ ] `siteConfig.ts` — geo (lat/lng) dla Schema.org
- [ ] `siteConfig.ts` — social media (Facebook, Instagram)
- [ ] `siteConfig.ts` — opis strony (description)
- [ ] Favicon (`public/favicon.svg`)
- [ ] OG image (`public/og-default.jpg`)

#### Komponenty do zbudowania
- [ ] `Navbar.astro` — nawigacja z logo i linkami
- [ ] `Footer.astro` — stopka z danymi kontaktowymi i social media
- [ ] `HeroSection.astro` — pierwsza sekcja strony (headline, CTA)
- [ ] Pozostałe sekcje strony (do ustalenia z klientem)

#### Funkcjonalności
- [ ] Formularz kontaktowy (z wysyłką przez Resend lub podobne)
- [ ] Treść Content Collections (usługi, portfolio — wypełnienie MDX)

---

## Notatki

- Fonty: Roboto Variable Font (wdth, wght) — dwa pliki WOFF2 w `src/fonts/`
- Design tokens: kolory i font zdefiniowane w `global.css` przez `@theme` (Tailwind v4)
- Klient: Roomwork, ul. Krakowska 62d, Słomniki, tel. 690328659, kwatery@roomwork.pl
- Hosting docelowy: Vercel (static)
