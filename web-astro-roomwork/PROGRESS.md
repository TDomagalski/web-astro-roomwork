# PROGRESS — web-astro-roomwork

> Ten plik jest aktualizowany przez asystenta AI na końcu każdej sesji roboczej.
> Służy jako briefing na start kolejnej sesji — czytaj go przed rozpoczęciem pracy.

---

## Stan projektu: W BUDOWIE

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
