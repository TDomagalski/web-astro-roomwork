# PROGRESS — web-astro-roomwork

> Ten plik jest aktualizowany przez asystenta AI na końcu każdej sesji roboczej.
> Służy jako briefing na start kolejnej sesji — czytaj go przed rozpoczęciem pracy.

---

## Stan projektu: W BUDOWIE

---

## Sesja 7 — 2026-05-09

### Wykonane

#### Strona `/regulamin`
- [x] `regulamin.astro` — §1–§9, styl document-editorial, bez HeroSection
  - Treść oparta na PDF klienta (9 paragrafów, prawidłowy język prawny PL)
  - Nagłówek: `bg-elevated`, H1, opis, badge "Obowiązuje od: 1 stycznia 2024"
  - Treść: `max-w-3xl`, `§ N —` nagłówki w `font-heading text-primary text-xl`, numerowane punkty
  - Stopka: karta z danymi firmy + kontakt (tel, email, link do PP)
  - Polished przez `/impeccable`: fix skalowania §-nagłówków, badge, linki inline, separator kolumn
  - `text-align: justify` przez scoped `<style>` z `display: block` na content spanach
  - Build: ✓ 7 stron

#### Strona `/polityka-prywatnosci`
- [x] `polityka-prywatnosci.astro` — minimalna, zgodna z RODO dla strony bez formularzy
  - §1 Administrator, §2 Dane (logi SeoHost.pl, cookie motywu, kontakt mail/tel, monitoring), §3 Prawa
  - Email administratora: `biuro@familyparty.com.pl` (nie kwatery@roomwork.pl)
  - Hosting: SeoHost.pl
  - Monitoring wizyjny: wzmianka w §2 pkt 4 (bez okresu przechowywania)
  - `text-align: justify` przez scoped `<style>`
  - Build: ✓ 7 stron

#### Navbar
- [x] Hover underline zatrzymuje się na 75% (`scale-x-75`) zamiast 100%
  - Active (current page) nadal `scale-x-100` — widoczna różnica hover vs active

### Do zrobienia (audyt)
- [ ] `longDescription` w `siteConfig.ts` — nadal "10 pokojami" zamiast 11
- [ ] `<meta name="robots" content="noindex">` na `/blog` i `/kwatery` (thin content)
- [ ] `og-default.jpg` (1200×630) w `/public`
- [ ] `apple-touch-icon.png` (180×180) w `/public`
- [ ] `npm uninstall @astrojs/vercel` — nieużywana dependencja
- [ ] `phoneFormatted` wyciągnąć do `siteConfig.ts`
- [ ] `dayMap`/`formatDays` wyciągnąć do `src/utils/openingHours.ts`

---

## Sesja 5 — 2026-05-08

### Wykonane

#### Strony i komponenty
- [x] `index.astro` — rozbudowana strona główna: HeroSection + AmenitiesSection + ForWhoSection + LocationSection + FaqSection
- [x] `kontakt.astro` — HeroSection + ContactSection (gotowa, pełna)
- [x] `o-nas.astro` — HeroSection + Historia (timeline) + Działalność + Wartości + Dane spółki + CTA
- [x] `kwatery.astro`, `blog.astro` — samo HeroSection (placeholdery bez treści)
- [x] `ContactSection.astro` — 3 karty (tel, email, adres+godziny) + sekcja "Znajdź nas online"
- [x] `AmenitiesSection.astro`, `ForWhoSection.astro`, `LocationSection.astro`, `FaqSection.astro`

#### Refaktoring struktury komponentów
- [x] Przeniesiono komponenty per-page do `src/components/pages/home/` i `pages/kontakt/`
- [x] Naprawiono ścieżki importów (`../../../data/siteConfig`)

#### Dane i konfiguracja
- [x] `siteConfig.ts` — uzupełniono: geo, mapsEmbed, social.google, social.googleMaps, openingHours
- [x] `siteConfig.ts` — `yearsOfExperience` jako globalny export (obliczany od 2018)
- [x] Adres Google Maps w Footer → `https://maps.app.goo.gl/EQ7nDyvmPdTvQsxu7`
- [x] NIP/REGON/KRS — przyciski kopiowania w Footer i na stronie o-nas
- [x] Dane spółki: Family Party Sp. z o.o., NIP 6821777738, REGON 381101585, KRS 0000746071
- [x] Godziny odwiedzin: Pn–Pt 09:00–20:00, So 12:00–16:00
- [x] Trasa E7 (poprawiona z S7) we wszystkich plikach
- [x] 11 pokoi (poprawione z 10) w większości miejsc (patrz TODO: longDescription)

#### Vercel — naprawiony deployment
- [x] Usunięto `adapter: vercel()` z `astro.config.mjs` (zbędny dla static site)
- [x] Strona działa na Vercelu: `github.com/TDomagalski/web-astro-roomwork` → root = projekt Astro, output `dist/`

#### Audyt techniczny (2026-05-08)
- [x] Przeprowadzono pełny audyt: bezpieczeństwo, SEO, dobre praktyki
- [x] Wyniki zapisane w `AUDIT.md`

### Do zrobienia (wyniki audytu — priorytety)

#### 🔴 Krytyczne
- [ ] Stworzyć stronę `/polityka-prywatnosci` (wymóg prawny PL)
- [x] Stworzyć stronę `/regulamin` (wymóg prawny PL) — ✓ sesja 6
- [ ] Dodać `public/og-default.jpg` (1200×630px) — bez tego brak preview przy share na social

#### 🟠 Wysokie
- [ ] Zaktualizować `siteConfig.longDescription` — nadal mówi "10 pokojami" zamiast 11 (`siteConfig.ts:6`)
- [ ] Dodać `<meta name="robots" content="noindex">` na `/blog` i `/kwatery` (thin content) lub uzupełnić treść
- [ ] Dodać `public/apple-touch-icon.png` (180×180px)
- [ ] Dodać unikalne `ogImage` dla każdej podstrony
- [ ] `npm uninstall @astrojs/vercel` — zostało w `package.json`, nieużywane
- [ ] Wyciągnąć `phoneFormatted '690 328 659'` do `siteConfig.ts`
- [ ] Wyciągnąć `dayMap`/`formatDays` do `src/utils/openingHours.ts` (zduplikowane w Footer i ContactSection)

#### 🟡 Średnie
- [ ] Włączyć `sharp` image service (zastąpić `noop` w `astro.config.mjs`) — uruchomi srcset
- [ ] Usunąć orphan files: `hero_section-kwateryparter.webp`, `hero_section-kwaterypietro.webp`
- [ ] Posprzątać Content Collections — usunąć `services` i `portfolio` (generują warningi)
- [ ] Canonical URL — filtrować query params (`utm_*` etc.)
- [ ] eyebrow2 w HeroSection — zamienić `blue-*` na tokeny design systemu
- [ ] Ujednolicić link Google Maps w Footer z `siteConfig.social.googleMaps`
- [ ] Dodać `try/catch` w `initCopyButtons` przy `navigator.clipboard.writeText`

#### Do uzupełnienia przez klienta
- [ ] Treść stron `/kwatery` i `/blog`
- [ ] Zdjęcia do galerii (`src/assets/kwatery-pracownicze/parter/` i `pietro/` — puste foldery)
- [ ] Facebook i Instagram URL (gdy właściciel założy profile)
- [ ] Testimonials — komponent do zbudowania gdy będą gotowe opinie

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
