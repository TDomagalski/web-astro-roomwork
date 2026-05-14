# PROGRESS — web-astro-roomwork

> Ten plik jest aktualizowany przez asystenta AI na końcu każdej sesji roboczej.
> Służy jako briefing na start kolejnej sesji — czytaj go przed rozpoczęciem pracy.

---

## Stan projektu: W BUDOWIE — gotowy do testowania

---

## Sesja 10 — 2026-05-14

### Wykonane

#### PageSpeed Insights — optymalizacja obrazu hero

- [x] `HeroSection.astro` — `widths` zmieniony z `[480, 768, 1024, 1280]` → `[480, 640, 768, 1024]`
  - Dodano 640w (nowy breakpoint), usunięto 1280w (obraz nigdy nie wyświetla się w tej szerokości)
- [x] `HeroSection.astro` — `sizes` — usunięto błędny breakpoint `(min-width: 1280px) 480px`; zostało `(min-width: 1024px) 40vw`
  - Desktop (1280px, 1× DPR): 40vw = 512px → przeglądarka wybiera **640w = 35.7 KB** zamiast starego 49.2 KB (−27%)
  - Brak upscalingu przez `object-cover` (640×360px > wymogi kontenera 480×320px ✓)
- [x] `quality={70}` — pozostawione (użytkownik cofnął zmianę na 60, 70 daje lepszy kompromis jakość/waga)

#### PageSpeed — decyzja o Critical Request Chain
- [⚠] Łańcuch `ClientRouter.js → index.js → page.js` — świadoma decyzja: zostawić View Transitions
  - Łańcuch to known limitation Astro ClientRouter
  - Skrypty `type="module"` (deferred) — nie blokują renderowania LCP
  - Status "Bez oceny" — nie liczy się do wyniku PageSpeed
  - Usunięcie = utrata animacji przejść między stronami

#### Ważna uwaga techniczna (bug)
- [!] `sizes="(min-width: 1280px) 480px"` powoduje rozmycie przy `object-cover` z `aspect-3/2`
  - Obraz 480w ma 480×270px (proporcje ~16:9), kontener 480×320px (3:2) → `object-cover` musiał skalować w górę o 18% → blur
  - Minimum bezpieczna szerokość dla tego kontenera: 640w (640×360px ≥ 320px wys. kontenera)

### Do zrobienia (aktualnie otwarte)
- [ ] Uzupełnić 3 tłumaczenia w `src/data/reviews.ts` (Andrij Habruk, Simon Qurtiashvili, Rati Gurgenidze)
- [ ] Blog `/blog` — bez treści artykułów (klient)
- [ ] Social media: Facebook i Instagram URL (gdy właściciel założy profile)
- [ ] Analytics — gdy dodany, wymagany baner cookies (RODO)
- [ ] Przetestowanie strony wg checklisty w `AUDIT.md`

---

## Sesja 9 — 2026-05-13

### Wykonane

#### Opinie Google — implementacja statyczna
- [x] `src/utils/googleReviews.ts` — typy + helpery:
  - `formatRatingCount()` — polska odmiana (1 opinia / 2-4 opinie / 5+ opinii)
  - `relativeTime(isoDate)` — oblicza czas przy każdym buildzie, poprawne formy PL
- [x] `src/data/reviews.ts` — 19 statycznych opinii z Google Wizytówki
  - `rating: 4.8`, `userRatingCount: 19`
  - 3 opinie z pustym `text: ''` do ręcznego uzupełnienia (Andrij Habruk EN, Simon Qurtiashvili GEO, Rati Gurgenidze EN)
- [x] `src/components/sections/TestimonialsSection.astro` — sekcja z opiniami
  - Karty jako `<a>` — klik otwiera Google Wizytówkę w nowej karcie
  - Eyebrow z kolorowym Google G icon, rating 4,8 + gwiazdki + liczba opinii
  - Grid 1→2→3 col, awatar z inicjałem, `line-clamp-5`
  - CTA "Dodaj swoją opinię na Google"
- [x] `BaseLayout.astro` — `<TestimonialsSection>` przed `<Footer>` na każdej stronie
- [x] `BaseLayout.astro` — ESLint fixes: `var` → `const`, `catch (e)` → `catch`
- [x] Build: ✓ 18 stron

### Sesja 9 cd. — PageSpeed + Navbar

#### PageSpeed Insights — naprawione (2 z 4 czerwonych błędów)
- [x] `HeroSection.astro` — `quality={70}` na LCP `<Image />` (było domyślne 80) → ~21% mniej KB
- [x] `astro.config.mjs` — `build.inlineStylesheets: 'always'` → CSS wbudowany w HTML, zero `<link rel="stylesheet">`, usunięty z łańcucha krytycznych requestów
- [x] Problem 4 (łańcuch zależności) — naprawiony automatycznie przez inline CSS
- [⚠] Problem 3 (forced reflows 79ms) — pochodzi z Astro ClientRouter (View Transitions), nienaprawialny bez usunięcia View Transitions

#### Navbar — hamburger icon
- [x] Kontener `h-3` → `h-3.5` (12px → 14px) — odstępy między liniami wyrównane do 4px/4px (było 4px/2px)
- [x] Linie `bg-text group-hover:bg-primary` — zmiana koloru na zielony przy hover, spójnie z ramką przycisku
- [x] `transition-opacity` → `transition-all` na środkowej linii (unifikacja transition)

#### ESLint fixes (BaseLayout.astro)
- [x] `var` → `const` w inline theme script
- [x] `catch (e)` → `catch` (optional catch binding ES2019)

### Do zrobienia (aktualnie otwarte)
- [ ] Uzupełnić 3 tłumaczenia w `src/data/reviews.ts` (Andrij Habruk, Simon Qurtiashvili, Rati Gurgenidze)
- [ ] Blog `/blog` — bez treści artykułów (klient)
- [ ] Social media: Facebook i Instagram URL (gdy właściciel założy profile)
- [ ] Analytics — gdy dodany, wymagany baner cookies (RODO)
- [ ] Przetestowanie strony wg checklisty w `AUDIT.md`

---

## Sesja 8 — 2026-05-12

### Wykonane

#### Zmiany tekstowe
- [x] "Telewizja" → "Telewizja na życzenie" we wszystkich 3 miejscach (AmenitiesSection, [slug].astro, siteConfig.longDescription)
- [x] H1 strony głównej: "Kwatery pracownicze dla Twojej ekipy" → "Noclegi pracownicze przy trasie E7 — blisko Krakowa"
- [x] CTA na `/kwatery`: "Zadzwoń i zarezerwuj" (tel:) → "Zapytaj o nocleg" (/kontakt)
- [x] Title bloga: "Blog — RoomWork Słomniki" (25 zn.) → "Blog o kwaterach pracowniczych — RoomWork Słomniki" (50 zn.)

#### Filtry kwater (`KwaterySection.tsx`)
- [x] Dodane filtry "Parter" i "Piętro" — filtrowanie po `room.floor`
- [x] Typ `FilterValue` rozszerzony o `'Parter' | 'Piętro'`
- [x] Przycisk "Zobacz szczegóły" wyśrodkowany (`self-center`)

#### Ikony SVG — ujednolicenie stylu
- [x] **AmenitiesSection** (główna): solid circle `bg-primary h-12 w-12 rounded-full`, biała ikona `text-on-primary h-6 w-6`
- [x] **ForWhoSection** (główna): gradient square `h-14 w-14 rounded-2xl border bg-gradient-to-br from-primary/20 to-primary/5`, ikona `h-7 w-7`
- [x] **ForWhoSection**: zawartość kart wyśrodkowana (`items-center text-center`); "Osoby prywatne" wyśrodkowane na mobile
- [x] **o-nas + kontakt**: ring circle `h-12 w-12 rounded-full bg-primary/10 ring-2 ring-primary/30`, ikona `h-6 w-6`
- [x] Ikona łazienki — podmieniona na poprawną (fill-based) wszędzie: AmenitiesSection, o-nas, [slug].astro
- [x] Ikona łazienki na o-nas: `fill="currentColor" stroke="none"` bezpośrednio w ścieżce (nadpisuje wrapper SVG)
- [x] eyebrow2 w HeroSection: `blue-*` → tokeny design systemu (`border-border`, `text-primary`, `bg-primary`)

#### SEO & techniczne (z audytu — priorytety średnie i niskie)
- [x] Canonical URL: `Astro.url.href` → `Astro.url.origin + Astro.url.pathname` (bez query params)
- [x] Sharp image service włączony: `noop` → `astro/assets/services/sharp` — `srcset` działa
- [x] OG images: dodane do `/polityka-prywatnosci` i `/regulamin` (`og-roomwork.webp`)
- [x] Orphan files usunięte: `hero_section-kwateryparter.webp`, `hero_section-kwaterypietro.webp`
- [x] Content Collections: usunięte `services` i `portfolio` z `content.config.ts` — koniec warningów przy buildzie
- [x] `themeColorDark: '#0E1812'` przeniesione do `siteConfig.ts` (było hardcoded w BaseLayout)
- [x] `border-t-[1.75px]` → `border-t-2`, `border-b-[1.75px]` → `border-b-2` (Navbar + Footer)

#### Dokumentacja
- [x] `AUDIT.md` przepisany jako czysty dokument z tabelami naprawionych rzeczy + checklistą do testowania
- [x] `PROGRESS.md` zaktualizowany
- [x] Pamięć projektu zaktualizowana

### Stan audytu po sesji 8
Wszystkie krytyczne i wysokie priorytety naprawione. Średnie i niskie: zrobione lub świadomie pominięte.
Pozostają tylko 2 świadome decyzje: `prefetchAll: true` (zostawione) i `noindex` na /blog, /kwatery (pominięte — strony istnieją).

### Do zrobienia (aktualnie otwarte)
- [ ] Blog `/blog` — bez treści artykułów (klient)
- [ ] Social media: Facebook i Instagram URL (gdy właściciel założy profile)
- [ ] Testimonials — komponent gdy będą gotowe opinie klientów
- [ ] Analytics — gdy dodany, wymagany baner cookies (RODO)
- [ ] Przetestowanie strony wg checklisty w `AUDIT.md`

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
