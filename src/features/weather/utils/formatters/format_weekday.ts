export function formatWeekday(
  date: string,
) {
  const [year, month, day] =
    date.split('-').map(Number);

  const targetDate = new Date(
    year,
    month - 1,
    day,
  );

  const today = new Date();

  const isToday =
    today.toDateString() ===
    targetDate.toDateString();

  if (isToday) {
    return 'Hoje';
  }

  const weekday =
    new Intl.DateTimeFormat(
      'pt-BR',
      {
        weekday: 'short',
      },
    )
      .format(targetDate)
      .replace('.', '');

  return (
    weekday.charAt(0).toUpperCase() +
    weekday.slice(1)
  );
}