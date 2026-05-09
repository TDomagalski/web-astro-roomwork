# Raport audytu — roomwork.pl

> Data audytu: 2026-05-08
> Zakres: bezpieczeństwo, SEO, dobre praktyki programowania
> Stack: Astro 6 · Tailwind CSS v4 · TypeScript strict · Vercel (static)

---

## 🔒 BEZPIECZEŃSTWO

### ✅ Co jest dobrze
- **`set:html` jest bezpieczne** — używane tylko dla statycznych SVG ikon i tekstów hardcoded w komponentach (FAQ answers, group descriptions). Zero user input → brak ryzyka XSS.
- **Wszystkie zewnętrzne linki** mają `target="_blank" rel="noopener noreferrer"` (Google Maps, Wizytówka).
- **Iframe map facade pattern** — mapy ładują się dopiero po kliknięciu, z `referrerpolicy="no-referrer-when-downgrade"`.
- **Schemat `astro:env`** poprawny — `RESEND_API_KEY` z `access: 'secret'`, `PUBLIC_GOOGLE_MAPS_KEY` z `access: 'public'`. Sekrety nie trafią do klienta.
- **`.env.example`** istnieje, brak `.env` w repo.
- **Innerhtml w copy-btn** — używa hardcoded SVG checkmark, bez user input.

### ⚠️ Drobne uwagi
- **NISKI:** Dane firmy (NIP, REGON, KRS) są w kodzie publicznie — to OK, dane KRS są jawne, ale warto wiedzieć.
- **NISKI (RODO):** Brak banera cookies. Aktualnie nie ma trackingów (GA, GTM, Pixel), więc nie jest potrzebny. **Stanie się problemem gdy dodasz analytics.**

**Wniosek:** Pod kątem bezpieczeństwa strona jest w dobrej kondycji. Brak krytycznych zagrożeń.

---

## 🔍 SEO

### 🔴 KRYTYCZNE

1. **`/polityka-prywatnosci` i `/regulamin` — strony NIE ISTNIEJĄ**, ale są linkowane w Footer.
   - Plik: `Footer.astro:295-302`
   - **Konsekwencje prawne:** Wymóg w Polsce przy zbieraniu jakichkolwiek danych (e-mail, telefon w formularzu kontaktowym — nawet bez formularza, sama wizytówka czasem wymaga PP).
   - Linki zwrócą 404 → użytkownicy widzą błąd, Google obniża zaufanie domeny.

2. **`/og-default.jpg` BRAK W `/public`** — używany w BaseLayout dla Open Graph na każdej stronie.
   - Plik: `siteConfig.ts:16` i `BaseLayout.astro:88`
   - **Konsekwencja:** Każde udostępnienie strony na Facebook/LinkedIn/Slack/WhatsApp pokaże pusty/zepsuty preview.

### 🟠 WYSOKI

3. **`siteConfig.longDescription` mówi "10 w pełni wyposażonymi pokojami"** zamiast 11.
   - Plik: `siteConfig.ts:6`
   - **Konsekwencja:** Niespójność SEO — JSON-LD i meta description mówią coś innego niż reszta strony. Google może traktować to jako confusion signal.

4. **Strony `/blog` i `/kwatery` to tylko HeroSection** — zero treści, tylko hero.
   - **Konsekwencja:** Google zindeksuje je jako "thin content" → obniża autorytet całej domeny. Lepiej dodać `<meta name="robots" content="noindex">` do czasu uzupełnienia treści.

5. **`apple-touch-icon.png` BRAK** — referencja w `BaseLayout.astro:79`.
   - Konsekwencja: 404 przy zapisaniu do iOS home screen.

6. **Wszystkie strony używają tego samego `og:image`** — żadna nie przekazuje custom `ogImage` do BaseLayout.
   - **Konsekwencja:** Każdy share linku do `/kwatery`, `/o-nas`, `/kontakt` wygląda tak samo. Google i social media nie odróżniają stron wizualnie.

### 🟡 ŚREDNI

7. **Canonical URL** używa `Astro.url.href` — może generować duplikaty z trailing slash, query params (np. `utm_*`).
   - Plik: `BaseLayout.astro:83`
   - Lepsze: filtrować query params lub używać `Astro.url.pathname`.

8. **`og:type: 'website'` dla LocalBusiness** — Schema.org JSON-LD jest LocalBusiness, ale Open Graph mówi "website". Drobna niespójność.

9. **`hero_section-sample.jpg`** używany na stronie blog jako placeholder. Mało SEO-friendly nazwa pliku.

10. **Title `"Blog — RoomWork Słomniki"` (25 chars)** — bardzo krótki, Google ma 60 chars. Można dodać kontekst: `"Blog o kwaterach pracowniczych — RoomWork Słomniki"`.

### ✅ Co jest dobrze
- **JSON-LD LocalBusiness** — kompletny: geo, address, openingHours, priceRange, telephone, email.
- **Hierarchia nagłówków** — poprawna (H1 hero → H2 sekcje → H3 FAQ).
- **Wszystkie obrazy mają `alt`** i są wymagane przez TypeScript Props.
- **Sitemap** — zintegrowany przez `@astrojs/sitemap`.
- **`robots.txt`** istnieje, wskazuje sitemap.
- **`<html lang="pl">`** — ustawione.
- **`og:locale: 'pl_PL'`** ustawiony.
- **Title i description długości** — wszystkie w limicie (40-160 chars).
- **SEO miejscowości** — `LocationSection.astro` ma długi naturalny tekst z 18 nazwami pobliskich wiosek.
- **`<a href="tel:">` i `<a href="mailto:">`** — semantyczne, wspierają mobile dialer.

---

## 🛠 DOBRE PRAKTYKI PROGRAMOWANIA

### 🟠 WYSOKI

11. **Niespójność `longDescription` z `description`** w `siteConfig.ts` (10 vs 11 pokoi) — patrz SEO #3.

12. **`@astrojs/vercel` w `package.json`** ale nieużywany w `astro.config.mjs` (usunięty wcześniej, dependencja została).
    - Plik: `package.json:17`
    - Konsekwencja: niepotrzebnie ~50MB w `node_modules`, dłuższy `npm install` na Vercel.
    - Fix: `npm uninstall @astrojs/vercel`.

13. **Hardcoded numer telefonu `'690 328 659'` w 6+ plikach**:
    - `HeroSection.astro:60`, `Footer.astro:5`, `Navbar.astro:5`, `ContactSection.astro:4`, `FaqSection.astro:4`, `o-nas.astro:7`
    - Powinno być w `siteConfig.ts` jako `phoneFormatted` (raw już jest jako `phone`).

14. **`dayMap` + `formatDays` zduplikowane** w `Footer.astro:8-23` i `ContactSection.astro:7-22` — identyczny kod 17 linii.
    - Fix: Wyciągnąć do `src/utils/openingHours.ts` lub dodać metodę do `siteConfig.ts`.

### 🟡 ŚREDNI

15. **`image.service: noop`** — obrazy nie są przetwarzane przez sharp.
    - Plik: `astro.config.mjs:34-37`
    - Konsekwencja: `widths={[480, 768, 1024, 1280]}` w `<Image>` jest **martwym kodem** — nie generuje `srcset`. Wszyscy użytkownicy dostają oryginał.
    - Fix: Włączyć sharp service: `service: { entrypoint: 'astro/assets/services/sharp' }`.

16. **`hero_section-kwateryparter.webp` i `hero_section-kwaterypietro.webp`** — pliki istnieją w `src/assets/`, ale **nigdy nie są importowane**.
    - Status: orphan files (~220 KB).

17. **Foldery `src/assets/kwatery-pracownicze/parter/` i `pietro/`** — puste, placeholdery.

18. **Content Collections (`services`, `portfolio`, `posts`)** zdefiniowane w `content.config.ts`, ale folder treści jest pusty → warning przy każdym buildzie.
    - Fix: Usunąć nieużywane kolekcje (zostawić tylko `posts` jeśli planujesz blog) lub dodać plik `_template.md` z prefixem `_` (ignorowany przez glob).

19. **Niespójność tokenów kolorów w eyebrow2** (HeroSection):
    - Plik: `HeroSection.astro:87`
    - Używa `border-blue-200/blue-600 dark:border-blue-800/blue-400` zamiast tokenów `border-border` / `text-primary`.
    - To jedyny niebieski element w całej stronie — łamie design system "Spokój przy Krakowskiej".

20. **Hardcoded link Google Maps w Footer** (`https://maps.app.goo.gl/EQ7nDyvmPdTvQsxu7`):
    - Plik: `Footer.astro:145`
    - Inny niż `siteConfig.social.googleMaps` (`https://maps.app.goo.gl/1sYhkbGWfgZHDywt7`)!
    - To może być celowe (różne linki do tego samego miejsca), ale powinno być w siteConfig.

### 🟢 NISKI

21. **`themeColor` dla dark mode hardcoded** `#0E1812` w `BaseLayout.astro:55` zamiast w siteConfig.

22. **`prefetchAll: true, defaultStrategy: 'viewport'`** — agresywny prefetch.
    - Plik: `astro.config.mjs:29-31`
    - Może zwiększać zużycie pasma, szczególnie na mobile/3G. Zostawiłbym.

23. **Border `border-t-[1.75px]`** w Navbar i Footer — niestandardowa wartość. Czysta kosmetyka.

24. **Inline JSON-LD przez `set:html={JSON.stringify(jsonLd)}`** — to jest poprawne podejście w Astro, ale przy bardzo dużej zmianie konfiguracji warto pamiętać o escape'owaniu znaków (Astro robi to automatycznie).

25. **Console errors po failed clipboard write** — funkcja `initCopyButtons` w `Footer.astro:336-356` nie ma try/catch przy `navigator.clipboard.writeText`.
    - Fail w przeglądarkach bez secure context (HTTP) lub bez uprawnień → unhandled rejection w konsoli.

### ✅ Co jest dobrze
- **TypeScript strict** ✓ (`strict: true`, `verbatimModuleSyntax: true`, `strictNullChecks: true`).
- **ESLint** z `@typescript-eslint/no-explicit-any: error` ✓.
- **Mobile-first** w całym projekcie ✓.
- **Semantic HTML** — `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` używane poprawnie.
- **Skip link** — `BaseLayout.astro:103-108` ✓.
- **`aria-labelledby` + `<h2 id="">`** w każdej sekcji ✓.
- **`focus-visible`** obsłużone globalnie w `global.css:68-72` ✓.
- **Mobile menu** — `inert` attribute, `aria-expanded`, ESC handler, body overflow lock, link-click close ✓.
- **Theme handling** — inline script, no FOUC, `astro:after-swap` re-apply, localStorage try/catch ✓.
- **Navbar script** — cleanup pattern z `astro:before-swap` ✓.
- **`prefers-reduced-motion`** obsłużone w global.css ✓.
- **Hero LCP** — `loading="eager" fetchpriority="high"` ✓.
- **Mapa lazy facade** — Footer + LocationSection używają tego samego patternu ✓.
- **Custom utilities** w Tailwind v4 dla typografii ✓ (poprawny workaround dla braku `clamp()` w `@theme`).
- **`as const`** na arrays — TypeScript wnioskuje literal types ✓.
- **Komponenty są atomowe** — props interface, brak prop drilling, łatwe do testowania.
- **Routing struktura `pages/home/`, `pages/kontakt/`** — czytelna, oddziela komponenty per-page od uniwersalnych.

---

## 📊 PODSUMOWANIE

| Kategoria | Krytyczne | Wysokie | Średnie | Niskie | Razem |
|---|---|---|---|---|---|
| Bezpieczeństwo | 0 | 0 | 0 | 2 | 2 |
| SEO | 2 | 4 | 4 | 0 | 10 |
| Dobre praktyki | 0 | 4 | 6 | 5 | 15 |
| **RAZEM** | **2** | **8** | **10** | **7** | **27** |

---

## 🎯 REKOMENDACJE — 5 priorytetów (od czego zacząć)

1. **Stwórz `polityka-prywatnosci` i `regulamin`** — wymóg prawny, linki już istnieją.
2. **Dodaj `og-default.jpg` (1200×630px) do `/public`** — bez tego każdy share linku wygląda tragicznie.
3. **Popraw `longDescription` w `siteConfig.ts`** — zmień "10 pokojami" na "11 pokojami".
4. **`<meta name="robots" content="noindex">`** na pustych stronach `/blog` i `/kwatery` do czasu uzupełnienia treści (lub usuń je z nawigacji).
5. **Włącz `sharp` image service** — zmień `astro.config.mjs:34-37` z `noop` na `sharp`. Natychmiastowy zysk wydajności (mniejsze obrazy, srcset).

---

## 📋 PEŁNA LISTA ZADAŃ DO POPRAWY

### Krytyczne (do natychmiastowej poprawy)
- [ ] Stworzyć stronę `/polityka-prywatnosci`
- [ ] Stworzyć stronę `/regulamin`
- [ ] Dodać `og-default.jpg` (1200×630px) do `/public`

### Wysokie (poprawić w najbliższym czasie)
- [ ] Zaktualizować `longDescription` w `siteConfig.ts` (10 → 11 pokoi)
- [ ] Dodać `noindex` do pustych stron `/blog` i `/kwatery` lub uzupełnić treść
- [ ] Dodać `apple-touch-icon.png` do `/public`
- [ ] Pozwolić każdej stronie przekazać własny `ogImage` do BaseLayout
- [ ] Usunąć `@astrojs/vercel` z `package.json`
- [ ] Wyciągnąć `phoneFormatted` do `siteConfig.ts`
- [ ] Wyciągnąć `dayMap`/`formatDays` do utility (np. `src/utils/openingHours.ts`)

### Średnie (warto poprawić przy okazji)
- [ ] Filtrować query params w canonical URL
- [ ] Sprawdzić czy `og:type: 'business.business'` lepiej pasuje
- [ ] Zmienić nazwę `hero_section-sample.jpg` na coś sensownego dla bloga
- [ ] Wydłużyć title bloga
- [ ] Włączyć sharp image service zamiast noop
- [ ] Usunąć orphan files: `hero_section-kwateryparter.webp`, `hero_section-kwaterypietro.webp`
- [ ] Usunąć puste foldery `src/assets/kwatery-pracownicze/parter/`, `pietro/`
- [ ] Posprzątać Content Collections — usunąć `services` i `portfolio` jeśli niepotrzebne
- [ ] Zamienić blue-* tokeny w eyebrow2 na semantyczne tokeny design systemu
- [ ] Ujednolicić linki Google Maps w Footer i siteConfig

### Niskie (warto zrobić, ale nie pilnie)
- [ ] Wyciągnąć dark `themeColor` `#0E1812` do siteConfig
- [ ] Rozważyć zmianę `prefetchAll` na bardziej selektywny prefetch
- [ ] Standaryzować `border-t-[1.75px]` na np. `border-t-2`
- [ ] Dodać try/catch w `initCopyButtons` przy `navigator.clipboard.writeText`
- [ ] Przygotować baner cookies na przyszłość gdy zostanie dodane analytics
