export const dayMap: Record<string, string> = {
  Mo: 'Pn',
  Tu: 'Wt',
  We: 'Śr',
  Th: 'Cz',
  Fr: 'Pt',
  Sa: 'So',
  Su: 'Nd',
};

export const formatDays = (days: readonly string[]): string => {
  if (days.length === 1) return dayMap[days[0]] ?? days[0];
  const first = dayMap[days[0]] ?? days[0];
  const last = dayMap[days[days.length - 1]] ?? days[days.length - 1];
  return `${first}–${last}`;
};
