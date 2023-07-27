import { differenceInSeconds, format, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

export const diffFromNow = (date: Date) => {
  return differenceInSeconds(date, new Date());
};

export const dateOrHour = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else {
    return format(date, 'yyyy-MM-dd');
  }
};

export const getLongDate = (date: string) => {
  return format(new Date(date), 'PPP', { locale: es });
};
