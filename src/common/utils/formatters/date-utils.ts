export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatHour(timeString: string): string {
  if (!timeString) return '';
  
  if (timeString.includes(' ')) {
    const hour = timeString.split(' ')[1].substring(0, 5);
    return hour;
  }
  return timeString.substring(0, 5);
}

export function formatSunTime(timeString: string): string {
  if (!timeString) return 'N/A';
  
  const cleanTime = timeString.replace(/\s*(AM|PM)\s*/i, '').trim();
  return cleanTime;
}

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