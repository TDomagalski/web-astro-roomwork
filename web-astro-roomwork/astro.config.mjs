// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://roomwork.pl',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Zilla Slab',
      cssVariable: '--font-zilla',
      weights: [400, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.google(),
      name: 'Libre Franklin',
      cssVariable: '--font-franklin',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    responsiveStyles: true,
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_MAPS_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/blog') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
