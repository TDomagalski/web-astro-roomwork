// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://roomwork.pl',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    responsiveStyles: true,
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
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
