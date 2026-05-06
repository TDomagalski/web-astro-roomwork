export const siteConfig = {
  name: 'Roomwork',
  url: 'https://roomwork.pl',
  description: 'Roomwork — opis strony (uzupełnij)',
  themeColor: '#4A6CF7',
  defaultOgImage: '/og-default.jpg',
  phone: '690328659',
  email: 'kwatery@roomwork.pl',
  address: {
    street: 'ul. Krakowska 62d',
    city: 'Słomniki',
    zip: '32-090',
    country: 'PL',
  },
  geo: {
    lat: 0,
    lng: 0,
  },
  priceRange: '$$',
  openingHours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '08:00', closes: '18:00' },
    { days: ['Sa'], opens: '09:00', closes: '14:00' },
  ],
  social: {
    facebook: '',
    instagram: '',
  },
} as const;
