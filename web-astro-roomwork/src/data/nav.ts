export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const navLinks: readonly NavLink[] = [
  { label: 'O nas', href: '/o-nas' },
  { label: 'Kwatery', href: '/kwatery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;
