# RoomWork — Strona Wizytówkowa

Strona internetowa dla **RoomWork** — hostelu i kwater pracowniczych w Słomnikach.

**URL produkcyjny:** [www.roomwork.pl](https://www.roomwork.pl)

---

## Stack

| Obszar | Technologia |
|--------|-------------|
| Framework | Astro 5.x (`output: 'static'`) |
| Styling | Tailwind CSS v4 |
| UI / Islands | React |
| Język | TypeScript (strict) |
| SEO | @astrojs/sitemap, astro-seo, JSON-LD |
| Hosting DEV | Vercel (preview) |
| Hosting PROD | SeoHost — static FTP deploy |

> ⚠️ Projekt działa wyłącznie w trybie **static**. Server Islands i SSR są niedostępne na SeoHost. Całą dynamikę realizuj przez Client Islands (`client:visible` / `client:idle`) lub zewnętrzne API po stronie klienta.

---

## Wymagania

- Node.js >= 18.x
- npm >= 9.x

---

## Instalacja i uruchomienie

```bash
# Instalacja zależności
npm install

# Serwer deweloperski
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu lokalnie
npm run preview
```

---

## Środowiska

### DEV — Vercel

Każdy push na branch `dev` deployuje się automatycznie na Vercel jako preview URL.

```bash
# Deploy ręczny (opcjonalnie)
npx vercel
```

Zmienne środowiskowe ustawiaj w panelu Vercel → Settings → Environment Variables.

### PROD — SeoHost

Hosting statyczny — deploy przez **FTP** lub panel **cPanel File Manager**.

```bash
# 1. Zbuduj projekt
npm run build

# 2. Zawartość folderu dist/ wgraj na serwer do katalogu public_html/
```

> Folder `dist/` zawiera gotowe pliki HTML/CSS/JS — wgrywasz jego **zawartość**, nie sam folder.

Zmienne środowiskowe z prefixem `PUBLIC_` wpisz bezpośrednio do pliku `.env.production` przed buildem. Nie commituj tego pliku do repozytorium.

---

## Struktura projektu

```
src/
├── assets/          # obrazy, SVG (przetwarzane przez Astro Image)
├── components/
│   ├── ui/          # Button, Card, Badge…
│   ├── sections/    # Hero, Rooms, Contact…
│   └── islands/     # komponenty React z client:*
├── content/         # Content Collections (pokoje, usługi)
├── data/            # siteConfig.ts, nav, socials
├── fonts/           # lokalne pliki .woff2
├── layouts/         # BaseLayout.astro
├── pages/           # routing
└── styles/          # globals.css
```

---

## Zmienne środowiskowe

Skopiuj `.env.example` → `.env.local` i uzupełnij wartości:

```bash
cp .env.example .env.local
```

Plik `.env.example` zawiera listę wymaganych kluczy bez wartości. Nigdy nie commituj `.env.local` ani `.env.production`.

---

## Branche

| Branch | Cel |
|--------|-----|
| `main` | kod produkcyjny — deploy ręczny na SeoHost |
| `dev` | branch roboczy — auto-deploy na Vercel preview |

---

## Wymagania SEO / techniczne

- Lighthouse score: **95+** (Performance, SEO, Accessibility)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Każda strona zawiera meta title, description, canonical i JSON-LD (`LocalBusiness`)
- Sitemap generowany automatycznie przez `@astrojs/sitemap`
- `robots.txt` generowany przez konfigurację Astro

---

## Kontakt z projektem

Projekt tworzony i utrzymywany przez **[TODO: nazwa agencji]**.
W sprawach technicznych: **[TODO: email techniczny]**
