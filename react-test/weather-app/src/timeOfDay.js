export const TIME_OF_DAY = ['morning', 'daytime', 'evening', 'night'];

export function timeOfDayFromDate(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'daytime';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}
