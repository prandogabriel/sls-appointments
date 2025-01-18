export const daysAhead = (date: Date, days: number): Date => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export const daysAgo = (date: Date, days: number): Date => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - days);
  return copy;
};
