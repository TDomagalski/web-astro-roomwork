---
name: Roomwork
description: Kwatery pracownicze w Słomnikach — ciche, solidne, niezawodne.
colors:
  forest-green: "#267A55"
  forest-green-mid: "#3E8864"
  canvas: "#F3F7F4"
  surface: "#FAFDFB"
  ink: "#1B2B24"
  ink-muted: "#5F7A6B"
  divider: "#DCE8E1"
  error: "#C04842"
  on-primary: "#FBFEFB"
typography:
  display:
    fontFamily: "Zilla Slab, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Zilla Slab, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Libre Franklin, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Libre Franklin, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Libre Franklin, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  full: "9999px"
  3xl: "24px"
  2xl: "16px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.forest-green}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.forest-green-mid}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
  eyebrow-badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.forest-green}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: Roomwork

## 1. Overview

**Creative North Star: "Spokój przy Krakowskiej"**

Roomwork nie jest platformą ani produktem SaaS. To lokalna firma wynajmująca pokoje ekipom roboczym i strona ma to czuć. Estetyka "Spokój przy Krakowskiej" czerpie z konkretności i ciszy: nieduże miejscowości, dobre hostele rodzinne, czyste tablice ogłoszeń, faktury wydrukowane na drukarce laserowej. Nie ma tu miejsca na dekoracje, które nic nie mówią.

System projektowy jest **restrained**: jeden kolor akcentowy (niebieski kontrakt), chłodne neutralne tła, wyraźna hierarchia przez skalę i wagę. Kompozycja gęsta tam, gdzie trzeba (nagłówki, CTA), oddycha tam, gdzie treść buduje zaufanie (opisy, kontakt). Paleta akcentowa jest tymczasowa i oznaczona do przeprojektowania przez `/impeccable colorize`.

**Key Characteristics:**
- Jeden kolor akcentowy, używany na nie więcej niż 10% ekranu
- Hierarchia przez ciężar i skalę, nie przez kolor
- Cienie tylko jako odpowiedź na stan (hover, scroll), nigdy dekoracja
- Zaokrąglenia: pill (`full`) dla akcji, `3xl`/`2xl` dla kontenerów
- Język: bezpośredni, lokalny, bez korporacyjnego żargonu

## 2. Colors: Leśna Zieleń

Paleta wybrana pod brand personality "ciepły, swojski, niezawodny". Akcent to głęboka leśna zieleń — distinctywna w kontekście B2B zakwaterowania, daleka zarówno od SaaS-blue jak i hotelowej terakoty. Neutralne tła zyskały subtelny zielony tint, który buduje spójność bez dominacji.

Implementacja: tokeny OKLCH w `global.css`; hex w frontmatter to przybliżenia sRGB dla zgodności z Stitch linter.

**The One Voice Rule.** Forest-green na maksymalnie 10% ekranu. Rzadkość to punkt. Nie tło sekcji, nie tekst pomocniczy, nie ozdoby ramek bez powodu.

**The Elevated Anchor Rule.** Footer i sekcje ciemne używają Ink (`oklch(14% 0.016 157)`) jako tła. Nigdy forest-green jako tło sekcji.

### Primary
- **Forest Green** (#267A55 / `oklch(45% 0.15 157)`): Jedyny kolor akcentowy. CTA, linki aktywne, ikony pomocnicze, podkreślenia nawigacji, focus ring. Maksymalnie 10% powierzchni ekranu. Kontrast na białym: ~5.3:1.

### Secondary
- **Forest Green Mid** (#3E8864 / `oklch(55% 0.13 157)`): Wyłącznie stan hover primary. Nie pojawia się jako samodzielny kolor w spoczynku.

### Neutral
- **Canvas** (#F3F7F4 / `oklch(97.5% 0.008 157)`): Tło strony. Biel z zielonym tintem. Nie biały papier.
- **Surface** (#FAFDFB / `oklch(99.5% 0.003 157)`): Navbar, eyebrow badge. O jeden krok jaśniejszy od Canvas.
- **Ink** (#1B2B24 / `oklch(18% 0.018 157)`): Główny tekst i tło footera. Ciemny leśny, nie czerń.
- **Ink Muted** (#5F7A6B / `oklch(50% 0.022 157)`): Opisy, drugorzędny tekst. Kontrast ~5:1 na Canvas.
- **Divider** (#DCE8E1 / `oklch(91.5% 0.015 157)`): Obramowania, separatory. Zielonkawy, nie szary.
- **Error** (#C04842 / `oklch(55% 0.16 25)`): Komunikaty błędów. Stonowana czerwień na ciepłym odcieniu, niekolizyjny z zielonym.

### Glow Helpers (tylko dla CSS arbitrary values)
Zdefiniowane jako `:root` custom properties w `global.css`. Automatycznie adaptują do dark mode:
- `--glow-primary` — 10% primary (tła dekoracyjne, gradienty)
- `--glow-primary-soft` — 8% secondary (subtelne gradienty)
- `--glow-card` — 25% elevated (cień karty)
- `--glow-nav` — 18% primary (cień navbara po scrollu)
- `--glow-action` — 50% primary (cień CTA hover)
- `--glow-pin` — 80% primary (cień pina mapy)

## 3. Typography

**Display / Heading Font:** Zilla Slab (Google Fonts, fallback: Georgia, serif)
**Body / UI Font:** Libre Franklin (Google Fonts, fallback: system-ui, sans-serif)

**Character:** Para dobrana pod brand "solidna lokalna firma". Zilla Slab wnosi dostojeństwo bez pretensji editorial — liternictwo slab serif przypomina solidne nagłówki w katalogach handlowych i tablicach informacyjnych. Libre Franklin jest humanistycznym sans-serifem: czytelny w każdym rozmiarze, bliższy człowiekowi niż geometrycznym grotesque. Razem: zaufany, lokalny, rzeczowy.

Oba fonty ładowane przez `fontProviders.google()` w `astro.config.mjs`. Astro generuje `@font-face` i preload automatycznie. Klasy Tailwind: `font-heading` (Zilla Slab) i `font-sans` (Libre Franklin).

### Hierarchy
- **Display** (Zilla Slab 700, clamp(2.25rem–3.75rem), leading 1.1, tracking-tight): H1 — wyłącznie dla głównego nagłówka strony. Zilla Slab at scale.
- **Headline** (Zilla Slab 700, clamp(1.75rem–2.5rem), leading 1.15): H2 głównych sekcji. Fluid, nie fixed.
- **Title** (Libre Franklin 600, 1.25rem, leading 1.3): H3, podtytuły kart i podsekcji. Zawsze Libre Franklin.
- **Body** (Libre Franklin 400, 1rem, leading 1.625): Treść opisowa. Zawsze max 65ch szerokości.
- **Label** (Libre Franklin 500, 0.75rem, letter-spacing 0.08em, uppercase): Eyebrow badges, nagłówki kolumn footera. Nigdy do zwykłego tekstu.

**The Two-Family Rule.** Tylko dwie rodziny: Zilla Slab dla display/headline, Libre Franklin dla wszystkiego poniżej. Nie mieszaj wewnątrz poziomów.

**The Weight Jump Rule.** Różnica wagi między sąsiednimi poziomami hierarchii: minimum 100 jednostek (400/600/700). Płaskie skale są zakazane.

**The 65ch Rule.** Żaden blok tekstu opisowego nie przekracza 65 znaków szerokości. Bez wyjątków.

## 4. Elevation

System jest **płaski w spoczynku**. Powierzchnie nie mają cieni w stanie domyślnym. Cień pojawia się wyłącznie jako odpowiedź na stan: scroll, hover, focus.

**The State-Response Rule.** Cień istnieje tylko wtedy, gdy element zmienił stan. Jedyny wyjątek: hero image ma ambient shadow w spoczynku, bo pełni rolę dominującego elementu wizualnego.

### Shadow Vocabulary
- **Ambient Card** (`0 30px 60px -30px rgba(30, 37, 51, 0.25)`): Hero image. Cień z Ink, nie z akcji.
- **Action Glow** (`0 14px 28px -12px rgba(74, 108, 247, 0.5)`): CTA hover. Niebieski glow sygnalizuje klikalność.
- **Nav Lift** (`0 8px 24px -12px rgba(74, 108, 247, 0.18)`): Navbar po scrollu. Subtelny, sygnalizuje przyklejenie.

## 5. Components

### Buttons

Kształt pill komunikuje akcję. Prostokąt jest zarezerwowany dla pól formularzy.

- **Shape:** Pełny pill (9999px)
- **Primary:** bg-action-blue, text-on-primary, px-6 py-3.5, font-semibold text-sm. Hover: bg-action-blue-light + action-glow + translateY(-1px).
- **Ghost:** bg-surface, border-divider, text-ink. Hover: border-action-blue, text-action-blue. Bez shadow.
- **Focus:** ring-2 ring-action-blue ring-offset-2. Widoczne na klawiaturze, niewidoczne na mysz.
- **Dotykowy minimum:** 40x40px (ikona), 48px wysokość (tekst).

### Eyebrow Badge

Kontekst nad nagłówkiem. Nieinteraktywny.

- **Style:** bg-surface, border-divider, rounded-full, px-3 py-1, label typography, text-action-blue
- **Dot:** 6x6px rounded-full bg-action-blue. Jedyna ozdoba.
- Jeden eyebrow na sekcję. Nie używaj jako tag dla treści.

### Navigation

- **Desktop link:** text-sm font-medium, ink-muted w spoczynku, ink + scale underline na hover/active. Underline: 1px action-blue, scaleX 0 to 1 origin-left, duration 300ms ease-out.
- **Navbar:** sticky top-0, bg-surface/95, backdrop-blur. Po scrollu: border-bottom + nav-lift shadow.
- **Mobile menu:** grid-rows expansion, bg-surface. Linki: rounded-lg, min touch target 48px.
- **Logo:** "Roomwork" tekst + kropka action-blue. Nie ikona.

### Footer Map Card

Interaktywna wizytówka lokalizacji.

- **Container:** rounded-2xl, ring-1 ring-on-elevated/15. Hover: ring-action-blue/60 + action-glow.
- **Mapa placeholder:** gradient tła + siatka white 6% + blur krąg action-blue/20.
- **Pin:** 48x48px rounded-full bg-action-blue. Hover: translateY(-55%) duration-300.
- Tylko w footerze. Nie duplikuj do sekcji hero ani kart.

## 6. Do's and Don'ts

### Do:
- **Do** stosuj action-blue wyłącznie dla akcji i aktywnych stanów. Jeden akcent, użyty rzadko, ma wagę.
- **Do** ogranicz tekst opisowy do max 65ch. Czytelność jest argumentem zaufania.
- **Do** buduj hierarchię przez wagę fontu (400/600/700) i skalę, nie przez kolor.
- **Do** stosuj `text-on-primary` na tle `bg-primary`. Nigdy `text-surface` ani hardcoded `text-white`.
- **Do** używaj CSS custom properties z global.css w arbitrary values Tailwind zamiast hardcoded rgb().
- **Do** uruchom `/impeccable colorize` przed wdrożeniem. Aktualna paleta nie odzwierciedla osobowości marki.
- **Do** uruchom `/impeccable typeset` przed wdrożeniem. Roboto to placeholder, nie finalna decyzja.

### Don't:
- **Don't** twórz layoutów jak Booking.com — bez widgetów rezerwacyjnych, filtrów, gwiazdek, tabelek porównawczych.
- **Don't** projektuj "korporacyjnej szarej nudy" — zero stock photos z uściskami dłoni, zero "Witamy w naszym obiekcie".
- **Don't** używaj action-blue jako tła sekcji. To nie landing page SaaS z niebieskim pricingiem.
- **Don't** stosuj gradient-text (`background-clip: text`). Zakaz bezwyjątkowy.
- **Don't** hardcoduj `rgb(74_108_247/...)` w arbitrary values Tailwind. Definiuj token, używaj zmiennej.
- **Don't** stosuj glassmorphism na kartach treści. Dekoracyjny blur na kółkach jest akceptowalny; backdrop-filter na kartach — nie.
- **Don't** pomijaj `aria-hidden="true"` na dekoracyjnych elementach SVG i div.
- **Don't** używaj `border-left > 1px` jako kolorowego akcentu na kartach lub listach.
