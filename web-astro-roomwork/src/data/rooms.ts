export interface Room {
  id: string;
  name: string;
  floor: 'Parter' | 'Piętro';
  persons: number[];
  beds: number;
  images: string[];
  description: string;
}

export function bedsLabel(n: number): string {
  if (n === 1) return '1 łóżko';
  if (n <= 4) return `${n} łóżka`;
  return `${n} łóżek`;
}

export const ROOMS: Room[] = [
  {
    id: 'parter-1',
    name: 'Kwatera 1',
    floor: 'Parter',
    persons: [3, 4],
    beds: 4,
    images: [
      'kwatery-pracownicze/parter/kwatera1/kwatera-parter1_img1.webp',
      'kwatery-pracownicze/parter/kwatera1/kwatera-parter1_img2.webp',
      'kwatery-pracownicze/parter/kwatera1/kwatera-parter1_img3.webp',
    ],
    description:
      'Komfortowy pokój z czterema łóżkami, prywatną łazienką i dostępem do wspólnej kuchni. Idealny dla ekipy 3–4 osobowej.',
  },
  {
    id: 'parter-2',
    name: 'Kwatera 2',
    floor: 'Parter',
    persons: [3, 4],
    beds: 4,
    images: [
      'kwatery-pracownicze/parter/kwatera2/kwatera-parter2_img1.webp',
      'kwatery-pracownicze/parter/kwatera2/kwatera-parter2_img2.webp',
      'kwatery-pracownicze/parter/kwatera2/kwatera-parter2_img3.webp',
    ],
    description:
      'Przestronny pokój na parterze z czterema łóżkami i prywatną łazienką. Pełne wyposażenie, parking bezpłatny.',
  },
  {
    id: 'parter-3',
    name: 'Kwatera 3',
    floor: 'Parter',
    persons: [3, 4],
    beds: 4,
    images: [
      'kwatery-pracownicze/parter/kwatera3/kwatera-parter3_img1.webp',
      'kwatery-pracownicze/parter/kwatera3/kwatera-parter3_img2.webp',
      'kwatery-pracownicze/parter/kwatera3/kwatera-parter3_img3.webp',
    ],
    description:
      'Dobrze wyposażony pokój z czterema łóżkami i prywatnym węzłem sanitarnym. Dostęp do kuchni i szybkiego Wi-Fi.',
  },
  {
    id: 'parter-4',
    name: 'Kwatera 4',
    floor: 'Parter',
    persons: [3, 4],
    beds: 4,
    images: [
      'kwatery-pracownicze/parter/kwatera4/kwatera-parter4_img1.webp',
      'kwatery-pracownicze/parter/kwatera4/kwatera-parter4_img2.webp',
      'kwatery-pracownicze/parter/kwatera4/kwatera-parter4_img3.webp',
    ],
    description:
      'Pokój z czterema łóżkami, prywatną łazienką i miejscem na bagaż. Spokojna lokalizacja, idealna po długim dniu pracy.',
  },
  {
    id: 'parter-5',
    name: 'Kwatera 5',
    floor: 'Parter',
    persons: [3, 4],
    beds: 4,
    images: [
      'kwatery-pracownicze/parter/kwatera5/kwatera-parter5_img1.webp',
      'kwatery-pracownicze/parter/kwatera5/kwatera-parter5_img2.webp',
      'kwatery-pracownicze/parter/kwatera5/kwatera-parter5_img3.webp',
    ],
    description:
      'Funkcjonalny pokój z pełnym wyposażeniem dla 3–4 osób. Prywatna łazienka, szafy i szybkie łącze Wi-Fi.',
  },
  {
    id: 'parter-6',
    name: 'Kwatera 6',
    floor: 'Parter',
    persons: [6],
    beds: 6,
    images: [
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img1.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img2.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img3.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img4.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img5.webp',
    ],
    description:
      'Największa kwatera w obiekcie: sześć łóżek i prywatna łazienka. Idealna dla 6-osobowych ekip pracowniczych.',
  },
  {
    id: 'pietro-1',
    name: 'Pokój 1',
    floor: 'Piętro',
    persons: [3, 4],
    beds: 4,
    images: [
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img1.webp',
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img2.webp',
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img3.webp',
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img4.webp',
    ],
    description:
      'Jasny pokój na piętrze z czterema łóżkami i prywatną łazienką. Pełne wyposażenie i dostęp do wspólnej kuchni. Dobry wybór dla ekipy 3–4 osobowej.',
  },
  {
    id: 'pietro-2',
    name: 'Pokój 2',
    floor: 'Piętro',
    persons: [2, 3],
    beds: 3,
    images: [
      'kwatery-pracownicze/pietro/kwatera2/kwatera-pietro2_img1.webp',
      'kwatery-pracownicze/pietro/kwatera2/kwatera-pietro2_img2.webp',
      'kwatery-pracownicze/pietro/kwatera2/kwatera-pietro2_img3.webp',
    ],
    description:
      'Kameralny pokój na piętrze z trzema łóżkami i prywatną łazienką. Dla 2–3 osobowych ekip szukających spokojnego miejsca po pracy.',
  },
  {
    id: 'pietro-3',
    name: 'Pokój 3',
    floor: 'Piętro',
    persons: [2, 3],
    beds: 3,
    images: [
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img1.webp',
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img2.webp',
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img3.webp',
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img4.webp',
    ],
    description:
      'Wygodny pokój na piętrze z trzema łóżkami i prywatną łazienką. Praktyczne zakwaterowanie dla 2–3 osobowych zespołów pracowniczych.',
  },
  {
    id: 'pietro-4',
    name: 'Pokój 4',
    floor: 'Piętro',
    persons: [2],
    beds: 2,
    images: [
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img1.webp',
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img2.webp',
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img3.webp',
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img4.webp',
    ],
    description:
      'Dwuosobowy pokój na piętrze z dwoma łóżkami i prywatną łazienką. Komfortowe zakwaterowanie dla pary pracowników.',
  },
  {
    id: 'pietro-5',
    name: 'Pokój 5',
    floor: 'Piętro',
    persons: [2],
    beds: 2,
    images: [
      'kwatery-pracownicze/pietro/kwatera5/kwatera-pietro5_img1.webp',
      'kwatery-pracownicze/pietro/kwatera5/kwatera_pietro5_img2.webp',
      'kwatery-pracownicze/pietro/kwatera5/kwatera_pietro5_img3.webp',
    ],
    description:
      'Przytulny pokój dwuosobowy na piętrze z prywatną łazienką. Spokój i komfort dla 2-osobowej ekipy po długim dniu pracy.',
  },
];
