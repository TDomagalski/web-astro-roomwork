import { useState, useEffect, useCallback, useRef } from 'react';
import type { ImageMetadata } from 'astro';
import type { Room } from '../../data/rooms';
import { ROOMS, bedsLabel } from '../../data/rooms';

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

type FilterValue = null | 2 | 3 | 4 | 6 | 'Parter' | 'Piętro';

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'Wszystkie', value: null },
  { label: '2 osoby', value: 2 },
  { label: '3 osoby', value: 3 },
  { label: '4 osoby', value: 4 },
  { label: '6 osób', value: 6 },
  { label: 'Parter', value: 'Parter' },
  { label: 'Piętro', value: 'Piętro' },
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
      fill="currentColor"
      className="text-primary h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5.00611L3.00018 4.99962C3.01218 4.63969 3.10892 4.26822 3.26943 3.94721C3.39761 3.69084 3.57419 3.46489 3.82033 3.3008C4.06021 3.14088 4.42499 3 5 3C5.57502 3 5.9398 3.14088 6.17967 3.3008C6.48866 3.50679 6.69219 3.8208 6.81777 4.14477C6.22162 4.30128 5.72626 4.57709 5.32555 4.93481C4.70429 5.48942 4.3823 6.17607 4.21313 6.72163C4.02059 7.34253 4.19257 7.9476 4.56764 8.37037C4.92761 8.77611 5.45463 9 6 9H10C10.5454 9 11.0724 8.77611 11.4324 8.37037C11.8074 7.9476 11.9794 7.34253 11.7869 6.72163C11.6177 6.17607 11.2957 5.48942 10.6745 4.93481C10.2084 4.51876 9.61431 4.2135 8.88252 4.07789C8.81351 3.77563 8.70182 3.41757 8.51943 3.05279C8.27261 2.55916 7.88669 2.03511 7.28908 1.6367C6.68521 1.23412 5.92499 1 5 1C4.07502 1 3.3148 1.23412 2.71092 1.6367C2.11331 2.03511 1.72739 2.55916 1.48057 3.05279C1.23572 3.5425 1.11827 4.02011 1.06048 4.36685C1.02595 4.57403 1.00127 4.78516 1.00001 4.99552L1 13C1.00011 13.0906 1.00205 13.1801 1.00864 13.3416C1.01708 13.5482 1.0338 13.8399 1.067 14.1886C1.13297 14.8812 1.26604 15.8212 1.53848 16.7747C1.80759 17.7166 2.23337 18.7464 2.92824 19.557C3.64853 20.3974 4.66199 21 6 21L6 22C6 22.5523 6.44772 23 7 23C7.55229 23 8 22.5523 8 22V21H16V22C16 22.5523 16.4477 23 17 23C17.5523 23 18 22.5523 18 22L18 21C20.0879 21 21.3006 19.566 21.9601 18.1431C22.6171 16.7257 22.8534 15.0872 22.9426 14.0842C23.048 12.8984 22.0873 12 21 12H3V5.00611ZM3.0581 14C3.11716 14.6197 3.23408 15.4292 3.46152 16.2253C3.69241 17.0334 4.01663 17.7536 4.44676 18.2555C4.85147 18.7276 5.33801 19 6 19H18C18.9628 19 19.6375 18.3981 20.1456 17.302C20.6394 16.2366 20.8536 14.926 20.9419 14H3.0581ZM9.34254 6.42679C9.52126 6.58633 9.65602 6.78564 9.75612 7H6.24388C6.34398 6.78564 6.47874 6.58633 6.65746 6.42679C6.90165 6.2088 7.29876 6 8 6C8.70124 6 9.09836 6.2088 9.34254 6.42679Z"
      />
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
  const [lbPrevSrc, setLbPrevSrc] = useState<string | null>(null);
  const [lbLoaded, setLbLoaded] = useState(true);
  const [lbKey, setLbKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const filteredRooms =
    displayFilter === null
      ? ROOMS
      : displayFilter === 'Parter' || displayFilter === 'Piętro'
        ? ROOMS.filter((room) => room.floor === displayFilter)
        : ROOMS.filter((room) => room.persons.includes(displayFilter));

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
    setLbPrevSrc(null);
    setLbLoaded(true);
    setLbKey(0);
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
      const total = lightboxRoom.images.length;
      const nextIdx = (lightbox.index + dir + total) % total;
      const currentSrc = getImageMeta(lightboxRoom.images[lightbox.index] ?? '')?.src ?? null;
      setLbPrevSrc(currentSrc);
      setLbLoaded(false);
      setLbKey((k) => k + 1);
      setLightbox((prev) => prev ? { ...prev, index: nextIdx } : null);
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
              Wszystkie pokoje z prywatną łazienką, dostępem do kuchni, bezpłatnym parkingiem i
              Wi-Fi.
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
          <div
            className={`grid gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 ${filterFading ? 'opacity-0' : 'opacity-100'}`}
          >
            {filteredRooms.map((room) => {
              const cardState = getCardState(room.id);
              const { idx, prevIdx, animKey, dir } = cardState;
              const imageMeta = getImageMeta(room.images[idx] ?? '');
              const prevImageMeta =
                prevIdx !== null ? getImageMeta(room.images[prevIdx] ?? '') : null;
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
                        style={{
                          animation: `slideOut${dir > 0 ? 'Left' : 'Right'} 320ms ease-in-out forwards`,
                        }}
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
                      style={
                        animKey > 0
                          ? { animation: `slideIn${dir > 0 ? 'Right' : 'Left'} 320ms ease-in-out` }
                          : undefined
                      }
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
                      className="bg-primary text-on-primary hover:bg-secondary mt-4 inline-flex w-fit items-center gap-2 self-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
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
              <p className="text-text-muted text-base">
                Brak kwater spełniających wybrane kryteria.
              </p>
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
              className="relative px-16"
              style={{ width: 'min(90vw, 1024px)', height: 'min(85vh, 720px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Poprzednie zdjęcie — widoczne podczas ładowania nowego */}
              {lbPrevSrc && (
                <img
                  src={lbPrevSrc}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 m-auto max-h-full max-w-full rounded-xl object-contain transition-opacity duration-300 ${lbLoaded ? 'opacity-0' : 'opacity-100'}`}
                />
              )}
              {/* Nowe zdjęcie — wypływa gdy załadowane */}
              <img
                key={lbKey}
                src={getImageMeta(lightboxRoom.images[lightbox.index] ?? '')?.src}
                alt={`${lightboxRoom.name} — ${lightboxRoom.floor}, zdjęcie ${lightbox.index + 1}`}
                className={`absolute inset-0 m-auto max-h-full max-w-full rounded-xl object-contain shadow-2xl transition-opacity duration-300 ${lbLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => {
                  setLbLoaded(true);
                  setTimeout(() => setLbPrevSrc(null), 310);
                }}
              />

              {/* Nav arrows */}
              {lightboxRoom.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox(-1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
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
