import { useState, useEffect, useCallback, useRef } from 'react';
import type { ImageMetadata } from 'astro';

interface ImageModule {
  default: ImageMetadata;
}

const allImages = import.meta.glob<ImageModule>('../../assets/kwatery-pracownicze/**/*.webp', {
  eager: true,
});

function getImageMeta(path: string): ImageMetadata | undefined {
  const key = `../../assets/${path}`;
  return allImages[key]?.default;
}

function bedsLabel(n: number): string {
  if (n === 1) return '1 łóżko';
  if (n <= 4) return `${n} łóżka`;
  return `${n} łóżek`;
}

interface Room {
  id: string;
  name: string;
  floor: 'Parter' | 'Piętro';
  persons: number[];
  beds: number;
  images: string[];
  description: string;
}

const ROOMS: Room[] = [
  {
    id: 'parter-1',
    name: 'Kwatera 1',
    floor: 'Parter',
    persons: [3, 4],
    beds: 2,
    images: [
      'kwatery-pracownicze/parter/kwatera1/kwatera-parter1_img1.webp',
      'kwatery-pracownicze/parter/kwatera1/kwatera-parter1_img2.webp',
      'kwatery-pracownicze/parter/kwatera1/kwatera-parter1_img3.webp',
    ],
    description:
      'Komfortowy pokój z dwoma łóżkami, prywatną łazienką i dostępem do wspólnej kuchni. Idealny dla ekipy 3–4 osobowej.',
  },
  {
    id: 'parter-2',
    name: 'Kwatera 2',
    floor: 'Parter',
    persons: [3, 4],
    beds: 2,
    images: [
      'kwatery-pracownicze/parter/kwatera2/kwatera-parter2_img1.webp',
      'kwatery-pracownicze/parter/kwatera2/kwatera-parter2_img2.webp',
      'kwatery-pracownicze/parter/kwatera2/kwatera-parter2_img3.webp',
    ],
    description:
      'Przestronny pokój na parterze z dwoma łóżkami i prywatną łazienką. Pełne wyposażenie, parking bezpłatny.',
  },
  {
    id: 'parter-3',
    name: 'Kwatera 3',
    floor: 'Parter',
    persons: [3, 4],
    beds: 2,
    images: [
      'kwatery-pracownicze/parter/kwatera3/kwatera-parter3_img1.webp',
      'kwatery-pracownicze/parter/kwatera3/kwatera-parter3_img2.webp',
      'kwatery-pracownicze/parter/kwatera3/kwatera-parter3_img3.webp',
    ],
    description:
      'Dobrze wyposażony pokój z dwoma łóżkami i prywatnym węzłem sanitarnym. Dostęp do kuchni i szybkiego Wi-Fi.',
  },
  {
    id: 'parter-4',
    name: 'Kwatera 4',
    floor: 'Parter',
    persons: [3, 4],
    beds: 2,
    images: [
      'kwatery-pracownicze/parter/kwatera4/kwatera-parter4_img1.webp',
      'kwatery-pracownicze/parter/kwatera4/kwatera-parter4_img2.webp',
      'kwatery-pracownicze/parter/kwatera4/kwatera-parter4_img3.webp',
    ],
    description:
      'Pokój z dwoma łóżkami, prywatną łazienką i miejscem na bagaż. Spokojna lokalizacja, idealna po długim dniu pracy.',
  },
  {
    id: 'parter-5',
    name: 'Kwatera 5',
    floor: 'Parter',
    persons: [3, 4],
    beds: 2,
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
    beds: 4,
    images: [
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img1.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img2.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img3.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img4.webp',
      'kwatery-pracownicze/parter/kwatera6/kwatera_parter6_img5.webp',
    ],
    description:
      'Największa kwatera w obiekcie — cztery łóżka i prywatna łazienka. Idealna dla 6-osobowych ekip pracowniczych.',
  },
  {
    id: 'pietro-1',
    name: 'Kwatera 1',
    floor: 'Piętro',
    persons: [3, 4],
    beds: 2,
    images: [
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img1.webp',
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img2.webp',
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img3.webp',
      'kwatery-pracownicze/pietro/kwatera1/kwatera-pietro1_img4.webp',
    ],
    description:
      'Jasny pokój na piętrze z dwoma łóżkami i prywatną łazienką. Pełne wyposażenie, dostęp do wspólnej kuchni.',
  },
  {
    id: 'pietro-2',
    name: 'Kwatera 2',
    floor: 'Piętro',
    persons: [2, 3],
    beds: 2,
    images: [
      'kwatery-pracownicze/pietro/kwatera2/kwatera-pietro2_img1.webp',
      'kwatery-pracownicze/pietro/kwatera2/kwatera-pietro2_img2.webp',
      'kwatery-pracownicze/pietro/kwatera2/kwatera-pietro2_img3.webp',
    ],
    description:
      'Kameralny pokój na piętrze dla 2–3 osób. Dwa łóżka, prywatna łazienka i spokojne otoczenie po pracy.',
  },
  {
    id: 'pietro-3',
    name: 'Kwatera 3',
    floor: 'Piętro',
    persons: [2, 3],
    beds: 2,
    images: [
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img1.webp',
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img2.webp',
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img3.webp',
      'kwatery-pracownicze/pietro/kwatera3/kwatera-pietro3_img4.webp',
    ],
    description:
      'Wygodny pokój na piętrze z dwoma łóżkami i prywatną łazienką. Dobry dla 2–3 osobowych zespołów.',
  },
  {
    id: 'pietro-4',
    name: 'Kwatera 4',
    floor: 'Piętro',
    persons: [2],
    beds: 1,
    images: [
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img1.webp',
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img2.webp',
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img3.webp',
      'kwatery-pracownicze/pietro/kwatera4/kwatera-pietro4_img4.webp',
    ],
    description:
      'Dwuosobowy pokój na piętrze z wygodnym łóżkiem i prywatną łazienką. Komfortowe miejsce do odpoczynku.',
  },
  {
    id: 'pietro-5',
    name: 'Kwatera 5',
    floor: 'Piętro',
    persons: [2],
    beds: 1,
    images: ['kwatery-pracownicze/pietro/kwatera5/kwatera-pietro5_img1.webp'],
    description:
      'Przytulny pokój dwuosobowy na piętrze z prywatną łazienką. Spokój i komfort dla 2-osobowego zespołu.',
  },
];

type FilterValue = null | 2 | 3 | 4 | 6;

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'Wszystkie', value: null },
  { label: '2 osoby', value: 2 },
  { label: '3 osoby', value: 3 },
  { label: '4 osoby', value: 4 },
  { label: '6 osób', value: 6 },
];

interface LightboxState {
  roomId: string;
  index: number;
}

function IconPersons() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBed() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}

function IconBath() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M4 12h16M4 6h16M4 18h7" />
      <path d="M15 18a3 3 0 0 0 6 0v-3h-6v3z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface CardState {
  idx: number;
  prevIdx: number | null;
  animKey: number;
  dir: 1 | -1;
}

export default function KwaterySection() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>(null);
  const [displayFilter, setDisplayFilter] = useState<FilterValue>(null);
  const [filterFading, setFilterFading] = useState(false);
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [lightboxFading, setLightboxFading] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const filteredRooms =
    displayFilter === null ? ROOMS : ROOMS.filter((room) => room.persons.includes(displayFilter));

  const handleFilterChange = (value: FilterValue) => {
    if (value === activeFilter) return;
    setActiveFilter(value);
    setFilterFading(true);
    setTimeout(() => {
      setDisplayFilter(value);
      setFilterFading(false);
    }, 220);
  };

  const openLightbox = (roomId: string, index: number) => {
    setLightbox({ roomId, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = '';
  }, []);

  const lightboxRoom = lightbox ? ROOMS.find((r) => r.id === lightbox.roomId) : null;

  const navigateLightbox = useCallback(
    (dir: 1 | -1) => {
      if (!lightbox || !lightboxRoom) return;
      setLightboxFading(true);
      setTimeout(() => {
        const total = lightboxRoom.images.length;
        setLightbox((prev) =>
          prev ? { ...prev, index: (prev.index + dir + total) % total } : null
        );
        setLightboxFading(false);
      }, 180);
    },
    [lightbox, lightboxRoom]
  );

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, navigateLightbox]);

  const getCardState = (roomId: string): CardState =>
    cardStates[roomId] ?? { idx: 0, prevIdx: null, animKey: 0, dir: 1 };

  const updateCard = (roomId: string, targetIdx: number, dir: 1 | -1) => {
    setCardStates((prev) => {
      const current = prev[roomId] ?? { idx: 0, prevIdx: null, animKey: 0, dir: 1 };
      return {
        ...prev,
        [roomId]: { idx: targetIdx, prevIdx: current.idx, animKey: current.animKey + 1, dir },
      };
    });
    setTimeout(() => {
      setCardStates((prev) => {
        const s = prev[roomId];
        if (!s) return prev;
        return { ...prev, [roomId]: { ...s, prevIdx: null } };
      });
    }, 350);
  };

  const navigateCard = (e: React.MouseEvent, roomId: string, dir: 1 | -1, total: number) => {
    e.stopPropagation();
    const current = getCardState(roomId);
    updateCard(roomId, (current.idx + dir + total) % total, dir);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <>
    <style>{`
      @keyframes slideOutLeft {
        from { transform: translateX(0%); }
        to   { transform: translateX(-100%); }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0%); }
        to   { transform: translateX(100%); }
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); }
        to   { transform: translateX(0%); }
      }
      @keyframes slideInLeft {
        from { transform: translateX(-100%); }
        to   { transform: translateX(0%); }
      }
    `}</style>
    <section className="bg-background py-16 lg:py-24" aria-label="Lista kwater">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="border-border bg-surface text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase">
            <span className="bg-primary h-1.5 w-1.5 rounded-full" aria-hidden="true" />
            11 pokoi · Parter i piętro
          </span>
          <h2 className="font-heading text-text mt-4 text-3xl font-bold lg:text-4xl">
            Wybierz kwaterę dla swojej ekipy
          </h2>
          <p className="text-text-muted mt-2 max-w-2xl text-base leading-relaxed">
            Wszystkie pokoje z prywatną łazienką, dostępem do kuchni, bezpłatnym parkingiem i Wi-Fi.
          </p>
        </div>

        {/* Filters */}
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtruj po liczbie osób"
        >
          {FILTERS.map((filter) => (
            <button
              key={String(filter.value)}
              onClick={() => handleFilterChange(filter.value)}
              className={[
                'cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200',
                activeFilter === filter.value
                  ? 'bg-primary text-on-primary border-transparent shadow-sm'
                  : 'bg-surface border-border text-text hover:border-primary hover:text-primary',
              ].join(' ')}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-200 ${filterFading ? 'opacity-0' : 'opacity-100'}`}>
          {filteredRooms.map((room) => {
            const cardState = getCardState(room.id);
            const { idx, prevIdx, animKey, dir } = cardState;
            const imageMeta = getImageMeta(room.images[idx] ?? '');
            const prevImageMeta = prevIdx !== null ? getImageMeta(room.images[prevIdx] ?? '') : null;
            const maxPersons = Math.max(...room.persons);

            return (
              <article
                key={room.id}
                className="bg-surface border-border group flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image carousel */}
                <div
                  className="relative aspect-4/3 cursor-zoom-in overflow-hidden"
                  onClick={() => openLightbox(room.id, idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Otwórz galerię — ${room.name} ${room.floor}`}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(room.id, idx)}
                >
                  {/* Wyjeżdżające zdjęcie */}
                  {prevImageMeta && (
                    <img
                      key={`out-${room.id}-${animKey}`}
                      src={prevImageMeta.src}
                      alt=""
                      aria-hidden="true"
                      width={prevImageMeta.width}
                      height={prevImageMeta.height}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      style={{ animation: `slideOut${dir > 0 ? 'Left' : 'Right'} 320ms ease-in-out forwards` }}
                    />
                  )}
                  {/* Wjeżdżające zdjęcie */}
                  <img
                    key={`in-${room.id}-${animKey}`}
                    src={imageMeta?.src}
                    alt={`${room.name} — ${room.floor}`}
                    width={imageMeta?.width}
                    height={imageMeta?.height}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    style={animKey > 0 ? { animation: `slideIn${dir > 0 ? 'Right' : 'Left'} 320ms ease-in-out` } : undefined}
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Floor badge */}
                  <span className="bg-surface/85 text-text absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                    {room.floor}
                  </span>

                  {/* Expand icon */}
                  <span
                    className="absolute top-3 right-3 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>

                  {/* Prev / Next */}
                  {room.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => navigateCard(e, room.id, -1, room.images.length)}
                        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/65"
                        aria-label="Poprzednie zdjęcie"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={(e) => navigateCard(e, room.id, 1, room.images.length)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/65"
                        aria-label="Następne zdjęcie"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  )}

                  {/* Dot indicators */}
                  {room.images.length > 1 && (
                    <div
                      className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5"
                      aria-hidden="true"
                    >
                      {room.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCard(room.id, i, i > idx ? 1 : -1);
                          }}
                          className={[
                            'rounded-full transition-all duration-200',
                            i === idx
                              ? 'h-1.5 w-4 bg-white'
                              : 'h-1.5 w-1.5 bg-white/50 hover:bg-white/80',
                          ].join(' ')}
                          aria-label={`Zdjęcie ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-text font-heading text-lg leading-snug font-bold">
                    {room.name} — {room.floor}
                  </h3>

                  {/* Specs */}
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label="Dane kwatery">
                    <li className="text-text-muted flex items-center gap-1.5 text-sm">
                      <IconPersons />
                      do {maxPersons} {maxPersons === 1 ? 'osoby' : 'osób'}
                    </li>
                    <li className="text-text-muted flex items-center gap-1.5 text-sm">
                      <IconBed />
                      {bedsLabel(room.beds)}
                    </li>
                    <li className="text-text-muted flex items-center gap-1.5 text-sm">
                      <IconBath />
                      Łazienka prywatna
                    </li>
                  </ul>

                  <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">
                    {room.description}
                  </p>

                  <a
                    href={`/kwatery/${room.id}`}
                    className="bg-primary text-on-primary hover:bg-secondary mt-4 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
                  >
                    Zobacz szczegóły
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredRooms.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-text-muted text-base">Brak kwater spełniających wybrane kryteria.</p>
            <button
              onClick={() => handleFilterChange(null)}
              className="text-primary mt-3 text-sm font-semibold underline-offset-2 hover:underline"
            >
              Pokaż wszystkie
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && lightboxRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria — ${lightboxRoom.name} ${lightboxRoom.floor}`}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Zamknij galerię"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            {lightbox.index + 1} / {lightboxRoom.images.length}
          </div>

          {/* Image */}
          <div
            className="relative flex max-h-screen w-full max-w-5xl items-center justify-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageMeta(lightboxRoom.images[lightbox.index] ?? '')?.src}
              alt={`${lightboxRoom.name} — ${lightboxRoom.floor}, zdjęcie ${lightbox.index + 1}`}
              className={`max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl transition-opacity duration-150 ${lightboxFading ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Nav arrows */}
            {lightboxRoom.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(-1);
                  }}
                  className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
                  aria-label="Poprzednie zdjęcie"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(1);
                  }}
                  className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
                  aria-label="Następne zdjęcie"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Room name */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm font-semibold text-white">
              {lightboxRoom.name} — {lightboxRoom.floor}
            </p>
          </div>
        </div>
      )}
    </section>
    </>
  );
}
