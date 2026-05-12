# Raport audytu — roomwork.pl

> Data audytu: 2026-05-08 | Ostatnia aktualizacja: 2026-05-12
> Zakres: bezpieczeństwo, SEO, dobre praktyki programowania
> Stack: Astro 6 · Tailwind CSS v4 · TypeScript strict · Vercel (static)

---

## STATUS OGÓLNY

Wszystkie krytyczne i wysokie priorytety naprawione. Pozostają 2 świadome decyzje (nie błędy).

---

## 🔒 BEZPIECZEŃSTWO — ✅ BRAK PROBLEMÓW

- `set:html` używane tylko dla statycznych SVG — zero ryzyka XSS
- Zewnętrzne linki mają `rel="noopener noreferrer"`
- Iframe map facade — mapy ładują się po kliknięciu
- `astro:env` schema poprawna — sekrety nie trafiają do klienta
- `.env.example` istnieje, brak `.env` w repo
- Clipboard `try/catch` — obsłużone w `Footer.astro`

**⚠️ Przyszłość:** Gdy dodasz analytics (GA, GTM) → wymagany baner cookies (RODO)

---

## 🔍 SEO

### ✅ Naprawione

| # | Problem | Fix |
|---|---------|-----|
| 1 | Brak `/polityka-prywatnosci` i `/regulamin` | Strony stworzone |
| 2 | Brak `og-default.webp` | Wygenerowany (1200×630px, 43KB) |
| 3 | `longDescription` mówił "10 pokoi" zamiast 11 | Poprawione w `siteConfig.ts` |
| 5 | Brak `apple-touch-icon.png` | Dodany do `/public` |
| 6 | Wszystkie strony używały tego samego `og:image` | Każda strona ma własny ogImage |
| 7 | Canonical URL zawierał query params (`?utm_*`) | `Astro.url.origin + Astro.url.pathname` |
| 10 | Title bloga zbyt krótki (25 znaków) | "Blog o kwaterach pracowniczych — RoomWork Słomniki" |

### 🟡 Świadome decyzje (nie błędy)

- **`/blog` i `/kwatery` bez `noindex`** — strony istnieją i mają treść (HeroSection + sekcje), pomijamy noindex
- **`og:type: 'website'`** zamiast `business.business` — stary typ FB, bez praktycznego znaczenia w 2026

### ✅ Zawsze było dobrze

- JSON-LD LocalBusiness kompletny (geo, address, openingHours, priceRange, telephone, email)
- Hierarchia nagłówków poprawna (H1 → H2 sekcje → H3 FAQ)
- Wszystkie obrazy mają `alt`
- Sitemap (`@astrojs/sitemap`), `robots.txt`, `<html lang="pl">`, `og:locale: 'pl_PL'`
- SEO miejscowości — `LocationSection.astro` z 18 nazwami pobliskich wiosek
- `<a href="tel:">` i `<a href="mailto:">` — semantyczne

---

## 🛠 DOBRE PRAKTYKI PROGRAMOWANIA

### ✅ Naprawione

| # | Problem | Fix |
|---|---------|-----|
| 12 | `@astrojs/vercel` w `package.json` bez użycia | Odinstalowany |
| 13 | Hardcoded `phoneFormatted` w 6+ plikach | Wyciągnięty do `siteConfig.ts` |
| 14 | `dayMap`/`formatDays` zduplikowane w Footer i ContactSection | Wyciągnięte do `src/utils/openingHours.ts` |
| 15 | `image.service: noop` — brak optymalizacji obrazów | Włączony sharp service |
| 16 | Orphan files `hero_section-kwateryparter/pietro.webp` | Usunięte |
| 18 | `services` i `portfolio` w Content Collections — puste, warning przy buildzie | Usunięte z `content.config.ts` |
| 19 | `eyebrow2` w HeroSection używał `blue-*` zamiast tokenów design systemu | Zamienione na `border-border`, `text-primary`, `bg-primary` |
| 20 | Hardcoded link Google Maps w Footer inny niż w siteConfig | Już używał `siteConfig.social.googleMaps` (nieaktualne) |
| 21 | `themeColorDark` hardcoded `#0E1812` w BaseLayout | Przeniesiony do `siteConfig.themeColorDark` |
| 23 | `border-t-[1.75px]` w Navbar i Footer — arbitrary value | Zmienione na `border-t-2` / `border-b-2` |

### 🟡 Świadome decyzje (nie błędy)

- **`prefetchAll: true, defaultStrategy: 'viewport'`** — agresywny prefetch, ale świadomy wybór dla tej strony
- **Foldery `src/assets/kwatery-pracownicze/parter/` i `pietro/`** — audit błędnie oznaczył je jako puste; mają zdjęcia pokoi

### ✅ Zawsze było dobrze

- TypeScript strict (`strict: true`, `verbatimModuleSyntax: true`, `strictNullChecks: true`)
- ESLint z `@typescript-eslint/no-explicit-any: error`
- Mobile-first w całym projekcie
- Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- Skip link w BaseLayout
- `aria-labelledby` + `<h2 id="">` w każdej sekcji
- `focus-visible` obsłużone globalnie
- Mobile menu z `inert`, `aria-expanded`, ESC handler
- Theme handling — inline script, zero FOUC, `astro:after-swap`
- Hero LCP — `loading="eager" fetchpriority="high"`
- Mapa lazy facade w Footer i LocationSection

---

## 🧪 LISTA DO TESTOWANIA

### SEO & Meta
- [ ] Każda strona ma unikalny `og:image` — sprawdź przez `curl -s URL | grep og:image`
- [ ] Canonical URL nie zawiera query params — sprawdź `?utm_test=1` czy canonical jest czysty
- [ ] JSON-LD poprawny — walidacja przez [schema.org/validator](https://validator.schema.org)
- [ ] Sitemap zawiera wszystkie strony oprócz `/blog` — sprawdź `roomwork.pl/sitemap-index.xml`
- [ ] `apple-touch-icon.png` dostępny — sprawdź `roomwork.pl/apple-touch-icon.png`

### Obrazy & Performance
- [ ] Sharp generuje `srcset` — sprawdź w DevTools czy `<img>` ma atrybut `srcset`
- [ ] LCP hero image ładuje się z `fetchpriority="high"` — sprawdź w DevTools Network
- [ ] WebP serwowane na wszystkich przeglądarkach wspierających format

### Funkcjonalność
- [ ] Kopiowanie NIP/REGON/KRS w `/o-nas` działa i pokazuje checkmark
- [ ] Motyw dark/light/auto działa bez FOUC (sprawdź przy twardym odświeżeniu)
- [ ] Mobile menu otwiera/zamyka się, ESC działa, link zamyka menu
- [ ] Filtrowanie kwater (liczba osób + Parter/Piętro) działa poprawnie
- [ ] Lightbox w kartach kwater — otwieranie, nawigacja strzałkami, swipe mobile, ESC
- [ ] Mapa facade w Footer i LocationSection ładuje się po kliknięciu
- [ ] Formularz kontaktowy / `tel:` i `mailto:` linki działają

### Strony do sprawdzenia
- [ ] `/` — strona główna
- [ ] `/kwatery` — lista kwater z filtrami
- [ ] `/kwatery/parter-1` — przykładowa podstrona kwatery
- [ ] `/o-nas` — historia, wartości, dane rejestrowe
- [ ] `/kontakt` — karty kontaktowe, mapa, Google Wizytówka
- [ ] `/blog` — strona bloga
- [ ] `/polityka-prywatnosci` — strona prawna
- [ ] `/regulamin` — strona prawna
- [ ] `404` — strona błędu

### Dark mode
- [ ] Wszystkie tokeny semantyczne (`bg-background`, `text-text`, `bg-surface` itp.) zmieniają się poprawnie
- [ ] Żaden element nie używa hardcoded `bg-white` / `text-black`
- [ ] Ikony SVG widoczne w obu motywach
