export const siteConfig = {
  name: 'RoomWork',
  url: 'https://roomwork.pl',
  description:
    'Kwatery pracownicze w Słomnikach k. Krakowa. 10 pokoi, 40 miejsc, własne łazienki, parking, WiFi, faktura VAT. Noclegi dla firm i ekip budowlanych.',
  longDescription: `RoomWork to kwatery pracownicze w Słomnikach (ul. Krakowska 62d, 32-090), stworzone z myślą o firmach, ekipach budowlanych i grupach pracowników szukających solidnego zakwaterowania w okolicach Krakowa. Dysponujemy 10 w pełni wyposażonymi pokojami z własnymi łazienkami, które pomieszczą łącznie do 40 gości.

Każdy pokój ma prywatną łazienkę, co zapewnia wygodę niezależnie od wielkości ekipy. Do dyspozycji wszystkich gości: ogólnodostępna kuchnia z pełnym wyposażeniem, pralnia, bezpłatny parking na terenie obiektu, szybkie WiFi oraz telewizja w pokojach. Wystawiamy faktury VAT — niezbędne dla firm i działów HR rozliczających noclegi pracownicze.

Przyjmujemy ekipy budowlane i remontowe, pracowników delegowanych, pracowników sezonowych, większe grupy korporacyjne, a także osoby indywidualne niezwiązane z branżą budowlaną. Długoterminowe pobyty, elastyczne warunki i bezpośredni kontakt z właścicielem to nasza codzienność.

Obiekt usytuowany jest przy trasie S7 (Kraków–Kielce), co zapewnia ekspresowy dojazd do placów budowy i zakładów pracy w całej Małopolsce. Obsługujemy pracowników i ekipy realizujące zlecenia w Krakowie, Miechowie, Proszowicach oraz w pobliskich miejscowościach: Niedźwiedź, Januszowice, Zagaje Smrokowskie, Waganowice, Prandocin, Smroków, Wężerów, Obrażejowice, Czechy, Przestańsko, Iwanowice, Iwanowice Włościańskie, Iwanowice Dworskie, Grzegorzowice Wielkie, Goszcza.

Szukasz noclegów pracowniczych w Słomnikach, kwater dla ekipy budowlanej pod Krakowem lub tanich noclegów dla pracowników w Małopolsce? Zadzwoń — dobierzemy pokoje do potrzeb Twojej firmy.`,
  themeColor: '#267A55',
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
    lat: 50.232747103014376,
    lng: 20.064644777119188,
  },
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2552.1690261415365!2d20.064644777119188!3d50.232747103014376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165313b56b455b%3A0xbee57c823b9b8a2d!2sRoomWork%20-%20Kwatery%20pracownicze%20do%20wynaj%C4%99cia!5e0!3m2!1spl!2spl!4v1778153567594!5m2!1spl!2spl',
  priceRange: '$$',
  openingHours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '08:00', closes: '18:00' },
    { days: ['Sa'], opens: '09:00', closes: '14:00' },
  ],
  social: {
    google: 'https://share.google/rIU4zXULjjQxglwjQ',
    facebook: '',
    instagram: '',
  },
} as const;
